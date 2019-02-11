module.exports = {
    production: {
        host: '127.0.0.1',
        port: '3306',
        user: 'user',
        password : 'passowrd',
        database : 'test'
    },
    development: {
        host: 'database',
        port: '3306',
        user: 'root',
        password : '',
        database : 'rcapps_docker',
    }
}