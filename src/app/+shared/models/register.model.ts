export class RegisterModel {
    name: string;
    surname: string;
    phone: string;
    password: string;

    constructor(public init?: Partial<RegisterModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}