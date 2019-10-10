import { NgModule, ModuleWithProviders } from '@angular/core';
import {HttpUtilService} from './http.util.service';

const SERVICES = [
  HttpUtilService,
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
