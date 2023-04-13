export class StudentFilterModel {
  name: string;
  surname: string;
  phone: string;
  minSum: number;
  maxSum: number;

  constructor(init?: Partial<StudentFilterModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
