import express, {Express, NextFunction, Request, Response} from 'express'
import { useExpressServer } from 'routing-controllers';
import {AppDataSource} from './config/data'
import { CommentController } from './controllers/commentController';
import { FeedController } from './controllers/feedpostController';
import { UserController } from './controllers/userController';
import { LogingInterceptor } from "./interceptors/loggingInterceptor";
import bodyParser from 'body-parser';
import axios from 'axios';


class App{
    app: express.Express;
    constructor(){
        this.app = express();
        this.configureMiddleware();
        useExpressServer(this.app, {
            controllers: [CommentController, FeedController,UserController],
            interceptors: [LogingInterceptor]
          });
          this.customAxiosInterceptor();
    }

    customAxiosInterceptor(){
        axios.interceptors.request.use(
            (config) => {
              console.log(`Request URL: ${config.url}`);
              return config;
            },
            (error) => {
              console.error("Request error:", error.message);
              return Promise.reject(error);
            }
          );

        axios.interceptors.response.use(
            (response) => {
              console.log(`Response status code: ${response.status}`);
              return response;
            },
            (error) => {
              if (error.response) {
                console.error(`Response error: ${error.response.status} - ${error.response.statusText}`);
              } else {
                console.error(`other error: ${error.message}`);
              }
              return Promise.reject(error);
            }
          );
    }
configureMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    //error handling middleware
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        console.log(err);
        res.status(500).send("Something broke!");
      }
    );
  }

start() {
    const port = process.env.PORT || 4000;
    AppDataSource.initialize()
      .then(() => {
        this.app.listen(port, () => {
          console.log(
            `Server is succesfully running in http://localhost:${port}`
          );
        });
        //Mongo Db connection started
        console.log(`MongoDB server connected`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
const app = new App();
app.start();