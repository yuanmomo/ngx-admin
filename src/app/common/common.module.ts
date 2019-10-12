import { NgModule, ModuleWithProviders } from '@angular/core';
import {HttpUtilService} from './http.util.service';
import {ToastUtilService} from './toast.util';

const SERVICES = [
  HttpUtilService,
  ToastUtilService,
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
