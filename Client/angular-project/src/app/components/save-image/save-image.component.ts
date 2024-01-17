import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fabric } from 'fabric';
import { FormsModule } from '@angular/forms';
import getPixels from 'get-pixels';

@Component({
  selector: 'app-save-image',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './save-image.component.html',
  styleUrls: ['./save-image.component.scss']
})
export class SaveImageComponent implements OnInit {
  @ViewChild('canvasElement', { static: true }) canvasElement!: ElementRef;

  canvas!: fabric.Canvas;
  isDrawing: boolean = false;
  isFillMode: boolean = false;
  selectedColor: string = '#000000';

  ngOnInit(): void {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement, {
      isDrawingMode: false,
      selection: false,
    });
    this.canvas.freeDrawingBrush = new fabric.PencilBrush(this.canvas);

    fabric.Image.fromURL('../../../assets/draw.png', (img) => {
      img.set({ selectable: false });
      img.set({ crossOrigin: 'Anonymous' });
      console.log(img);
      this.canvas.setBackgroundImage(img, this.canvas.renderAll.bind(this.canvas));
      this.canvas.bringToFront(img);
    });

    this.canvas.on('mouse:down', (event) => this.handleMouseDown(event));
    this.canvas.on('mouse:move', (event) => this.handleMouseMove(event));
    this.canvas.on('mouse:up', () => this.handleMouseUp());
  }

  toggleDrawMode(): void {
    this.isDrawing = !this.isDrawing;
    this.canvas.isDrawingMode = this.isDrawing;
    console.log('isDrawMode', this.isDrawing);
  }

  toggleFillMode(): void {
    this.isFillMode = !this.isFillMode;
    console.log('fill mode: ', this.isFillMode);
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
  // handleMouseDown(event: fabric.IEvent): void {
  //   if (this.isFillMode) {
  //     const pointer = this.canvas.getPointer(event.e);
  
  //     // Create a mock event object with x and y properties
  //     // const mockEvent = { clientX: pointer.x, clientY: pointer.y } as MouseEvent;
  
  //     // Find the target object at the clicked position
  //     const clickedObject = this.canvas.findTarget(event.e, true);
  
  //     // Check if an object was clicked
  //     if (clickedObject instanceof fabric.Image) {
  //       const ctx = this.canvas.getContext();

  //       // Get the image data
  //       // const imageData = clickedObject.toDataURL({});
  //       const imageData = ctx.getImageData(pointer.x, pointer.y, 1, 1);

  //       // Use get-pixels to analyze pixel data
  //       // getPixels(imageData, (err: any, pixels:any) => {
  //       //   if (err) {
  //       //     console.error('Error getting pixels:', err);
  //       //     return;
  //       //   }
  
  //         // Check if the clicked pixel is non-transparent (alpha value > 0)
  //         const alphaValue = imageData.data[3];
  //         if (alphaValue > 0) {
  //           // Fill the clicked object with the selected color
  //           clickedObject.set({ fill: this.selectedColor });
  //           this.canvas.renderAll();
  //         }
        
  //     }
  //   }
  // }
  
  

  handleMouseMove(event: fabric.IEvent): void {
    // Additional drawing functionality can be added here
  }

  handleMouseUp(): void {
    // Additional handling on mouse up can be added here
  }

  fillArea(x: number, y: number, color: string): void {
    const context = this.canvas.getContext() as CanvasRenderingContext2D;
    const imageData = context.getImageData(x, y, 1, 1);

    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = parseInt(color.substring(1, 3), 16); // Red
      imageData.data[i + 1] = parseInt(color.substring(3, 5), 16); // Green
      imageData.data[i + 2] = parseInt(color.substring(5, 7), 16); // Blue
      // Alpha channel remains unchanged
    }

    context.putImageData(imageData, x, y);
  }
}
