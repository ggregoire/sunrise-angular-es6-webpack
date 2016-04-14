import angular from 'angular';

import CalendarController from './Calendar/Calendar.controller';
import calendar from './Calendar/calendar.directive';

import 'bulma/css/bulma.min.css';
import '../style/app.css';

const MODULE_NAME = 'sunrise';

angular.module(MODULE_NAME, [])
  .controller('CalendarController', CalendarController)
  .directive('calendar', calendar);

export default MODULE_NAME;
