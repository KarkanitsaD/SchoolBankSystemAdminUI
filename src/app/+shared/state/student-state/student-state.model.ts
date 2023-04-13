import {StudentModel} from "../../models/student.model";

export interface StudentStateModel {
  students: StudentModel[],
  student: StudentModel
}
