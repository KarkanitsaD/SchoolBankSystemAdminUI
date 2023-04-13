export class StudentModel {
  id: string;
  name: string;
  surname: string;
  phone: string;
  sum: number;
  public constructor(init?: Partial<StudentModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
