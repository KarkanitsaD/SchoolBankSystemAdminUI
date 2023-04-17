import { Component } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent {
  constructor(private store: Store) {}

  onNavigate(index: number): void {
    switch (index) {
      case 0:
        this.store.dispatch(new Navigate(['administration', 'students']));
        break;
      case 1:
        this.store.dispatch(new Navigate(['administration', 'teachers']));
        break;
      case 2:
        this.store.dispatch(new Navigate(['administration', 'rewards']));
        break;
      case 3:
        this.store.dispatch(new Navigate(['administration', 'certificates']));
        break;
    }
  }
}
