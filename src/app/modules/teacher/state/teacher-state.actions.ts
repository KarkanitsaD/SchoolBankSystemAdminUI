import { TeacherFilterModel } from "../../../+shared/models/teacher-filter.model";
import { TeacherModel } from "../../../+shared/models/teacher.model";
import { RegisterModel } from "../../../+shared/models/register.model";

export class LoadTeachers {
  static readonly type = '[Teacher] Search teachers';

  constructor(public filterModel: TeacherFilterModel) {}
}

export class ClearTeachers {
  static readonly type = '[Teacher] Clear teachers';
}

export class UpdateTeacher {
  static readonly type = '[Teacher] Update teacher';

  constructor(public teacher: TeacherModel) {}
}

export class DeleteTeacher {
  static readonly type = '[Teacher] Delete teacher';

  constructor(public id: string) {}
}

export class AddTeacher {
  static readonly type = '[Teacher] Add teacher';

  constructor(public teacher: RegisterModel) {}
}