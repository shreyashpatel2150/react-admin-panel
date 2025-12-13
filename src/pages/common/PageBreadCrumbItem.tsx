import { Link } from "react-router";

type breadcrumbPageProp = {
    breadcrumb: { name: string, path: string },
    isLast?: boolean
}

const PageBreadCrumbItem: React.FC<breadcrumbPageProp> = ({ breadcrumb, isLast }) => {
    const arrowIcon = <svg
                    className="stroke-current"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                        stroke=""
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
    return (
        <>
            <Link
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                to={breadcrumb.path}
            >
                {breadcrumb.name}
                {!isLast && <span>{arrowIcon}</span>}
            </Link>
        </>
    );
}

export default PageBreadCrumbItem;