(function () {
    "use strict";

    angular
        .module('config.settings', [])
        .constant('settingsConst', {
            webAppName: "dmc Project",
            webAppRelease: "0.0.1",
                    // for uat
         //   authApiBaseUrl: "http://dmsqasweb1.jtcqas.gov.sg:8082/dctm-rest/repositories/JTC_DMS",
         //   webApiBaseUrl: "http://dmsqasweb1.jtcqas.gov.sg:8082/dctm-rest/repositories/JTC_DMS"
                    // for dev
            authApiBaseUrl: "http://jtcdmsapp1.southeastasia.cloudapp.azure.com:8087/dctm-rest/repositories/JTC_DMS_MOBILE",
            webApiBaseUrl: "http://jtcdmsapp1.southeastasia.cloudapp.azure.com:8087/dctm-rest/repositories/JTC_DMS_MOBILE"
                    // for prod
         //      authApiBaseUrl: "http://dmsmobile.jtc.gov.sg/dctm-rest/repositories/JTC_DMS",
         //      webApiBaseUrl:"http://dmsmobile.jtc.gov.sg/dctm-rest/repositories/JTC_DMS"
        });
})();