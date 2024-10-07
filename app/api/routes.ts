import express, { Request, Response } from 'express';
import { User, sequelize } from './models'
import bodyParser from 'body-parser'

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

app.post('/users', async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});