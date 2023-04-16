export class CertificateFilterModel {
  title: string;
  minPrice: number;
  maxPrice: number;

  constructor(public init?: Partial<CertificateFilterModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
