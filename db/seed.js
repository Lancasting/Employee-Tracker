var connection = require("connection");

// class to insert data in database

// constructor for connection

this.connection = connection

// module.exports = class()

findall() {
    return this.connection.query(
        "SELECT * FROM EMPLOYEES"
    )
}



