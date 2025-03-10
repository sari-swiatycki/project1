// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-course',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-course.component.html',
//   styleUrl: './add-course.component.css'
// })
// export class AddCourseComponent {

// }





import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseService } from '../../services/courses.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // אם אתה משתמש גם ב-input


@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [  ReactiveFormsModule,MatInputModule,MatFormFieldModule, ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{
  courseForm: FormGroup;
  editingCourse: any = null;
  courses: any[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddCourseComponent>,
    private courseService: CourseService
  ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
 
  ngOnInit() {
    this.loadCourses();
  }


  loadCourses() {
    this.courseService.getCourses().subscribe({
      next: (data) => this.courses = data,
      error: (err) => console.error('Error fetching courses', err)
    });
  }

  // addCourse() {
  //   if (this.courseForm.valid) {
  //     const teacherId = this.courseService.getUserIdFromToken();
  //     if (!teacherId) {
  //       alert('שגיאה: לא נמצא Teacher ID בטוקן!');
  //       return;
  //     }

  //     const newCourse = { ...this.courseForm.value, teacherId };

  //     this.courseService.createCourse(newCourse).subscribe({
  //       next: () => {
  //         alert('קורס נוסף בהצלחה!');
  //         this.dialogRef.close('added'); // סגירת המודל והחזרת ערך להורה
  //       },
  //       error: (err) => console.error('Error creating course', err)
  //     });
  //   }
  // }



  addCourse() {
    if (this.courseForm.valid) {
      const teacherId = this.courseService.getUserIdFromToken();
  // שליפת ה-teacherId מה-Token
      console.log('Teacher ID:', teacherId);
  
      if (!teacherId) {
        alert('שגיאה: לא נמצא Teacher ID בטוקן!');
        return;
      }
  
      const newCourse = { ...this.courseForm.value, teacherId };
  
      this.courseService.createCourse(newCourse).subscribe({
        next: () => {
          alert('קורס נוסף בהצלחה!');
          this.loadCourses();
          this.courseForm.reset();
          
        },
        error: (err) => console.error('Error creating course', err)
      });
    }
  }
  editCourse(course: any) {
    this.editingCourse = course;
    this.courseForm.patchValue(course);
  }


  updateCourse() {
    if (this.courseForm.valid && this.editingCourse) {
      this.courseService.updateCourse(this.editingCourse.id, {
        ...this.courseForm.value,
        teacherId: this.editingCourse.teacherId
      }).subscribe({
        next: () => {
          alert('הקורס עודכן בהצלחה!');
          this.courseForm.reset();
          this.editingCourse = null;
          this.loadCourses();
        },
        error: (err) => console.error('Error updating course', err)
      });
    }
  }
  
  close() {
    this.dialogRef.close(); // סגירת המודל
  }
}

