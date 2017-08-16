import UserDetailsController from './UserDetailsController'

export default {
  name : 'userDetails',
  config : {
    bindings         : {  selected: '<' , users: '='},
    templateUrl      : 'src/users/components/details/UserDetails.html',
    controller       : [ 'UsersDataService', '$mdBottomSheet', '$log', '$http', 'server', UserDetailsController ]
  }
};