import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';

@Component({
  selector: 'app-intercambia',
  standalone: true,
  imports: [CommonModule, HeaderComponent], // Asegúrate de incluir CommonModule
  templateUrl: './intercambia.component.html',
  styleUrls: ['./intercambia.component.css'],
})
export class IntercambiaComponent implements OnInit {
  product: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.product = navigation?.extras?.state?.['productId']; // Uso de corchetes para productId
  }
}
