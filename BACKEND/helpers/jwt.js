const expressjwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL
    return expressjwt({
     secret,
     algorithms:['HS256']
    }).unless({
        path :[
            //this is except api using without token
           {url:`${api}/products`, method:['GET', 'OPTION']},
           {url: `${api}/products/get/count`,  method:['GET', 'OPTION']},
           {url: `${api}/categories`,  method:['GET', 'OPTION']},
         
           `${api}/users/register`,
            `${api}/users/login`
        ]
    })
}

module.exports = authJwt;