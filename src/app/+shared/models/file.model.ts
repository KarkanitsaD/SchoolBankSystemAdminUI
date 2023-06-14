export class FileModel {
    base64: string;
    extension: string;

    constructor(public init?: Partial<FileModel>) {
        if (init) {
            Object.assign(this, init);
        }
    }
}