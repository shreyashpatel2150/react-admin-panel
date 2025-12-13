import { useEffect, useRef } from "react";
import { useAppContext } from "../context/AppContext";
import { PageDetailsType } from "../types/PageDetailsType";

type UsePageMetaOptions = {
    meta?: {
        title: string;
        description: string;
    };
    details?: Partial<PageDetailsType>;
    resetOnUnmount?: boolean;
};

function isEqual(a: object | undefined, b: object | undefined): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
}

export default function usePageMeta({
    meta,
    details,
    resetOnUnmount = true,
}: UsePageMetaOptions) {
    const {
        pageMeta,
        pageDetails,
        setPageMeta,
        setPageDetails,
        defaultBreadcrumbs,
    } = useAppContext();

    const mountedRef = useRef(false);

    useEffect(() => {
        if (!meta) return;
        if (isEqual(pageMeta, meta)) return;

        setPageMeta(meta);
    }, [meta, pageMeta, setPageMeta]);

    useEffect(() => {
        if (!details) return;

        const nextDetails: PageDetailsType = {
            ...pageDetails,
            ...details,
            breadcrumbs:
            details.breadcrumbs ??
            pageDetails.breadcrumbs ??
            defaultBreadcrumbs,
        };

        if (isEqual(pageDetails, nextDetails)) return;

        setPageDetails(nextDetails);
    }, [
        details,
        pageDetails,
        defaultBreadcrumbs,
        setPageDetails,
    ]);

    useEffect(() => {
        mountedRef.current = true;

        return () => {
            if (!mountedRef.current) return;
            mountedRef.current = false;

            if (!resetOnUnmount) return;

            const resetDetails: PageDetailsType = {
                pageTitle: "",
                breadcrumbs: defaultBreadcrumbs,
            };

            if (!isEqual(pageMeta, undefined)) {
                setPageMeta(undefined);
            }

            if (!isEqual(pageDetails, resetDetails)) {
                setPageDetails(resetDetails);
            }
        };
    }, []); // INTENTIONALLY once
}
