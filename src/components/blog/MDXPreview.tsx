'use client';

import { useEffect, useState } from 'react';
import { compileMDX } from 'next-mdx-remote/rsc';
import { components } from '@/components/blog/MDXComponents';

export default function MDXPreview({ source }: { source: string }) {
    const [content, setContent] = useState<React.ReactNode>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const { content } = await compileMDX({
                    source,
                    components,
                    options: {
                        parseFrontmatter: false,
                    },
                });

                if (mounted) setContent(content);
            } catch (err) {
                console.error(err);
                setError('MDX compile error');
            }
        })();

        return () => {
            mounted = false;
        };
    }, [source]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return <>{content}</>;
}
