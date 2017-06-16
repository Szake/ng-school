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

// Common:
import { HeaderNavigationComponent } from './common/header-navigation/navigation.component';
import { HeaderAccountComponent } from './common/header-account/account.component';
import { SliderComponent } from './common/slider/slider.component';
import { FooterControlsComponent } from './common/footer-controls/controls.component';

// Routes:
import { DashboardComponent } from './sections/dashboard/dashboard.component';
import { ClassesComponent } from './sections/classes/classes.component';
import { ClassComponent } from './sections/class/class.component';
import { TeachersComponent } from './sections/teachers/teachers.component';
import { TeacherComponent } from './sections/teacher/teacher.component';
import { StudentsComponent } from './sections/students/students.component';
import { StudentComponent } from './sections/student/student.component';
import { StudentAddComponent } from './sections/student/student-add.component';
import { PageNotFoundComponent } from './sections/404/404.component';


// MODULE:
@NgModule({
  declarations: [
    AppComponent,

    HeaderNavigationComponent,
    HeaderAccountComponent,
    SliderComponent,
    FooterControlsComponent,

    DashboardComponent,
    ClassesComponent,
    ClassComponent,
    TeachersComponent,
    TeacherComponent,
    StudentsComponent,
    StudentComponent,
    StudentAddComponent,
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
    StudentService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
