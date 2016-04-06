import sunrise from '../app';

describe('Calendar controller', () => {
  let CalendarController;

  beforeEach(angular.mock.module(sunrise));
  beforeEach(angular.mock.inject($controller => CalendarController = $controller('CalendarController')));

  it('should make times readable for humans', () => {
    expect(CalendarController.formatTime({ hour: 12, minute: 5 })).toBe('12:05am');
    expect(CalendarController.formatTime({ hour: 20, minute: 50 })).toBe('8:50pm');
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
});
