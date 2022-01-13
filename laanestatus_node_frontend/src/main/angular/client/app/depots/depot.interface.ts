export interface IDepot {
    id?: number,
    library_number?: string,
    type?: string | null,
    language?: string | null,
    orderNo?: number | null,
    description?: string | null,
    checkedOut?: string | null,
    due?: string | null,
    lastStateChange?: string | null,
    currentCheckedOut?: number | null,
    totalEntries?: number | null,
    created?: string | null,
    dispatched?: string | null,
    firstRecall?: string | null,
    secondRecall?: string | null,
    manual?: string | null,
    closed?: string | null,
    state?: string | null
}

export interface IDepotsAndLibraryInfo {
    addressFields?: string | null,
    borrowerID: string | null,
    depotSetSummaries?: IDepot[],
    emails?: string[] | null,
    knownLibrary?: boolean | null,
    libraryNumber: string | null,
    name?: string | null,
}

export interface IDepotEntry {
    "id"?: number,
    "checkedIn"?: string,
    "barcode"?: string,
    "generalMaterialType"?: string,
    "specificMaterialType"?: string,
    "author"?: string,
    "title"?: string,
    "volume"?: string,
    "faustNo"?: string,
    "dk5"?: string,
    "collection"?: string,
    "language"?: string,
    "pages"?: string,
    "topics"?: string,
    "contentDescribingNote"?: string,
    "languageNote"?: string,
    "demographicNote"?: string,
    "relatedMaterialNote"?: string,
    "circulationNote"?: string,
    "mmsId"?: number,
    "holdingId"?: number,
    "itemId"?: number,
    "loanId"?: number,
    "libraryNumber"?: string,
    "materialType"?: string,
    "demographic"?: string,
    "depotSetId"?: number
}

export interface IDepotInfo {
    "id"?: 0,
    "orderNo"?: 0,
    "dueDate"?: string,
    "description"?: string,
    "created"?: string,
    "dispatched"?: string,
    "firstRecall"?: string,
    "secondRecall"?: string,
    "manual"?: string,
    "depotLanguage"?: {
        "id"?: 0,
        "description"?: string,
        "ord"?: 0,
        "active"?: true
    },
    "depotType"?: {
        "id"?: 0,
        "description"?: string,
        "ord"?: 0
    },
    "closed"?: string,
    "entries"?: IDepotEntry[],
    "library_number"?: string,
    "library"?: {
        "libraryNumber"?: string,
        "name"?: string,
        "emails"?: [
            string
            ],
        "borrowerID"?: string,
        "addressFields"?: string,
        "knownLibrary"?: true
    },
    "state"?: string,
    "currentCheckedOut"?: 0,
    "totalEntries"?: 0

}

