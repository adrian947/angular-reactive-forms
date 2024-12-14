import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';

const routes: Routes = [
  {
    path: '',
    component: LifecycleComponent,
  },
  { path: '**', redirectTo: 'sign-up' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifecycleRoutingModule {}
