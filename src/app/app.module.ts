import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


// Project:
import { AppComponent } from './app.component';
import { AppRouterModule } from './app-router.module';

// Services:
import { ClassService } from './services/class.service';
import { TeacherService } from './services/teacher.service';
import { StudentService } from './services/student.service';

import { SortService } from './services/sort.service';

// Common:
import { HeaderNavigationComponent } from './common/header-navigation/navigation.component';
import { HeaderAccountComponent } from './common/header-account/account.component';
import { SliderComponent } from './common/slider/slider.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { SearchBarComponent } from './common/search-bar/search-bar.component';
import { FooterControlsComponent } from './common/footer-controls/controls.component';

// Routes:
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


// MODULE:
@NgModule({
  declarations: [
    AppComponent,

    HeaderNavigationComponent,
    HeaderAccountComponent,
    SliderComponent,
    PaginationComponent,
    SearchBarComponent,
    FooterControlsComponent,

    DashboardComponent,

    ClassesComponent,
    ClassComponent,
    ClassAddComponent,
    ClassEditComponent,

    TeachersComponent,
    TeacherComponent,
    TeacherAddComponent,
    TeacherEditComponent,

    StudentsComponent,
    StudentComponent,
    StudentAddComponent,
    StudentEditComponent,

    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,

    AppRouterModule
  ],
  providers: [
    ClassService,
    TeacherService,
    StudentService,
    SortService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
