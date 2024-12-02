import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { CarouselService } from '../../services/carousel.service';
import { ComponentsComponent } from '../../../footer/components/components.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HeaderComponent, ComponentsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  items: { id: number; name: string; img: string ; transactionType?: string }[] = []; // Lista de artículos para el slider
  faStar = faStar;
  faQuestionCircle = faQuestionCircle;
  menuVisible = false;
  helpPanelVisible = false;
  currentIndex: number = 0;
  itemsPerPage: number = 3;

  constructor(private router: Router, private carouselService: CarouselService) {}

  ngOnInit(): void {
    this.carouselService.articles$.subscribe((articles) => {
      this.items = articles;
    });
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleHelpPanel() {
    this.helpPanelVisible = !this.helpPanelVisible;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  handleLooping(numberIdx = this.itemsPerPage): void {
    this.currentIndex = numberIdx;
  }

  prevSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.handleLooping(this.items.length - 1);
    }
  }

  nextSlide(): void {
    if (this.currentIndex < this.items.length - this.itemsPerPage) {
      this.currentIndex++;
    } else {
      this.handleLooping(0);
    }
  }

  // Devuelve el valor de la transformación para el slider
  getTransform(): string {
    return `translateX(-${this.currentIndex * (100 / this.itemsPerPage)}%)`;
  }

  getTransformContentLayout(): string {
    return `flex: 0 0 calc((100% / ${this.itemsPerPage}) - 20px)`;
  }
}
