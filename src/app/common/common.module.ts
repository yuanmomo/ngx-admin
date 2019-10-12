import { NgModule, ModuleWithProviders } from '@angular/core';
import {HttpUtilService} from './http.util.service';
import {ToastUtilService} from './toast.util';
import {LoadUtilService} from './load.util';

const SERVICES = [
  HttpUtilService,
  ToastUtilService,
  LoadUtilService,
];

@NgModule({
  imports: [ ],
  providers: [
    ...SERVICES,
  ],
})
export class CommonModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
