import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CertificateStateModel } from './certificate-state.model';
import { inject } from '@angular/core';
import {
  AddCertificate, ClearCertificates,
  DeleteCertificate,
  LoadCertificates,
  UpdateCertificate,
} from './certificate-state.actions';
import { Observable, tap } from 'rxjs';
import { patch, removeItem } from '@ngxs/store/operators';
import { CertificateModel } from "../../../+shared/models/certificate.model";
import { CertificateApiService } from "../../../+shared/services/certificate-api.service";

@State<CertificateStateModel>({
  name: 'certificate',
  defaults: {
    certificates: [],
    certificate: null,
  },
})
export class CertificateState {
  private apiService = inject(CertificateApiService);

  @Selector()
  static certificates(state: CertificateStateModel): CertificateModel[] {
    return state.certificates;
  }

  @Action(LoadCertificates)
  loadCertificates(
    ctx: StateContext<CertificateStateModel>,
    action: LoadCertificates
  ): Observable<CertificateModel[]> {
    return this.apiService.getCertificateList(action.filterModel).pipe(
      tap((x) => {
        ctx.patchState({
          certificates: x,
        });
      })
    );
  }

  @Action(ClearCertificates)
  clearCertificates(ctx: StateContext<CertificateStateModel>): void {
    ctx.patchState({
      certificates: []
    });
  }

  @Action(AddCertificate)
  addCertificate(
    ctx: StateContext<CertificateStateModel>,
    action: AddCertificate
  ): Observable<CertificateModel> {
    return this.apiService.addCertificate(action.model);
  }

  @Action(UpdateCertificate)
  updateCertificate(
    ctx: StateContext<CertificateStateModel>,
    action: AddCertificate
  ): Observable<CertificateModel> {
    return this.apiService.updateCertificate(action.model);
  }

  @Action(DeleteCertificate)
  DeleteCertificate(
    ctx: StateContext<CertificateStateModel>,
    action: DeleteCertificate
  ): Observable<any> {
    return this.apiService.deleteCertificate(action.id).pipe(
      tap(() => {
        ctx.setState(
          patch<CertificateStateModel>({
            certificates: removeItem<CertificateModel>(
              (x) => x.id === action.id
            ),
          })
        );
      })
    );
  }
}
