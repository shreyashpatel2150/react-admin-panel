import React, { FormEvent, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import usePageMeta from "../../hooks/usePageMeta";
import Card from "../../components/Card";
import FormInput from "../../components/Form/FormInput";
import Droppable from "../../components/droppable/Droppable";
import useFormInput from "../../hooks/useFormInput";
import { head } from "lodash-es";
import useFileInput from "../../hooks/useFileInput";
import { useCreateUserMutation, useGetUserDetailsQuery, useUpdateUserMutation } from "../../apis/UserApi";
import Button from "../../components/buttons/Button";
import { useMutationHandler } from "../../hooks/useMutationHandler";
import { useParams } from "react-router";
import { fileTemplateFromMedia } from "../../utils/misc";
import { User } from "../../interfaces/Modal/User";
import { commonFile } from "../../interfaces/Common";

const UserForm: React.FC = () => {
    const { defaultBreadcrumbs } = useAppContext();
    const name = useFormInput<string>('', v=>v)
    const email = useFormInput<string>('', v=>v)
    const password = useFormInput<string>('', v=>v)
    const confirm_password = useFormInput<string>('', v=>v)
    const profile = useFileInput<commonFile>(undefined)

    const { id } = useParams<{ id: string }>();

    const [createUser] = useCreateUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const { data: userDetails, isLoading: isFetching } = useGetUserDetailsQuery(
        id ? parseInt(id) : 0,
        { skip: !id }
    );

    const { execute: submitUser, isLoading } = useMutationHandler(
        id
            ? (payload: User) => updateUser({ id: parseInt(id), payload })
            : (payload: User) => createUser(payload),
        {
            successMessage: id ? 'User updated successfully!' : 'User created successfully!',
            errorMessage: 'Failed to save user. Please try again.',
            redirectUrl: '/users'
        }
    )

    // Populate form when user details are fetched
    useEffect(() => {
        if (userDetails) {
            name.setValue(userDetails.name);
            email.setValue(userDetails.email);

            async function fetchProfile(userDetails: User) {
                if (userDetails.profile ) {
                    const media = fileTemplateFromMedia(userDetails.profile);
                    profile.setValue(media);
                }
            }

            fetchProfile(userDetails);
        }
    }, [userDetails]);

    usePageMeta({
        meta: { title: id ? 'Edit user' : 'Create new user', description: id ? 'Form to edit user' : 'Form to create a new user' },
        details: { pageTitle: id ? 'Edit User' : 'Create New User', breadcrumbs: [ ...defaultBreadcrumbs, { name: 'Users', path: '/users' } ] }
    });

    const handleFileSelect = (selectedFiles: (commonFile)[]) => {
        profile.setValue(head(selectedFiles) as commonFile)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        await submitUser({
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value,
            profile: profile.value as commonFile
        })
    }

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
                <Card title={id ? 'Edit User' : 'Create New User'}>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <FormInput label="Name" type="text" required={true} placeholder="John Doe" {...name.bind} />
                            <FormInput label="Email" type="email" required={true} placeholder="john.doe@example.com" {...email.bind} />
                            <FormInput label="Password" type="password" required={!id} placeholder="******" {...password.bind} />
                            <FormInput label="Confirm Password" type="password" required={!id} placeholder="******" {...confirm_password.bind} />
                            <Droppable multiple onFileSelect={handleFileSelect} uploadedFiles={profile.value ? [profile.value] : []} />
                        </div>
                        <div className="mt-2">
                            <Button type="submit" isBusy={isLoading || isFetching}>{id ? 'Update' : 'Save'}</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default UserForm;
