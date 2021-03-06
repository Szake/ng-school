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
  templateUrl: './class-form.component.html',
  styleUrls: [ './class.component.scss' ],
  animations: [ titleIn, contentIn ]
})

export class ClassAddComponent implements OnInit {
  title = 'Create a class';
  group = new ClassEntity(null, '', 1, null, [], '');
  teachers: Teacher[];
  students: Student[];
  load = 'in';

  constructor(
    private router: Router,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.classService.getLast().then(data => {
      if (this.group._id === null) {
        this.group._id = ++data;
      }
    });

    this.teacherService.getAll().then(data => {
      this.teachers = data;
      if (this.group.teacherId === null && data[0]) {
        this.group.teacherId = data[0]['_id'];
      }
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.group); }

  // Push the new student to the store:
  submitForm() {
    const new_group = { ...this.group };
    this.classService.addOne(new_group).then(result => {
      this.teacherService.addClass(new_group).then(result => {
        this.router.navigate(['/classes']);
      });
    });
  }
}
