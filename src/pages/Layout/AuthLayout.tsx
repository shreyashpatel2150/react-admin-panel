import { Link } from "react-router";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
                {children}
                <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
                    <div className="relative flex items-center justify-center z-1">
                        <div className="relative flex items-center justify-center z-1">
                            <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
                                <img src="/images/shape/grid-01.svg" alt="grid" />
                            </div>
                            <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
                                <img src="/images/shape/grid-01.svg" alt="grid" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center max-w-xs">
                            <Link to="/" className="block mb-4">
                                <img
                                    width={231}
                                    height={48}
                                    src="/images/logo/auth-logo.svg"
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}