export class Drawing {
    id: number;
    name?: string;
    shapeId: number;
    userId: number;
    displayDrawingUrl: string;
    drawingUrl: string;
    isPublished: boolean;

    constructor() {
        this.id = 0;
        this.shapeId = 0;
        this.userId = 0;
        this.displayDrawingUrl = '';
        this.drawingUrl = '';
        this.isPublished = false;
    }
}
