import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';

import { titleIn, controlsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: 'teachers.component.html',
  styleUrls: [ './teachers.component.css' ],
  animations: [ titleIn, controlsIn, contentIn ]
})

export class TeachersComponent implements OnInit {
  private _data: Teacher[];

  title = 'Teachers';
  list: Teacher[];
  groups = {};

  constructor(
    private router: Router,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.teacherService.getAll().then((teachers) => {
      this._data = this.list = teachers;

      this.list.forEach((teacher) => {
        if (teacher.classId !== null) {
          this.classService.getOne(teacher.classId).then((group) => {
            this.groups[teacher._id] = group;
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

  editTeacher(teacher): void {
    this.router.navigate(['/teacher', 'edit', teacher._id]);
  }
  deleteTeacher(teacher): void {
    this.teacherService.removeOne(teacher).then((result) => {
      console.log('Delete teacher:', result);
      this.classService.resetTeacher(teacher._id).then((result) => {
        console.log('Delete teacher from class:', result);
      });
    });
  }
}
