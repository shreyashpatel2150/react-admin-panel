import PageMeta from "./common/PageMeta";

export default function Dashboard() {
    return (
        <div>
            <PageMeta
                title="Dashboard"
                description="Dashboard"
            />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
                <div className="col-span-12 space-y-6 xl:col-span-7">
                    Dashboard
                </div>
            </div>
        </div>
    );
}
