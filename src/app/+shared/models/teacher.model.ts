export class TeacherModel {
  id: string;
  name: string;
  surname: string;
  phone: string;

  public constructor(init?: Partial<TeacherModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
