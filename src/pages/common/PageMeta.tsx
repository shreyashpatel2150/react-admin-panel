import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

const PageMeta: React.FC = () => {
    const { pageMeta } = useAppContext();
    const title = pageMeta?.title ?? "Admin Panel";
    const description = pageMeta?.description ?? "Admin Panel Description";

    // Fallback: directly set document.title and meta description when pageMeta changes.
    // This ensures the browser tab title updates even if Helmet timing is delayed.
    useEffect(() => {
        const fullTitle = title ? `${title} | Admin Panel` : 'Admin Panel';
        if (document.title !== fullTitle) document.title = fullTitle;

        const descTag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
        if (descTag) {
            if (descTag.content !== description) descTag.content = description;
        } else {
            const m = document.createElement('meta');
            m.name = 'description';
            m.content = description;
            document.head.appendChild(m);
        }
    }, [title, description]);

    return (
        <Helmet key={title}>
            <title>{title ? `${title} | Admin Panel` : 'Admin Panel'}</title>
            <meta name="description" content={description} />
        </Helmet>
    );
};

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>{children}</HelmetProvider>
);

export default PageMeta;
