import { Action, Selector, State, StateContext } from '@ngxs/store';
import { StudentStateModel } from './student-state.model';
import { AddStudent, DeleteStudent, LoadStudents, UpdateStudent } from './student-state.actions';
import { Observable, tap } from 'rxjs';
import { inject } from '@angular/core';
import { patch, removeItem } from '@ngxs/store/operators';
import { StudentModel } from "../../../+shared/models/student.model";
import { StudentApiService } from "../../../+shared/services/student-api.service";

@State<StudentStateModel>({
  name: 'student',
  defaults: {
    students: [],
    student: null,
  },
})
export class StudentState {
  private apiService = inject(StudentApiService);

  @Selector()
  static students(state: StudentStateModel): StudentModel[] {
    return state.students;
  }

  @Action(LoadStudents)
  loadStudents(
    ctx: StateContext<StudentStateModel>,
    action: LoadStudents
  ): Observable<StudentModel[]> {
    return this.apiService.getStudentList(action.filterModel).pipe(
      tap((x) => {
        ctx.patchState({
          students: x,
        });
      })
    );
  }

  @Action(DeleteStudent)
  deleteStudent(
    ctx: StateContext<StudentStateModel>,
    action: DeleteStudent
  ): Observable<any> {
    return this.apiService.deleteStudent(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch<StudentStateModel>({
            students: removeItem<StudentModel>((x) => x.id === action.id),
          })
        );
      })
    );
  }

  @Action(UpdateStudent)
  updateStudent(
    _: StateContext<StudentStateModel>,
    action: UpdateStudent
  ): Observable<any> {
    return this.apiService.updateStudent(action.student);
  }

  @Action(AddStudent)
  addTeacher(
    _: StateContext<StudentStateModel>,
    action: AddStudent
  ): Observable<any> {
    return this.apiService.addTeacher(action.student);
  }
}
