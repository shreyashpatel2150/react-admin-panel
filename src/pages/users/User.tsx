import React from "react";
import { useAppContext } from "../../context/AppContext";
import usePageMeta from "../../hooks/usePageMeta";
import Card from "../../components/Card";
import FloatButton from "../../components/buttons/FloatButton";
import UserDatatable from "./UserDatatable";

export const User: React.FC = () => {

    const { defaultBreadcrumbs } = useAppContext();
    usePageMeta({
        meta: { title: 'Users', description: 'List of all users'},
        details: { pageTitle: 'Users', breadcrumbs: [...defaultBreadcrumbs, { name: 'Users', path: '/users' }] }
    });

    return (
        <Card title="Users">
            {/* Example floating action button - navigates to /users/create when clicked */}
            <FloatButton
                label="Create User"
                to="/users/create"
            />

            <div>
                <UserDatatable />
            </div>
        </Card>
    );
}