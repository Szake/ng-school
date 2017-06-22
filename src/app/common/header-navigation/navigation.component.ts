import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.css' ]
})

export class HeaderNavigationComponent implements OnInit {
  classes = 0;
  teachers = 0;
  students = 0;

  constructor(
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    // this.classService.getAll().subscribe(list => {
    //   this.classes = list.length;
    // });
    // this.teacherService.getAll().subscribe(list => {
    //   this.teachers = list.length;
    // });
    // this.studentService.getAll().subscribe(list => {
    //   this.students = list.length;
    // });
  }
}
