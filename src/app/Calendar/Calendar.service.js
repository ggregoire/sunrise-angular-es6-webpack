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

export default class Calendar {
  constructor() {
    this.days = DAYS.map(day => ({ label: day, events: [] }));
    this.hours = HOURS.map(hour => ({ label: hour }));
    this.halfHours = _range(0, HOURS.length * 2);
    this.sortPredicates = ['startTime', 'endTime', 'id'];
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
      id: parseInt(_uniqueId),
      hour: hour,
      minute: minute,
      duration: duration,
      title: title,
      startTime: this.getStartTime(hour, minute),
      endTime: this.getEndTime(hour, minute, duration)
    };
  }

  getStartTime(hour, minute) {
    return parseInt(`${hour}${this.get2DigitsFormat(minute)}`);
  }

  getEndTime(hour, minute, duration) {
    return parseInt(`${hour + duration}${this.get2DigitsFormat(minute)}`);
  }

  get2DigitsFormat(minute) {
    return _padStart(minute, 2, 0);
  }

  getAvailableActivities(hour) {
    if (_inRange(hour, BREAKFAST.START, BREAKFAST.END)) return BREAKFAST.EVENTS;
    if (_inRange(hour, LUNCH.START, LUNCH.END))         return LUNCH.EVENTS;
    if (_inRange(hour, AFTERNOON.START, AFTERNOON.END)) return AFTERNOON.EVENTS;
    if (_inRange(hour, EVENING.START, EVENING.END))     return EVENING.EVENTS;
    return NIGHT.EVENTS;
  }

  areOverlapping(eventA, eventB) {
    return eventA.startTime >= eventB.startTime && eventA.startTime <= eventB.endTime ||
      eventA.endTime >= eventB.startTime && eventA.endTime <= eventB.endTime ||
      eventA.startTime <= eventB.startTime && eventA.endTime >= eventB.endTime;
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
}
