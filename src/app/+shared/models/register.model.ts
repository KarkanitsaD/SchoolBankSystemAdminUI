export class RegisterModel {
    name: string;
    surname: string;
    phone: string;
    password: string;
    base64: string;
    extension: string;

    constructor(public init?: Partial<RegisterModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}