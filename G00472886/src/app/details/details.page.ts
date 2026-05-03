import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { heart, home } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, CommonModule, RouterLink]
})
export class DetailsPage implements OnInit {
  person: any;
  movies: any[] = [];

  constructor(private movieService: MovieService, private router: Router) {
    addIcons({ heart, home });
  }

  ngOnInit() {
    this.person = this.movieService.selectedPerson;
    if (this.person) {
      this.movieService.getPersonDetails(this.person.id).subscribe((data: any) => {
        this.person = data;
      });
      this.movieService.getPersonMovieCredits(this.person.id).subscribe((data: any) => {
        this.movies = data.cast;
      });
    }
  }

  goToMovieDetails(movie: any) {
    this.movieService.selectedMovie = movie;
    this.router.navigate(['/movie-details']);
  }
}
