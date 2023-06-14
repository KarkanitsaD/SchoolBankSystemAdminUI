export class CertificateModel {
  id: string;
  title: string;
  description: string;
  price: number;
  createTime: number;
  updateTimeNumber: number;

  constructor(init?: Partial<CertificateModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
