import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppareilService } from '../core/services/appareil.service';
import { AppareilModel } from '../core/model/appareil.model';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit, OnDestroy {
  @Input() label: string = "tel";
  @Input() description: string = "description"
  @Input() image: string = "assets/images/lamp.jpeg";

  listApp: AppareilModel[] = [];
  page: number = 0;
  size: number = 4;
  totalElement: number = 4;
  isLoading: boolean = true;
  switchValues: { [key: number]: boolean } = {};
  loadingStates: { [key: number]: boolean } = {};

  private subscriptions: Subscription[] = [];

  constructor(private appService: AppareilService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.fetchAppareil());
  }


  fetchAppareil(request?: any): Subscription {
    this.isLoading = true;
    return this.appService.getAppareils(request).pipe(
      finalize(() => this.isLoading = false),
      catchError((error) => {
        console.error('Error fetching listApp:', error);
        return [];
      })
    ).subscribe(
      (data: any) => {
        console.log('Fetched app:', data);
        this.listApp = data.content;
        this.totalElement = data.totalElements;
        console.log('listApp:', this.listApp);

        this.listApp.forEach((app) => {
          // this.switchValues[app.id] = app.state;
          this.switchValues[app?.id ?? -1] = app?.state ?? false;

        });
      }
    );
  }

  clickSwitch(id: number): void {
    if (!this.loadingStates[id]) {
      this.loadingStates[id] = true;
      setTimeout(() => {
        this.switchValues[id] = !this.switchValues[id];
        this.loadingStates[id] = false;
      }, 900);
    }

    const clickedApp = this.listApp.find((app) => app.id === id);

    if (clickedApp) {
      this.subscriptions.push(
        this.appService.switchApp(id).subscribe(
          (response) => {
            console.log('Switch response:', response);
            clickedApp.state = !clickedApp.state;
          },
          (error) => {
            console.error('Error switching appareil:', error);
          }
        )
      );
    }
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
