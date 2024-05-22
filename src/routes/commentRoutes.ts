import express, { Router } from 'express';
import updateCommentDateMiddleware from '../middlewares/commentMiddleware';

import { postComment, deleteComment, updateComment, getAllComments} from '../controllers/commentController';
const router: Router = express.Router();

//axios
router.get('/', getAllComments)
//POST Comments
router.post('/', postComment);
//Update Comments
router.put('/:id', updateCommentDateMiddleware, updateComment)
// DELETE Comments
router.delete('/:id', deleteComment);


export default router;