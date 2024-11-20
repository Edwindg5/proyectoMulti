import { Component, OnInit, Input } from '@angular/core';
import { ArticleService } from '../../../pages/vende/services/article.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {
  @Input() categoryId!: number; // Se pasa desde el componente padre
  articles: any[] = [];
  isLoading: boolean = false;

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.categoryId) {
      this.loadArticlesByCategory();
    }
  }

  loadArticlesByCategory(): void {
    this.isLoading = true;
    this.articleService.getProductsByCategory(this.categoryId).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar los artículos:', error);
        this.isLoading = false;
      },
    });
  }
}