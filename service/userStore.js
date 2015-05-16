/**
 * Created by Philipp on 06.04.2015.
 */

var users = [];


module.exports.add = function(user) {
    users.push(user);
};

module.exports.getAll = function() {
    return users;
};

