import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
import { getUser,  findOrCreateUser} from '../controllers/user.js';

const router=express.Router();

router.get('/', getPosts);
router.post('/', createPost);

router.get('/auth', getUser);
router.post('/auth', findOrCreateUser);

export default router;