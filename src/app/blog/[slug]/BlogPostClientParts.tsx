'use client';

import ClientLikeCount from '@/components/blog/ClientLikeCount';
import ClientViewCount from '@/components/blog/ClientViewCount';

export default function BlogPostClientParts({
  postId,
  postSlug,
  textColor,
}: {
  postId: string;
  postSlug: string;
  textColor: string;
}) {
  return (
    <span className="flex items-center whitespace-nowrap text-xxs uppercase">
      <ClientViewCount route={`/blog/${postSlug}`} textColor={textColor} />
      <span className="mx-2 text-zinc-500 dark:text-zinc-400">•</span>
      <ClientLikeCount postId={Number(postId)} />
    </span>
  );
}
