(function() {
    "use strict";
    angular
        .module("myApp")
        .factory('settings', ['$http','$q','settingsConst', settingsService]);

    function settingsService($http, $q, settingsConst) {
        var settings = {};

        settings.userid = '';
        settings.isAuthenticated = false;
        settings.authKey = '';

        settings.authApiBaseUrl = settingsConst.authApiBaseUrl;
        settings.webApiBaseUrl = settingsConst.webApiBaseUrl;


        settings.searchInline = '&inline=true&view=object_name,r_object_id,r_full_content_size,a_content_type,r_object_type,jtc_file_ref,r_creation_date,r_creator_name,title';
        settings.searchAdvance = ".json?dql=select object_name,r_object_id,r_full_content_size,a_content_type,r_object_type,jtc_file_ref,r_creation_date,r_creator_name,title from ";
        settings.searchRecord = ".json?dql=select object_name,r_object_id,r_full_content_size,a_content_type,r_object_type,jtc_file_ref,r_creation_date,r_creator_name,title from jtc_record where any i_folder_id='";
        settings.primaryContent = 'http://identifiers.emc.com/linkrel/primary-content';
        settings.enclosure = 'enclosure';
        settings.propUrl = '';

        return settings;
    }

}());