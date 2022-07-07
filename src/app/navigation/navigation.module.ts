import { NavigationGridDirective } from './directives/navigation-grid.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FocusableDirective } from './directives/focusable.directive';
import { DefaultFocusDirective } from './directives/default-focus.directive';
import { NavigationWrapperDirective } from './directives/navigation-wrapper.directive';

@NgModule({
  imports: [CommonModule],
  exports: [
    FocusableDirective,
    NavigationGridDirective,
    DefaultFocusDirective,
    NavigationWrapperDirective,
  ],
  declarations: [
    FocusableDirective,
    NavigationGridDirective,
    DefaultFocusDirective,
    NavigationWrapperDirective,
  ],
})
export class NavigationModule {}
