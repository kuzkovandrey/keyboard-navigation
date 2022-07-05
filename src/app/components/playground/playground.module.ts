import { NavigationModule } from './../../navigation/navigation.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PlaygroundComponent } from './playground.component';

@NgModule({
  imports: [CommonModule, NavigationModule],
  declarations: [PlaygroundComponent],
  exports: [PlaygroundComponent],
})
export class PlaygroundModule {}
