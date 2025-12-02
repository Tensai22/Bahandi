const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'SUPER_SECRET'; 
const PORT = 5000;

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); 
app.use(bodyParser.json());

const users = []; 

app.post('/register', (req, res) => {
    const { username, email, password } = req.body; 

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'Пользователь c таким email уже существует.' });
    }

    const newUser = { id: Date.now(), username, email, password }; 
    users.push(newUser);
    
    console.log("Registered user:", newUser.email, "(Name:", newUser.username + ")");

    res.status(201).json({ 
        message: 'Регистрация прошла успешно. Теперь выполните вход.'
    });
});


app.post('/auth', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Неверный email или пароль.' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username }, 
        JWT_SECRET, 
        { expiresIn: '1h' } 
    );
    
    console.log("User logged in:", user.email, "(Name:", user.username + ")");

    res.json({
        token,
        user: { 
            id: user.id, 
            email: user.email, 
            username: user.username 
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});