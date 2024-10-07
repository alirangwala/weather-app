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
    const { email  } = req.query
    const { lastCity, name } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });

        const [user] = await User.upsert({
            email,        
            name,          
            lastCity       
        });

        if (existingUser) {
            return res.status(201).json({ message: 'User created', user });
        } else {
            return res.status(200).json({ message: 'User updated', user });
        }
    } catch (err) {
        console.error('Error during upsert operation:', err);
        res.status(500).json({ error: 'Failed to upsert user', details: err.message });
    }
});

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.status(404).json({ error: `User not found with id: ${id}` });
        }
        await user.destroy();

        return res.status(200).json({ message: `User with id ${id} has been deleted` });
    } catch (err) {
        console.error('Error deleting user by id:', err);
        res.status(500).json({ error: 'Failed to delete user', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });