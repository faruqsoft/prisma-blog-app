import  Express, { NextFunction, Request, Response, Router }  from "express";
import { postController } from "./post.controllers";
import { auth } from './../../lib/auth';
const router = Express.Router();


const authMiddleware = (...roles: string[])=>{
    return async (req:Request, res:Response, next:NextFunction) => {
        next()
}    
}          

router.post('/', authMiddleware('admin'),postController.createPost);

export const  postRouter:Router = router;