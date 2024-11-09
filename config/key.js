if(process.env.NODE_ENV === 'pproduction') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}