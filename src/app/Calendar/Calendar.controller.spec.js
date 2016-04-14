import sunrise from '../app';
import constants from './Calendar.constants';

describe('Calendar controller', () => {
  let CalendarController;

  beforeEach(angular.mock.module(sunrise));
  beforeEach(angular.mock.inject($controller => CalendarController = $controller('CalendarController')));

  it('should make times readable for humans', () => {
    expect(CalendarController.formatTime(12, 5)).toBe('12:05am');
    expect(CalendarController.formatTime(20, 50)).toBe('8:50pm');
  });

  it('should compute when an event starts and ends', () => {
    expect(CalendarController.getStartTime(18, 46)).toBe(1846);
    expect(CalendarController.getEndTime(18, 46, 2)).toBe(2046);
    expect(CalendarController.getStartTime(1, 5)).toBe(105);
    expect(CalendarController.getEndTime(1, 5, 3)).toBe(405);
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

    expect(CalendarController.getOverlappingEvents(events)).toEqual(overlappingEvents);
  });

  it('should resize overlapping events to make them fit side by side', () => {
    const events = [[{}, {}], [{}, {}, {}, {}]];

    CalendarController.resizeOverlappingEvents(events);

    expect(events[0][0].width).toBe('50%');
    expect(events[0][0].left).toBe('0%');

    expect(events[0][1].width).toBe('50%');
    expect(events[0][1].left).toBe('50%');

    expect(events[1][0].width).toBe('25%');
    expect(events[1][0].left).toBe('0%');

    expect(events[1][1].width).toBe('25%');
    expect(events[1][1].left).toBe('25%');

    expect(events[1][2].width).toBe('25%');
    expect(events[1][2].left).toBe('50%');

    expect(events[1][3].width).toBe('25%');
    expect(events[1][3].left).toBe('75%');
  });

  it('should find activities which are available at the hour of the event', () => {
    const { BREAKFAST, LUNCH, AFTERNOON, EVENING, NIGHT } = constants;

    expect(CalendarController.getAvailableActivities(10)).toEqual(BREAKFAST.ACTIVITIES);
    expect(CalendarController.getAvailableActivities(13)).toEqual(LUNCH.ACTIVITIES);
    expect(CalendarController.getAvailableActivities(16)).toEqual(AFTERNOON.ACTIVITIES);
    expect(CalendarController.getAvailableActivities(20)).toEqual(EVENING.ACTIVITIES);
    expect(CalendarController.getAvailableActivities(4)).toEqual(NIGHT.ACTIVITIES);
  });
});
