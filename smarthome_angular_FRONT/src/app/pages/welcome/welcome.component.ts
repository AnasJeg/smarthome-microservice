import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, catchError, finalize } from 'rxjs';
import { Observable } from 'rxjs';
import { AppareilModel } from 'src/app/core/model/appareil.model';
import { AppareilService } from 'src/app/core/services/appareil.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  @Input() label: string = "tel";
  @Input() description: string = "description";
  @Input() image: string = "assets/images/lamp.jpeg";
  listApp: AppareilModel[] = [];
  page: number = 1;
  size: number = 4;
  totalElement: number = 20;
  switchValues: { [key: number]: boolean } = {};
  loadingStates: { [key: number]: boolean } = {};
  data$: Observable<any> | undefined;

  private subscriptions: Subscription[] = [];
  isLoading: boolean = false;

  constructor(private appService: AppareilService) { }

  ngOnInit(): void {
    this.fetchAppareil();
  }

  fetchAppareil(): void {
    this.data$ = this.appService.getAppareils({ page: this.page, size: this.size }).pipe(
      finalize(() => this.isLoading = false),
      catchError((error) => {
        console.error('Error fetching listApp:', error);
        return [];
      })
    );
    this.subscriptions.push(
      this.data$.subscribe(
        (data: any) => {
          console.log('Fetched app:', data);
          this.listApp = data.content;
          this.totalElement = data.totalElements;    
          console.log("data.totalElements", data.totalElements);
          
          this.listApp.forEach((app) => {
            this.switchValues[app?.id ?? -1] = app?.state ?? false;
          });
        }
      )
    );
  }

  trackByAppareilId(index: number, item: AppareilModel): number {
    return item.id ?? -1;
  }

  pageChange(pageIndex: number): void {
    console.log('Page changed to:', pageIndex);
    this.page = pageIndex + 1;
    this.fetchAppareil();
  }
  

  getCurrentPageItems(): AppareilModel[] {
    const startIndex = (this.page - 1) * this.size;
    const endIndex = startIndex + this.size;
    return this.listApp.slice(startIndex, endIndex);
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
  switchAll(index: number): void {
    this.subscriptions.push(
      this.appService.switchAll(index).subscribe(
        (response: AppareilModel[]) => {
          console.log('Switch All response:', response);
          this.listApp.forEach((app) => {
            app.state = index === 1; 
            this.switchValues[app.id ?? -1] = app.state;
          });
        },
        (error) => {
          console.error('Error switching All appareil:', error);
        }
      )
    );
  }
  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
