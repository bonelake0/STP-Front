import * as jwt from 'jsonwebtoken';

const secert = 'qwe123';

const tempUser = {
    id: '0',
    username: 'bonelake0',
    name: 'Mike Bonelake',
    role: 'admin',
}



export const getToken = (userData) => ({
    token: jwt.sign(userData,secert,{expiresIn: 60 * 60}),
    user: tempUser,
    ok: true,
});


export const verifyToken = (token) => {
    console.log('Trying to verify token');
    try {
        var verifiedToken = jwt.verify(token, secert);
        return ({
            token: verifiedToken,
            user: tempUser,
            ok: true,
        });
    } catch(err) {
        console.log('verification failed');
        return ({
            ok: false,
            error: err,
            message: 'JWT failed verification',
        });
    }
};

export const validateUserLogin = (user) => {
    if (user.username === 'bonelake0' && user.password === '123') {
        return true;
    } else {
        return false;
    }
}

