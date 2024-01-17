import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-examples',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './examples.component.html',
  styleUrl: './examples.component.scss'
})
export class ExamplesComponent {
  drawings: string[] = ['../../../assets/3.png', '../../../assets/4.png', '../../../assets/6.png', '../../../assets/7.png', '../../../assets/8.png'];
  names: string[] = ['שירי בר', 'נאן שמידט', 'יענקי וייס', 'אתי שניידר', 'אייל גלבוע'];
}
