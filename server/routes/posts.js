import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';
import { getUser, getUserData, findOrCreateUser} from '../controllers/user.js';
import { createPollAnnouncement, getPollAnnouncement, getPollDetails, applyForPoll } from '../controllers/poll.js';

const router=express.Router();

router.get('/', getPosts);
router.post('/', createPost);

router.get('/auth', getUser);
router.post('/auth', findOrCreateUser);

router.get('/user/:userId', getUserData);

router.post('/pollAnnouncement', createPollAnnouncement);
router.get('/pollAnnouncements', getPollAnnouncement);
router.get('/pollDetails/:id', getPollDetails);

router.post('/applyForPoll/:id', applyForPoll);

export default router;