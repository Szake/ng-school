import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

import { titleIn, controlsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: 'students.component.html',
  styleUrls: [ './students.component.css' ],
  animations: [ titleIn, controlsIn, contentIn ]
})

export class StudentsComponent implements OnInit {
  private _data: Student[];

  title = 'Students';
  list: Student[];
  groups = {};

  constructor(
    private router: Router,
    private classService: ClassService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.studentService.getAll().then((students) => {
      this._data = this.list = students;

      this.list.forEach((student) => {
        if (student.classId !== null) {
          this.classService.getOne(student.classId).then((group) => {
            this.groups[student._id] = group;
          });
        }
      });
    });
  }

  goToClass(group): void {
    this.router.navigate(['/class', group._id]);
  }
  goToStudent(student): void {
    this.router.navigate(['/student', student._id]);
  }

  editStudent(student): void {
    this.router.navigate(['/student', 'edit', student._id]);
  }
  deleteStudent(student): void {
    this.studentService.removeOne(student).then((result) => {
      console.log('Delete student:', result);
      this.classService.resetStudent(student._id).then(result => {
        console.log('Delete student from class:', result);
      });
    });
  }
}
