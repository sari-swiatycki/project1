
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/api/courses';
  private coursesSubject = new BehaviorSubject<any[]>([]);
  courses$ = this.coursesSubject.asObservable();

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token =sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // יצירת קורס חדש
  createCourse(course: { title: string; description: string; teacherId: number }): Observable<any> {
    return this.http.post(this.apiUrl, course);
  }
 
  // עדכון קורס קיים
  updateCourse(id: number, course: { title: string; description: string; teacherId: number }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  // מחיקת קורס לפי ID
  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // קבלת כל הקורסים של המורה
  getCourses(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUserIdFromToken(): number | null {
    const token =sessionStorage.getItem('token');
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // מפענח את ה-Payload של ה-JWT
      return payload.userId || null; // מחזיר את ה-userId אם קיים
    } catch (error) {
      console.error('שגיאה בפענוח הטוקן:', error);
      return null;
    }
  }
  getCourseById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }


  
  

  getStudentCourses(studentId: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/student/${studentId}`);
  }
  

  joinCourse(userId: string,courseId: string ): Observable<any> { 
    console.log("join course courses service courseId",courseId);
    console.log("userId הלציצחעעימעי",userId);
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId });
  }

  // הסרת סטודנט מקורס
  leaveCourse(userId: string,courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
  
      body: { userId }
    });
  }


}
