import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function Dashboard() {
    const { setPageMeta, setPageDetails, defaultBreadcrumbs } = useAppContext();
    
        useEffect(() => {
            setPageMeta({
                title: "Dashboard",
                description: ""
            });
    
            return () => setPageMeta({ title: "Admin Panel", description: "" });
        }, []);
    
        useEffect(() => {
            setPageDetails({
                pageTitle: "Dashboard",
                breadcrumbs: [
                    ...defaultBreadcrumbs,
                ]
            });
    
            return () => setPageDetails({
                pageTitle: "",
                breadcrumbs: defaultBreadcrumbs
            });
        }, []);
    return (
        <div>
            Dashboard Page Content
        </div>
    );
}
