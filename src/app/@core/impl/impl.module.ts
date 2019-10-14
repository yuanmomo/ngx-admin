import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from './users.service';
import {FileListService} from './file.list.service';

const SERVICES = [
  UserService,
  FileListService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ImplModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ImplModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
