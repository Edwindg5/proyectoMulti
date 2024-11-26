// src/app/home/component/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { CarouselService } from '../../services/carousel.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: { id: number; name: string; img: string }[] = []; // Lista de artículos para el carrusel
  faStar = faStar;
  menuVisible = false;
  currentIndex: number = 0;

  constructor(private router: Router, private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.articles$.subscribe((articles) => {
      this.items = articles;
    });
  }
  

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  // Métodos para el carrusel
  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}