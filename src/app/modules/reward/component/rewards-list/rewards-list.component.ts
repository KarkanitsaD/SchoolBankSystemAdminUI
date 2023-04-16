import { Component, OnInit } from '@angular/core';
import { ObserverComponent } from '../../../../+shared/components/observer/observer.component';
import { Actions, Store, ofActionCompleted } from '@ngxs/store';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { RewardModel } from '../../../../+shared/models/reward.model';
import { RewardState } from '../../../../+shared/state/reward-state/reward.state';
import { RewardFilterModel } from '../../../../+shared/models/reward-filter.model';
import {
  AddReward,
  LoadRewards,
  UpdateReward,
} from '../../../../+shared/state/reward-state/reward-state.actions';
import { MatDialog } from '@angular/material/dialog';
import { RewardComponent } from '../reward/reward.component';

@Component({
  selector: 'app-rewards-list',
  templateUrl: './rewards-list.component.html',
  styleUrls: ['./rewards-list.component.scss'],
})
export class RewardsListComponent extends ObserverComponent implements OnInit {
  rewardColumns: string[] = ['description', 'sum', 'actions'];
  dataSource: MatTableDataSource<RewardModel>;

  filterForm: FormGroup = new FormGroup({
    description: new FormControl<string>(''),
    minSum: new FormControl<number>(null),
    maxSum: new FormControl<number>(null),
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
      this.addSubscription(),
      this.updateSubscription()
    );
    this.store.dispatch(new LoadRewards(this.filterForm.value));
  }

  onUpdate(reward: RewardModel): void {
    this.dialog
      .open(RewardComponent, { data: reward })
      .afterClosed()
      .subscribe(() => {
        const formData = this.filterForm.value;
        const filterModel = new RewardFilterModel(formData);
        this.store.dispatch(new LoadRewards(filterModel));
      });
  }

  onAdd(): void {
    this.dialog
      .open(RewardComponent)
      .afterClosed()
      .subscribe(() => {
        const formData = this.filterForm.value;
        const filterModel = new RewardFilterModel(formData);
        this.store.dispatch(new LoadRewards(filterModel));
      });
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
        const filterModel = new RewardFilterModel(x);
        this.store.dispatch(new LoadRewards(filterModel));
      });
  }

  private listSubscription(): Subscription {
    return this.store.select(RewardState.rewards).subscribe((x) => {
      this.dataSource = new MatTableDataSource<RewardModel>(x);
    });
  }

  private addSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(AddReward)).subscribe(() => {
      this.loadData();
    });
  }

  private updateSubscription(): Subscription {
    return this.actions.pipe(ofActionCompleted(UpdateReward)).subscribe(() => {
      this.loadData();
    });
  }

  private loadData(): void {
    const formValue = this.filterForm.value;
    this.store.dispatch(new LoadRewards(new RewardFilterModel(formValue)));
  }
}
