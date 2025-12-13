import { useAppContext } from "../../context/AppContext";
import { PageDetailsType } from "../../types/PageDetailsType";
import PageBreadCrumbItem from "./PageBreadCrumbItem";

const PageBreadCrumb: React.FC = () => {
    const { pageDetails }: { pageDetails: PageDetailsType } = useAppContext();
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <h2
                className="text-xl font-semibold text-gray-800 dark:text-white/90"
                x-text="pageName"
            >
                {pageDetails.pageTitle}
            </h2>
            <nav>
                <ol className="flex items-center gap-1.5">
                    {pageDetails.breadcrumbs.map((breadcrumb, index) => {
                        return (
                            <li key={index}>
                                <PageBreadCrumbItem breadcrumb={breadcrumb} isLast={index == pageDetails.breadcrumbs.length - 1} />
                            </li>
                        )
                    })}
                </ol>
            </nav>
        </div>
    );
}

export default PageBreadCrumb;