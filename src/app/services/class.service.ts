import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

// Model:
import { Class } from '../models/class';
import { Teacher } from '../models/teacher';
import { Student } from '../models/student';


@Injectable()
export class ClassService {
  private _url = '../json/classes.json';
  private _data: Class[];
  private _last: number;
  // private _classesList: BehaviorSubject<Class[]> = new BehaviorSubject([]);


  constructor(
    private http: Http
  ) { }


  // Handlers (success/error):
  private extractData(response: Response) {
    const data = response.json();
    data.forEach((item) => {
      if (item.birthday) {
        let date = item.birthday.split(/\-/).slice(0, 3).map(n => parseInt(n));
        item.birthday = new Date(date[0] || 0, date[1] || 0, date[2] || 0);
      }
    });
    return data;
  }
  private handleError (error: Response | any) {
    // console.error('An error occured.', error);
    return Promise.reject('An error occurred.');
  }


  // Request through HTTP:
  loadData(): Promise<Class[]> {
    return this.http.get(this._url).toPromise().then(this.extractData).catch(this.handleError);
  }

  // All in the JSON:
  getAll(): Promise<Class[]> {
    if (this._data) {
      return Promise.resolve(this._data);
    }
    return new Promise(resolve => {
      this.loadData().then((data) => {
        this._data = data;
        resolve(this._data);
      });
    });
  }

  // Length:
  getLast(): Promise<number> {
    return new Promise(resolve => {
      this.getAll().then(data => {
        let index = data.length - 1;
        resolve(data[index] && data[index]['_id'] || 0);
      });
    });
  }

  // One by ID:
  getOne(id): Promise<Class> {
    return new Promise(resolve => {
      this.getAll().then(list => {

        const result = list.filter(item => {
          return item._id === id;
        })[0];

        // console.log('---> requested group: ', result, id);
        resolve(result);
      });
    });
  }

  // Add new to the list (through GET ALL):
  addOne(new_item: Class): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      const list = this._data;
      this.resetTeacher(new_item.teacherId).then(result => {
        list.push(new_item);
        result && resolve(true);
        resolve(false);
      });
    });
  }

  // Edit current:
  editOne(edited_item: Class): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      const list = this._data;
      list.forEach(group => {
        if (edited_item._id === group._id) {
          this.resetTeacher(edited_item.teacherId).then(result => {
            for (let key in group) {
              group[key] = edited_item[key];
            }
            resolve(true);
          });
        }
      });
      resolve(false);
    });
  }

  // Remove from the list:
  removeOne(del_item: Class): Promise<Boolean> {
    return new Promise(resolve => {
      // const list = this._classesList.getValue();
      const list = this._data;
      const index = list.indexOf(del_item);
      // send request to the server...
      // or remove locally:
      if (index === -1) {
        console.error('Can not delete item.');
        resolve(false);
      }
      else {
        list.splice(index, 1);
        // this._classesList.next(list);
        resolve(true);
      }
    });
  }


  /* Teachers: */
  resetTeacher(teacher_id): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(group => {
          if (group.teacherId === teacher_id) {
            group.teacherId = null;
          }
        });
        resolve(true);
      });
    });
  }

  // Update class with new teacher (1 teacher - 1 class):
  addTeacher(new_teacher: Teacher): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(group => {
          if (group._id === new_teacher.classId && group.teacherId !== new_teacher._id) {
            group.teacherId = new_teacher._id;
          }
          else if (group._id !== new_teacher.classId && group.teacherId === new_teacher._id) {
            group.teacherId = null;
          }
        });
        resolve(true);
      });
    });
  }


  /* Students: */
  resetStudent(student_id): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(group => {
          const index = group.studentId.indexOf(student_id);
          if (index !== -1) {
            group.studentId.splice(index, 1);
          }
        });
        resolve(true);
      });
    });
  }

  // Add student ID to the list (through GET ALL):
  addStudent(new_student: Student): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        // send request to the server...
        // or change locally:
        list.forEach(group => {
          let index = group.studentId.indexOf(new_student._id);
          if (group._id === new_student.classId && index === -1) {
            group.studentId.push(new_student._id);
          }
          else if (group._id !== new_student.classId && index > -1) {
            group.studentId.splice(index, 1);
          }
        });
        resolve(true);
      });
    });
  }
}
