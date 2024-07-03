import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAllowNumber]'
})
export class AllowNumberDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputText = this.el.nativeElement.value;
    const alphaOnlyText = inputText.replace(/[^0-9]/g, '');
    this.renderer.setProperty(this.el.nativeElement, 'value', alphaOnlyText);
  }
}