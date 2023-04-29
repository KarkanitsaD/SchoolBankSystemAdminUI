import { StudentModel } from "./student.model";

export class MoneyTransferModel {
    id: string;
    time: number;
    sum: number;
    studentFrom: StudentModel;
    studentTo: StudentModel;

    constructor(init?: Partial<MoneyTransferModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}