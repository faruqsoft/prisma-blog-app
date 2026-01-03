import { Request, Response } from "express";
import { postService } from "./post.service";


const createPost = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("Create Post Error:", error); // 👈 এটা যোগ করো
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : error,
    });
  }
};


export const postController = {
    createPost
 };