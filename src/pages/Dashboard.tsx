import { useAppContext } from "../context/AppContext";
import usePageMeta from "../hooks/usePageMeta";

export default function Dashboard() {
    const { defaultBreadcrumbs } = useAppContext();

    usePageMeta({
        meta: { title: 'Dashboard', description: '' },
        details: { pageTitle: 'Dashboard', breadcrumbs: [...defaultBreadcrumbs] }
    });
    return (
        <div>
            Dashboard Page Content
        </div>
    );
}
