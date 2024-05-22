import express, { Router } from 'express';
import { getAllFeedPosts, createFeedPost, updateFeedPost, deleteFeedPost} from '../controllers/feedpostController';
const router: Router = express.Router();

//GET Posts
router.get('/', getAllFeedPosts);
//POST P0sts
router.post('/', createFeedPost);
//updateFeed
router.put('/:id',updateFeedPost)
//deeleteUser
router.put(':/id',deleteFeedPost)

export default router;