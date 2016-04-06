import angular from 'angular';

import Calendar from './Calendar.service';

export default class CalendarController {
  constructor(Calendar) {
    this.calendar = Calendar;
    this.mainHeight = `${window.innerHeight - 51}px`;
  }

  addEvent() {
    const day = this.calendar.getRandomDay();
    const newEvent = this.calendar.createRandomEvent();

    newEvent.top = this.getEventTop(newEvent);
    newEvent.height = this.getEventHeight(newEvent);
    newEvent.time = this.formatTime(newEvent)

    day.events.push(newEvent);

    this.resizeOverlappingEvents(this.calendar.getOverlappingEvents(day.events));
  }

  getEventTop({ hour, minute }) {
    return `${this.getRow(hour * 2).prop('offsetTop') + this.getRowHeight() * 2 * minute / 60}px`;
  }

  getEventHeight({ duration }) {
    return `${this.getRowHeight() * 2 * duration}px`;
  }

  formatTime({ hour, minute }) {
    return `${this.get12HourFormat(hour)}:${this.calendar.get2DigitsFormat(minute)}${this.getAmPm(hour)}`;
  }

  get12HourFormat(hour) {
    return hour <= 12 ? hour : hour - 12;
  }

  getAmPm(hour) {
    return hour <= 12 ? 'am' : 'pm';
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

  getRow(index) {
    return angular.element(document.querySelectorAll('.row')).eq(index);
  }

  getRowHeight() {
    return this.getRow(0).prop('clientHeight');
  }
}

CalendarController.$inject = ['Calendar'];
