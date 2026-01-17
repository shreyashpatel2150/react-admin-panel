import React, { FormEvent } from "react";
import { useAppContext } from "../../context/AppContext";
import usePageMeta from "../../hooks/usePageMeta";
import Card from "../../components/Card";
import FormInput from "../../components/Form/FormInput";
import Droppable from "../../components/droppable/Droppable";
import { AppFile } from "../../classses/AppFile";
import useFormInput from "../../hooks/useFormInput";
import { head } from "lodash-es";
import useFileInput from "../../hooks/useFileInput";
import { useCreateUserMutation } from "../../apis/UserApi";
import Button from "../../components/buttons/Button";
import { useMutationHandler } from "../../hooks/useMutationHandler";

const UserForm: React.FC = () => {
    const { defaultBreadcrumbs } = useAppContext();
    const name = useFormInput<string>('', v=>v)
    const email = useFormInput<string>('', v=>v)
    const password = useFormInput<string>('', v=>v)
    const confirm_password = useFormInput<string>('', v=>v)
    const profile = useFileInput<AppFile>(undefined)

    const [createUser] = useCreateUserMutation()
    const { execute: submitUser, isLoading } = useMutationHandler(
        createUser,
        {
            successMessage: 'User created successfully!',
            errorMessage: 'Failed to create user. Please try again.',
            redirectUrl: '/user'
        }
    )

    usePageMeta({
        meta: { title: 'Create new user', description: 'Form to create a new user' },
        details: { pageTitle: 'Create new user', breadcrumbs: [ ...defaultBreadcrumbs, { name: 'Users', path: '/user' } ] }
    });

    const handleFileSelect = (selectedFiles: AppFile[]) => {
        profile.setValue(head(selectedFiles))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await submitUser({
            name: name.value,
            email: email.value,
            password: password.value,
            confirm_password: confirm_password.value,
            profile: profile.value?.file
        })

        console.log(user)
    }

    return (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <div className="space-y-6">
                <Card title="Create New User">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <FormInput label="Name" type="text" required={true} placeholder="John Doe" {...name.bind} />
                            <FormInput label="Email" type="email" required={true} placeholder="john.doe@example.com" {...email.bind} />
                            <FormInput label="Password" type="password" required={true} placeholder="******" {...password.bind} />
                            <FormInput label="Confirm Password" type="password" required={true} placeholder="******" {...confirm_password.bind} />
                            <Droppable multiple onFileSelect={handleFileSelect} />
                        </div>
                        <div className="mt-2">
                            <Button type="submit" isBusy={isLoading}>Save</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
}

export default UserForm;