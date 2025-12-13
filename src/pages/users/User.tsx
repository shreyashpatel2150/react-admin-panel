import React from "react";
import { useAppContext } from "../../context/AppContext";
import usePageMeta from "../../hooks/usePageMeta";
import Card from "../../components/Card";
import FloatButton from "../../components/buttons/FloatButton";

export const User: React.FC = () => {

    const { defaultBreadcrumbs } = useAppContext();
    usePageMeta({
        meta: { title: 'Users', description: 'List of all users'},
        details: { pageTitle: 'Users', breadcrumbs: [...defaultBreadcrumbs, { name: 'Users', path: '/user' }] }
    });

    return (
        <Card title="Users">
            {/* Example floating action button - navigates to /user when clicked */}
            <FloatButton
                label="Create User"
                to="/user/create"
            />

            <div>
                {/* User list content goes here */}
                <p>This is where the user list will be displayed.</p>
            </div>
        </Card>
    );
}