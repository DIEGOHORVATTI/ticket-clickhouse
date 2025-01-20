import { MongooseError } from 'mongoose'

declare global {
  type MongoServerError<T> = MongooseError & {
    /** Raw error result document returned by server. */
    errorResponse: ErrorDescription
    codeName?: string
    writeConcernError?: Document
    errInfo?: Document
    ok?: number
    /**
     * **Do not use this constructor!**
     *
     * Meant for internal use only.
     *
     * @remarks
     * This class is only meant to be constructed within the driver. This constructor is
     * not subject to semantic versioning compatibility guarantees and may change at any time.
     *
     * @public
     **/
    constructor(message: ErrorDescription)
    get name(): string
  } & Partial<T>
}
