import {Directive, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Directive()
export class ObserverComponent implements OnDestroy {
  protected subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => x.unsubscribe());
  }
}
