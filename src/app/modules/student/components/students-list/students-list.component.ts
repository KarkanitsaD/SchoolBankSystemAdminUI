import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StudentModel } from '../../../../+shared/models/student.model';
import { FormControl, FormGroup } from '@angular/forms';
import { ObserverComponent } from '../../../../+shared/components/observer/observer.component';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { StudentFilterModel } from '../../../../+shared/models/student-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/+shared/components/confirmation-dialog/confirmation-dialog.component';
import { StudentComponent } from '../student/student.component';
import {
  AddStudent,
  ClearStudents,
  DeleteStudent,
  LoadStudents,
  UpdateStudent
} from "../../state/student-state.actions";
import { StudentState } from "../../state/student.state";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss'],
})
export class StudentsListComponent extends ObserverComponent implements OnInit {
  studentColumns: string[] = ['name', 'surname', 'phone', 'sum', 'actions'];
  dataSource: MatTableDataSource<StudentModel>;

  filterForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    minSum: new FormControl<number>(null),
    maxSum: new FormControl<number>(null),
  });

  constructor(
    private store: Store,
    private actions: Actions,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filterChangesSubscription(),
      this.listSubscription(),
      this.addSubscription(),
      this.updateSubscription()
    );
    this.store.dispatch(new LoadStudents(this.filterForm.value));
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new ClearStudents());
  }

  onAdd(): void {
    this.dialog.open(StudentComponent);
  }

  onEdit(student: StudentModel): void {
    this.dialog.open(StudentComponent, { data: student });
  }

  onDelete(student: StudentModel): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Вы уверены, что хотите удалить ${student.name} ${student.surname}?`,
      })
      .afterClosed()
      .pipe(filter((x) => !!x))
      .subscribe(() => this.store.dispatch(new DeleteStudent(student.id)));
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
        const filterModel = new StudentFilterModel(x);
        this.store.dispatch(new LoadStudents(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(StudentState.students).subscribe((x) => {
      this.dataSource = new MatTableDataSource<StudentModel>(x);
    });
  }

  private addSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(AddStudent)).subscribe(() => {
      this.loadData();
    });
  }

  private updateSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(UpdateStudent)).subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    const formValue = this.filterForm.value;
    this.store.dispatch(new LoadStudents(new StudentFilterModel(formValue)));
  }
}