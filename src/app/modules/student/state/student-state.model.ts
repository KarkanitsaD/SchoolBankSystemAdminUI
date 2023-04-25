import { StudentModel } from "../../../+shared/models/student.model";

export interface StudentStateModel {
  students: StudentModel[],
  student: StudentModel
}
