import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-parts-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class PartsIconComponent {

  @Input() icon: string;
  @Input() info: boolean;
  @Input() warning: boolean;
  @Input() success: boolean;
  @Input() danger: boolean;

  constructor() { }
}
