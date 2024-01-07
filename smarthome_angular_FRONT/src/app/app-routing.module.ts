import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListAppareilComponent } from './pages/list-appareil/list-appareil.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome',component: WelcomeComponent },
//  {path: 'appareil', loadChildren: ()=>import('./pages/list-appareil/list-appareil.component').then(m=>m.ListAppareilComponent)}
 {path: 'appareil', component: ListAppareilComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
