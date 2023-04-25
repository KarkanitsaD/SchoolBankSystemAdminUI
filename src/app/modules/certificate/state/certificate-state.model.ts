import { CertificateModel } from "../../../+shared/models/certificate.model";

export interface CertificateStateModel {
    certificates: CertificateModel[];
    certificate: CertificateModel
}