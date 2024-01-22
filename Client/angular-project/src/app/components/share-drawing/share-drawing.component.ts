import { Component, Inject } from '@angular/core';
import {
  MatDialog,
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
import { MatIconModule } from '@angular/material/icon';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

import { save } from '../draw/draw.component';

@Component({
  selector: 'app-share-drawing',
  standalone: true,
  imports: [
    MatFormFieldModule,
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
    MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './share-drawing.component.html',
  styleUrl: './share-drawing.component.scss'
})
export class ShareDrawingComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ShareDrawingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: save) { }
  hide = true;

  save() {
    this._snackBar.open('הציור נשמר בהצלחה!', 'כאן תוכל לראותו ודוגמאות נוספות', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3000,
      direction: 'rtl'
    });
  }
}
