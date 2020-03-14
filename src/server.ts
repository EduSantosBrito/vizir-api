import express, { Request, Response } from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', (req: Request, res: Response) => {
    res.send('Hey');
});

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
