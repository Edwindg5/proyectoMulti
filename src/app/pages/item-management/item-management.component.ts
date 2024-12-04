import { Component } from '@angular/core';
import { SectionManagmentComponent } from './components/section-managment/section-managment.component';
import { HeaderComponent } from '../header/component/header/header.component';

@Component({
  selector: 'app-item-management',
  standalone: true,
  imports: [SectionManagmentComponent,HeaderComponent],
  templateUrl: './item-management.component.html',
  styleUrl: './item-management.component.css'
})
export class ItemManagementComponent {

}
