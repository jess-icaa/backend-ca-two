const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let usersDB = [
    {
        email: 'examplemail@example.com',
        password: 'examplepass1234'
    }
];

app.get('/', (req, res) => {
    res.send('Checking Server');
});

//update

app.put('/update', (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(404).json({ error: 'Email not found.'});
    }

    const user = usersDB.find(use => use.email === email);
    if (!user) {
        return res.status(404).json({ error: 'User not found. '});
    }

    user.password = password;
    return res.status(200).json({ message: 'User updated successfully.', user});
});

// delete 

app.delete('/delete', (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(404).json({ error: 'Email not found.' });
    }

    const index = usersDB.findIndex(use => use.email === email);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    usersDB.splice(index, -1);``
    return res.status(200).json({ message: 'User deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


