import { StudentFilterModel } from "../../../+shared/models/student-filter.model";
import { StudentModel } from "../../../+shared/models/student.model";
import { RegisterModel } from "../../../+shared/models/register.model";

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

  constructor(public student: RegisterModel) {}
}
