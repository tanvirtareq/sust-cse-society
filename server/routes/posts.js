import express from 'express';
import { getPosts, createPost, getPostDetails, editPost, deletePost , searchPost} from '../controllers/posts.js';
import { getUser, getUserData, findOrCreateUser, searchUser} from '../controllers/user.js';
import { startPoll, getPollResults, publishPollResult, createPollAnnouncement, getPollAnnouncement, getPollDetails, applyForPoll, getRunningElections, handleVote } from '../controllers/poll.js';

import { getConversations, getConversation } from '../controllers/conversation.js';
import { createMessage, getMessages } from '../controllers/message.js';

const router=express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/postDetails/:id', getPostDetails);
router.post('/editPost/:id', editPost);
router.post('/deletePost', deletePost);
router.get('/searchPost/:searchText', searchPost);

router.get('/auth', getUser);
router.get('/users', getUser);
router.post('/auth', findOrCreateUser);

router.get('/user/:userId', getUserData);
router.get('/searchUser/:searchText', searchUser);

router.post('/pollAnnouncement', createPollAnnouncement);
router.get('/pollAnnouncements', getPollAnnouncement);
router.get('/pollDetails/:id', getPollDetails);

router.post('/applyForPoll/:id', applyForPoll);

router.get('/runningElections', getRunningElections);

router.post('/voteFor/:id', handleVote);
router.post('/publishPollResult/:id', publishPollResult);

router.get('/pollResults', getPollResults);

router.post('/startPoll/:id', startPoll);

router.get('/getConversations/:userId', getConversations);

router.get('/getConversation/:firstUserID/:secondUserID', getConversation);

router.get('/getMessages/:conversationID', getMessages);

router.post('/createMessage', createMessage);

// router.get('finishedElections', getFinishedPolls);


export default router;