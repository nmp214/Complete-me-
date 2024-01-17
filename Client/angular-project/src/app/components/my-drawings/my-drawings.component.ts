import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-drawings',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './my-drawings.component.html',
  styleUrl: './my-drawings.component.scss'
})
export class MyDrawingsComponent {
  drawings: string[] = ['../../../assets/3.png', '../../../assets/4.png', '../../../assets/6.png', '../../../assets/7.png', '../../../assets/8.png'];
}
