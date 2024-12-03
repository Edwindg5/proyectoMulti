import { Component } from '@angular/core';
import { SectionSolicitComponent } from './components/section-solicit/section-solicit.component';
import { CardMysolicitComponent } from './components/card-mysolicit/card-mysolicit.component';
import { HeaderComponent } from '../header/component/header/header.component';

@Component({
  selector: 'app-mysolicits',
  standalone: true,
  imports: [SectionSolicitComponent,CardMysolicitComponent, HeaderComponent],
  templateUrl: './mysolicits.component.html',
  styleUrl: './mysolicits.component.css'
})
export class MysolicitsComponent {

}
