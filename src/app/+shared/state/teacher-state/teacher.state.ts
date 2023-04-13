import {Action, Selector, State, StateContext} from "@ngxs/store";
import {TeacherStateModel} from "./teacher-state.model";
import {inject} from "@angular/core";
import {TeacherApiService} from "../../services/teacher-api.service";
import {TeacherModel} from "../../models/teacher.model";
import {LoadTeachers} from "./teacher-state.actions";
import {Observable, tap} from "rxjs";

@State<TeacherStateModel>({
  name: 'teacher',
  defaults: {
    teachers: [],
    teacher: null
  }
})
export class TeacherState {
  private apiService = inject(TeacherApiService);

  @Selector()
  static teachers(state: TeacherStateModel): TeacherModel[] {
    return state.teachers;
  }

  @Action(LoadTeachers)
  loadStudents(ctx: StateContext<TeacherStateModel>, action: LoadTeachers): Observable<TeacherModel[]> {
    return this.apiService.getTeacherList(action.filterModel)
      .pipe(tap(x => {
        ctx.patchState({
          teachers: x
        })
      }));
  }
}
