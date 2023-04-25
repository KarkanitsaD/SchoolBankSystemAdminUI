import { TeacherFilterModel } from "../../../+shared/models/teacher-filter.model";
import { TeacherModel } from "../../../+shared/models/teacher.model";
import { RegisterModel } from "../../../+shared/models/register.model";

export class LoadTeachers {
  static readonly type = '[Teacher] Search';

  constructor(public filterModel: TeacherFilterModel) {}
}

export class UpdateTeacher {
  static readonly type = '[Teacher] Update';

  constructor(public teacher: TeacherModel) {}
}

export class DeleteTeacher {
  static readonly type = '[Teacher] Delete';

  constructor(public id: string) {}
}

export class AddTeacher {
  static readonly type = '[Teacher] Add';

  constructor(public teacher: RegisterModel) {}
}