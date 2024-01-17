import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { fabric } from 'fabric';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { Shape } from '../../classes/shape';
import { MatDialog } from '@angular/material/dialog';
import { CustomColorComponent } from '../custom-color/custom-color.component';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule, MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.scss'
})
export class DrawComponent implements OnInit {

  @Output()
  changeSelectedColor: EventEmitter<string> = new EventEmitter<string>();

  shapeId: number = 0;
  currentShape: Shape = new Shape();
  url?: string;

  private canvas!: fabric.Canvas;

  public circle: fabric.StaticCanvas = new fabric.StaticCanvas('circle', {
    width: 100,
    height: 100
  });

  selectedColor: string = '#000000';
  selectedWidth: number = 6;
  isBrush: boolean = true;
  brush?: string;
  customColors: string[] = ['#464444', '#464444', '#464444', '#464444', '#464444', '#464444', '#464444', '#464444'];
  index: number = 0;
  custom?: string;
  image: any;
  inProgress: boolean = true;
  isFillMode: boolean = false;

  // erasingMode: boolean = false;
  // originalBackgroundColor: string | null = null;
  // drawnPaths: fabric.Path[] = [];

  constructor(private router: Router, private activeRoute: ActivatedRoute,
    public httpService: HttpService, public dialog: MatDialog) {

    this.activeRoute.paramMap.subscribe((params: any) => {
      console.log('params: ', params.get('shapeId'));
      this.shapeId = params.get('shapeId');
    });
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.freeDrawingBrush.width = this.selectedWidth;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
  }

  ngOnInit() {
    this.canvas = new fabric.Canvas('canvas', {
      isDrawingMode: true,
      selection: false,

    });
    console.log('shapeId: ', this.shapeId);
    this.httpService.getShape(this.shapeId).subscribe((shape: any) => {
      console.log('shape: ', shape);
      this.currentShape = shape[0];
      fabric.Image.fromURL(this.currentShape.shapeUrl, (img) => {
        img.set({ selectable: false });
        img.set({ crossOrigin: 'Anonymous' });
        console.log(img);
        this.image = img;
        this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
        this.canvas.bringToFront(img);
        this.inProgress = false;
      });
    }, (error) => console.log('error: ', error));
    console.log('currentShape: ', this.currentShape);

    this.canvas.on('mouse:down', (event) => this.handleMouseDown(event));
    this.canvas.on('mouse:move', (event) => this.handleMouseMove(event));
    this.canvas.on('mouse:up', () => this.handleMouseUp());

  }

  ngAfterViewInit(): void {

    this.canvas.freeDrawingBrush.width = this.selectedWidth;
    this.canvas.freeDrawingBrush.color = this.selectedColor;
    this.showSelectedColor();
    console.log('currentShape: ', this.currentShape);

    // this.canvas.on('path:created', (event: any) => {
    //   const path = event.path;
    //   path.set({ selectable: true });

    //   this.canvas.add(path);
    //   const backgroundImage = this.canvas.backgroundImage;
    //   if (backgroundImage) {
    //     this.canvas.bringToFront(backgroundImage as fabric.Object);
    //   }
    // });

    // this.canvas.on('selection:created', (event) => {
    //   const selection = event.target;
    //   if (selection instanceof fabric.ActiveSelection) {
    //     selection.set({ selectable: false });
    //   }
    // });


    const rect = new fabric.Rect({
      left: 0,
      top: 0,
      width: this.canvas.width,
      height: this.canvas.height,
      fill: 'white'
    });

    this.canvas.add(rect);
  }



  changeKind(event: any) {
    console.log(this.canvas.backgroundColor);
    console.log(this.brush);
    if (this.brush === 'eraser') {
      // this.toggleEraseMode();
      // this.toggleErasingMode();
      console.log('eraser');
      this.isBrush = false;
      this.canvas.freeDrawingBrush.color = '#FFFFFF';
    }
    else {
      // this.toggleDrawingMode()
      this.isBrush = true;
      this.canvas.freeDrawingBrush.color = this.selectedColor;
    }
  }

  clear() {
    this.canvas.clear();
    fabric.Image.fromURL(this.currentShape.shapeUrl, (img) => {
      img.set({ crossOrigin: 'anonymous' });
      this.image = img;
      img.set({ selectable: false });
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
      this.canvas.bringToFront(img);
    });
  }

  changeColor(event: any) {
    this.selectedColor = event.target.value;
    this.circle = new fabric.StaticCanvas('circle', {
      width: 70,
      height: 70
    });

    this.showSelectedColor();

    if (this.isBrush) {
      this.canvas.freeDrawingBrush.color = event.target.value;
      this.canvas.freeDrawingBrush.width = this.selectedWidth;
    }
  }

  showSelectedColor() {
    this.circle.clear();
    this.circle = new fabric.StaticCanvas('circle');
    this.circle.add(new fabric.Circle({
      left: 20,
      top: 20,
      radius: 27,
      fill: '#FFFFFF',
      hasBorders: true,
    }));

    this.circle.add(new fabric.Circle({
      left: 22,
      top: 22,
      radius: 25,
      fill: this.selectedColor,
      hasBorders: true,
    }));
  }

  emitSelectedColor(event: any) {
    console.log('in emitSelectedColor ', event);
  }

  changeWidth(event: any) {
    console.log(event);
    this.canvas.freeDrawingBrush.width = this.selectedWidth;
  }

  customColor() {
    this.custom = this.selectedColor;
    const dialogRef = this.dialog.open(CustomColorComponent, {
      data: { color: this.custom, oldColor: this.selectedColor },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.custom = result;
        this.selectedColor = result;
        this.canvas.freeDrawingBrush.color = this.selectedColor;
        this.showSelectedColor();
        this.customColors[this.index] = result;
        if (this.index < 7) {
          this.index++;
          console.log('index < 8');
        } console.log(this.index);
        console.log('custom colors: ', this.customColors);
      }
    });
    console.log('custom: ', this.custom);
  }

  getButtonBackgroundColor() {
    return this.index ? 'rgba(0, 0, 255, 0.5)' : 'blue';
  }


  formatLabel(value: number): string {
    return `${value}`;
  }

  @ViewChild('screen') screen!: ElementRef;
  @ViewChild('scncanvas') scncanvas!: ElementRef;
  @ViewChild('downloadLink') downloadLink!: ElementRef;

  download() {
    console.log('in download ', this.screen.nativeElement);
    const elementToCapture = document.getElementById('drawing');
    // if (elementToCapture) {
    html2canvas(this.screen.nativeElement,
      {
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        // canvas.setAttribute('crossOrigin', 'anonymous');
        console.log(canvas.toDataURL());
        this.scncanvas.nativeElement.src = canvas.toDataURL();
        this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
        this.downloadLink.nativeElement.download = 'marble-diagram.png';
        this.downloadLink.nativeElement.click();
        // const imgData = canvas.toDataURL('image/png');
        // const a = document.createElement('a');
        // a.href = imgData;
        // a.download = 'myDrawing.png';
        // a.click;
      })
    // }
  }

  openExamples(): void {
    this.router.navigate(['/examples']);
  }

  openMyDrawings(): void {
    this.router.navigate(['/my-drawings']);
  }





  changeFillMode() {
    this.isFillMode = !this.isFillMode;
    console.log('fill mode: ', this.isFillMode);
  }

  isDrawing: boolean = false;

  toggleDrawMode(): void {
    this.isDrawing = !this.isDrawing;
    this.canvas.isDrawingMode = this.isDrawing;
    console.log('isDrawMode', this.isDrawing);
  }

  toggleFillMode(): void {
    this.isFillMode = !this.isFillMode;
    console.log('fill mode: ', this.isFillMode);
  }

  handleMouseMove(event: fabric.IEvent): void {
    // Additional drawing functionality can be added here
  }

  handleMouseUp(): void {
    // Additional handling on mouse up can be added here
  }

  handleMouseDown(event: fabric.IEvent): void {
    if (this.isFillMode) {
      this.canvas.selection = false;
      const pointer = this.canvas.getPointer(event.e);
  
      // Create a mock event object with x and y properties
      const mockEvent = { clientX: pointer.x, clientY: pointer.y } as MouseEvent;
  
      // Find the target object at the clicked position
      const clickedObject = this.canvas.findTarget(mockEvent, true);
  
      // Check if an object was clicked
      if (clickedObject instanceof fabric.Object) {
        // Fill the clicked object with the selected color
        clickedObject.set({ fill: this.selectedColor });
        this.canvas.renderAll();
      }
    }
  }

}

// toggleDrawingMode() {
//   this.erasingMode = false;
// }

// toggleErasingMode() {
//   this.erasingMode = !this.erasingMode;
//   console.log('Erasing Mode:', this.erasingMode);
// }

// handleDrawingOrErasing(event: fabric.IEvent) {
//   const target = event.target as fabric.Object;

//   if (this.erasingMode && target && target instanceof fabric.Object) {
//     // Erasing mode: Set the color to be transparent
//     target.set({ fill: 'rgba(0, 0, 0, 0)', stroke: 'rgba(0, 0, 0, 0)' });
//     this.canvas.renderAll();
//   } else if (!this.erasingMode && target && target instanceof fabric.Object) {
//     // Drawing mode: Set the color to your desired drawing color
//     target.set({ fill: this.selectedColor, stroke: 'white' });
//     this.canvas.renderAll();
//   }
// }

// undoLastAction() {
//   const history = this.canvas._objects; // Access Fabric.js internal objects
//   if (history && history.length > 0) {
//     history.pop(); // Pop the last object from history
//     this.canvas.renderAll();
//   }
// }


// toggleEraseMode() {
//   this.erasingMode = !this.erasingMode;

//   if (this.erasingMode) {
//     // Set the brush color to match the canvas background
//     this.canvas.freeDrawingBrush.color = this.canvas.backgroundColor?.toString() || '#c3c3c3';
//     this.canvas.isDrawingMode = true;
//   } else {
//     // Set the brush color back to the desired drawing color
//     this.canvas.freeDrawingBrush.color = this.selectedColor;
//     this.canvas.isDrawingMode = false;
//   }
// }