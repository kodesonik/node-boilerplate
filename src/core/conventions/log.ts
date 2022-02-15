import { Action, LogStatus } from ".";

export default interface Log {
    date:string
    time: string
    userId: number
    lastName?: string
    firstName?: string
    phoneNumber?: string
    email?: string
    path: string
    model: string
    modelId: string
    action: Action
    description: string
    status: LogStatus
    failureReason?: string 
}

