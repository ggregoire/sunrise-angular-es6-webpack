import sunrise from '../app';
import constants from './Calendar.constants';

describe('Calendar service', () => {
  let Calendar;

  beforeEach(angular.mock.module(sunrise));
  beforeEach(angular.mock.inject($injector => Calendar = $injector.get('Calendar')));

  it('should compute when an event starts and ends', () => {
    expect(Calendar.getStartTime(18, 46)).toBe(1846);
    expect(Calendar.getEndTime(18, 46, 2)).toBe(2046);
    expect(Calendar.getStartTime(1, 5)).toBe(105);
    expect(Calendar.getEndTime(1, 5, 3)).toBe(405);
  });

  it('should find overlapping events', () => {
    const eventA = { id: 'A', startTime: 1045, endTime: 1245 };
    const eventB = { id: 'B', startTime: 1000, endTime: 1210 }; // starts before A, ends during A
    const eventC = { id: 'C', startTime: 1200, endTime: 1400 }; // starts during A, ends after A
    const eventD = { id: 'D', startTime: 1100, endTime: 1200 }; // starts during A, ends during A
    const eventE = { id: 'E', startTime: 1300, endTime: 1600 }; // starts during C, ends after C

    const eventF = { id: 'F', startTime: 2000, endTime: 2200 }; // starts after each previous event
    const eventG = { id: 'G', startTime: 2000, endTime: 2200 }; // same than F

    const eventH = { id: 'H', startTime: 2250, endTime: 2300 }; // starts after each previous event
    const eventI = { id: 'I', startTime: 2260, endTime: 2270 }; // starts during H, ends during H
    const eventJ = { id: 'J', startTime: 2280, endTime: 2320 }; // starts during H but after I, ends after H

    const events = [eventA, eventB, eventC, eventD, eventE, eventF, eventG, eventH, eventI, eventJ];

    const overlappingEvents = [
      [eventB, eventA, eventD, eventC, eventE],
      [eventF, eventG],
      [eventH, eventI, eventJ]
    ];

    expect(Calendar.getOverlappingEvents(events)).toEqual(overlappingEvents);
  });

  it('should find activities which are available at the hour of the event', () => {
    const { BREAKFAST, LUNCH, AFTERNOON, EVENING, NIGHT } = constants;

    expect(Calendar.getAvailableActivities(10)).toEqual(BREAKFAST.ACTIVITIES);
    expect(Calendar.getAvailableActivities(13)).toEqual(LUNCH.ACTIVITIES);
    expect(Calendar.getAvailableActivities(16)).toEqual(AFTERNOON.ACTIVITIES);
    expect(Calendar.getAvailableActivities(20)).toEqual(EVENING.ACTIVITIES);
    expect(Calendar.getAvailableActivities(4)).toEqual(NIGHT.ACTIVITIES);
  });
});
