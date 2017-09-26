(function () {
    "use strict";

    angular
        .module('config.settings', [])
        .constant('settingsConst', {
            webAppName: "connectApp Project",
            webAppRelease: "0.0.1",
            webApiBaseUrl: "http://connect-app.azurewebsites.net/api/connect"  
                  });
})();