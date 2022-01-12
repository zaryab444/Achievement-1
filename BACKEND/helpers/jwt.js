const expressjwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL
    return expressjwt({
     secret,
     algorithms:['HS256'],
     isRevoked: isRevoked
    }).unless({
        path :[
            //this is except api using without token
        // { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
        //    {url:`${api}/products`, method:['GET', 'OPTION']},
        //    {url: `${api}/products/get/count`,  method:['GET', 'OPTION']},
        //    {url: `${api}/categories`,  method:['GET', 'OPTION']},
        //   {url : '/public/uploads/' , methods : ['GET','OPTIONS']} ,
         
        //    `${api}/users/register`,
        //     `${api}/users/login`
        {url: /(.*)/},
        ]
    })
}

async function isRevoked(req, payload, done){
    //if user is not admin then it will rejected
    if(!payload.isAdmin){
        done(null,true)
    }
    //you can also more role classifies here like admin

    done();
}

module.exports = authJwt;