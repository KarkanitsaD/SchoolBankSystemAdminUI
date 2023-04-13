export class TeacherFilterModel {
  name: string;
  surname: string;
  phone: string;
  isAdmin: boolean;

  constructor(init?: Partial<TeacherFilterModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
