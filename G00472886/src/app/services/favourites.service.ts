import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private favourites: any[] = [];

  constructor() {
    const saved = localStorage.getItem('favourites');
    if (saved) {
      this.favourites = JSON.parse(saved);
    }
  }

  getFavourites() {
    return this.favourites;
  }

  addFavourite(movie: any) {
    this.favourites.push(movie);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  removeFavourite(movieId: number) {
    this.favourites = this.favourites.filter(m => m.id !== movieId);
    localStorage.setItem('favourites', JSON.stringify(this.favourites));
  }

  isFavourite(movieId: number) {
    return this.favourites.some(m => m.id === movieId);
  }
}
