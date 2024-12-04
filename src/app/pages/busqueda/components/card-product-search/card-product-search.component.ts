import { CommonModule } from '@angular/common';
import { Component,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-product-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-product-search.component.html',
  styleUrl: './card-product-search.component.css'
})
export class CardProductSearchComponent {
  @Input() item :any;
  isExpanded = false;

  toggleDescription() {
    this.isExpanded = !this.isExpanded; 
  }

}
