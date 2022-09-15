import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Intern } from './../../core/models/intern';
import { BubbleConfig } from './../config/bubble-config';

@Directive({
  selector: '[appInitials]',
})
export class InitialsDirective implements OnInit {
  @Input() public intern!: Intern | null;

  @Input() config: BubbleConfig = new BubbleConfig();

  private nativeElement: HTMLElement;

  private stylesMap: Map<string, string> = new Map<string, string>();

  constructor(private renderer: Renderer2, elementRef: ElementRef) {
    this.nativeElement = elementRef.nativeElement;

    // Sets styles as a Map
    this.stylesMap
      .set('height', '2em')
      .set('width', '2em')
      .set('line-height', '2em')
      .set('background-color', 'rgba(127, 127, 127, .7')
      .set('font-weight', 'bold')
      .set('border-radius', '50%')
      .set('vertical-align', 'middle')
      .set('text-align', 'center');
  }

  public ngOnInit(): void {
    //this.renderer.addClass(this.nativeElement, 'bubble');

    /** Styles from a Map
    this.stylesMap.forEach((value: string, key: string) => {
      this.renderer.setStyle(this.nativeElement, key, value)
    });
    */

    // Styles from object
    /*  const config: BubbleConfig = new BubbleConfig().deserialize(this.config);
    for (const property in this.config) {
      this.renderer.setStyle(
        this.nativeElement,
        property,
        this.config[property]
      );
    } */

    const initials: string =
      this.intern!.firstName!.charAt(0) + this.intern!.name!.charAt(0);

    this.nativeElement.innerText = initials;
    //this.renderer.createText(initials);
  }
}
