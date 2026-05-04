import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { FavouritesService } from '../services/favourites.service';
import { MovieService } from '../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, CommonModule, RouterLink]
})
export class FavouritesPage implements OnInit {
  favourites: any[] = [];

  constructor(
    private favouritesService: FavouritesService,
    private movieService: MovieService,
    private router: Router
  ) {
    addIcons({ home });
  }

  ngOnInit() {
    this.favourites = this.favouritesService.getFavourites();
  }

  goToMovieDetails(movie: any) {
    this.movieService.selectedMovie = movie;
    this.router.navigate(['/movie-details']);
  }
}
