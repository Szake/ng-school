import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

// Model:
import { Student } from '../models/student';


@Injectable()
export class StudentService {
  private _url = '../json/students.json';
  private _data: Student[];
  private _last: number;
  private _amount: BehaviorSubject<number> = new BehaviorSubject(0);


  constructor(
    private http: Http
  ) {
    this.getAll().then(response => {
      // callback
    });
  }


  // Handlers (success/error):
  private extractData(response: Response) {
    const data = response.json();
    data.forEach((item) => {
      if (item.birthday) {
        item.birthday = item.birthday.split('T')[0];
      }
    });
    return data;
  }
  private handleError (error: Response | any) {
    // console.error('An error occured.', error);
    return Promise.reject('An error occurred.');
  }


  // Request through HTTP:
  loadData(): Promise<Student[]> {
    return this.http.get(this._url).toPromise().then(this.extractData).catch(this.handleError);
  }

  // All in the JSON:
  getAll(): Promise<Student[]> {
    if (this._data) {
      return Promise.resolve(this._data);
    }
    return new Promise(resolve => {
      this.loadData().then((data) => {
        this._data = data;
        this._amount.next(data.length);
        resolve(this._data);
      });
    });
  }

  // Group in the JSON:
  getRange(ids): Promise<Student[]> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        const result = list.filter(item => {
          return ids.indexOf(item._id) !== -1;
        });

        // console.log('---> requested array of students: ', result);
        resolve(result);
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
  getOne(id): Promise<Student> {
    return new Promise(resolve => {
      this.getAll().then(list => {

        const result = list.filter(item => {
          return item._id === id;
        })[0];

        // console.log('---> requested student: ', result, id);
        resolve(result);
      });
    });
  }

  // Add new to the list (through GET ALL):
  addOne(new_item: Student): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      const list = this._data;
      list.push(new_item);
      this._amount.next(list.length);
      resolve(true);
    });
  }

  // Edit current:
  editOne(edited_item: Student): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      const list = this._data;
      list.forEach(student => {
        if (edited_item._id === student._id) {
          for (let key in student) {
            student[key] = edited_item[key];
          }
          resolve(true);
        }
      });
      resolve(false);
    });
  }

  // Remove from the list:
  removeOne(del_item: Student): Promise<Boolean> {
    return new Promise(resolve => {
      // const list = this._studentsList.getValue();
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
        this._amount.next(list.length);
        resolve(true);
      }
    });
  }

  // Get amount:
  getAmount(): Observable<any> {
    return this._amount.asObservable();
  }


  /* Classes: */
  resetClass(class_id): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(student => {
          if (student.classId === class_id) {
            student.classId = null;
          }
        });
        resolve(true);
      });
    });
  }
}
