import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

import { TeacherEntity } from '../../models/teacher-constructor';

import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './teacher-form.component.html',
  styleUrls: [ './teacher.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class TeacherEditComponent implements OnInit {
  title = 'Edit the teacher';
  teacher = new TeacherEntity(null, '', '', '', null, null, '');
  initial: Teacher;
  groups: Class[];
  load = 'out';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.teacherService.getOne(+params['id']);
    }).subscribe((teacher: Teacher) => {
      if (typeof teacher === 'undefined') {
        this.router.navigate(['/teachers']);
      }
      this.teacher = { ...teacher };
      this.initial = { ...teacher };
      this.load = 'in';
    });

    this.classService.getAll().then(data => {
      this.groups = data;
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.teacher); }

  // Compare initial with target data:
  get data_origin() { return JSON.stringify(this.initial); }
  get data_edited() { return JSON.stringify(this.teacher); }

  // Push the new student to the store:
  submitForm() {
    const edited_teacher = { ...this.teacher };
    this.teacherService.editOne(edited_teacher).then(result => {
      this.classService.addTeacher(edited_teacher).then(result => {
        this.router.navigate(['/teachers']);
      });
    });
  }
}
