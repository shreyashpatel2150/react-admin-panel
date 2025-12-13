import { createContext, ReactNode, useContext, useState } from "react";
import { PageDetailsType } from "../types/PageDetailsType";

type PageMeta = {
    title: string;
    description: string;
}

type AppContextType = {
    pageMeta?: PageMeta;
    setPageMeta: (pageMeta: PageMeta | undefined) => void;
    pageDetails: PageDetailsType;
    setPageDetails: (pageDetails: PageDetailsType) => void;
    defaultBreadcrumbs: { name: string; path: string }[];
}

const defaultBreadcrumbs: { name: string; path: string }[] = [{ name: "Home", path: "/" }];
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [pageDetails, setPageDetails] = useState<PageDetailsType>({
        pageTitle: '',
        breadcrumbs: defaultBreadcrumbs
    });
    const [pageMeta, setPageMeta] = useState<PageMeta | undefined>(undefined);

    return <AppContext.Provider
            value={{
                pageDetails,
                setPageDetails,
                pageMeta,
                setPageMeta,
                defaultBreadcrumbs
            }}
        >
            {children}
        </AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

