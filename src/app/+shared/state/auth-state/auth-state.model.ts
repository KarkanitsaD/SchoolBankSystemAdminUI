import {TeacherModel} from "../../models/teacher.model";

export interface AuthStateModel {
  teacher: TeacherModel;
  jwt: string;
}
