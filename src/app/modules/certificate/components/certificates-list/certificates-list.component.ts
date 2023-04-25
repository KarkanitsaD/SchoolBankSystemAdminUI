import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { ObserverComponent } from 'src/app/+shared/components/observer/observer.component';
import { CertificateFilterModel } from 'src/app/+shared/models/certificate-filter.model';
import { CertificateModel } from 'src/app/+shared/models/certificate.model';
import { CertificateComponent } from '../certificate/certificate.component';
import { ConfirmationDialogComponent } from 'src/app/+shared/components/confirmation-dialog/confirmation-dialog.component';
import {
  AddCertificate,
  DeleteCertificate,
  LoadCertificates,
  UpdateCertificate
} from "../../state/certificate-state.actions";
import { CertificateState } from "../../state/certificate.state";

@Component({
  selector: 'app-certificates-list',
  templateUrl: './certificates-list.component.html',
  styleUrls: ['./certificates-list.component.scss'],
})
export class CertificatesListComponent
  extends ObserverComponent
  implements OnInit
{
  certificateColumns: string[] = ['title', 'description', 'price', 'actions'];
  dataSource: MatTableDataSource<CertificateModel>;

  filterForm: FormGroup = new FormGroup({
    title: new FormControl<string>(''),
    description: new FormControl<string>(''),
    minPrice: new FormControl<number>(null, Validators.min(0)),
    maxPrice: new FormControl<number>(null, Validators.min(0)),
  });

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private actions: Actions
  ) {
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

  onDelete(certificate: CertificateModel): void {
    this.dialog.open(ConfirmationDialogComponent, {
      data: `Вы уверены, что хотите удалить сертификат ${certificate.title}?`,
    })
    .afterClosed()
    .pipe(filter(x => !!x))
    .subscribe(() => this.store.dispatch(new DeleteCertificate(certificate.id)));
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
        const filterModel = new CertificateFilterModel(x);
        this.store.dispatch(new LoadCertificates(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(CertificateState.certificates).subscribe((x) => {
      this.dataSource = new MatTableDataSource<CertificateModel>(x);
    });
  }

  private addSubscription(): Subscription {
    return this.actions
      .pipe(ofActionCompleted(AddCertificate))
      .subscribe(() => {
        this.loadData();
      });
  }

  private updateSubscription(): Subscription {
    return this.actions
      .pipe(ofActionCompleted(UpdateCertificate))
      .subscribe(() => {
        this.loadData();
      });
  }

  private loadData(): void {
    const formValue = this.filterForm.value;
    this.store.dispatch(
      new LoadCertificates(new CertificateFilterModel(formValue))
    );
  }
}
