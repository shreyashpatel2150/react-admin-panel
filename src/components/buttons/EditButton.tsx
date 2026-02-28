import React from "react";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router";

interface EditButtonProps {
    url: string,
    replace?: boolean
}

const EditButton: React.FC<EditButtonProps> = ({ url, replace = false }: EditButtonProps) => {
    return (
        <NavLink to={url} replace={replace} className="text-indigo-600 hover:text-indigo-900">
            <MdEdit />
        </NavLink>
    );
}

export default EditButton;