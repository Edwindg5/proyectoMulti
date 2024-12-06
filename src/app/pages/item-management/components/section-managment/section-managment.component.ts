import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule,FormControl,FormGroup,Validators } from '@angular/forms';
import { ItemManagementService } from '../../services/item-management.service';
import { ItemUpdate } from '../../../../categories/models/item.model';
import { LoaderComponent } from '../../../../components/loader/loader.component';
import Swal from 'sweetalert2';
import { Category } from '../../models/category';
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
  mensaje = "Cargando articulos";
  categories: Category[] = [];
  categorySelected: FormGroup;
  constructor(private itemService:ItemManagementService){
    this.categorySelected = new FormGroup({
      id_category: new FormControl(''),
      name_category: new FormControl('')
    });
  }
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
    this.selectedArticle = { ...article };
    this.itemService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  
  

  closeEditModal() {
    this.isModalOpen = false;
    this.selectedArticle = null;
  }

  saveArticle() {
    const id_articulo = this.selectedArticle.id_articulo;
    const itemToUpdate: ItemUpdate = {
      precio: this.selectedArticle.precio,
      nombre_articulo: this.selectedArticle.nombre_articulo,
      descripcion: this.selectedArticle.descripcion,
      id_categoria: Number(this.categorySelected.value.id_category) || this.selectedArticle.id_categoria
    };
  
    this.itemService.updateItem(id_articulo, itemToUpdate).subscribe((data) => {
      console.log('Artículo actualizado:', data);
      this.ngOnInit(); 
    });
  
    this.closeEditModal();
  }
  

  deleteArticle(article: any) {
    const id_item = article.id_articulo;
   Swal.fire({
    title: 'Estás seguro?',
    text: "Una vez eliminado, no podrás recuperar este artículo!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar!'	
   })
   .then((result) => {
    if (result.isConfirmed) {
      this.itemService.deleteItem(id_item).subscribe(data => {
        console.log('Artículo eliminado:', data);
        this.ngOnInit();
      })
    }
  })
    console.log('Artículo eliminado:', article);
  }
}
