import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { ClassEntity } from '../../models/class-constructor';
import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './class-add.component.html',
  styleUrls: [ './class.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class ClassAddComponent implements OnInit {
  group = new ClassEntity(null, '', 1, null, null, '');
  teachers: Teacher[];
  students: Student[];

  constructor(
    private router: Router,
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.classService.getLast().then(data => {
      if (this.group._id === null) {
        this.group._id = ++data;
      }
    });
    this.teacherService.getAll().subscribe(data => {
      this.teachers = data;
      if (this.group.teacherId === null && data[0]) {
        this.group.teacherId = data[0]['_id'];
      }
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.group); }

  // Push the new student to the store:
  addClass() {
    const new_group = {...this.group};
    this.classService.addOne(new_group).then(result => {
      this.teacherService.addClass(new_group).then(result => {
        this.router.navigate(['/classes']);
      });
    });
  }
}
