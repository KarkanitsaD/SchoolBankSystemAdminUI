export class CertificateModel {
  id: string;
  title: string;
  description: string;
  price: number;

  constructor(init?: Partial<CertificateModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
