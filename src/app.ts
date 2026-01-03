import Express from 'express';
import { postRouter } from './modules/post/post.routers';
const app = Express();

app.use(Express.json());

app.use('/post', postRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


export default app;
