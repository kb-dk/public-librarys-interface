import {ILoan} from "../loans/loan.interface";
import {IDepotsAndLibraryInfo} from "../depots/depot.interface";

export interface IHome {
    loans: ILoan[],
    depots: IDepotsAndLibraryInfo,
}

