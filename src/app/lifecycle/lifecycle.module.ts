import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifecycleRoutingModule } from './lifecycle-routing.module';
import { LifecycleComponent } from './pages/lifecycle/lifecycle.component';
import { SonComponent } from './components/son/son.component';


@NgModule({
  declarations: [
    LifecycleComponent,
    SonComponent
  ],
  imports: [
    CommonModule,
    LifecycleRoutingModule
  ]
})
export class LifecycleModule { }
