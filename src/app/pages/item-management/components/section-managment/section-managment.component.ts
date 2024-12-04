import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { ItemManagementService } from '../../services/item-management.service';
import { ItemUpdate } from '../../../../categories/models/item.model';
import { LoaderComponent } from '../../../../components/loader/loader.component';
@Component({
  selector: 'app-section-managment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent
  ],
  templateUrl: './section-managment.component.html',
  styleUrl: './section-managment.component.css'
})
export class SectionManagmentComponent {
  idOfer:number = 0;
  articles: any[] = [];
  isLoading = false;
  mensaje = "Cargando articulos"
  constructor(private itemService:ItemManagementService){}
  ngOnInit(){
    this.isLoading = true;  
    const storedSeller = localStorage.getItem('user');
    this.idOfer = storedSeller ? JSON.parse(storedSeller).id : null;
 
    this.itemService.getAllItems(this.idOfer).subscribe(articles => {
      this.articles = articles;
      this.isLoading = false;
    });
  }
  
  isModalOpen = false;
  selectedArticle: any = null;

  openEditModal(article: any) {
    this.isModalOpen = true;
    this.selectedArticle = { ...article }; // Clona el artículo
  }

  closeEditModal() {
    this.isModalOpen = false;
    this.selectedArticle = null;
  }

  saveArticle() {
    console.log('Artículo editado:', this.selectedArticle);
    const id_articulo = this.selectedArticle.id_articulo
    const itemToUpdate:ItemUpdate = {
      precio: this.selectedArticle.precio,
      nombre_articulo: this.selectedArticle.nombre_articulo,
      descripcion: this.selectedArticle.descripcion
    }
    this.itemService.updateItem(id_articulo, itemToUpdate).subscribe(data => {
      console.log('Artículo actualizado:', data);
      this.ngOnInit();
    })
    this.closeEditModal();
  }

  deleteArticle(article: any) {
    const id_item = article.id_articulo;
    this.itemService.deleteItem(id_item).subscribe(data => {
      this.ngOnInit();
      
    })
    console.log('Artículo eliminado:', article);
  }
}
