import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shape } from '../classes/shape';
import { Drawing } from '../classes/drawing';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  private url = 'https://localhost:44311/api';

  getShapesByLevel(level: number): Observable<Shape[]> {
    let param: any = { 'level': level };
    console.log()
    return this.http.get<Shape[]>(`${this.url}/shapes/getShapesByLevel`, { params: param })
  }

  getShape(shapeId: number): Observable<Shape> {
    let param: any = { 'shapeId': shapeId };
    return this.http.get<Shape>(`${this.url}/shapes/getShape`, { params: param })
  }

  getMyDrawings(userId: number): Observable<Drawing[]> {
    let param: any = { 'userId': userId };
    return this.http.get<Drawing[]>(`${this.url}/drawings/getMyDrawings`, { params: param });
  }

  getExampleDrawings(shapeId: number): Observable<Drawing[]> {
    let param: any = { 'shapeId': shapeId };
    return this.http.get<Drawing[]>(`${this.url}/drawings/getExampleDrawings`, { params: param });
  }

  addDrawing(drawing: Drawing) {
    return this.http.post<Drawing>(`${this.url}/drawings`, drawing);
  }

  changePublished(drawingId: number, isPublished: boolean) {
    let params: any = { 'drawingId': drawingId, 'isPublished': isPublished };
    return this.http.put<Drawing>(`${this.url}/drawings`, { params: params });
  }

  deleteDrawing(drawingId: number) {
    let param: any = { 'drawingId': drawingId };
    this.http.delete<Drawing>(`${this.url}/drawings`, { params: param });
  }
}
