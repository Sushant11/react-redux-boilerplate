var express = require('express');

const commonUtil = require('./../Utils/commonUtil');
const jwtUtil = require('./../Utils/jwtUtil');

const data = require('./../_mock_/Users.mockData');

const router = express.Router();

const key = commonUtil.randomSecretKey();

router.route('/login').post((req, res, next) => {
    // authCtrl.login(req, res);

    if (!req.body.username || !req.body.password) {
        res
            .status(200)
            .send({
                code: '200',
                status: 'ERROR',
                message: 'Please enter username and password!',
            });
    } else {
        // return user {object} when find username and password matching
        const user = data.users.find(u => {
            return (
                u.userName === req.body.userName && u.password === req.body.password
            );
        });

        if (!user) {
            res
                .status(401)
                .send({
                    code: '401',
                    status: 'ERROR',
                    message: 'User does not exist'
                });
        } else {
            let token = jwtUtil.createNewToken(user, key);

            res
                .status(200)
                .cookie('X-CROS', token, {
                    domain: 'localhost',
                    secure: false,
                    maxAge: 900000,
                    httpOnly: true,
                })
                .send({
                    code: '200',
                    status: 'SUCCESS',
                    data: {
                        token: token,
                        message: 'Login successful'
                    }});
        }
    }
});

module.exports = router;
