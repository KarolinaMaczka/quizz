const express = require('express');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const serviceAccount = require('./credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://quizz-app-dff94.firebaseio.com'
});

const db = admin.firestore();
const app = express();
app.use(cors());

const port = 3000;

app.use(express.json());


app.post('/api/quizzes', async (req, res) => {
    try {
        const { term, definition } = req.body;
        const id = uuidv4();

        // Add the quiz data to Firestore with the generated ID
        await db.collection('quizzes').doc(id).set({ id, term, definition });

        res.status(201).json({ message: 'Quiz added successfully!', id });
    } catch (error) {
        console.error('Error adding quiz:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/quizzes', async (req, res) => {
    try {
        const snapshot = await db.collection('quizzes').get();
        const quizzes = [];
        snapshot.forEach((doc) => {
            quizzes.push(doc.data());
        });

        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.put('/api/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { term, definition } = req.body;

        await db.collection('quizzes').doc(id).update({ term, definition });

        res.status(200).json({ message: 'Quiz updated successfully!', id });
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.delete('/api/quizzes/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await db.collection('quizzes').doc(id).delete();

        res.status(200).json({ message: 'Quiz deleted successfully!', id });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
