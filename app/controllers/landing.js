var landingList = require('../constants/landingList')

exports.get = function(req,res){
    res.render('landing/list',{title:"List of landing sites",list:landingList})
}


exports.detail = function(req,res){
    res.render('landing/detail',{
        title:"Detail about "+req.params.id,
        detail:landingList[req.params.id]
    })
}