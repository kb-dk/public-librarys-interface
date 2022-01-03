export interface IDepot {
    id: number,
    library_number: string,
    type: string | null,
    language: string | null,
    orderNo: number | null,
    description: string | null,
    checkedOut: string | null,
    due: string | null,
    lastStateChange: string | null,
    currentCheckedOut: number | null,
    totalEntries: number | null,
    created: string | null,
    dispatched: string | null,
    firstRecall: string | null,
    secondRecall: string | null,
    manual: string | null,
    closed: string | null,
    state: string | null
}

export interface DepotsResolved {
    loans: IDepot[] | null;
    error?: any;
}
