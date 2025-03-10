import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginandregisterComponent } from '../components/loginandregister/loginandregister.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginandregisterComponent, RouterLink, RouterLinkActive,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
