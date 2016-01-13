var Urls = require('../utils/Urls')

var web = {
    home: {
     path: '/',
     name: 'Home',
     methods: ['get']
    },
    landing : {
        path : '/landing',
        name : "Langing list",
        methods :{
            LIST : {
                httpMethod : 'get',
                controllerMethod : 'get'
            },
            DETAIL : {
                httpMethod : 'get',
                controllerMethod : 'detail',
                name : 'Visit landing page',
                path : '/:id'
            }
        }
    }

};

module.exports = new Urls(web)