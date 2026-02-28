'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useQueryParams() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const setParam = useCallback(
        (key: string, value: string | null) => {
            const params = new URLSearchParams(searchParams.toString());

            if (value === null || value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams],
    );

    const appendParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.append(key, value);
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, pathname, searchParams],
    );

    const getParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

    return {
        getParam,
        setParam,
        appendParam,
    };
}
