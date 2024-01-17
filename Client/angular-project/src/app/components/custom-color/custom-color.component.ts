import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../home/home.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custom-color',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './custom-color.component.html',
  styleUrl: './custom-color.component.scss'
})
export class CustomColorComponent {
  constructor(
    public dialogRef: MatDialogRef<CustomColorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  hide = true;

  onNoClick(): void {
    this.dialogRef.close();
    console.log('color: ', this.data.color);
  }

  addColor() {

  }
}
