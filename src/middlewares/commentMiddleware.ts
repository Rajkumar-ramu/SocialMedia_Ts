import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response, NextFunction } from "express";

//Commmented for Reading Purpose
// const updateCommentDateMiddleware = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction) => {
//   if (req.path === '/comment/' && req.method === 'PUT') {
//       console.log(`New Comment has been update ${new Date()}`);   
//   }
//   next();
// };

// export default updateCommentDateMiddleware;

// @Middleware({type: 'before'})

//app.use(/)

export class commentMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(`Request Method: ${req.method}`);
        console.log(`Request URL: ${req.url}`);
        console.log(`Request Body: ${JSON.stringify(req.body)}`);
        next();
    }
}

export class AddCustomHeaderMiddleware implements ExpressMiddlewareInterface {
    use(req: Request, res: Response, next: NextFunction): void {
        console.log(res.statusMessage = 'Ingested Succesfully');     
        next();
    }
}
