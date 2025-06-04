import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appCellTemplate]'
})
export class CellTemplateDirective {
  @Input('appCellTemplate') key: string;

  constructor(public templateRef: TemplateRef<any>) { }
}
