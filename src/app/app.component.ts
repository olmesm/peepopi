import { Component } from '@angular/core';
import { ResourceService } from './resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  movieObject = {};

  constructor(private resourceService: ResourceService) {
    this.getMovies();
  }

  getMovies() {
    this.resourceService.query().then(res => console.log(this.movieObject = res));
  }
}
