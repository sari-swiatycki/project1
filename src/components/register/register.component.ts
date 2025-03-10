import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from '@angular/material/input'; // כדי לעבוד עם שדות קלט (input)
import { MatButtonModule } from '@angular/material/button'; // כפתורים (אם יש לך)
import { BrowserModule } from '@angular/platform-browser';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule
    ,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // יצירת FormGroup
  registerForm: FormGroup;

  constructor(private fb: FormBuilder , private userService: UserService, 
    public DialogRef:MatDialogRef<LoginComponent>,
    private router: Router) {
    // יצירת ה-FormGroup עם שדות וולידציה
    this.registerForm = this.fb.group({
      name: ['', Validators.required], // שדה שם, וולידציה חובה
      email: ['', [Validators.required, Validators.email]], // שדה דוא"ל, וולידציה חובה ופורמט דוא"ל
      password: ['', [Validators.required, Validators.minLength(4)]], // שדה סיסמה, וולידציה חובה ואורך מינימלי
      role: ['', Validators.required] // שדה תפקיד, וולידציה חובה
    });
  }
  onSubmit() {
    if (this.registerForm.valid) {    
      // שולחים את הנתונים ל-UserService לרישום
      this.userService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User registered successfully', response);
          this.DialogRef.close();
          this.router.navigate(['/menu']);
          alert('ההרשמה הצליחה!');
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('role',this.registerForm.value.role);
          sessionStorage.setItem('userid', response.userId); 
        },
        error: (error) => {
          console.error('Error registering user', error);
          alert('שגיאה בהרשמה');
        }       
      });
    
    }

  }
  }
