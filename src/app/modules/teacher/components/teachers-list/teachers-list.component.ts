import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherModel } from '../../../../+shared/models/teacher.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ObserverComponent } from '../../../../+shared/components/observer/observer.component';
import { debounceTime, distinctUntilChanged, filter, Subscription } from 'rxjs';
import { LoadTeachers } from '../../../../+shared/state/teacher-state/teacher-state.actions';
import { TeacherState } from '../../../../+shared/state/teacher-state/teacher.state';
import { TeacherFilterModel } from '../../../../+shared/models/teacher-filter.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/+shared/components/confirmation-dialog/confirmation-dialog.component';
import { TeacherComponent } from '../teacher/teacher.component';

@Component({
  selector: 'app-teachers-list',
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss'],
})
export class TeachersListComponent extends ObserverComponent implements OnInit {
  teacherColumns: string[] = ['name', 'surname', 'phone', 'actions'];
  dataSource: MatTableDataSource<TeacherModel>;

  filterForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    phone: new FormControl<string>(''),
  });

  constructor(private store: Store, private dialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filterChangesSubscription(),
      this.listSubscription()
    );
    this.store.dispatch(new LoadTeachers(this.filterForm.value));
  }

  onAddTeacher(): void {
    this.dialog.open(TeacherComponent)
      .afterClosed()
      .subscribe();
  }

  onDelete(teacher: TeacherModel): void {
    this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Вы уверны, что хотите удалить ученика ${teacher.name} ${teacher.surname}?`,
      })
      .afterClosed()
      .pipe(filter((x) => !!x))
      .subscribe();
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
}