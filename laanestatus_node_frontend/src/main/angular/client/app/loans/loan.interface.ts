export interface ILoan {
  LibraryCode: string,
  ExternalRequestId: string,
  Author: string | null,
  LendingCreationDate: string,
  ActualShippedFormat: string | null,
  ItemBarcode: string | null,
  MmsID: string | null,
  ItemSentDate: string | null,
  LendingRequestStatus: string | null,
  LocateStatus: string | null,
  MaterialType: string,
  ModificationDate: string,
  NeededByDate: string | null,
  ItemReturnDate: string | null,
  Note: string | null,
  ISBN: string | null,
  OverdueSentDate: string | null,
  Title: string | null,
  DueDate: string | null,
  Overdue: boolean | null,
  ItemPolicy: string | null
}

export interface LoansResolved {
  loans: ILoan[] | null;
  error?: any;
}