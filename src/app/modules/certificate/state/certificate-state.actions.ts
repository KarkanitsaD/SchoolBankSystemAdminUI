import { CertificateModel } from "../../../+shared/models/certificate.model";
import { CertificateFilterModel } from "../../../+shared/models/certificate-filter.model";

export class LoadCertificates {
    static readonly type = '[Certificate] Search certificates';

    constructor(public filterModel: CertificateFilterModel) {}
}

export class ClearCertificates {
    static readonly type = '[Certificate] Clear certificates';
}

export class AddCertificate {
    static readonly type = '[Certificate] Add certificate';

    constructor(public model: CertificateModel) {}
}

export class UpdateCertificate {
    static readonly type = '[Certificate] Update certificate';

    constructor(public model: CertificateModel) {}
}

export class DeleteCertificate {
    static readonly type = '[Certificate] Delete certificate';

    constructor(public id: string) {}
}