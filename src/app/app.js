import angular from 'angular';

import Calendar from './Calendar/Calendar.service';
import CalendarController from './Calendar/Calendar.controller';
import calendar from './Calendar/calendar.directive';

import 'bulma/css/bulma.min.css';
import '../style/app.css';

const MODULE_NAME = 'sunrise';

angular.module(MODULE_NAME, [])
  .service('Calendar', Calendar)
  .controller('CalendarController', CalendarController)
  .directive('calendar', calendar);

export default MODULE_NAME;
