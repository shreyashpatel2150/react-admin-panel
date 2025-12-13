import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export const User: React.FC = () => {

    const { setPageMeta, setPageDetails, defaultBreadcrumbs } = useAppContext();

    useEffect(() => {
        setPageMeta({
            title: "Users",
            description: "List of all users"
        });

        return () => setPageMeta({ title: "Admin Panel", description: "" });
    }, []);

    useEffect(() => {
        setPageDetails({
            pageTitle: "Users",
            breadcrumbs: [
                ...defaultBreadcrumbs,
                { name: "Users", path: "/user" }
            ]
        });

        return () => setPageDetails({
            pageTitle: "",
            breadcrumbs: defaultBreadcrumbs
        });
    }, []);

    return (
        <div>
            User Page
        </div>
    );
}