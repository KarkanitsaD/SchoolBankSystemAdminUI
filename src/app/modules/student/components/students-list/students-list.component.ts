import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {StudentModel} from "../../../../+shared/models/student.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ObserverComponent} from "../../../../+shared/components/observer/observer.component";
import {debounceTime, distinctUntilChanged, Subscription} from "rxjs";
import {Actions, Store, ofActionCompleted} from "@ngxs/store";
import {StudentFilterModel} from "../../../../+shared/models/student-filter.model";
import {LoadStudents} from "../../../../+shared/state/student-state/student-state.actions";
import {StudentState} from "../../../../+shared/state/student-state/student.state";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent extends ObserverComponent implements OnInit {
  studentColumns: string[] = ['name', 'surname', 'phone', 'sum'];
  dataSource: MatTableDataSource<StudentModel>;

  filterForm: FormGroup = new FormGroup({
    name: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    minSum: new FormControl<number>(null),
    maxSum: new FormControl<number>(null)
  });

  constructor(
    private store: Store,
    private actions: Actions
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filterChangesSubscription(),
      this.listSubscription(),
      // this.addSubscription(),
      // this.updateSubscription()
    );
    this.store.dispatch(new LoadStudents(this.filterForm.value));
  }

  private filterChangesSubscription(): Subscription {
    return this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(
          (prev, curr) =>
            JSON.stringify(prev) === JSON.stringify(curr)
        )
      )
      .subscribe(x => {
        const filterModel = new StudentFilterModel(x);
        this.store.dispatch(new LoadStudents(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(StudentState.students).subscribe(x => {
      this.dataSource = new MatTableDataSource<StudentModel>(x);
    });
  }

  private addSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(null)).subscribe(() => {
      this.loadData();
    });
  }

  private updateSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(null)).subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    const formValue = this.filterForm.value;
    this.store.dispatch(new LoadStudents(new StudentFilterModel(formValue)))
  }
}

