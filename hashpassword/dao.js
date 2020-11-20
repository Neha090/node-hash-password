const { resolve } = require('path');
const { RSA_PSS_SALTLEN_AUTO } = require('constants');
var db = require('../DBstorage/connection');
var password = require('./helper')

exports.addUser = function (req, res) {
    var userData = { salt, hash } = password.setPassword(req.body.pass)
    db.execute(`BEGIN
        newUser('${req.body.user}','${userData.salt}','${userData.hash}');
        END;`, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
    }, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        res.write("<html><h2>user added !!!</h2></html>");
        res.end();
    })  
}

exports.verifyLogin = function (req, res) {
    console.log(req.body);
    db.execute(`select passSalt,passHash from newUsers where username = '${req.body.user}' `, function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
    }, function (err, result) {
        if (err) {
            console.log(err.messmage);
            return;
        }
        var salt = result.rows[0][0].toString();
        var hash = result.rows[0][1].toString();
        var res = password.verifyPassword(req.body.pass, salt, hash)
        writeOnScreen(res);
    });

    function writeOnScreen(data) {
        if (data == true) {
            res.write("<html><h1>welcome</h1></html>");
        }
        else {
            res.write("<html><h2>wrong password !!!</h2></html>");
        }
    }

}