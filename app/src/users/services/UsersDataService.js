/**
 * Users DataService
 * Uses embedded, hard-coded data model; acts asynchronously to simulate
 * remote data service call(s).
 *
 * @returns {{loadAll: Function}}
 * @constructor
 */
function UsersDataService($q, $http) {
  var users = [];

  // Promise-based API
  return {
    loadAllUsers: function(server) {

       return $http.get(`${server}/users`);

    },
    setUsers: function(users) {
      this.users = users;
    },
    updateUsers: function(users) {
      this.users.splice(0, this.users.length);
      this.users.push.apply(this.users, users);
    }
  };
}

export default ['$q', '$http', UsersDataService];

