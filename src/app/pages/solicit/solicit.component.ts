import { Component } from '@angular/core';
import { HeaderComponent } from '../header/component/header/header.component';
import { CommonModule } from '@angular/common';
import { SectionSolicitComponent } from './components/section-solicit/section-solicit.component';
@Component({
  selector: 'app-solicit',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SectionSolicitComponent],
  templateUrl: './solicit.component.html',
  styleUrl: './solicit.component.css'
})
export class SolicitComponent {

}
