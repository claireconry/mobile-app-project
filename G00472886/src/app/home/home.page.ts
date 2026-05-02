import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonSearchbar } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonSearchbar, CommonModule, FormsModule, RouterLink],
})
export class HomePage implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';

  constructor(private movieService: MovieService, private router: Router) {
    addIcons({ heart });
  }

  ngOnInit() {
    this.loadTrendingMovies();
  }

  loadTrendingMovies() {
    this.movieService.getTrendingMovies().subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  searchMovies() {
    if (this.searchQuery.trim() === '') {
      this.loadTrendingMovies();
    } else {
      this.movieService.searchMovies(this.searchQuery).subscribe((data: any) => {
        this.movies = data.results;
      });
    }
  }

  goToMovieDetails(movie: any) {
    this.movieService.selectedMovie = movie;
    this.router.navigate(['/movie-details']);
  }
}
