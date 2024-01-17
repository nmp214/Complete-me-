import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DrawComponent } from './components/draw/draw.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { MyDrawingsComponent } from './components/my-drawings/my-drawings.component';
import { SaveImageComponent } from './components/save-image/save-image.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'draw', component: DrawComponent },
    { path: 'examples', component: ExamplesComponent },
    { path: 'my-drawings', component: MyDrawingsComponent },
    { path: 'image', component: SaveImageComponent }
];
