import  Express, { Router }  from "express";
import { postController } from "./post.controllers";
const router = Express.Router();

router.post('/', postController.createPost);

export const  postRouter:Router = router;