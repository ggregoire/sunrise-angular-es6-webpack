import 'angular';
import 'angular-mocks';

const testsContext = require.context('.', true, /.spec$/);
testsContext.keys().forEach(testsContext);
