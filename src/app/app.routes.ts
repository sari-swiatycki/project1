import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { ShowCoursesComponent } from '../components/show-courses/show-courses.component';
import { LoginandregisterComponent } from '../components/loginandregister/loginandregister.component';

import { AuthGuard } from '../guard/auth.guard';

import { ManagecoursesComponent } from '../components/managecourses/managecourses.component';
import { MenuComponent } from './menu/menu.component';
import { ManageLessonsComponent } from '../components/manage-lessons/manage-lessons.component';

export const routes: Routes = [  
    { path: '', component: LoginandregisterComponent},
    { path: 'courses', component: ShowCoursesComponent }, 
    
    {path:'menu',component:MenuComponent},
    { path: 'manage-courses', component: ManagecoursesComponent, canActivate:[AuthGuard] },

    { path: 'manage-lessons/:courseId', component: ManageLessonsComponent },
];



