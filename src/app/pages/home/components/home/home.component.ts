import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cards = [
    { img: 'assets/producto1.png', name: 'Audífonos' },
    { img: 'assets/producto2.png', name: 'Teclado' },
    { img: 'assets/producto3.png', name: 'Mouse' },
    { img: 'assets/producto4.png', name: 'Calculadora'}
  ];

  currentIndex: number = 0;

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.cards.length) % this.cards.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.cards.length;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}