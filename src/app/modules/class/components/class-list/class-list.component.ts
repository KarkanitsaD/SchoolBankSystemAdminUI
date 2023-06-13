import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Actions, Store, ofActionCompleted } from "@ngxs/store";
import { Subscription, debounceTime, distinctUntilChanged, filter } from "rxjs";
import { ObserverComponent } from "src/app/+shared/components/observer/observer.component";
import { ClassModel } from "src/app/+shared/models/class.model";
import { AddClass, DeleteClass, LoadClasses, UpdateClass } from "src/app/modules/administration/state/class-state/class-state.actions";
import { ClassState } from "src/app/modules/administration/state/class-state/class.state";
import { ClassComponent } from "../class/class.component";
import { ConfirmationDialogComponent } from "src/app/+shared/components/confirmation-dialog/confirmation-dialog.component";

@Component({
    selector: 'app-class-list',
    templateUrl: './class-list.component.html',
    styleUrls: ['./class-list.component.scss', '../../../../+shared/styles/list.scss']
})
export class ClassListComponent extends ObserverComponent implements OnInit {
    classColumns: string[] = ['name', 'actions'];
    dataSource: MatTableDataSource<ClassModel>;

    filterControl = new FormControl<string>('');

    constructor(
        private store: Store,
        private actions: Actions,
        private dialog: MatDialog
    ) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.push(
            this.listSubscription(),
            this.addSubscription(),
            this.updateSubscription()
        );
        this.store.dispatch(new LoadClasses());   
    }

    onEdit(model: ClassModel): void {
        this.dialog.open(ClassComponent, { data: model });
      }
    
    onAdd(): void {
        this.dialog.open(ClassComponent);
    }

    onDelete(classModel: ClassModel): void {
      this.dialog
      .open(ConfirmationDialogComponent, {
        data: `Вы уверены, что хотите удалить ${classModel.name} класс?`,
      })
      .afterClosed()
      .pipe(filter((x) => !!x))
      .subscribe(() => this.store.dispatch(new DeleteClass(classModel.id)));
    }

    private listSubscription(): Subscription {
        return this.store.select(ClassState.classes).subscribe((x) => {
          this.dataSource = new MatTableDataSource<ClassModel>(x);
        });
    }

    private addSubscription(): Subscription {
        return this.actions
          .pipe(ofActionCompleted(AddClass))
          .subscribe(() => {
            this.loadData();
          });
      }
    
    private updateSubscription(): Subscription {
        return this.actions
          .pipe(ofActionCompleted(UpdateClass))
          .subscribe(() => {
            this.loadData();
          });
      }

    private loadData(): void {
        this.store.dispatch(new LoadClasses());
    }
}