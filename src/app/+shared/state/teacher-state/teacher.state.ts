import { Action, Selector, State, StateContext } from '@ngxs/store';
import { TeacherStateModel } from './teacher-state.model';
import { inject } from '@angular/core';
import { TeacherApiService } from '../../services/teacher-api.service';
import { TeacherModel } from '../../models/teacher.model';
import {
  AddTeacher,
  DeleteTeacher,
  LoadTeachers,
  UpdateTeacher,
} from './teacher-state.actions';
import { Observable, tap } from 'rxjs';
import { patch, removeItem } from '@ngxs/store/operators';
import { RegisterModel } from '../../models/register.model';

@State<TeacherStateModel>({
  name: 'teacher',
  defaults: {
    teachers: [],
    teacher: null,
  },
})
export class TeacherState {
  private apiService = inject(TeacherApiService);

  @Selector()
  static teachers(state: TeacherStateModel): TeacherModel[] {
    return state.teachers;
  }

  @Action(LoadTeachers)
  loadStudents(
    ctx: StateContext<TeacherStateModel>,
    action: LoadTeachers
  ): Observable<TeacherModel[]> {
    return this.apiService.getTeacherList(action.filterModel).pipe(
      tap((x) => {
        ctx.patchState({
          teachers: x,
        });
      })
    );
  }

  @Action(DeleteTeacher)
  deleteTeacher(
    ctx: StateContext<TeacherStateModel>,
    action: DeleteTeacher
  ): Observable<any> {
    return this.apiService.deleteTeacher(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch<TeacherStateModel>({
            teachers: removeItem<TeacherModel>((x) => x.id === action.id),
          })
        );
      })
    );
  }

  @Action(UpdateTeacher)
  updateTeacher(
    _: StateContext<TeacherStateModel>,
    action: UpdateTeacher
  ): Observable<any> {
    return this.apiService.updateTeacher(action.teacher);
  }

  @Action(AddTeacher)
  addTeacher(
    _: StateContext<TeacherStateModel>,
    action: AddTeacher
  ): Observable<any> {
    return this.apiService.addTeacher(action.teacher);
  }
}
