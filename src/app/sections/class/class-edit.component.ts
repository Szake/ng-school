import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './class-form.component.html',
  styleUrls: [ './class.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class ClassEditComponent implements OnInit {
  title = 'Edit the class';
  original_group: Class;
  group: Class = {
    _id: null,
    name: 'No name',
    level: 0,
    teacherId: null,
    studentId: [],
    other: 'No description'
  };
  teachers: Teacher[];
  students: Student[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.classService.getOne(+params['id']);
    }).subscribe((group: Class) => {
      this.original_group = group;
      this.group = { ...group };
    });

    this.teacherService.getAll().then(data => {
      this.teachers = data;
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.group); }

  // Push the new student to the store:
  submitForm() {
    this.classService.editOne({ ...this.group }).then(result => {
      if (this.original_group.teacherId !== this.group.teacherId) {
        this.teacherService.addClass(this.group).then(result => {
          this.router.navigate(['/classes']);
        });
      }
      else {
        this.router.navigate(['/classes']);
      }
    });
  }
}
