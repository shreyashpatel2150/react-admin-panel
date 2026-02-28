import Datatable from "../../components/datatable/Datatable";
import { column } from "../../components/datatable/datatableColumnBuilder";
import { DatatableCellType } from "../../interfaces/DatatableCellType";
import { FC } from "react";
import { User } from "../../interfaces/Modal/User";
// import { confirmationAlert } from "../../utils/alerts";
import EditButton from "../../components/buttons/EditButton";

const UserDatatable: React.FC = () => {

    // const handleDelete = (id: number) => {
    //     confirmationAlert(() => {
    //         console.log('Delete user:', id);
    //     })
    // };

    const ActionButtonsRenderer: FC<DatatableCellType<User>> = ({ row }) => {
        if (!row.id) return '';
        return (
            <div className="flex items-center space-x-3">
                <EditButton url={`/users/edit/${row.id}`} />
            </div>
        );
    };

    const tableConfig = {
            url: 'users',
            columns: [
                column('id'),
                column('name'),
                column('email'),
                column('mobile'),
                column<User>('action')
                    .setRenderComponent(ActionButtonsRenderer)
                    .setUnsortable()
            ]
    }
    return (
        <div>
            <Datatable tableConfig={tableConfig} />
        </div>
    );
}

export default UserDatatable;