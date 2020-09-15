import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';

const MyComponentMaterial = [
  
  MatFormFieldModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatGridListModule

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyComponentMaterial
  ],
  exports: [
    MyComponentMaterial
  ]
})
export class MaterialModule { }
