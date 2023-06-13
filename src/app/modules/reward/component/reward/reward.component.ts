import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RewardModel } from 'src/app/+shared/models/reward.model';
import { AddReward, UpdateReward } from "../../state/reward-state.actions";

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss', '../../../../+shared/styles/model.scss']
})
export class RewardComponent implements OnInit {
  rewardForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<RewardComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: RewardModel,
  ) {}

  ngOnInit(): void {
    this.rewardForm = new FormGroup({
      description: new FormControl<string>(this.data ? this.data.description : '', Validators.required),
      sum: new FormControl<number>(this.data ? this.data.sum : null, [Validators.required, Validators.min(0)])
    });
  }

  onApply(): void {
    const formValue = this.rewardForm.value;
    const reward = new RewardModel(formValue);
    if (this.data) {
      reward.id = this.data.id;
      this.store.dispatch(new UpdateReward(reward));
    } else {
      this.store.dispatch(new AddReward(reward));
    }
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
