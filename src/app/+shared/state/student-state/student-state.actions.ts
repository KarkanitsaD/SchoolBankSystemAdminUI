import {StudentFilterModel} from "../../models/student-filter.model";
import { StudentModel } from "../../models/student.model";

export class LoadStudents {
  static readonly type = '[Student] Search';

  constructor(public filterModel: StudentFilterModel) {}
}

export class UpdateStudent {
  static readonly type = '[Student] Update';

  constructor(public student: StudentModel) {}
}

export class DeleteStudent {
  static readonly type = '[Student] Delete';

  constructor(public id: string) {}
}

export class AddStudent {
  static readonly type = '[Student] Add';

  constructor(public student: StudentModel) {}
}
