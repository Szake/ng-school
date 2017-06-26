import { Injectable } from '@angular/core';


@Injectable()
export class SortService {
  private store = {};
  // {
  //   key ('class', 'teacher', 'student'): {
  //     property: 'firstName', 'lastName', 'classId', ...
  //     bound: [ {}, {}, ... ],
  //     bound_property: 'name', ...
  //   }
  // }


  constructor() {}


  // Get/Set:
  getStored(key) {
    return this.store[key] ? this.store[key] : null;
  }
  setStored(key, data) {
    this.store[key] = data;
  }


  // Methods:

  sortAscBy(key, list, property) {
    if (!list || !list.length) { return []; }
    else if ((!key || !property) && list && list.length) { return list; }

    // Remember property:
    this.store[key] = {
      property,
      bound: null,
      bound_property: null
    };

    // Sort an array and return the result:
    const result = list.sort((prev, next) => {
      // Return as-is if has no property:
      if (!prev[property] || !next[property]) {
        return 0;
      }

      // Return 1 to switch, -1 not to switch:
      let prev_value = prev[property].toLowerCase(),
          next_value = next[property].toLowerCase();
      return prev_value < next_value ? -1 : prev_value > next_value ? 1 : 0;
    });

    return result;
  }

  sortAscByBound(key, list, property, bound, bound_property) {
    if (!list || !list.length) { return []; }
    else if ((!key || !property || !bound || !bound_property) && list && list.length) { return list; }

    // Remember property:
    this.store[key] = {
      property,
      bound,
      bound_property
    };

    // Sort an array and return the result:
    const result = list.sort((prev, next) => {
      // Return as-is if has no property:
      if (!prev[property] || !next[property]) {
        return 0;
      }

      // Return 1 to switch, -1 not to switch:
      let prev_value = bound[prev[property]][bound_property].toLowerCase(),
          next_value = bound[next[property]][bound_property].toLowerCase();
      return prev_value < next_value ? -1 : prev_value > next_value ? 1 : 0;
    });

    return result;
  }

  sortDescBy(key, list, property) {
    if (!list || !list.length) { return []; }
    else if ((!key || !property) && list && list.length) { return list; }

    // Remember property:
    this.store[key] = {
      property,
      bound: null,
      bound_property: null
    };

    // Sort an array and return the result:
    const result = list.sort((prev, next) => {
      // Return as-is if has no property:
      if (!prev[property] || !next[property]) {
        return 0;
      }

      // Return 1 (greater), -1 (less), 0 (equal):
      let prev_value = prev[property].toLowerCase(),
          next_value = next[property].toLowerCase();
      return prev_value > next_value ? -1 : prev_value < next_value ? 1 : 0;
    });

    return result;
  }

  sortDescByBound(key, list, property, bound, bound_property) {
    if (!list || !list.length) { return []; }
    else if ((!key || !property || !bound || !bound_property) && list && list.length) { return list; }

    // Remember property:
    this.store[key] = {
      property,
      bound,
      bound_property
    };

    // Sort an array and return the result:
    const result = list.sort((prev, next) => {
      // Return as-is if has no property:
      if (!prev[property] || !next[property]) {
        return 0;
      }

      // Return 1 to switch, -1 not to switch:
      let prev_value = bound[prev[property]][bound_property].toLowerCase(),
          next_value = bound[next[property]][bound_property].toLowerCase();
      return prev_value > next_value ? -1 : prev_value < next_value ? 1 : 0;
    });

    return result;
  }
}
