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
  items: { id: number; name: string; img: string }[] = []; // Lista de artículos para el slider
  faStar = faStar;
  menuVisible = false;
  currentIndex: number = 0;
  itemsPerPage: number = 3;

  constructor(private router: Router, private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.articles$.subscribe((articles) => {
      this.items = articles;
      console.log(this.items)
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

  // Métodos para el slider
  prevSlide(): void {
    const maxIndex = Math.ceil(this.items.length / this.itemsPerPage) - 1;
    this.currentIndex = (this.currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1);
  }
  nextSlide(): void {
    this.currentIndex +=3;
    this.items =this.carouselService.nextArticles()
    console.log(this.items)
  }

  // Devuelve el valor de la transformación para el slider
  getTransform(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }
}
