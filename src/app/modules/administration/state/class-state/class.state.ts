import { Action, Selector, State, StateContext } from "@ngxs/store";
import { ClassStateModel } from "./class-state.model";
import { ClassModel } from "src/app/+shared/models/class.model";
import { AddClass, DeleteClass, LoadClasses, UpdateClass } from "./class-state.actions";
import { Observable, tap } from "rxjs";
import { ClassApiService } from "src/app/+shared/services/class-api.service";
import { inject } from "@angular/core";
import { patch, removeItem } from "@ngxs/store/operators";

@State<ClassStateModel>({
  name: 'class',
  defaults: {
    classes: []
  }  
})
export class ClassState {
    private apiService = inject(ClassApiService);

    @Selector()
    static classes(state: ClassStateModel): ClassModel[] {
        return state.classes;
    }

    @Action(LoadClasses)
    loadClasses(ctx: StateContext<ClassStateModel>): Observable<ClassModel[]> {
        return this.apiService.getClassesList().pipe(
            tap((x) => {
                ctx.patchState({
                    classes: x
                });
            })
        );
    }

    @Action(DeleteClass)
    deleteClass(ctx: StateContext<ClassStateModel>, { payload }: DeleteClass): Observable<any> {
        return this.apiService.deleteClass(payload).pipe(
            tap(() => {
                ctx.setState(
                    patch<ClassStateModel>({
                        classes: removeItem<ClassModel>(x => x.id === payload)
                    })
                );
            })
        );
    }

    @Action(UpdateClass)
    updateClass(ctx: StateContext<ClassStateModel>, action: UpdateClass): Observable<ClassModel> {
        return this.apiService.updateClass(action.payload);
    }

    @Action(AddClass)
    addClass(ctx: StateContext<ClassStateModel>, action: AddClass): Observable<ClassModel> {
        return this.apiService.addClass(action.payload);
    }
}