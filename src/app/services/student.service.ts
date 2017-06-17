import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Model:
import { Student } from '../models/student';


@Injectable()
export class StudentService {
  private _url = '../json/students.json';
  private _data: Student[] = [];


  constructor(
    private http: Http
  ) {}


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
    return Promise.reject('An error occured.');
  }


  // Request through HTTP:
  getData(): Promise<Student[]> {
    return this.http.get(this._url).toPromise().then(this.extractData).catch(this.handleError);
  }

  // All in the JSON:
  getAll(): Promise<Student[]> {
    if (this._data && this._data.length) {
      // console.log('---> saved _data: ', this._data);
      return Promise.resolve(this._data);
    }
    else {
      return new Promise(resolve => {
        this.getData().then(data => {
          this._data = data;
          // console.log('---> new loaded _data: ', this._data);
          resolve(data);
        });
      });
    }
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
        resolve(data[data.length - 1]['_id']);
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

        // console.log('---> requested student: ', result);
        resolve(result);
      });
    });
  }

  // Add new to the list:
  addOne(new_item: Student): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      this.getAll().then(list => {
        list.push(new_item);
        resolve(true);
      });
    });
  }

  // Remove from the list:
  removeOne(del_item: Student): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        const index = list.indexOf(del_item);
        // send request to the server...
        // or remove locally:
        if (!del_item || index === -1) {
          console.error('Can not delete item.');
          resolve(false);
        }
        else {
          list.splice(index, 1);
          resolve(true);
        }
      });
    });
  }
}