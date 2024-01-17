import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrawComponent } from './components/draw/draw.component';
import { HttpService } from './services/http.service';
import { HttpClientModule } from  '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HomeComponent, DrawComponent, RouterOutlet, HttpClientModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-project';
  post: any;

  constructor(private httpService: HttpService) {}

  // ngOnInit() {
  //   console.log(this.httpService);
  //   this.httpService.getPost().subscribe(
  //     (response) => { this.post = response; },
  //     (error) => { console.log(error); });
  // }
}
