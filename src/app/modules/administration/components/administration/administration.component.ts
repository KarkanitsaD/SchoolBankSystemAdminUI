import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';
import { Store } from '@ngxs/store';
import { Subscription, filter } from 'rxjs';
import { ObserverComponent } from 'src/app/+shared/components/observer/observer.component';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
})
export class AdministrationComponent extends ObserverComponent {
  links = ['Ученики', 'Учителя', 'Вознаграждения', 'Сертификаты', 'Классы'];
  activeLink = this.links[0];

  constructor(
    private store: Store,
    private router: Router
  ) {
    super();
    this.subscriptions.push(this.activeTabSubscription());
  }

  onNavigate(index: number): void {
    this.activeLink = this.links[index];

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
      case 4:
        this.store.dispatch(new Navigate(['administration', 'classes']));
        break;
    }
  }

  private activeTabSubscription(): Subscription {
    return this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
      const url = (event as NavigationEnd).url;

      if (url.includes('students')) {
        this.activeLink = this.links[0];
      } else if (url.includes('teachers')) {
        this.activeLink = this.links[1];
      } else if (url.includes('rewards')) {
        this.activeLink = this.links[2];
      } else if (url.includes('certificates')) {
        this.activeLink = this.links[3];
      } else if (url.includes('classes')) {
        this.activeLink = this.links[4];
      }

    });
  }
}
