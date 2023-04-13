import {TeacherFilterModel} from "../../models/teacher-filter.model";

export class LoadTeachers {
  static readonly type = '[Teacher] Search';

  constructor(public filterModel: TeacherFilterModel) {
  }
}
