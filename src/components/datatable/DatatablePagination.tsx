import { ceil } from "lodash-es";
import { DatatableParams } from "../../interfaces/DatatableParams";
import Button from "../buttons/Button";

export default function DatatablePagination({ params, setPage }: { params: DatatableParams, setPage: (page: number) => void }) {
    const pageStart: number = 1 + (params.page * params.take) - params.take
    const pageEnd: number = Math.min(params.totalRows, (pageStart - 1) + params.take)

    const totalPage: number = params.totalRows ? ceil(params.totalRows / params.take) : 1

    const pages: React.ReactNode[] = []
    for (let i: number = 1; i <= totalPage; i++) {
        pages.push(
            <Button
                variant={params.page === i ? 'primary' : 'outline'}
                key={i}
                className=" h-10 "
                onClick={() => gotoPage(i)}
            >
                {i}
            </Button>
        )
    }

    const gotoPage = (page: number) => {
        setPage(page)
    }

    const disabledPrevButton: boolean = params.page == 1
    const disabledNextButton: boolean = params.page >= totalPage

    return (
        <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
            <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
                <div className="pb-3 xl:pb-0">
                    <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                        Showing {pageStart} to {pageEnd} of {params.totalRows} entries
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <Button
                        disabled={disabledPrevButton}
                        className="mr-2.5 h-10 "
                        onClick={() => gotoPage(params.page - 1)}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
                        {pages}
                    </div>
                    <Button
                        className="ml-2.5 h-10"
                        disabled={disabledNextButton}
                        onClick={() => gotoPage(params.page + 1)}
                   >
                        Next
                   </Button>
                </div>
            </div>
        </div>
    )
}