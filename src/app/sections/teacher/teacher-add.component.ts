import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';

import { TeacherEntity } from '../../models/teacher-constructor';

import { Class } from '../../models/class';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './teacher-form.component.html',
  styleUrls: [ './teacher.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class TeacherAddComponent implements OnInit {
  title = 'Create a teacher';
  teacher = new TeacherEntity(null, '', '', '', null, null, '');
  groups: Class[];

  constructor(
    private router: Router,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.teacherService.getLast().then(data => {
      if (this.teacher._id === null) {
        this.teacher._id = ++data;
      }
    });

    this.classService.getAll().then(data => {
      this.groups = data;
      if (this.teacher.classId === null && data[0]) {
        this.teacher.classId = data[0]['_id'];
      }
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.teacher); }

  // Push new teacher to the store:
  addTeacher() {
    const new_teacher = {...this.teacher};
    this.teacherService.addOne(new_teacher).then(result => {
      this.classService.addTeacher(new_teacher).then(result => {
        this.router.navigate(['/teachers']);
      });
    });
  }
}
