import {TeacherModel} from "../../models/teacher.model";

export interface TeacherStateModel {
  teachers: TeacherModel[];
  teacher: TeacherModel;
}
