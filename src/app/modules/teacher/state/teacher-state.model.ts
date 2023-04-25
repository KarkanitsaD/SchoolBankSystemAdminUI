import { TeacherModel } from "../../../+shared/models/teacher.model";

export interface TeacherStateModel {
  teachers: TeacherModel[];
  teacher: TeacherModel;
}
