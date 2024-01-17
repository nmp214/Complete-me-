import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { Router } from '@angular/router';
import { upload } from '../../services/storage';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { Shape } from '../../classes/shape';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatGridListModule, CommonModule, MatTabsModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, HttpClientModule, MatProgressSpinnerModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  animal?: string;
  name?: string;
  inProgress: boolean = true;
  title: string = "complete me";
  begginers: Shape[] = [];
  //  = ['../../../assets/5.png', '../../../assets/9.png', '../../../assets/10.png', '../../../assets/11.png', '../../../assets/12.png', '../../../assets/13.png',
  // '../../../assets/14.png', '../../../assets/17.png', '../../../assets/20.png', '../../../assets/21.png', '../../../assets/23.png', '../../../assets/24.png'];

  advanced: Shape[] = [];
  //  = ['../../../assets/3.png', '../../../assets/4.png', '../../../assets/6.png', '../../../assets/7.png', '../../../assets/8.png',
  // '../../../assets/15.png', '../../../assets/16.png', '../../../assets/18.png', '../../../assets/19.png', '../../../assets/22.png'];

  challenge: Shape[] = [];
  //  = ['../../../assets/1.png', '../../../assets/2.png'];

  constructor(public dialog: MatDialog, private router: Router,
    public httpService: HttpService) {
    console.log('in home constructor');
    // httpService.getShapesByLevel(1).subscribe((shapes) => {
    //   console.log('response: ', shapes);
    // })
  }

  ngOnInit() {
    this.httpService.getShapesByLevel(1).subscribe((shapes: Shape[]) => {
      this.begginers = shapes;
      console.log('begginers: ', this.begginers);
    }, (error) => console.log(error));

    this.httpService.getShapesByLevel(2).subscribe((shapes) => {
      this.advanced = shapes;
      console.log('advanced: ', this.advanced);
    }, (error) => console.log(error));

    this.httpService.getShapesByLevel(3).subscribe((shapes) => {
      this.challenge = shapes;
      console.log('challenge: ', this.challenge);
      this.inProgress = false;
    }, (error) => console.log(error));
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openSignup(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDrawing(event: any): void {
    const id: number = event.target.id;
    this.router.navigate(['/draw', { shapeId: id }]);
  }

  handleFile(event: any) {
    const file = event.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    return upload(file);
  }
}
