import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// States:
import { DashboardComponent } from './sections/dashboard/dashboard.component';
import { ClassesComponent } from './sections/classes/classes.component';
import { ClassComponent } from './sections/class/class.component';
import { ClassAddComponent } from './sections/class/class-add.component';
import { TeachersComponent } from './sections/teachers/teachers.component';
import { TeacherComponent } from './sections/teacher/teacher.component';
import { TeacherAddComponent } from './sections/teacher/teacher-add.component';
import { StudentsComponent } from './sections/students/students.component';
import { StudentComponent } from './sections/student/student.component';
import { StudentAddComponent } from './sections/student/student-add.component';
import { PageNotFoundComponent } from './sections/404/404.component';

// Routes:
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'class/new', component: ClassAddComponent },
  { path: 'class/:id', component: ClassComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'teacher/new', component: TeacherAddComponent },
  { path: 'teacher/:id', component: TeacherComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'student/new', component: StudentAddComponent },
  { path: 'student/:id', component: StudentComponent },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent }
];

// Module:
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterModule { }
