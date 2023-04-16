import { CertificateFilterModel } from "../../models/certificate-filter.model";
import { CertificateModel } from "../../models/certificate.model";

export class LoadCertificates {
    static readonly type = '[Certificate] Search';

    constructor(public filterModel: CertificateFilterModel) {}
}

export class AddCertificate {
    static readonly type = '[Certificate] Add';

    constructor(public model: CertificateModel) {}
}

export class UpdateCertificate {
    static readonly type = '[Certificate] Update';

    constructor(public model: CertificateModel) {}
}

export class DeleteCertificate {
    static readonly type = '[Certificate] Delete';

    constructor(public id: string) {}
}