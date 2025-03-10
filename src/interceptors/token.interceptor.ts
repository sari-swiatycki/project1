import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
 const token = sessionStorage.getItem('token');

  let headers = req.headers;
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }
  
  const clonedReq = req.clone({ headers });

  return next(clonedReq);
};
