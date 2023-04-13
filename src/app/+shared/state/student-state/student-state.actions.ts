import {StudentFilterModel} from "../../models/student-filter.model";

export class LoadStudents {
  static readonly type = '[Student] Search';

  constructor(public filterModel: StudentFilterModel) {}
}
