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
  isLoading: boolean = false;

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
      articleState: ['DISPONIBLE', Validators.required], // Estado inicial por defecto
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
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar categorías',
          text: 'No se pudieron cargar las categorías. Inténtalo más tarde.',
        });
      },
    });
  }

  registerArticle(): void {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
      });
      return;
    }

    this.isLoading = true;
    const { userName, userEmail, selectedCategoryId, ...articleData } = this.form.value;

    this.authService.verifyUserByNameAndEmail(userName, userEmail)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (response) => {
          if (response.exists && response.userId) {
            const formattedArticle = {
              nombre_articulo: articleData.articleName,
              descripcion: articleData.articleDescription,
              id_categoria: selectedCategoryId,
              precio: articleData.articlePrice,
              tipo_transaccion: articleData.transactionType,
              usuario_id: response.userId,
              estado: articleData.articleState,
            };

            this.createArticle(formattedArticle);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Usuario no encontrado',
              text: 'Por favor verifica tu nombre y correo.',
            });
          }
        },
        error: (error) => {
          console.error('Error al verificar usuario:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar usuario',
            text: 'Inténtalo más tarde.',
          });
        },
      });
  }

  private createArticle(articleData: any): void {
    this.articleService.createArticle(articleData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Artículo registrado exitosamente',
          showConfirmButton: false,
          timer: 1500,
        });
        this.form.reset();
        this.form.patchValue({ transactionType: 'VENTA', articleState: 'DISPONIBLE' });
      },
      error: (error) => {
        console.error('Error al registrar el artículo:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar el artículo',
          text: error.error?.detail || 'Inténtalo más tarde.',
        });
      },
    });
  }
}
