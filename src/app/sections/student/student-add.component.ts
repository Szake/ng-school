import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { StudentService } from '../../services/student.service';

import { StudentEntity } from '../../models/student-constructor';

import { Class } from '../../models/class';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './student-form.component.html',
  styleUrls: [ './student.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class StudentAddComponent implements OnInit {
  title = 'Create a student';
  student = new StudentEntity(null, '', '', '', null, null, '');
  groups: Class[];

  constructor(
    private router: Router,
    private classService: ClassService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.studentService.getLast().then(data => {
      if (this.student._id === null) {
        this.student._id = ++data;
      }
    });

    this.classService.getAll().then(data => {
      this.groups = data;
      if (this.student.classId === null && data[0]) {
        this.student.classId = data[0]['_id'];
      }
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.student); }

  // Push the new student to the store:
  submitForm() {
    const new_student = {...this.student};
    this.studentService.addOne(new_student).then(result => {
      this.classService.addStudent(new_student).then(result => {
        this.router.navigate(['/students']);
      });
    });
  }
}
