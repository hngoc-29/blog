'use client';

import BlogSupport from '@/components/blog/BlogSupport';

export default function BlogSupportWrapper({ postId }: { postId: number }) {
  return <BlogSupport postId={postId} />;
}
