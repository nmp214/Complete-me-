import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Drawing } from '../../classes/drawing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ImageComponent } from '../image/image.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {
  shapeId: number = 0;
  drawings: Drawing[] = [];
  inProgress: boolean = true;

  constructor(private httpService: HttpService, private activeRoute: ActivatedRoute,
    private router: Router, public dialog: MatDialog) {
    this.activeRoute.paramMap.subscribe((params: any) => {
      console.log(params);
      this.shapeId = params.get('shapeId');
    });
  }

  ngOnInit() {
    this.httpService.getExampleDrawings(this.shapeId).subscribe((data: Drawing[]) => {
      this.drawings = data;
      console.log('inProgress ', this.drawings);
      this.inProgress = false;
    }, (error) => console.log(error));
  }

  add() {
    this.router.navigate(['/draw', { shapeId: this.shapeId }]);
  }

  toHome() {
    this.router.navigate(['/']);
  }

  openImage(url: string) {
    const dialogRef = this.dialog.open(ImageComponent, {
      data: { url: url }
    });
  }
}
