// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LessonService {
//   private apiUrl = 'http://localhost:3000/api/courses'; // כתובת הבסיס של ה-API

//   constructor(private http: HttpClient) {}

//   private getAuthHeaders() {
//     const token =sessionStorage.getItem('token');
//     return {
//       headers: new HttpHeaders({
//         Authorization: `Bearer ${token}`
//       })
//     };
//   }

//   // קבלת כל השיעורים בקורס מסוים
//   getLessons(courseId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${courseId}/lessons`, this.getAuthHeaders());
//   }

//   // קבלת פרטי שיעור לפי ID
//   getLesson(courseId: number, lessonId: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, this.getAuthHeaders());
//   }
//   // יצירת שיעור חדש
//   createLesson(courseId: number, lessonData: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData, this.getAuthHeaders());
//   }


//   // 4️⃣ עדכון שיעור קיים
//   updateLesson(courseId: number, lessonId: number, lessonData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lessonData, this.getAuthHeaders());
//   }

//   // 5️⃣ מחיקת שיעור
//   deleteLesson(courseId: number, lessonId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, this.getAuthHeaders());
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token =sessionStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  // קבלת שיעורים לקורס מסוים
  getLessons(courseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${courseId}/lessons`);
  }
  // קבלת שיעור לפי ID
  getLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
  // יצירת שיעור חדש בקורס
  createLesson(courseId: number, lessonData: { title: string; content: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, lessonData);
  }
  // מחיקת שיעור
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
   console.log("xfcgvhbj");
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`);
  }
  updateLesson(courseId: number, lessonId: number, lesson: { title: string; content: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/courses/${courseId}/lessons/${lessonId}`, lesson);
  } 
}
