export interface IValidationErrorCodes {
    required: string,
    range: string
}

export interface IValidationErrors {
    partnerCode: IValidationErrorCodes,
    password: IValidationErrorCodes,
}

export interface IValidationErrorMessages {
    partnerCode: string,
    password: string,
}

export interface IServerErrors {
    partnerDosntExit: string,
    passwordDosntMatch: string,
    internalServerError: string
}
