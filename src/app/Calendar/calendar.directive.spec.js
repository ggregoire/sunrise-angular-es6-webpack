import angular from 'angular';
import sunrise from '../app';

describe('Calendar directive', () => {
  let compile;
  let rootScope;

  beforeEach(angular.mock.module(sunrise));
  beforeEach(angular.mock.inject(($compile, $rootScope) => {
    compile = $compile;
    rootScope = $rootScope;
  }));

  it('should create an event when we click on add event', () => {
    const calendar = new Calendar(compile, rootScope);
    calendar.addEvent().addEvent().addEvent();
    expect(calendar.getEvents().length).toBe(3);
  });
});

class Calendar {
  constructor(compile, rootScope) {
    const element = compile('<calendar></calendar>')(rootScope);
    rootScope.$digest();
    this.element = element[0];
  }

  addEvent() {
    angular.element(this.element.querySelector('.add-event')).triggerHandler('click');
    return this;
  }

  getEvents() {
    return this.element.querySelectorAll('.event');
  }
}
