const controllers = require('./controllers');
const mid = require('./middleware');
const file = require('./controllers/File.js');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/getProjects', mid.requiresLogin, controllers.Project.getProjects);

  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

  app.get('/logout', mid.requiresLogin, controllers.Account.logout);

  app.get('/maker', mid.requiresLogin, controllers.Project.makerPage);
  app.post('/maker', mid.requiresLogin, controllers.Project.makeProject, file.uploadFile);

  app.get('/', mid.requiresSecure, mid.requiresLogout, file.uploadPage, controllers.Account.loginPage);

  // app.post('/upload', file.uploadFile);
  app.get('/retrieve', file.getFile);
};

module.exports = router;
