import PageMeta from "../common/PageMeta";
import AuthLayout from "../Layout/AuthLayout";
import FormInput from "../../components/Form/FormInput";
import Button from "../../components/buttons/Button";
import useFormInput from "../../hooks/useFormInput";
import { useLoginMutation } from "../../apis/AuthApi";
import { FormEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
    const { updateUser } = useAuth();
    const navigate = useNavigate();

    const email = useFormInput('');
    const password = useFormInput('');

    const [login] = useLoginMutation();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await login({ email: email.value, password: password.value }).unwrap();
        
        console.log('Login Result:', result);
        localStorage.setItem("token", result.data?.token);
        updateUser(result.data?.user)
        navigate("/");
    };
        

    return (
        <AuthLayout>
            <PageMeta title="Login" />
            <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
                <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                    <div>
                        <div className="mb-5 sm:mb-8">
                            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                                Sign In
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Enter your email and password to sign in!
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleLogin}>
                                <div className="space-y-6">
                                    <div>
                                        <FormInput label="Email" type="text" required={true} placeholder="abc@example.com" {...email.bind} />
                                    </div>
                                    <div>
                                        <FormInput label="Password" type="password" required={true} placeholder="******" {...password.bind} />
                                    </div>
                                    <div>
                                        <Button className="w-full">Sign In</Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
export default Login;