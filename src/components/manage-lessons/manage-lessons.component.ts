// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-manage-lessons',
//   standalone: true,
//   imports: [],
//   templateUrl: './manage-lessons.component.html',
//   styleUrl: './manage-lessons.component.css'
// })


// export class ManageLessonsComponent {

// }




import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../services/lessons.service';
import { ReactiveFormsModule } from '@angular/forms';
import { log } from 'console';


import { UserService } from '../../services/user.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // כדי לעבוד עם שדות קלט (input)
import { MatButtonModule } from '@angular/material/button'; // כפתורים (אם יש לך)
import { BrowserModule } from '@angular/platform-browser';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-manage-lessons',
  standalone: true,
  imports: [ReactiveFormsModule
    , MatIconModule,
        ReactiveFormsModule,    
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        MatIconButton,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
  ],
  templateUrl: './manage-lessons.component.html',
  styleUrl: './manage-lessons.component.css'
})
export class ManageLessonsComponent implements OnInit {
  lessons: any[] = [];
  lessonForm: FormGroup;
  courseId: number | null = null;
  editingLesson: any = null;
  selectedCourseId: number =0;
  isStudent:string=sessionStorage.getItem('role')||"";

  constructor(
    private lessonService: LessonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    console.log('courseId from URL:', this.courseId);
    if (this.courseId) {
      this.loadLessons();
    }
  }

  loadLessons() {
    if (!this.courseId) return;
   
    this.lessonService.getLessons(this.courseId).subscribe({

      next: (data) => this.lessons = data,
      error: (err) => console.error('Error fetching lessons', err)
    });
  }



  // loadLessons(courseId: number) {
  //   this.lessonService.getLessons(courseId).subscribe({
  //     next: (data) => this.lessons = data,
  //     error: (err) => console.error('Error fetching lessons', err)
  //   });
  // }
  


  

  editLesson(lesson: any, courseId:number) {
    this.editingLesson = lesson;
    this.selectedCourseId = courseId;
    console.log( this.selectedCourseId);
    this.lessonForm.patchValue(lesson);
  }
  

  updateLesson() {
    if (this.lessonForm.valid && this.editingLesson && this.selectedCourseId) {
      this.lessonService.updateLesson(this.selectedCourseId, this.editingLesson.id, this.lessonForm.value)
        .subscribe({
          next: () => {
           
            this.lessonForm.reset();
            this.editingLesson = null;
             this.loadLessons();
          },
          error: (err) => console.error('Error updating lesson', err)
        });
    }
  }
  addLesson() {  
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    console.log('addLesson:', this.courseId);  
    if (this.lessonForm.valid && this.courseId) {
      const lessonData = this.lessonForm.value;      
      this.lessonService.createLesson(this.courseId, lessonData).subscribe({
        next: () => {        
         
          this.lessonForm.reset();
          this.loadLessons(); // רענון רשימת השיעורים
        },
        error: (err) => console.error('Error adding lesson', err)
      });
    } else {
      alert("שגיאה: נא לבחור קורס ולהזין את כל הפרטים!");
    }
  }
  
  

  deleteLesson(id: number,lesson:number) {
    if (confirm('האם אתה בטוח שברצונך למחוק את השיעור?')) {
      console.log("course",this.courseId);
      console.log("lesson",lesson);
      this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

      this.lessonService.deleteLesson( this.courseId,lesson).subscribe({
        next: () => {
        

          this.loadLessons();
        },
        error: (err) => console.error('Error deleting lesson', err)
      });
    }
  }
}

