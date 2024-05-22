import express from "express";

const updateCommentDateMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction) => {
  if (req.path === '/comment/' && req.method === 'PUT') {
      console.log(`New Comment has been update ${new Date()}`);   
  }
  next();
};

export default updateCommentDateMiddleware;