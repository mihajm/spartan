import { Directive, effect, ElementRef, HostBinding, inject, Input, Renderer2 } from '@angular/core';
import { hlm } from '@spartan-ng/ui-core-helm';
import { ClassValue } from 'clsx';
import { EXPOSES_STATE_TOKEN } from '@spartan-ng/ui-core-brain';

@Directive({
  selector: '[hlmPopoverContent],[brnPopoverContent][hlm]',
  standalone: true,
})
export class HlmPopoverContentDirective {
  private _inputs: ClassValue = '';
  private _statusProvider = inject(EXPOSES_STATE_TOKEN, { host: true });
  public state = this._statusProvider.state;
  private _renderer = inject(Renderer2);
  private _element = inject(ElementRef);

  constructor() {
    effect(() => {
      this._renderer.setAttribute(this._element.nativeElement, 'data-state', this.state());
    });
  }

  @HostBinding('class')
  _class = this.generateClasses();
  @Input()
  set class(inputs: ClassValue) {
    this._inputs = inputs;
    this._class = this.generateClasses();
  }

  private generateClasses() {
    return hlm(
      'relative border-border w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      this._inputs
    );
  }
}
