import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-material-card',
  templateUrl: './material-card.component.html',
  styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent {
  @Input() title!: string;
}
