var expand = require('expand')({regex: /:(\w+)/}),
        querystring = require("querystring"),
        config = require('../../config'),
        _ = require("underscore")


/**
 * @Utility
 * @Descprition Wrapper for Route map
 */

/**
 *
 * @param obj | {key : {path:'',name:'',methods:[]},...}
 * @constructor
 */
var Urls = function (obj, baseUrl) {
    var identifiers = Object.keys(obj),
            _self = this;

    if (baseUrl && baseUrl == '/') {
        baseUrl = ''
    }
    _self.baseUrl = baseUrl || '';

    identifiers.forEach(function (identifier) {
        _self[identifier] = obj[identifier];
    });
}

/**
 * Return URL or URL template for a service
 * @param urlObject | {service:<service name from URL map>,method:<name of the method that is used with this service>}
 */
Urls.prototype.getUrl = function (service, method,addHost) {
    var sObj = this[service],
            mObj = null,
            param = '';
    if(!sObj){
        throw new Error('Service ' +service +' not supported yet')
    }

    if(method) {
        mObj = sObj.methods[method];
        if (!mObj) {
            throw new Error(method + ' not suppoted for service ' + service + ' provided to URLs')
        }
    }

    param = (mObj && mObj.path) || '';
    return (addHost?_host():'')+this.baseUrl + sObj.path + param
}

Urls.prototype.getName = function (service, method) {
    var sObj = this[service],
            mObj = null,
            param = '';
    if(!sObj){
        throw new Error('Service ' +service +' not supported yet')
    }

    if(method) {
        mObj = sObj.methods[method];
        if (!mObj) {
            throw new Error(method + ' not suppoted for service ' + service + ' provided to URLs')
        }
    }
    return  (mObj && mObj.name) || sObj.name
}

/**
 * Resolves the URL template with available values and returns final URL
 * @param {String} service
 * @param {String} [method]
 * @param {Object} [pathParams]
 * @param {String|Object} [query]
 * @returns {*}
 */
Urls.prototype.expand = function(service,method,pathParams,query){
    var url = expand(this.getUrl(service, method),pathParams)
    if(query){
        if(_.isString(query)){
            if(query.indexOf('?') == -1){
                url+= '?'
            }
            url+= query
        } else if(_.isObject(query)) {
            url += '?'+querystring.stringify(query)
        }
    }

    return url
}

function _host(){
    return config.app_external_url
}

module.exports = Urls