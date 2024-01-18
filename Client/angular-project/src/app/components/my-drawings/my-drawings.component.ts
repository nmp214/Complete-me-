import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Drawing } from '../../classes/drawing';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-drawings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './my-drawings.component.html',
  styleUrl: './my-drawings.component.scss'
})
export class MyDrawingsComponent {
  shapeId: number = 0;

  drawings: Drawing[] = [];
  //  ['../../../assets/3.png', '../../../assets/4.png', '../../../assets/6.png', '../../../assets/7.png', '../../../assets/8.png'];

  constructor(private httpService: HttpService, private activeRoute: ActivatedRoute) {
    this.activeRoute.paramMap.subscribe((params: any) => {
      this.shapeId = params.get('shapeId');
    });
  }

  ngOnInit() {
    this.httpService.getMyDrawings(this.shapeId).subscribe((data: Drawing[]) => {
      this.drawings = data;
      console.log(this.drawings);
    }, (error) => console.log(error));
  }
}

