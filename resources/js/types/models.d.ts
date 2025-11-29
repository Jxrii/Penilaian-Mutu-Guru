import { UserRoles } from "@/enums/UserRoles"

export type User = {
    id: number,
    name: string,
    email: string,
    password: ?string,
    email_verified_at?: string,
    role: UserRoles,
    created_at?: string,
    updated_at?: string,
}

export type Teacher = {
    id: number,
    name: string,
    initial: string,
    subject: string,
    class: string,
    email: string,
    supervision: ?Supervision,
    created_at: Date,
    updated_at: Date
}

type SuperVisionSimpleResult = {
    level: number,
    indicatorsMet: number[],
}

export type Supervision = {
    id: number,
    teacher_id: ?number,
    item_number: number,
    checked_indicators: string,
    level?: number,
    simple_result: SuperVisionSimpleResult,
    teacher: Teacher,
    supervised_at: ?string,
    created_at: string,
    updated_at: string,
}
