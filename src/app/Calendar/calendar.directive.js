export default function calendar() {
  return {
    template: require('./calendar.template.html'),
    controller: 'CalendarController',
    controllerAs: 'vm',
  };
}
