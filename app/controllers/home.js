exports.get = function(req,res){
    res.render('index',{title:req.query.title})
}