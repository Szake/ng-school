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


@Injectable()
export class TeacherService {
  private _url = '../json/teachers.json';
  private _data: Teacher[];
  private _last: number;
  // private _teachersList: BehaviorSubject<Teacher[]> = new BehaviorSubject([]);


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
  loadData(): Promise<Teacher[]> {
    return this.http.get(this._url).toPromise().then(this.extractData).catch(this.handleError);
  }

  // All in the JSON:
  getAll(): Promise<Teacher[]> {
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
  getOne(id): Promise<Teacher> {
    return new Promise(resolve => {
      this.getAll().then(list => {

        const result = list.filter(item => {
          return item._id === id;
        })[0];

        // console.log('---> requested teacher: ', result, id);
        resolve(result);
      });
    });
  }

  // Add new to the list (through GET ALL):
  addOne(new_item: Teacher): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      const list = this._data;
      this.resetClass(new_item.classId).then(result => {
        list.push(new_item);
        result && resolve(true);
        resolve(false);
      });
    });
  }

  // Remove from the list:
  removeOne(del_item: Teacher): Promise<Boolean> {
    return new Promise(resolve => {
      // const list = this._teachersList.getValue();
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
        // this._teachersList.next(list);
        resolve(true);
      }
    });
  }


  /* Classes: */
  resetClass(class_id): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(teacher => {
          if (teacher.classId === class_id) {
            teacher.classId = null;
            resolve(true);
          }
        });
        resolve(false);
      });
    });
  }

  // Update teacher with new teacher (1 teacher - 1 class):
  addClass(new_class: Class): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(teacher => {
          if (teacher._id === new_class.teacherId) {
            teacher.classId = new_class._id;
            resolve(true);
          }
        });
        resolve(false);
      });
    });
  }
}
