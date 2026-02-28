import { FC } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

export interface ActionButtonsProps {
    showEdit?: boolean;
    showDelete?: boolean;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    id: number;
}

const ActionButtons: FC<ActionButtonsProps> = ({
    id,
    showEdit = true,
    showDelete = true,
    onEdit,
    onDelete,
}) => {
    const handleEdit = () => {
        if (onEdit) {
            onEdit(id);
        }
    };

    const handleDelete = () => {
        if (onDelete) {
            onDelete(id);
        }
    };

    return (
        <div className="flex items-center space-x-3">
            {showEdit && (
                <button
                    onClick={handleEdit}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="Edit"
                >
                    <MdEdit size={20} />
                </button>
            )}
            {showDelete && (
                <button
                    onClick={handleDelete}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                >
                    <MdDelete size={20} />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
