

class UserDetailsController  {


  /**
   * Constructor
   *
   * @param $mdBottomSheet
   * @param $log
   */
  constructor(UsersDataService, $mdBottomSheet, $log, $http, server) {
    this.$mdBottomSheet = $mdBottomSheet;
    this.$log = $log;
    this.$http = $http;
    this.UsersDataService = UsersDataService;

    this.UsersDataService.setUsers(this.users);

    this.deleteUser = () => {

    var headers = new Headers();

    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Methods','POST, PUT, DELETE, GET, OPTIONS');
    headers.append('Access-Control-Request-Method', '*');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    this.$http.post(`${server}/delete`, this.selected ,headers).then(() => {
           UsersDataService
                             .loadAllUsers(server)
                             .then( ( usersResp ) => {
                               UsersDataService.updateUsers([].concat(usersResp.data));
                               this.selected = null;
                             });

                  $mdBottomSheet.hide();
                  }, (err) => {console.log(err)})
    };
  }




  /**
   * Show the bottom sheet
   */
  share() {

    var users  = this.users;
    var user = this.selected;
    var $mdBottomSheet = this.$mdBottomSheet;


    var $http = this.$http;

    var  items = [
        { id: 'svg-1'       , title: 'avatar-1'       , value: 'avatar-1'},
        { id: 'svg-2'       , title: 'avatar-2'       , value: 'avatar-2'},
        { id: 'svg-3'       , title: 'avatar-3'       , value: 'avatar-3'},
        { id: 'svg-4'       , title: 'avatar-4'       , value: 'avatar-4'},
      ];



    $mdBottomSheet.show({
      parent: angular.element(document. getElementById('content')),
      templateUrl: 'src/users/components/details/ContactSheet.html',
      controller: ['UsersDataService', '$mdBottomSheet', 'server', UserSheetController],
      controllerAs: "$ctrl",
      bindToController : true
    }).then((clickedItem) => {
      this.$log.debug( clickedItem.name + ' clicked!');
    });

    /**
     * Bottom Sheet controller for the Avatar Actions
     */
    function UserSheetController(UsersDataService, $mdBottomSheet, server) {

      this.selectedItem = items[0];
      this.items = items;
      this.http = $http;


      this.performAction = (action) => {
        $mdBottomSheet.hide(action);
      };


      this.save = () => {
        var parameter = JSON.stringify({"name":this.user.name,"surname":this.user.surname, "age": this.user.age, "email":this.user.email, "avatar":this.selectedItem.id});
        var headers = new Headers();

        headers.append('Content-Type','application/json');
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Methods','POST, PUT, DELETE, GET, OPTIONS');
        headers.append('Access-Control-Request-Method', '*');
        headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')

        this.http.post(`${server}/user`, parameter ,headers).then(() => {

            console.log(server)
             UsersDataService
                   .loadAllUsers(server)
                   .then( ( usersResp ) => {

                     UsersDataService.updateUsers([].concat(usersResp.data));

                   });

        $mdBottomSheet.hide();
        }, (err) => {$mdBottomSheet.hide();})

       };

      this.cancel = function(action) {
      console.log(server)
            $mdBottomSheet.hide(action);
      };

    }
  }
}


export default UserDetailsController;


