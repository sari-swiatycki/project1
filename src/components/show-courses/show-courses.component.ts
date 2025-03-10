// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-show-courses',
//   standalone: true,
//   imports: [],
//   templateUrl: './show-courses.component.html',
//   styleUrl: './show-courses.component.css'
// })
// export class ShowCoursesComponent {

// }



import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/courses.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatIconButton } from '@angular/material/button';


@Component({
  selector: 'app-show-courses',
  standalone: true,
  imports: [RouterLink, MatIconModule,
      ReactiveFormsModule,    
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      MatIconButton],
  templateUrl: './show-courses.component.html',
  styleUrl: './show-courses.component.css'
})
export class ShowCoursesComponent implements OnInit {

  courses: any[] = []; // מערך לאחסון הקורסים
  joinedCourses: any[] = [];
  isStudent = (sessionStorage.getItem("role") == "student") ? true : false;
  userId =sessionStorage.getItem("userid")||'';
  showAddForm = false;
  showUpdateForm = false;
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
  console.log("sessionStorage.getItem",this.userId )

    this.courseService.getCourses().subscribe({
      next: (data) => {       
        this.courses = data; // שמירת הנתונים במערך
        console.log(data)
       
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
     
    });
   
    this.loadCoursesByStudent();


    // this.courseService.courses$.subscribe(courses => {
    //   this.joinedCourses = courses;
    //   console.log("joined courses", this.joinedCourses);
    // }, error => {
    //   console.error("Error fetching joined courses:", error);
    // });
  }

  isEnoled(courseId: string): boolean {
    return this.joinedCourses.some(course => course.id === courseId);
  }

  join(courseId: string) {
    console.log("show courses courseId",this.userId);
     this.courseService.joinCourse(this.userId,courseId,).subscribe({
      next: () => {
       
        console.log('Student enrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error) => {
      console.error('Error enrolling in course:', error);
      }
    });
  }
  leave(courseId: string) {
    this.courseService.leaveCourse(this.userId,courseId).subscribe({
      next: () => {
        console.log('Student unenrolled successfully');
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט

      },
      error: (error) => {
        console.error('Error unenrolling from course:', error);
      }
    });
  }
  loadCoursesByStudent(): void {
    console.log("load");
    
    const studentId =sessionStorage.getItem('userid'); 
    if (studentId) {
      this.courseService.getStudentCourses(studentId).subscribe({
        next: (data) => {
          console.log("data",data)
          this.joinedCourses = data;
        },
        error: (error) => {
          console.error('Error fetching student courses:', error);
        }
      });
    }
  }


  
}
