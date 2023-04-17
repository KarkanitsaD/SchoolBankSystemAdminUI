import { RegisterModel } from '../../models/register.model';
import { TeacherFilterModel } from '../../models/teacher-filter.model';
import { TeacherModel } from '../../models/teacher.model';

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