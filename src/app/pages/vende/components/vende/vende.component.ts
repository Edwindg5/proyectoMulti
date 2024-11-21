import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../../../auth/auth.service';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-vende',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './vende.component.html',
  styleUrls: ['./vende.component.css'],
})
export class VendeComponent implements OnInit {
  form: FormGroup;
  categories: { id_categoria: number; nombre_categoria: string }[] = [];
  products: any[] = []; // Aquí se guardarán los productos de la categoría seleccionada
  isLoading: boolean = false;
  selectedFile: File | null = null;
  imageError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      articleName: ['', Validators.required],
      articleDescription: ['', Validators.required],
      selectedCategoryId: [null, Validators.required],
      articlePrice: [null, [Validators.required, Validators.min(1)]],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      transactionType: ['VENTA', Validators.required],
      articleState: ['DISPONIBLE', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.articleService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar categorías',
          text: 'No se pudieron cargar las categorías. Inténtalo más tarde.',
        });
      },
    });
  }

  loadProductsByCategory(): void {
    const selectedCategoryId = this.form.get('selectedCategoryId')?.value;
    if (!selectedCategoryId) {
      Swal.fire({
        icon: 'warning',
        title: 'Selecciona una categoría',
        text: 'Por favor, elige una categoría para ver los productos.',
      });
      return;
    }

    this.isLoading = true;
    this.articleService
      .getProductsByCategory(selectedCategoryId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (products) => {
          this.products = products;
          Swal.fire({
            icon: 'success',
            title: 'Productos cargados',
            text: `Se encontraron ${products.length} productos en esta categoría.`,
          });
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al cargar productos',
            text: 'No se pudieron cargar los productos. Inténtalo más tarde.',
          });
        },
      });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      this.imageError = false;
    } else {
      this.imageError = true;
      this.selectedFile = null;
    }
  }

  registerArticle(): void {
    if (this.form.invalid || !this.selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos y selecciona una imagen.',
      });
      return;
    }
  
    this.isLoading = true;
    const { userName, userEmail, selectedCategoryId, ...articleData } = this.form.value;
  
    this.authService
      .verifyUserByNameAndEmail(userName, userEmail)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.exists && response.userId) {
            const formData = new FormData();
            formData.append('nombre_articulo', articleData.articleName);
            formData.append('descripcion', articleData.articleDescription);
            formData.append('id_categoria', selectedCategoryId.toString());
            formData.append('precio', articleData.articlePrice.toString());
            formData.append('tipo_transaccion', articleData.transactionType);
            formData.append('usuario_id', response.userId.toString());
            formData.append('estado', articleData.articleState);
            formData.append('imagen', this.selectedFile!); // Agregas la imagen seleccionada aquí
  
            this.createArticle(formData);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado',
              text: 'Por favor verifica tu nombre y correo.',
            });
          }
        },
        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar usuario',
            text: 'Inténtalo más tarde.',
          });
        },
      });
  }
  

  private createArticle(formData: FormData): void {
    this.articleService.createArticle(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo registrado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
        this.selectedFile = null;
        this.form.patchValue({ transactionType: 'VENTA', articleState: 'DISPONIBLE' });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el artículo',
          text: 'Inténtalo más tarde.',
        });
      },
    });
  }
}
