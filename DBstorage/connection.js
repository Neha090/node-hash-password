var oracledb = require('oracledb');

module.exports = {
    user: "system",
    password: "sysadmin",
    connectString: "localhost:1521/orcl",
    execute: function (query, errCb, cb) {
        oracledb.getConnection({
            user: "system",
            password: "sysadmin",
            connectString: "localhost:1521/orcl"
        },
            function (err, connection) {
                if (err) {
                    errCb(err);
                    return;
                }
                connection.execute(query, cb);
            });
    }
}