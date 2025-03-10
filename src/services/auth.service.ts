
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor() {}

//   getUser() {
//     return JSON.parse(localStorage.getItem('user')!); // מחזיר את המשתמש מה-LocalStorage
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('token'); // בודק אם יש Token
//   }

//   logout() {
//    sessionStorage.removeItem('token'); // מוחק את ה-Token
//    sessionStorage.removeItem('user'); // מוחק את פרטי המשתמש
//   }
// }




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  getUser() {
    const token =sessionStorage.getItem('token');
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // מפענח את ה-JWT
      return { id: payload.userId, role: payload.role }; 
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
   sessionStorage.removeItem('token');
  }
}
