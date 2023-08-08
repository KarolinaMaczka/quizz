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

const port =  process.env.PORT ||3000;

app.use(express.json());

function authenticate(req, res, next) {
    next();
}

app.post('/api/users', async (req, res) => {
    try {
        const { login, password } = req.body;
        const userRef = await db.collection('users').add({
            login,
            password,
            tests: []
        });

        res.status(201).json({ message: 'User added successfully!', id: userRef.id });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/api/users/:userId/tests', authenticate, async (req, res) => {
    try {
        const { userId } = req.params;
        const { title } = req.body;
        const testRef = await db.collection('users').doc(userId).collection('tests').add({
            title,
            cards: []
        });

        res.status(201).json({ message: 'Test added successfully!', id: testRef.id });
    } catch (error) {
        console.error('Error adding test:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.post('/api/users/:userId/tests/:testId/cards', authenticate, async (req, res) => {
    try {
        const { userId, testId } = req.params;
        const { term, definition } = req.body;
        const cardRef = await db.collection('users').doc(userId).collection('tests').doc(testId).collection('cards').add({
            term,
            definition
        });

        res.status(201).json({ message: 'Card added successfully!', id: cardRef.id });
    } catch (error) {
        console.error('Error adding card:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/users/:userId/tests', authenticate, async (req, res) => {
    try {
        const { userId } = req.params;
        const testsSnapshot = await db.collection('users').doc(userId).collection('tests').get();
        const tests = [];
        testsSnapshot.forEach((doc) => {
            tests.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(tests);
    } catch (error) {
        console.error('Error fetching tests:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/users/:userId/tests/:testId/cards', authenticate, async (req, res) => {
    try {
        const { userId, testId } = req.params;
        const cardsSnapshot = await db.collection('users').doc(userId).collection('tests').doc(testId).collection('cards').get();
        const cards = [];
        cardsSnapshot.forEach((doc) => {
            cards.push({ id: doc.id, ...doc.data() });
        });

        res.status(200).json(cards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.put('/api/users/:userId/tests/:testId/cards/:cardId', authenticate, async (req, res) => {
    try {
        const { userId, testId, cardId } = req.params;
        const { term, definition } = req.body;

        await db.collection('users').doc(userId).collection('tests').doc(testId).collection('cards').doc(cardId).update({
            term,
            definition
        });

        res.status(200).json({ message: 'Card updated successfully!', id: cardId });
    } catch (error) {
        console.error('Error updating card:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
app.delete('/api/users/:userId/tests/:testId', authenticate, async (req, res) => {
    try {
        const { userId, testId } = req.params;

        await db.collection('users').doc(userId).collection('tests').doc(testId).delete();

        res.status(200).json({ message: 'Card deleted successfully!' });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.delete('/api/users/:userId/tests/:testId/cards/:cardId', authenticate, async (req, res) => {
    try {
        const { userId, testId, cardId } = req.params;

        await db.collection('users').doc(userId).collection('tests').doc(testId).collection('cards').doc(cardId).delete();

        res.status(200).json({ message: 'Card deleted successfully!', id: cardId });
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
