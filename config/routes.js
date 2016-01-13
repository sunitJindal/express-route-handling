"use strict";
var  _ = require("underscore")
        , webUrls = require("../app/constants/webUrls")
        , sessionUtil = require("../app/utils/sessionUtil")
        , fs = require('fs')



module.exports = function (app) {
    _.each(webUrls, function (urlObj, service) {
        var controller = '';
        var urls = webUrls;
        if (_.isString(urlObj)) {
            // this step ignores the base URL key and considers only those urlObjects which are object
        } else {

            // do nothing if binding is disabled
            if (urlObj.binding == false) {

            } else {

                // require the JS file for the controller
                controller = _getController(service)

                // iterate over each method of urlObject
                // methods can be array of string or an object containing sub routes
                _.each(urlObj.methods, function (method,methodName) {
                    _bind(app, controller,urls,urlObj,service,method,methodName)
                })
            }

        }
    })
}

function _getController(service){
    return require("../app/controllers/" + service + ".js")
}

function _bind(app, controller, urlMap, urlObj, service, method, methodName){
    if(_.isString(method)){
        console.log("Binding %s to method %s", urlMap.getUrl(service), method.toUpperCase());

        // if authorization is applied on service level
        if(urlObj.authorization){
            app[method](urlMap.getUrl(service), sessionUtil.authMiddleware(urlObj.authorization),controller[method])
        } else{
            app[method](urlMap.getUrl(service), controller[method])
        }
    } else{
        console.log("Binding %s to method %s", urlMap.getUrl(service,methodName), method.httpMethod.toUpperCase());

        if(method.authorization ||  urlObj.authorization ) {
            app[method.httpMethod](urlMap.getUrl(service, methodName), sessionUtil.authMiddleware(method.authorization || urlObj.authorization), controller[method.controllerMethod])
        } else {
            app[method.httpMethod](urlMap.getUrl(service, methodName), controller[method.controllerMethod])
        }
    }
}