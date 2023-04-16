import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Actions, Store, ofActionCompleted } from "@ngxs/store";
import { Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { ObserverComponent } from "src/app/+shared/components/observer/observer.component";
import { CertificateFilterModel } from "src/app/+shared/models/certificate-filter.model";
import { CertificateModel } from "src/app/+shared/models/certificate.model";
import { AddCertificate, LoadCertificates, UpdateCertificate } from "src/app/+shared/state/certificate-state/certificate-state.actions";
import { CertificateState } from "src/app/+shared/state/certificate-state/certificate.state";
import { CertificateComponent } from "../certificate/certificate.component";

@Component({
    selector: 'app-certificates-list',
    templateUrl: './certificates-list.component.html',
    styleUrls: ['./certificates-list.component.scss']
})
export class CertificatesListComponent extends ObserverComponent implements OnInit {
    certificateColumns: string[] = ['title', 'description', 'price', 'actions'];
    dataSource: MatTableDataSource<CertificateModel>;

    filterForm: FormGroup = new FormGroup({
        title: new FormControl<string>(''),
        description: new FormControl<string>(''),
        minPrice: new FormControl<number>(null),
        maxPrice: new FormControl<number>(null)
    });

    constructor(private store: Store, private dialog: MatDialog, private actions: Actions) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.push(
          this.filterChangesSubscription(), 
          this.listSubscription(),
          this.updateSubscription(),
          this.addSubscription()
        );
        this.store.dispatch(new LoadCertificates(this.filterForm.value));
    }

    onEdit(model: CertificateModel): void {
      this.dialog.open(CertificateComponent, { data: model });
    }

    onAdd(): void {
      this.dialog.open(CertificateComponent);
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
            const filterModel = new CertificateFilterModel(x);
            this.store.dispatch(new LoadCertificates(filterModel));
          });
      }

      private listSubscription(): Subscription {
        return this.store.select(CertificateState.certificates).subscribe(x => {
          this.dataSource = new MatTableDataSource<CertificateModel>(x);
        });
      }

      private addSubscription(): Subscription {
        return this.actions.pipe(ofActionCompleted(AddCertificate)).subscribe(() => {
          this.loadData();
        });
      }

      private updateSubscription(): Subscription {
        return this.actions.pipe(ofActionCompleted(UpdateCertificate)).subscribe(() => {
          this.loadData();
        });
      }

      private loadData(): void {
        const formValue = this.filterForm.value;
        this.store.dispatch(new LoadCertificates(new CertificateFilterModel(formValue)))
      }
}