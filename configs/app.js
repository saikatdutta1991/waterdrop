let environment = 'staging'

let stagingConfig = {
    port: 80,
    dbname: 'waterboy',
    dbhost: '127.0.0.1',
    dbport: 27017,
    jwt_secret: 'secret',
    base_url: 'http://localhost:80/',
    email: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'zz2adr6flcyk7kmp@ethereal.email',
            pass: 'UNaCDkkwSfprVqxzD2'
        },
        from: {
            name: 'WaterBoy',
            email: 'waterboy@support.com'
        }
    }
}

let prodConfig = {
    port: 2001,
    dbname: 'waterboy',
    dbhost: '127.0.0.1',
    dbport: 27017,
    jwt_secret: 'secret',
    base_url: 'http://localhost:3000/',
    email: {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'zz2adr6flcyk7kmp@ethereal.email',
            pass: 'UNaCDkkwSfprVqxzD2'
        },
        from: {
            name: 'WaterBoy',
            email: 'waterboy@support.com'
        }
    }
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