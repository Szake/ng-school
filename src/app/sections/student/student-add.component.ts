import { Component, OnInit } from '@angular/core';

import { ClassService } from '../../services/class.service';
import { StudentService } from '../../services/student.service';
import { StudentEntity } from '../../models/student-constructor';
import { Class } from '../../models/class';


@Component({
  templateUrl: './student-add.component.html',
  styleUrls: [ './student.component.css' ]
})

export class StudentAddComponent implements OnInit {
  student = new StudentEntity(null, '', '', '', null, null, '');
  groups: Class[];

  constructor(
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

  // Push new student to the store:
  addStudent() {
    this.studentService.addOne(this.student);
  }
}
