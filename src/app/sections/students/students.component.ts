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
  pages = [];
  students: Student[] = [];
  groups = {};

  sort = {
    key: 'student',
    data: {
      property: 'firstName',
      bound: null,
      bound_property: null
    }
  };

  search = {
    query: ''
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
        this.buildTable();
      });
    });
  }

  buildTable(list = this._data) {
    const searched = this.searchData(list);
    const sorted = this.sortData(searched);
    const sliced = this.sliceToPages(sorted);

    this.pages = sliced;
    this.students = sorted;
  }


  // Sort, Search data:
  sortData(list, property = this.sort.data.property) {
    if (!property) { return list; }

    let sorted;

    // Sort by ASC:
    if (property === 'classId') {
      // key, list, property, bound, bound_property
      sorted = this.sortService.sortAscByBound(this.sort.key, list, property, this.groups, 'name');
    }
    else {
      // key, list, property
      sorted = this.sortService.sortAscBy(this.sort.key, list, property);
    }
    return sorted;
  }
  searchData(list, query = this.search.query) {
    if (query.length === 0) { return list; }
    const keys = ['firstName', 'lastName', 'birthday', 'classId'];

    const searched = list.filter((student) => {
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let value = student[key];

        if (key === 'classId') {
          value = this.groups[value].name;
          if (value.toLowerCase().indexOf(query) !== -1) { return true; }
        }
        else if (typeof value === 'number') {
          value = value + '';
          if (value.indexOf(query) !== -1) { return true; }
        }
        else if (typeof value === 'string') {
          if (value.toLowerCase().indexOf(query) !== -1) { return true; }
        }
      }
      return false;
    });
    return searched;
  }

  // Slice into pages to display:
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
    this.pager.current = sliced.length < this.pager.current ? (sliced.length || 1) : this.pager.current;

    return sliced;
  }


  // Sort, Search events:
  sortBy(property): void {
    this.sort.data.property = property;
    this.buildTable();
  }
  searchBy(event): void {
    this.search.query = event.target.value;
    this.buildTable();
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
