import express from "express"
import cors from "cors"
import bodyParser from 'body-parser'
import { User, sequelize } from './models.js'

const app = express();
const port = process.env.PORT || 8080;

app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});

app.get("/users", async (_req, res) => {
    try {
        const user = await User.findAll();
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get user', details: err });
    }
})

app.get("/user", async (req, res) => {
    const { email } = req.query

    try {
        const user = await User.findOne({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ error: `User not found with email: ${email}`});
        }
        res.status(200).json(user);
    } catch (err) {
        console.error('Error fetching user by email', err);
    }

})

app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user', details: err });
    }
});

app.put("/lastCity", async (req, res) => {
    const { email } = req.query
    const { lastCity } = req.body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ error: `User not found with email: ${email}`});
        }

        await User.update({ lastCity }, {
            where: { email }
        });

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: 'Failed to update user', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });