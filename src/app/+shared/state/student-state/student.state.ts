import {Action, Selector, State, StateContext} from "@ngxs/store";
import {StudentStateModel} from "./student-state.model";
import {StudentApiService} from "../../services/student-api.service";
import {LoadStudents} from "./student-state.actions";
import {Observable, tap} from "rxjs";
import {StudentModel} from "../../models/student.model";
import {inject} from "@angular/core";

@State<StudentStateModel>({
  name: 'student',
  defaults: {
    students: [],
    student: null
  }
})
export class StudentState {
  private apiService = inject(StudentApiService);

  @Selector()
  static students(state: StudentStateModel): StudentModel[] {
    return state.students;
  }

  @Action(LoadStudents)
  loadStudents(ctx: StateContext<StudentStateModel>, action: LoadStudents): Observable<StudentModel[]> {
    return this.apiService.getStudentList(action.filterModel)
      .pipe(tap(x => {
        ctx.patchState({
          students: x
        })
      }));
  }
}
