import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClassService } from '../../services/class.service';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student';

import { SortService } from '../../services/sort.service';

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

  sort = {
    key: 'student',
    data: {
      property: 'firstName',
      bound: null,
      bound_property: null
    }
  };

  pager = {
    current: 1,
    size: 10
  };


  constructor(
    private router: Router,
    private classService: ClassService,
    private studentService: StudentService,
    private sortService: SortService
  ) {
    this.sort.data = this.sortService.getStored(this.sort.key) || this.sort.data;
  }

  ngOnInit() {
    this.loadStudents();
  }

  // Main:
  loadStudents() {
    this.studentService.getAll().then((students) => {
      this._data = [ ...students ];

      // Get classes and save by ids:
      this.classService.getAll().then((groups) => {
        this.groups = groups.reduce((result, group, i) => {
          result[group._id] = group;
          return result;
        }, {});

        // Sort and slice to pages:
        this.sortBy();
      });
    });
  }

  // Slice:
  sliceToPages(list: Student[]): Student[] {
    const sliced = list.reduce((result, item, i) => {
      const page_number = Math.ceil(++i / this.pager.size);

      if (page_number > result.length) {
        result.push([item]);
      }
      else {
        result[result.length - 1].push(item);
      }
      return result;
    }, []);

    // Check current page:
    this.pager.current = sliced.length < this.pager.current ? sliced.length : this.pager.current;

    return sliced;
  }

  // Filter:
  sortBy(property = this.sort.data.property): void {
    if (!property) { return; }

    // console.log('Sort by: ' + property);
    let sorted;

    // Sort by ASC:
    if (property === 'classId') {
      // key, list, property, bound, bound_property
      sorted = this.sortService.sortAscByBound(this.sort.key, this._data, property, this.groups, 'name');
    }
    else {
      // key, list, property
      sorted = this.sortService.sortAscBy(this.sort.key, this._data, property);
    }

    // Remember the property:
    if (this.sort.data.property !== property) {
      this.sort.data.property = property;
    }

    // Slice to pages:
    this.list = this.sliceToPages(sorted);
  }

  // Go to:
  goToPage(page): void {
    this.pager.current = page;
  }
  goToClass(group): void {
    this.router.navigate(['/class', group._id]);
  }
  goToStudent(student): void {
    this.router.navigate(['/student', student._id]);
  }

  // Controls:
  editStudent(student): void {
    this.router.navigate(['/student', 'edit', student._id]);
  }
  deleteStudent(student): void {
    this.studentService.removeOne(student).then((result) => {
      console.log('Delete student:', result);
      this.classService.resetStudent(student._id).then((result) => {
        console.log('Delete student from class:', result);
      });

      // Get again:
      this.loadStudents();
    });
  }
}
