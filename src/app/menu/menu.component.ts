import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; // סרגל כלים
import { MatButtonModule, MatIconButton } from '@angular/material/button'; // כפתורים
import { MatMenuModule } from '@angular/material/menu'; // תפריט נפתח
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [

    RouterModule,  // עבור נתיבים
    MatToolbarModule,  // עיצוב ה-toolbar
    MatButtonModule,   // כפתורים
    MatIconModule,     // אייקונים
    MatMenuModule,     // תפריטים
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
