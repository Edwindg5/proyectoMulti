import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle, faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { CarouselService } from '../../services/carousel.service';
import { ComponentsComponent } from '../../../footer/components/components.component';
import { AuthService } from '../../../../auth/auth.service';
import Swal from 'sweetalert2';

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
  userRole: string = ''; 
  isAdmin: boolean = false;
  bannedItems: { id: number; name: string; img: string }[] = [];

  constructor(private router: Router, private carouselService: CarouselService, private authService: AuthService) {}

  ngOnInit(): void {
    
    this.carouselService.articles$.subscribe((articles) => {
      this.items = articles;
    });
    const userName = this.authService.getUserName(); // Método que obtiene el nombre del usuario logueado
  this.isAdmin = userName === 'Administrador'; 
  }
  deleteItem(itemId: number): void {
    const bannedItem = this.items.find((item) => item.id === itemId);
    if (!bannedItem) return;
  
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este artículo será marcado como "baneado".',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, banear',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // Mover el artículo a la lista de baneados
        this.bannedItems.push(bannedItem);
        this.items = this.items.filter((item) => item.id !== itemId);
  
        // Actualizar el almacenamiento local
        this.carouselService.setArticles(this.items);
  
        Swal.fire('Baneado', 'El artículo ha sido marcado como "baneado".', 'success');
      }
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
    Swal.fire({
      title: '¿Explorar categorías?',
      text: 'Te recomendamos visitar la opción "Ver Categorías" para más opciones.',
      icon: 'info',
      showCancelButton: true,
      
      
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, navega a la página de categorías
        this.router.navigate(['/categorias']);
      } else {
        // Si el usuario cancela, continúa con la navegación normal
        this.router.navigate([`/${route}`]);
      }
    });
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
  showBannedItems(): void {
    const tableContent = this.bannedItems
      .map(
        (item) =>
          `<tr>
            <td><img src="${item.img}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover;" /></td>
            <td>${item.name}</td>
          </tr>`
      )
      .join('');
  
    Swal.fire({
      title: 'Artículos Baneados',
      html: `
        <table style="width: 100%; text-align: left; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="border-bottom: 1px solid #ddd; padding: 5px;">Imagen</th>
              <th style="border-bottom: 1px solid #ddd; padding: 5px;">Nombre</th>
            </tr>
          </thead>
          <tbody>
            ${tableContent || '<tr><td colspan="2" style="text-align: center;">No hay artículos baneados</td></tr>'}
          </tbody>
        </table>
      `,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Cerrar',
    });
  }
}
