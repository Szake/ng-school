import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';
import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';

import { titleIn, breadcrumbsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './class.component.html',
  styleUrls: [ './class.component.css' ],
  animations: [ titleIn, breadcrumbsIn, contentIn ]
})

export class ClassComponent implements OnInit {
  title = 'Class';
  group: Class = {
    _id: null,
    name: 'No name',
    level: 0,
    teacherId: null,
    studentId: [],
    other: 'No description'
  };
  teacher: Teacher;
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
      this.group = group;

      if (group.teacherId !== null) {
        this.teacherService.getOne(group.teacherId).then((teacher: Teacher) => {
          this.teacher = teacher;
        });
      }

      if (group.studentId && group.studentId.length) {
        this.studentService.getRange(group.studentId).then((students: Student[]) => {
          this.students = students.sort((s_a, s_b) => {
            return s_a.firstName > s_b.firstName ? 1 : -1;
          });
        });
      }
    });
  }

  goToTeacher(): void {
    this.router.navigate(['/teacher', this.teacher._id]);
  }

  goToStudent(student): void {
    this.router.navigate(['/student', student._id]);
  }
}
