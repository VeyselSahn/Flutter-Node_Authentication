const fs = require('fs');
const mailFuncs = require('./src/send_mail');
module.exports = { login, register, forgotPassword, getUsers };

let path = './data/data.txt';
function login(name, password) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data || '[]');
                console.log(users);
                let user = users.find(user => user.name === name && user.password === password);
                if (user) {
                    resolve('Login success');
                } else {
                    reject('Invalid username or password');
                }
            }
        });
    });
}

function register(details) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data || '[]');
                console.log(users);
                let user = users.find(user => user.name === details.name || user.email === details.email);
                if (user) {
                    reject('User already exists');
                } else {
                    users.push(details);
                    fs.writeFile(path, JSON.stringify(users), 'utf8', (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve('User created');
                        }
                    }
                    );

                }
            }
        });
    });
}

function forgotPassword(email) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let users = JSON.parse(data || '[]');
                console.log(users);
                let user = users.find(user => user.email === email);
                if (user) {
                    mailFuncs.sendMail(mailFuncs.prepareMail(user.email, 'Password reset', 'Your password is ' + user.password));
                    resolve('Password reset link sent to your email');

                } else {
                    reject('User not found');
                }
            }
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                //let users = JSON.parse(data || '[]');
                resolve(data);
            }
        });
    });
}





