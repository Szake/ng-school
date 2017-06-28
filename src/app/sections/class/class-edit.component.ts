import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

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

export class ClassEditComponent implements OnInit {
  title = 'Edit the class';
  group = new ClassEntity(null, '', 1, null, null, '');
  initial: Class;
  teachers: Teacher[];
  students: Student[];
  load = 'out';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.classService.getOne(+params['id']);
    }).subscribe((group: Class) => {
      if (typeof group === 'undefined') {
        this.router.navigate(['/classes']);
      }
      this.group = { ...group };
      this.initial = { ...group };
      this.load = 'in';
    });

    this.teacherService.getAll().then(data => {
      this.teachers = data;
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.group); }

  // Compare initial with target data:
  get data_origin() { return JSON.stringify(this.initial); }
  get data_edited() { return JSON.stringify(this.group); }

  // Push the new student to the store:
  submitForm() {
    const edited_group = { ...this.group };
    this.classService.editOne(edited_group).then(result => {
      this.teacherService.addClass(edited_group).then(result => {
        this.router.navigate(['/classes']);
      });
    });
  }
}
