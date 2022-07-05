import { NavigationGridDirective } from './directives/navigation-grid.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusableDirective } from './directives/focusable.directive';
import { DefaultFocusDirective } from './directives/default-focus.directive';
import { FocusService } from './services/focus.service';

@NgModule({
  imports: [CommonModule],
  exports: [FocusableDirective, NavigationGridDirective, DefaultFocusDirective],
  declarations: [
    FocusableDirective,
    NavigationGridDirective,
    DefaultFocusDirective,
  ],
  providers: [FocusService],
})
export class NavigationModule {}
