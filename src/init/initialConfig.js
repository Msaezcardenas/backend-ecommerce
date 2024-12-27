import express from 'express';
import router from '../routes/index.js';
import { create } from 'express-handlebars';
import { __dirname } from '../utils.js';
import { connectionDB } from '../mongo/connection.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import cors from 'cors';

export const AppInit = (app) => {
  dotenv.config();
  connectionDB();
  initializePassport();
  passport.initialize();

  const hbs = create();
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  );
  app.use(cookieParser(process.env.SECRET));
  app.engine('handlebars', hbs.engine);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.static(__dirname + '/public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', router);
};

// import express from 'express';
// import router from '../routes/index.js';
// import { create } from 'express-handlebars';
// import { __dirname } from '../utils.js';
// import { connectionDB } from '../mongo/connection.js';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import passport from 'passport';
// import initializePassport from '../passport/jwt.passport.js';
// import cors from 'cors';
// import cluster from 'node:cluster';
// import { cpus } from 'node:os';

// dotenv.config();
// const nucleos = cpus().length;
// export const AppInit = (app) => {
//   if (cluster.isPrimary) {
//     console.log('Proceso Principal ID:', process.pid);
//     console.log('Soy el cluster principal, voy a forkear (worker)');
//     for (let i = 0; i < nucleos; i++) {
//       cluster.fork();
//     }
//   } else {
//     console.log('Soy un trabajador', process.pid);
//     connectionDB();
//     initializePassport();
//     passport.initialize();

//     const hbs = create();
//     app.use(
//       cors({
//         origin: 'http://localhost:5173',
//       }),
//     );
//     app.use(cookieParser(process.env.SECRET));
//     app.engine('handlebars', hbs.engine);
//     app.set('views', __dirname + '/views');
//     app.set('view engine', 'handlebars');
//     app.use(express.static(__dirname + '/public'));
//     app.use(express.json());
//     app.use(express.urlencoded({ extended: true }));

//     app.use('/', router);
//     app.listen(process.env.PORT, () => {
//       console.log('Servidor en 8080');
//     });
//   }
// };
