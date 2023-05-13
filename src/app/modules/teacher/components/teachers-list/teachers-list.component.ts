import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherModel } from '../../../../+shared/models/teacher.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { ObserverComponent } from '../../../../+shared/components/observer/observer.component';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { TeacherFilterModel } from '../../../../+shared/models/teacher-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/+shared/components/confirmation-dialog/confirmation-dialog.component';
import { TeacherComponent } from '../teacher/teacher.component';
import {
  AddTeacher,
  ClearTeachers,
  DeleteTeacher,
  LoadTeachers,
  UpdateTeacher
} from "../../state/teacher-state.actions";
import { TeacherState } from "../../state/teacher.state";

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss', '../../../../+shared/styles/list.scss'],
})
export class TeachersListComponent extends ObserverComponent implements OnInit {
  teacherColumns: string[] = ['name', 'surname', 'phone', 'actions'];
  dataSource: MatTableDataSource<TeacherModel>;

  filterForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    phone: new FormControl<string>(''),
  });

  constructor(private store: Store, private dialog: MatDialog, private actions: Actions) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filterChangesSubscription(),
      this.listSubscription(),
      this.addSubscription(),
      this.updateSubscription()
    );
    this.loadData();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new ClearTeachers());
  }

  onAdd(): void {
    this.dialog.open(TeacherComponent);
  }

  onEdit(teacher: TeacherModel): void {
    this.dialog.open(TeacherComponent, { data: teacher });
  }

  onDelete(teacher: TeacherModel): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Вы уверны, что хотите удалить ученика ${teacher.name} ${teacher.surname}?`,
      })
      .afterClosed()
      .pipe(filter((x) => !!x))
      .subscribe(() => this.store.dispatch(new DeleteTeacher(teacher.id)));
  }

  private filterChangesSubscription(): Subscription {
    return this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe((x) => {
        const filterModel = new TeacherFilterModel(x);
        this.store.dispatch(new LoadTeachers(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(TeacherState.teachers).subscribe((x) => {
      this.dataSource = new MatTableDataSource<TeacherModel>(x);
    });
  }

  private addSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(AddTeacher)).subscribe(() => {
      this.loadData();
    });
  }

  private updateSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(UpdateTeacher)).subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    const formValue = this.filterForm.value;
    this.store.dispatch(new LoadTeachers(new TeacherFilterModel(formValue)));
  }
}
