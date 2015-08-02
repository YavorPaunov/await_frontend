(function() {
  'use strict';

  angular
    .module('await')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {
  	
    $log.debug('runBlock end');
  }

})();
