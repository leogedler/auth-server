const { signup } = require('./controllers/authentication');

module.exports = (app) => {
    app.post('/signup', signup);
}