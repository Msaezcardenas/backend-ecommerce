import express from 'express';
import router from '../routes/index.js';
import { create } from 'express-handlebars';
import { __dirname } from '../utils/utils.js';
import { connectionDB } from '../mongo/connection.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import initializePassport from '../passport/jwt.passport.js';
import cors from 'cors';
import path from 'path';

export const AppInit = (app) => {
  dotenv.config();
  connectionDB();
  initializePassport();
  passport.initialize();

  const hbs = create();
  app.use(
    cors({
      origin: 'http://localhost:5173/',
    }),
  );
  app.use(cookieParser(process.env.SECRET));
  app.engine('handlebars', hbs.engine);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'handlebars');
  app.use(express.static(__dirname + '/public'));
  app.use('/public', express.static(path.join(__dirname, '../public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', router);
};
