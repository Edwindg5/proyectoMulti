import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  faStar = faStar;
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    // Agrega más elementos según sea necesario
  ];

  menuVisible = false;

  constructor(private router: Router) {}

  addToFavorites(item: any) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.some((fav: any) => fav.id === item.id)) {
      favorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Agregado a destacados');
    }
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
}
