let environment = 'staging'

let stagingConfig = {
    port: 3000,
    dbname: 'waterboy',
    dbhost: '127.0.0.1',
    dbport: 27017,
    jwt_secret: 'secret'
}

let prodConfig = {
    port: 2001,
    dbname: 'waterboy',
    dbhost: '127.0.0.1',
    dbport: 27017,
    jwt_secret: 'secret'
}

module.exports = (() => {

    switch (environment) {

        case 'staging':
            return stagingConfig
            break;

        case 'production':
            return prodConfig
            break;

        default:
            return prodConfig
            break;
    }

})()