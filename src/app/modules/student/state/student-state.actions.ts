import { StudentFilterModel } from "../../../+shared/models/student-filter.model";
import { StudentModel } from "../../../+shared/models/student.model";
import { RegisterModel } from "../../../+shared/models/register.model";

export class LoadStudents {
  static readonly type = '[Student] Search students';

  constructor(public filterModel: StudentFilterModel) {}
}

export class ClearStudents {
  static readonly type = '[Student] Clear students';
}

export class UpdateStudent {
  static readonly type = '[Student] Update student';

  constructor(public student: StudentModel) {}
}

export class DeleteStudent {
  static readonly type = '[Student] Delete student';

  constructor(public id: string) {}
}

export class AddStudent {
  static readonly type = '[Student] Add student';

  constructor(public student: RegisterModel) {}
}
