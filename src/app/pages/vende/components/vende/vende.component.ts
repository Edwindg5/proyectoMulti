import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { AuthService } from '../../../../auth/auth.service';
import { CarouselService } from '../../../home/services/carousel.service';
import { HeaderComponent } from '../../../header/component/header/header.component';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vende',
  standalone: true,
  imports: [CommonModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './vende.component.html',
  styleUrls: ['./vende.component.css'],
})
export class VendeComponent implements OnInit {
  form: FormGroup;
  imageForm: FormGroup;
  categories: { id_categoria: number; nombre_categoria: string }[] = [];
  isLoading = false;
  isImageLoading = false;
  imageUploaded = false;
  imageUrl = ''; // URL de la imagen subida

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private authService: AuthService,
    private carouselService: CarouselService
  ) {
    this.form = this.fb.group({
      articleName: ['', Validators.required],
      articleDescription: ['', Validators.required],
      selectedCategoryId: [null, Validators.required],
      articlePrice: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')],
      ],
      articleQuantity: [
        null,
        [Validators.required, Validators.min(1), Validators.pattern('^[0-9]+$')], // NUEVO CAMPO
      ],
      transactionType: ['VENTA', Validators.required],
      articleState: ['DISPONIBLE', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
    });
    

    this.imageForm = this.fb.group({
      articleImage: [null, Validators.required],
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

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Formato de imagen no válido',
          text: 'Solo se permiten imágenes JPG y PNG.',
        });
        this.imageForm.patchValue({ articleImage: null });
        return;
      }
      this.imageForm.patchValue({ articleImage: file });
      this.imageForm.get('articleImage')?.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string; // Vista previa
      };
      reader.readAsDataURL(file);
    }
  }

  onImageSubmit(): void {
    if (this.imageForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario de imagen incompleto',
        text: 'Por favor, selecciona una imagen.',
      });
      return;
    }

    this.isImageLoading = true;
    const file = this.imageForm.get('articleImage')?.value;

    this.articleService.uploadImage(file).subscribe({
      next: (response) => {
        this.imageUrl = response.url; // URL desde el backend
        this.imageUploaded = true;
        Swal.fire({
          icon: 'success',
          title: 'Imagen subida exitosamente',
          text: 'Ahora puedes registrar el artículo.',
        });
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al subir la imagen',
          text: 'Hubo un problema al subir la imagen. Intenta nuevamente.',
        });
      },
      complete: () => {
        this.isImageLoading = false;
      },
    });
  }

  submitForm(): void {
    if (this.form.invalid || !this.imageUploaded) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos requeridos y sube una imagen.',
      });
      return;
    }

    const name = this.form.get('userName')?.value;
    const email = this.form.get('userEmail')?.value;

    this.authService.verifyUserByNameAndEmail(name, email).subscribe({
      next: (response) => {
        if (response.exists && response.userId) {
          const articleData = {
            nombre_articulo: this.form.get('articleName')?.value,
            descripcion: this.form.get('articleDescription')?.value,
            id_categoria: this.form.get('selectedCategoryId')?.value,
            precio: this.form.get('articlePrice')?.value,
            tipo_transaccion: this.form.get('transactionType')?.value,
            usuario_id: this.authService.getUserId(),
            estado: this.form.get('articleState')?.value,
            url_imagen: this.imageUrl,  // Asegúrate de enviar la URL de la imagen
            cantidad: this.form.get('articleQuantity')?.value,
          };
          

          this.isLoading = true;
          this.articleService.createArticle(articleData).subscribe({
            next: () => {
              Swal.fire('Éxito', 'El artículo fue registrado correctamente.', 'success');
              this.form.reset();
              this.carouselService.addArticle({
                id: Date.now(), // Genera un ID único
                name: articleData.nombre_articulo,
                img: articleData.url_imagen,
              });
              
            },
            error: (err) => {
              console.error('Error del backend:', err);
              Swal.fire(
                'Error',
                err.error.detail || 'No se pudo registrar el artículo.',
                'error'
              );
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Usuario no autenticado',
            text: 'El nombre o correo no coinciden con un usuario autenticado.',
          });
        }
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al verificar autenticación',
          text: err.error.message || 'No se pudo verificar la autenticación.',
        });
      },
    });
  }
}
