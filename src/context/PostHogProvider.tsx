'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const disableSessionRecording =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: disableSessionRecording,

    // 👇 BẬT DEBUG
    debug: true,

    loaded: (ph) => {
      console.log('✅ PostHog loaded');
      console.log('PostHog config:', {
        distinct_id: ph.get_distinct_id(),
        api_host: ph.config.api_host,
        token: ph.config.token,
      });

      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ) {
        ph.opt_out_capturing();
        console.log('⛔ PostHog opt-out (dev/preview)');
      }

      if (window.location.pathname.startsWith('/admin')) {
        ph.opt_out_capturing();
        console.log('⛔ PostHog opt-out (/admin)');
      }
    },
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Disable in admin routes
  useEffect(() => {
    if (pathname?.startsWith('/admin')) {
      posthog.opt_out_capturing();
    } else if (
      process.env.NODE_ENV !== 'development' &&
      process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview'
    ) {
      // Enable in Prod
      posthog.opt_in_capturing();
    }
  }, [pathname]);

  return (
    <PHProvider client={posthog}>
      <PostHogPageViewTracker />
      {children}
    </PHProvider>
  );
}

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Check if we're in admin section
      if (pathname.startsWith('/admin')) {
        return;
      }

      let url = window.origin + pathname;
      if (searchParams?.toString()) {
        url += `?${searchParams.toString()}`;
      }

      // Send pageview
      posthog.capture('$pageview', {
        $current_url: url,
        path: pathname,
        route_pattern: getRoutePattern(pathname),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Helper to normalize route patterns
function getRoutePattern(pathname: string): string {
  // Handle common dynamic routes
  if (pathname.startsWith('/blog/') && pathname !== '/blog') {
    return '/blog/:slug';
  }
  // Add more route pattern normalizations as needed
  return pathname;
}
