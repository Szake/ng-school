import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

import { titleIn, controlsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: 'classes.component.html',
  styleUrls: [ './classes.component.scss' ],
  animations: [ titleIn, controlsIn, contentIn ]
})

export class ClassesComponent implements OnInit {
  private _data: Class[];

  title = 'Classes';
  list: Class[];
  teachers = {};

  constructor(
    private router: Router,
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.classService.getAll().then((classes) => {
      this._data = this.list = classes;

      this.list.forEach((group) => {
        if (group.teacherId !== null) {
          this.teacherService.getOne(group.teacherId).then((teacher) => {
            this.teachers[group._id] = teacher;
          });
        }
      });
    });
  }

  goToClass(group): void {
    this.router.navigate(['/class', group._id]);
  }
  goToTeacher(teacher): void {
    this.router.navigate(['/teacher', teacher._id]);
  }

  editClass(group): void {
    this.router.navigate(['/class', 'edit', group._id]);
  }
  deleteClass(group): void {
    this.classService.removeOne(group).then((result) => {
      console.log('Delete class:', result);
      this.teacherService.resetClass(group._id).then(result => {
        console.log('Delete class from teacher:', result);
      });
      this.studentService.resetClass(group._id).then(result => {
        console.log('Delete class from students:', result);
      });
    });
  }
}
