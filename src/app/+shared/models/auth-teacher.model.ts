import {TeacherModel} from "./teacher.model";

export class AuthTeacherModel {
  jwt: string;
  teacher: TeacherModel;

  public constructor(init?: Partial<AuthTeacherModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
