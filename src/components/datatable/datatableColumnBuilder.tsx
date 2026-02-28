import { isArray, startCase } from "lodash-es";
import { DatatableColumnTypes } from "../../interfaces/DatatableColumnTypes";
import { DatatableCellType } from "../../interfaces/DatatableCellType";
import { FC } from 'react'

type FormatterFn = (value: string | []) => string | [];
type VisibleCallbackFn = () => boolean;

export function column<T>(name = 'id', label = '', tooltip = '') {
    return new DatatableColumn<T>(name, label, tooltip)
}

class DatatableColumn<T> implements DatatableColumnTypes<T>
{
    constructor(field: string, label: string = '', tooltip: string = '') {
        this.field = field;
        this.icon = undefined;
        this.label = label || startCase(field);
        this.tooltip = tooltip;
        this.align = undefined;
        this.wrapHeader = false;
        this.headerStyle = undefined;
        this.headerClasses = [];
        this.classes = [];
        this.sortFields = [field];
        this.sortable = true;
        this.visible = true;
        this.renderComponent = null;

        this.formatter = (value) => value;
        this.fnVisibleCallback = undefined;
    }
    field: string;
    icon?: string | undefined;
    label: string;
    tooltip: string;
    align?: string | undefined;
    wrapHeader: boolean;
    headerStyle?: Record<string, string> | undefined;
    headerClasses: string[];
    classes: string[];
    sortFields: string[];
    sortable: boolean;
    visible: boolean;
    renderComponent: FC<DatatableCellType<T>> | null = null;
    formatter: FormatterFn | null;
    fnVisibleCallback?: VisibleCallbackFn | undefined;

    setTooltip(tooltip: string) {
        this.tooltip = tooltip
        return this
    }

    setCenter() {
            this.align = 'center'
            this.classes.push('text-center')
            return this
        }
    
    setHeaderStyle(key: string, value: string) {
        if (!this.headerStyle) this.headerStyle = {}
        this.headerStyle[key] = value
        return this
    }

    setClasses(classes: Array<string> | string) {
        this.classes = isArray(classes) ? classes : [classes]
        return this
    }

    setSortBy(fields: Array<string> | string) {
        this.sortFields = isArray(fields) ? fields : [fields]
        return this
    }

    enableHeaderWrapping() {
        this.wrapHeader = true
        return this
    }

    setResponsive() {
        this.headerClasses.push('gt-lg')
        this.classes.push('gt-lg')
        return this
    }

    setUnsortable() {
        this.sortable = false
        return this
    }

    setVisible(isVisible: boolean) {
        this.visible = isVisible
        return this
    }

    setHeaderClasses(classes: Array<string> | string) {
        this.headerClasses = isArray(classes) ? classes : [classes]
        return this
    }

    setCompact() {
        this.setHeaderStyle('width', '1px')
        return this
    }

    setWidth(width: string) {
        this.setHeaderStyle('width', width)
    }

    setCustomFormatter(fn: FormatterFn) {
        this.formatter = fn
        return this
    }

    setRenderComponent(component: FC<DatatableCellType<T>> | null): this {
        this.renderComponent = component
        return this
    }
    
        // setConditionalRender() {
        //     this.visible = false
        //     this.fnVisibleCallback = dataset => dataset.some(row => row[this.field])
        // }
}