


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../services/courses.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LessonService } from '../../services/lessons.service';
import { Router } from '@angular/router';
import { log } from 'console';

import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';


@Component({
  selector: 'app-managecourses',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './managecourses.component.html',
  styleUrl: './managecourses.component.css'
})
export class ManagecoursesComponent implements OnInit{
  courses: any[] = [];
  courseForm: FormGroup;
  lessons: any[] = [];
  lessonForm: FormGroup;
  selectedCourseId: number | null = null;
  editingCourse: any = null; // לשמירת קורס בעריכה
  isTeacher: boolean = false; // משתנה שמבדוק אם המשתמש הוא מורה

  constructor(private courseService: CourseService, private fb: FormBuilder, 
    private lessonService: LessonService, private router: Router,private dialog: MatDialog ) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
  
    });
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
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
       
        this.courseForm.reset();
        this.loadCourses();
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
       
        this.courseForm.reset();
        this.editingCourse = null;
        this.loadCourses();
      },
      error: (err) => console.error('Error updating course', err)
    });
  }
}

deleteCourse(id: number) {
  if (confirm('האם אתה בטוח שברצונך למחוק את הקורס?')) {
    this.courseService.deleteCourse(id).subscribe({
      next: () => {
        alert('הקורס נמחק בהצלחה!');
        this.loadCourses();
      },
      error: (err) => console.error('Error deleting course', err)
    });
  }
}



manageLessons(courseId: number) {
console.log(courseId);
this.router.navigate(['/manage-lessons', courseId]);
}


openAddCourseModal() {
  const dialogRef = this.dialog.open(AddCourseComponent, {
    width: '400px' // גודל המודל
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === 'added') {
      console.log("קורס נוסף בהצלחה!");
      // אפשר לקרוא לפונקציה `loadCourses()` כאן כדי לרענן את הרשימה
    }
  });
}


}
