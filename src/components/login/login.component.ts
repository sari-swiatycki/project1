import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // כדי לעבוד עם שדות קלט (input)
import { MatButtonModule } from '@angular/material/button'; // כפתורים (אם יש לך)
import { BrowserModule } from '@angular/platform-browser';
import { MatIconButton } from '@angular/material/button';


import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule,    
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService,    
    private router: Router,public  DialogRef:MatDialogRef<LoginComponent>)
   {
    // יצירת ה-FormGroup עם שדות וולידציה
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],    
      password: ['', [Validators.required, Validators.minLength(4)]], // שדה סיסמה, וולידציה חובה ואורך מינימלי      
    });
  }
  // פונקציה לשליחה של הטופס
  onSubmit() {
    if (this.loginForm.valid) {
      // שולחים את הנתונים ל-UserService להתחברות
      this.userService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
         
          sessionStorage.setItem('token', response.token);
         sessionStorage.setItem('role', response.role);
         sessionStorage.setItem('userid', response.userId); 
          console.log("userID",response.userId); 

          this.DialogRef.close();
          this.router.navigate(['/menu']);
        },
        error: (error) => {
          console.error('Error logging in', error);
          alert('שגיאה בהתחברות');
        }
      });
    }
  }
}
