import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private readonly STORAGE_KEY = 'carouselArticles';
  private articlesSubject = new BehaviorSubject<
    { id: number; name: string; img: string }[]
  >(this.loadArticlesFromStorage());
  articles$ = this.articlesSubject.asObservable();

  constructor() {}

  // Agrega un artículo y actualiza el almacenamiento local
  addArticle(article: { id: number; name: string; img: string }): void {
    const currentArticles = this.articlesSubject.getValue();
    const updatedArticles = [...currentArticles, article];
    this.articlesSubject.next(updatedArticles);
    this.saveArticlesToStorage(updatedArticles);
  }

  // Establece una lista completa de artículos y actualiza el almacenamiento
  setArticles(articles: { id: number; name: string; img: string }[]): void {
    this.articlesSubject.next(articles);
    this.saveArticlesToStorage(articles);
  }

  // Carga artículos desde el almacenamiento local
  private loadArticlesFromStorage(): {
    id: number;
    name: string;
    img: string;
  }[] {
    const storedArticles = localStorage.getItem(this.STORAGE_KEY);
    const articles = storedArticles
      ? JSON.parse(storedArticles)
      : [
          {
            id: 1,
            img: 'assets/calculadora.jpg',
            name: 'Calculadora cientifica',
          },
          {
            id: 2,
            img: 'assets/anatomia_libro.jpg',
            name: 'Anatomia sexta edicion',
          },
          {
            id: 3,
            img: 'assets/mouse.jpg',
            name: 'Mouse',
          },
        ];
    return articles;
  }

  // Guarda artículos en el almacenamiento local
  private saveArticlesToStorage(
    articles: { id: number; name: string; img: string }[]
  ): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(articles));
  }
}
