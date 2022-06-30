const express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const funcs = require('./funcs');
const app = express();


// graphql sonra eklenecek
app.use(express.urlencoded({ extended: true }));


app.post('/login', async (req, res) => {
    await funcs.login(req.body.name, req.body.password).catch(err => {
        res.end(err);
    }).then(result => {
        res.end(result);
    });
});
app.post('/register', async (req, res) => {
    await funcs.register(req.body).catch(err => {
        res.end(err);
    }).then(result => {
        res.end(result);
    });
});
app.post('/forgotPassword', async (req, res) => {
    await funcs.forgotPassword(req.body.email).catch(err => {
        res.end(err);
    }).then(result => {
        res.end(result);
    });
});
app.get('/users', async (req, res) => {
    await funcs.getUsers().catch(err => {
        res.end(err);
    }).then(result => {
        res.end(result);
    });
}
);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
}
);
