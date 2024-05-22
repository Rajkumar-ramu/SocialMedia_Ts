import express, {Express, Request, Response} from 'express'
import {AppDataSource} from './config/data'
import errorHandler from './middlewares/errorhandlingMiddleware';

const app: Express =express();
import userRoutes from './routes/userRoutes';
import feedpostRoutes from './routes/feedpostRoutes';
import commentRoutes from './routes/commentRoutes'

//Routes
app.use(express.json());
app.use('/users', userRoutes);
app.use('/feed', feedpostRoutes);
app.use('/comment', commentRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000

AppDataSource.initialize()
    .then(() => {
        console.log('Mongo Database connection Sucess');
    })
    .catch((error) => console.log(error))

app.listen(PORT ,()=>{
    console.log(`Server started running on ${PORT}`);
})