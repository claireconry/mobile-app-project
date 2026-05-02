import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { FavouritesService } from '../services/favourites.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, CommonModule, RouterLink]
})
export class MovieDetailsPage implements OnInit {
  movie: any;
  cast: any[] = [];
  crew: any[] = [];
  isFavourite: boolean = false;

  constructor(
    private movieService: MovieService,
    private favouritesService: FavouritesService,
    private router: Router
  ) {
    addIcons({ heart, home });
  }

  ngOnInit() {
    this.movie = history.state.movie;
    if (this.movie) {
      this.movieService.getMovieCredits(this.movie.id).subscribe((data: any) => {
        this.cast = data.cast;
        this.crew = data.crew;
      });
      this.isFavourite = this.favouritesService.isFavourite(this.movie.id);
    }
  }

  toggleFavourite() {
    if (this.isFavourite) {
      this.favouritesService.removeFavourite(this.movie.id);
    } else {
      this.favouritesService.addFavourite(this.movie);
    }
    this.isFavourite = !this.isFavourite;
  }

  goToDetails(person: any) {
    this.router.navigate(['/details'], { state: { person } });
  }
}
