import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Drawing } from '../../classes/drawing';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {
  shapeId: number = 0;
  drawings: Drawing[] = [];
  // ['../../../assets/3.png', '../../../assets/4.png', '../../../assets/6.png', '../../../assets/7.png', '../../../assets/8.png'];
  names: string[] = ['שירי בר', 'נאן שמידט', 'יענקי וייס', 'אתי שניידר', 'אייל גלבוע'];

  constructor(private httpService: HttpService, private activeRoute: ActivatedRoute,
    private router: Router) {
    this.activeRoute.paramMap.subscribe((params: any) => {
      this.shapeId = params.get('shapeId');
    });
  }

  ngOnInit() {
    this.httpService.getExampleDrawings(this.shapeId).subscribe((data: Drawing[]) => {
      this.drawings = data;
      console.log(this.drawings);
    }, (error) => console.log(error));
  }

  add() {
    this.router.navigate(['/draw', { shapeId: this.shapeId }]);

  }
}
