import angular from 'angular';
import _find from 'lodash/find';
import _inRange from 'lodash/inRange';
import _padStart from 'lodash/padStart';
import _random from 'lodash/random';
import _range from 'lodash/range';
import _sample from 'lodash/sample';
import _some from 'lodash/some';
import _sortBy from 'lodash/sortBy';
import _uniqueId from 'lodash/uniqueId';
import _union from 'lodash/union';

import constants from './Calendar.constants';

const { BREAKFAST, LUNCH, AFTERNOON, EVENING, NIGHT, DAYS, HOURS } = constants;

export default class CalendarController {
  constructor() {
    this.days = DAYS.map(day => ({ label: day, events: [] }));
    this.hours = HOURS.map(hour => ({ label: hour }));
    this.halfHours = _range(0, HOURS.length * 2);
    this.sortPredicates = ['startTime', 'endTime', 'id'];
  }

  addEvent() {
    const day = this.getRandomDay();
    day.events.push(this.createRandomEvent());
    this.resizeOverlappingEvents(this.getOverlappingEvents(day.events));
  }

  getRandomDay() {
    return _sample(this.days);
  }

  createRandomEvent() {
    const randomHour = _random(0, 22);
    const randomMinute = _random(0, 59);
    const randomDuration = _random(1, _find([3, 2, 1], hour => randomHour + hour <= 23));
    const randomActivity = _sample(this.getAvailableActivities(randomHour));

    return this.createEvent(randomHour, randomMinute, randomDuration, randomActivity);
  }

  createEvent(hour, minute, duration, title) {
    return {
      hour,
      minute,
      duration,
      title,
      id: parseInt(_uniqueId),
      startTime: this.getStartTime(hour, minute),
      endTime: this.getEndTime(hour, minute, duration),
      top: this.getEventTop(hour, minute),
      height: this.getEventHeight(duration),
      time: this.formatTime(hour, minute),
    };
  }

  getStartTime(hour, minute) {
    return parseInt(`${hour}${this.get2DigitsFormat(minute)}`);
  }

  getEndTime(hour, minute, duration) {
    return parseInt(`${hour + duration}${this.get2DigitsFormat(minute)}`);
  }

  getAvailableActivities(hour) {
    return _find([BREAKFAST, LUNCH, AFTERNOON, EVENING, NIGHT],
      x => _inRange(hour, x.START, x.END)).ACTIVITIES;
  }

  getEventTop(hour, minute) {
    return `${this.getRow(hour * 2).prop('offsetTop') + this.getRowHeight() * 2 * minute / 60}px`;
  }

  getEventHeight(duration) {
    return `${this.getRowHeight() * 2 * duration}px`;
  }

  formatTime(hour, minute) {
    return `${this.get12HourFormat(hour)}:${this.get2DigitsFormat(minute)}${this.getAmPm(hour)}`;
  }

  get12HourFormat(hour) {
    return hour <= 12 ? hour : hour - 12;
  }

  getAmPm(hour) {
    return hour <= 12 ? 'am' : 'pm';
  }

  get2DigitsFormat(minute) {
    return _padStart(minute, 2, 0);
  }

  areOverlapping(eventA, eventB) {
    return eventA.startTime <= eventB.endTime && eventA.endTime >= eventB.startTime;
  }

  resizeOverlappingEvents(events) {
    events.forEach(group => {
      const width = 100 / group.length;
      let left = 0;

      group.forEach(event => {
        event.width = `${width}%`;
        event.left = `${left}%`;
        left += width;
      });
    });
  }

  /**
   * @example: [A, B, C, D, E, F] => [[A, B, C], [D], [E, F]]
   */
  getOverlappingEvents(events) {
    const groups = [];
    let groupIndex = -1;

    _sortBy(events, this.sortPredicates).forEach((eventA, index, sortedEvents) => {
      if (!_some(groups[groupIndex], eventA)) {
        ++groupIndex;
      }

      groups[groupIndex] = _union(groups[groupIndex] || [],
        sortedEvents.filter(eventB => this.areOverlapping(eventA, eventB))
      );
    });

    return groups;
  }

  getRow(index) {
    return angular.element(document.querySelectorAll('.row')).eq(index);
  }

  getRowHeight() {
    return this.getRow(0).prop('clientHeight');
  }
}
