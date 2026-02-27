import express from 'express'
import {isAuthenticated} from "../middleware/auth.js";
import {getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage} from "../controllers/messageController.js";
 const messageRouter = express.Router()

messageRouter.get('/users' ,isAuthenticated, getUsersForSidebar);
 messageRouter.get('/:id' ,isAuthenticated, getMessages);
 messageRouter.put('/mark/:id' ,isAuthenticated, markMessageAsSeen);
 messageRouter.post('/send/:id' ,isAuthenticated, sendMessage);

 export default messageRouter;