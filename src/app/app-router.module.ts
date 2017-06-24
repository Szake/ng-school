import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// States:
import { DashboardComponent } from './sections/dashboard/dashboard.component';

import { ClassesComponent } from './sections/classes/classes.component';
import { ClassComponent } from './sections/class/class.component';
import { ClassAddComponent } from './sections/class/class-add.component';
import { ClassEditComponent } from './sections/class/class-edit.component';

import { TeachersComponent } from './sections/teachers/teachers.component';
import { TeacherComponent } from './sections/teacher/teacher.component';
import { TeacherAddComponent } from './sections/teacher/teacher-add.component';
import { TeacherEditComponent } from './sections/teacher/teacher-edit.component';

import { StudentsComponent } from './sections/students/students.component';
import { StudentComponent } from './sections/student/student.component';
import { StudentAddComponent } from './sections/student/student-add.component';
import { StudentEditComponent } from './sections/student/student-edit.component';

import { PageNotFoundComponent } from './sections/404/404.component';

// Routes:
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },

  { path: 'classes', component: ClassesComponent },
  { path: 'class/create', component: ClassAddComponent },
  { path: 'class/:id', component: ClassComponent },
  { path: 'class/edit/:id', component: ClassEditComponent },

  { path: 'teachers', component: TeachersComponent },
  { path: 'teacher/create', component: TeacherAddComponent },
  { path: 'teacher/:id', component: TeacherComponent },
  { path: 'teacher/edit/:id', component: TeacherEditComponent },

  { path: 'students', component: StudentsComponent },
  { path: 'student/create', component: StudentAddComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'student/edit/:id', component: StudentEditComponent },

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
