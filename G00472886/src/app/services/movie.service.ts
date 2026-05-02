import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = '21acb0955401e4c44da8304d6998b95f';
  private baseUrl = 'https://api.themoviedb.org/3';
  selectedMovie: any = null;

  constructor(private http: HttpClient) {}

  getTrendingMovies() {
    return this.http.get(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}`);
  }

  searchMovies(query: string) {
    return this.http.get(`${this.baseUrl}/search/movie?query=${query}&api_key=${this.apiKey}`);
  }

  getMovieCredits(movieId: number) {
    return this.http.get(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }
}
