import Express from 'express';
import { postRouter } from './modules/post/post.routers';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import cors from 'cors';
const app = Express();

app.use(Express.json());
app.use(cors({
    origin: process.env.app_url || "http://localhost:4000",
    credentials: true,
}))

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/post', postRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


export default app;
