import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
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
    this.classService.getAmount().subscribe(value => {
      this.classes = value;
    });
    this.teacherService.getAmount().subscribe(value => {
      this.teachers = value;
    });
    this.studentService.getAmount().subscribe(value => {
      this.students = value;
    });
  }
}
