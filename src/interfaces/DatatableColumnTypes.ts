import { DatatableCellType } from "./DatatableCellType";
import { FC } from 'react'

export interface DatatableColumnTypes<T> {
    field: string;
    icon?: string;
    label: string;
    tooltip: string;
    align?: string;
    wrapHeader: boolean;
    headerStyle?: Record<string, string>;
    headerClasses: string[];
    classes: string[];
    sortFields: string[];
    sortable: boolean;
    visible: boolean;
    renderComponent?: FC<DatatableCellType<T>> | null
    formatter: FormatterFn | null;
    fnVisibleCallback?: VisibleCallbackFn;
}

type FormatterFn = (value: string | []) => string | [];
type VisibleCallbackFn = () => boolean;