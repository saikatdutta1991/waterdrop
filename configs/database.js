let mongoose = require('mongoose')
let config = require('../configs/app')


class Database {

    constructor() {
        this._connect()
    }

    /** private method */
    _connect() {

        let connString = `mongodb://${config.dbhost}:${config.dbport}/${config.dbname}`

        mongoose.connect(connString, { useNewUrlParser: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}

module.exports = new Database()