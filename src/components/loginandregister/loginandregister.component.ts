
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-loginandregister',
  standalone: true,
  imports: [],
  templateUrl: './loginandregister.component.html',
  styleUrl: './loginandregister.component.css'
})
export class LoginandregisterComponent {
  constructor(private dialog: MatDialog) {}

  openDialog(type: string) {
    if (type === 'login') {
      this.dialog.open(LoginComponent, { width: '400px' });
    } else if (type === 'register') {
      this.dialog.open(RegisterComponent, { width: '400px' });
    }
}
}







