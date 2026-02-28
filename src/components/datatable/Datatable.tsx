import Button from "../buttons/Button";
import SyncIcon from '@mui/icons-material/Sync';
import FormInput from "../Form/FormInput";
import DatatableHeader from "./DatatableHeader";
import { DatatableColumnTypes } from "../../interfaces/DatatableColumnTypes";
import { useState } from "react";
import { useListingQuery } from "../../apis/DatatableApi";
import { DatatableParams } from "../../interfaces/DatatableParams";
import DatatablePagination from "./DatatablePagination";

interface DatatableProps<T> {
    tableConfig: {
        columns: DatatableColumnTypes<T>[],
        url: string,
    }
}

const defaultParams: DatatableParams = {
    take: 15,
    skip: 0,
    quicksearch: '',
    page: 1,
    totalRows: 0,
}


const Datatable = <T,>({ tableConfig }: DatatableProps<T>) => {
    const [params, setParams] = useState<DatatableParams>(defaultParams)
    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {} as Record<string, string>)
    ).toString()

    const { data, isLoading, refetch, isFetching } = useListingQuery({
        url: tableConfig.url,
        params: new URLSearchParams(queryString).toString(),
    })

    const refreshData = (resetPagination: boolean = false) => {
        if (resetPagination) setParams(defaultParams)
        refetch()
    }

    const handlechange = (key: keyof DatatableParams, value: string|number, resetPaging: boolean = false) => {
        const paginationData = { ...params, [key]: value }
        if (resetPaging) {
            paginationData.page = 1
        }

        paginationData.skip = (paginationData.page - 1) * params.take
        setParams(paginationData)
    }

    const loadingBar = isLoading || isFetching && (
        <div className='h-0.5 w-full bg-white overflow-x-auto'>
            <div className='progress-bar w-full h-full bg-brand-500 progress-left-right'></div>
        </div>
    )

    return (
        <div className="space-y-6">
            <div className="overflow-hidden  rounded-xl  bg-white  dark:bg-white/[0.03]">
                <div className="flex flex-col gap-2 px-4 py-4 border border-b-0 border-gray-100 dark:border-white/[0.05] rounded-t-xl sm:flex-row sm:items-center sm:justify-between">
                    {/* Page Length dropdown here */}

                    <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between"></div>

                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                        <div className="relative">
                            <button className="absolute text-gray-500 -translate-y-1/2 left-4 top-1/2 dark:text-gray-400">
                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" fill=""></path>
                            </svg>
                            </button>
                            <FormInput placeholder="Search..." className="py-2.5 pl-11 pr-4" onChange={(e) => handlechange('quicksearch', e.target.value, true)} />
                        </div>
                        <Button className="h-11" size="sm" onClick={refreshData} variant="outline">
                            <SyncIcon />
                        </Button>
                        <Button size="sm" variant="outline">
                            <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0018 14.083C9.7866 14.083 9.59255 13.9924 9.45578 13.8472L5.61586 10.0097C5.32288 9.71688 5.32272 9.242 5.61552 8.94902C5.90832 8.65603 6.3832 8.65588 6.67618 8.94868L9.25182 11.5227L9.25182 3.33301C9.25182 2.91879 9.5876 2.58301 10.0018 2.58301C10.416 2.58301 10.7518 2.91879 10.7518 3.33301L10.7518 11.5193L13.3242 8.94866C13.6172 8.65587 14.0921 8.65604 14.3849 8.94903C14.6777 9.24203 14.6775 9.7169 14.3845 10.0097L10.5761 13.8154C10.4385 13.979 10.2323 14.083 10.0018 14.083ZM4.0835 13.333C4.0835 12.9188 3.74771 12.583 3.3335 12.583C2.91928 12.583 2.5835 12.9188 2.5835 13.333V15.1663C2.5835 16.409 3.59086 17.4163 4.8335 17.4163H15.1676C16.4102 17.4163 17.4176 16.409 17.4176 15.1663V13.333C17.4176 12.9188 17.0818 12.583 16.6676 12.583C16.2533 12.583 15.9176 12.9188 15.9176 13.333V15.1663C15.9176 15.5806 15.5818 15.9163 15.1676 15.9163H4.8335C4.41928 15.9163 4.0835 15.5806 4.0835 15.1663V13.333Z" fill="currentColor"></path>
                            </svg> Download
                        </Button>
                    </div>
                </div>
                {loadingBar}
                <div className="max-w-full overflow-x-auto custom-scrollbar">
                    <div>
                        <table className="min-w-full">
                            <DatatableHeader columns={tableConfig.columns} />
                            <tbody>
                                {data?.data?.map((row, i) => (
                                    <tr key={i}>
                                        {tableConfig.columns.map((col, j) => {
                                            const CellComponent = col.renderComponent
                                            const value = row[col.field]

                                            return (
                                                <td
                                                    key={j}
                                                    className={`px-4 py-2 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap ${col.classes?.join(' ')}`}
                                                >
                                                    {CellComponent
                                                        ? <CellComponent row={row} value={value} />
                                                        : col.formatter ? col.formatter(value) : value}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}

                                {(!data || data.data.length === 0) && 
                                    <tr>
                                        <td colSpan={tableConfig.columns.length} className="px-4 py-2 border border-gray-100 dark:border-white/[0.05] dark:text-white/90 whitespace-nowrap text-center">No data found.</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {params.totalRows > 0 && <DatatablePagination params={params} setPage={(page) => handlechange('page', page)} />}
            </div>
        </div>
    );
}

export default Datatable;