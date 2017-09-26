(function () {
    "use strict";
    angular
        .module("myApp")
        .controller("advSearchController",
                    ["$scope","$stateParams","$state","$mdToast","settings", advSearchController]);

    function advSearchController ($scope,$stateParams,$state,$mdToast,settings) {
         var advSearchCtrl = this;
         advSearchCtrl.advancemode =true;
         advSearchCtrl.propertiesType=[];
         advSearchCtrl.search ='';
         advSearchCtrl.searchQuery ="";
      function init() {

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
          };

          $scope.toastPosition = angular.extend({},last);
          $scope.getToastPosition = function() {
            sanitizePosition();
            return Object.keys($scope.toastPosition)
              .filter(function(pos) { return $scope.toastPosition[pos]; })
              .join(' ');
          };
          function sanitizePosition() {
            var current = $scope.toastPosition;
            if ( current.bottom && last.top ) current.top = false;
            if ( current.top && last.bottom ) current.bottom = false;
            if ( current.right && last.left ) current.left = false;
            if ( current.left && last.right ) current.right = false;
            last = angular.extend({},current);
          };

          advSearchCtrl.objectType = [
            { label: 'Customer', value: 'jtc_customer_file' },
            { label: 'Contract', value: 'jtc_contract_file' },
            { label: 'Subject', value: 'jtc_subject_file' },
            { label: 'Staff', value: 'jtc_staff_file' },
            { label: 'Record', value: 'jtc_record' }
          ];

          advSearchCtrl.dateType = [
            { label: 'Record Date', value: 'jtc_record_date' },
            { label: 'Creation Date',  value: 'r_creation_date' },
            { label: 'Modified Date', value: 'r_modify_date' }
          ];


           $scope.onChangeProp = function(selectedObject) {
                      advSearchCtrl.selectedProp1='';
                      advSearchCtrl.selectedProp2='';
                      advSearchCtrl.selectedProp3='';
                      advSearchCtrl.selectedProp4='';
                      advSearchCtrl.selectedProp5='';

              switch (selectedObject) {
                    case 'jtc_customer_file':
                      advSearchCtrl.propertiesType = [
                        { label: 'File Ref No', value: 'jtc_file_ref' },
                        { label: 'Old File Ref No', value: 'any jtc_old_file_ref' },
                        { label: 'Company Name', value: 'jtc_company_name' },
                        { label: 'Allocation No', value: 'any jtc_allocation_num' },
                        { label: 'UEN Number', value: 'jtc_uen_num' },
                        { label: 'Site Address', value: 'jtc_site_addr' },
                        { label: 'Mukim Number', value: 'jtc_mukim_num' },
                        { label: 'File Subject', value: 'jtc_subject' }
                      ];
                    break;
                    case 'jtc_contract_file':
                      advSearchCtrl.propertiesType = [
                        { label: 'File Ref No', value: 'jtc_file_ref' },
                        { label: 'Old File Ref No', value: 'any jtc_old_file_ref' },
                        { label: 'Contract No', value: 'jtc_contract_num' },
                        { label: 'Contractor Name',  value: 'jtc_contractor_name' },
                        { label: 'Project Title', value: 'jtc_project_title' },
                        { label: 'UEN Number', value: 'jtc_uen_num' },
                        { label: 'File Subject', value: 'jtc_subject' }
                      ];
                    break;
                    case 'jtc_subject_file':
                      advSearchCtrl.propertiesType = [
                        { label: 'File Ref No', value: 'jtc_file_ref' },
                        { label: 'Old File Ref No', value: 'any jtc_old_file_ref' },
                        { label: 'File Title', value: 'title' },
                        { label: 'File Owner', value: 'owner_name' },
                        { label: 'File Subject', value: 'jtc_subject' }
                      ];
                    break;
                    case 'jtc_staff_file':
                      advSearchCtrl.propertiesType = [
                        { label: 'File Ref No', value: 'jtc_file_ref' },
                        { label: 'Old File Ref No', value: 'any jtc_old_file_ref' },
                        { label: 'Staff Id', value: 'jtc_staff_id' },
                        { label: 'NRIC / FIN',  value: 'jtc_nric_fin_num' },
                        { label: 'Staff Name', value: 'jtc_staff_name' },
                        { label: 'File Title', value: 'title' },
                        { label: 'File Subject', value: 'jtc_subject' }
                      ];
                    break;
                    case 'jtc_record':
                      advSearchCtrl.propertiesType = [
                        { label: 'Record Type', value: 'jtc_record_type' },
                        { label: 'Drawing No',  value: 'jtc_drawing_number' },
                        { label: 'Record Title', value: 'title' },
                        { label: 'Author Organization', value: 'jtc_author_org' },
                        { label: 'Author', value: 'any jtc_authors' },
                        { label: 'Record Source', value: 'jtc_record_source' },
                        { label: 'Record Owner', value: 'owner_name' },
                        { label: 'File Ref No', value: 'jtc_file_ref' }
                      ];
                    break;
                    }
             };     

      }

      init();

      $scope.onChange = function(cbState) {
          $state.go('home');
      };

      $scope.advSearchDisply =function(){

      var subSearchStr = settings.searchAdvance;
      var searchStr = '';
      var searchStrUpper = '';

        if(advSearchCtrl.selectedObject != undefined){
          subSearchStr = subSearchStr + advSearchCtrl.selectedObject;

            if(advSearchCtrl.selectedProp1 != undefined && advSearchCtrl.prpValue1 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue1.trim() != '')
            {
               searchStr = searchStr + advSearchCtrl.selectedProp1 + " like " + "'%25"+ advSearchCtrl.prpValue1 +"%25'";
            }
            if(advSearchCtrl.selectedProp2 != undefined && advSearchCtrl.prpValue2 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue2.trim() != '')
            {
               searchStr = searchStr + "&" + advSearchCtrl.selectedProp2 + " like " + "'%25"+ advSearchCtrl.prpValue2 +"%25'";
            }
            if(advSearchCtrl.selectedProp3 != undefined && advSearchCtrl.prpValue3 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue3.trim() != '')
            {
              searchStr = searchStr + "&" + advSearchCtrl.selectedProp3 + " like " + "'%25"+ advSearchCtrl.prpValue3 +"%25'";
            }
            if(advSearchCtrl.selectedProp4 != undefined && advSearchCtrl.prpValue4 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue4.trim() != '')
            {
              searchStr = searchStr + "&" + advSearchCtrl.selectedProp4 + " like " + "'%25"+ advSearchCtrl.prpValue4 +"%25'";
            }
            if(advSearchCtrl.selectedProp5 != undefined && advSearchCtrl.prpValue5 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue5.trim() != '')
            {
              searchStr = searchStr + "&" + advSearchCtrl.selectedProp5 + " like " + "'%25"+ advSearchCtrl.prpValue5 +"%25'";
            }
            if(searchStr == null || searchStr == ''){
                if(advSearchCtrl.selectedObject == 'jtc_record' && advSearchCtrl.selectedDate != undefined && advSearchCtrl.selectedDate.trim() != '' && advSearchCtrl.fromDate != undefined && advSearchCtrl.toDate != undefined && advSearchCtrl.fromDate != '' && advSearchCtrl.toDate != '')
                {
              searchStr = advSearchCtrl.selectedDate + ">=date('" + moment(advSearchCtrl.fromDate).format('MM-DD-YYYY') + "') and " + advSearchCtrl.selectedDate + "<=date('" + moment(advSearchCtrl.toDate).format('MM-DD-YYYY') +"')";
                }

            }
            else{
                if(advSearchCtrl.selectedObject == 'jtc_record' && advSearchCtrl.selectedDate != undefined && advSearchCtrl.selectedDate.trim() != '' && advSearchCtrl.fromDate != undefined && advSearchCtrl.toDate != undefined && advSearchCtrl.fromDate != '' && advSearchCtrl.toDate != '')
                {
              searchStr = searchStr + "&" +  advSearchCtrl.selectedDate + ">=date('" + moment(advSearchCtrl.fromDate).format('MM-DD-YYYY') + "') and " + advSearchCtrl.selectedDate + "<=date('" + moment(advSearchCtrl.toDate).format('MM-DD-YYYY') +"')";
                }

            }

            // for uppercase start

            if(advSearchCtrl.selectedProp1 != undefined && advSearchCtrl.prpValue1 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue1.trim() != '')
            {
               searchStrUpper = searchStrUpper + advSearchCtrl.selectedProp1 + " like " + "'%25"+ advSearchCtrl.prpValue1.toUpperCase() +"%25'";
            }
            if(advSearchCtrl.selectedProp2 != undefined && advSearchCtrl.prpValue2 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue2.trim() != '')
            {
               searchStrUpper = searchStrUpper + "&" + advSearchCtrl.selectedProp2 + " like " + "'%25"+ advSearchCtrl.prpValue2.toUpperCase() +"%25'";
            }
            if(advSearchCtrl.selectedProp3 != undefined && advSearchCtrl.prpValue3 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue3.trim() != '')
            {
              searchStrUpper = searchStrUpper + "&" + advSearchCtrl.selectedProp3 + " like " + "'%25"+ advSearchCtrl.prpValue3.toUpperCase() +"%25'";
            }
            if(advSearchCtrl.selectedProp4 != undefined && advSearchCtrl.prpValue4 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue4.trim() != '')
            {
              searchStrUpper = searchStrUpper + "&" + advSearchCtrl.selectedProp4 + " like " + "'%25"+ advSearchCtrl.prpValue4.toUpperCase() +"%25'";
            }
            if(advSearchCtrl.selectedProp5 != undefined && advSearchCtrl.prpValue5 != undefined && advSearchCtrl.selectedProp1.trim() != '' && advSearchCtrl.prpValue5.trim() != '')
            {
              searchStrUpper = searchStrUpper + "&" + advSearchCtrl.selectedProp5 + " like " + "'%25"+ advSearchCtrl.prpValue5.toUpperCase() +"%25'";
            }
            if(searchStrUpper == null || searchStrUpper == ''){
                if(advSearchCtrl.selectedObject == 'jtc_record' && advSearchCtrl.selectedDate != undefined && advSearchCtrl.selectedDate.trim() != '' && advSearchCtrl.fromDate != undefined && advSearchCtrl.toDate != undefined && advSearchCtrl.fromDate != '' && advSearchCtrl.toDate != '')
                {
              searchStrUpper = advSearchCtrl.selectedDate + ">=date('" + moment(advSearchCtrl.fromDate).format('MM-DD-YYYY') + "') and " + advSearchCtrl.selectedDate + "<=date('" + moment(advSearchCtrl.toDate).format('MM-DD-YYYY') +"')";
                }

            }
            else{
                if(advSearchCtrl.selectedObject == 'jtc_record' && advSearchCtrl.selectedDate != undefined && advSearchCtrl.selectedDate.trim() != '' && advSearchCtrl.fromDate != undefined && advSearchCtrl.toDate != undefined && advSearchCtrl.fromDate != '' && advSearchCtrl.toDate != '')
                {
              searchStrUpper = searchStrUpper + "&" +  advSearchCtrl.selectedDate + ">=date('" + moment(advSearchCtrl.fromDate).format('MM-DD-YYYY') + "') and " + advSearchCtrl.selectedDate + "<=date('" + moment(advSearchCtrl.toDate).format('MM-DD-YYYY') +"')";
                }

            }

            // for uppercase end

            if(searchStr == null || searchStr == ''){
                          advSearchCtrl.searchQuery = subSearchStr;
            }else{
                          advSearchCtrl.searchQuery = subSearchStr + " where " + searchStr +" OR "+searchStr.toLowerCase()+" OR "+searchStrUpper;
            }

            $state.go('display', {searchKey:  advSearchCtrl.searchQuery ,textKey: 'advance search - '+advSearchCtrl.selectedObject});

        }
        else{
              $mdToast.show(
                        $mdToast.simple()
                          .content('Select File/Record!')
                          .position($scope.getToastPosition())
                          .hideDelay(3000)
                      );
        }

        
      };
 
    };
}());