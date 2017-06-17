import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

// Model:
import { Class } from '../models/class';
import { Teacher } from '../models/teacher';


@Injectable()
export class TeacherService {
  private _url = '../json/teachers.json';
  private _data: Teacher[] = [];


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
  getData(): Promise<Teacher[]> {
    return this.http.get(this._url).toPromise().then(this.extractData).catch(this.handleError);
  }

  // All in the JSON:
  getAll(): Promise<Teacher[]> {
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

  // Length:
  getLast(): Promise<number> {
    return new Promise(resolve => {
      this.getAll().then(data => {
        resolve(data[data.length - 1]['_id']);
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

        // console.log('---> requested teacher: ', result);
        resolve(result);
      });
    });
  }

  // Add new to the list:
  addOne(new_item: Teacher): Promise<Boolean> {
    return new Promise(resolve => {
      // send request to the server...
      // or save locally:
      this.getAll().then(list => {
        list.push(new_item);
        list.forEach(item => {
          if (item.classId === new_item.classId && item !== new_item) {
            this.resetClass(item._id).then(result => {
              result && resolve(true);
              resolve(false);
            });
          }
        });
        resolve(true);
      });
    });
  }

  // Remove from the list:
  removeOne(del_item: Teacher): Promise<Boolean> {
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


  /* Classes: */
  resetClass(id): Promise<Boolean> {
    return new Promise(resolve => {
      this.getAll().then(list => {
        list.forEach(teacher => {
          if (teacher._id === id) {
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
