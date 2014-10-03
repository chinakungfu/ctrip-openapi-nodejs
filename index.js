'use strict';

var soap = require('soap');
var crypto = require('crypto');

var md5 = function (str) {
  return crypto.createHash('md5').update(str).digest('hex');
};

var baseUrl = 'http://openapi.ctrip.com/';
var wsdl = '.asmx?wsdl';

var ctrip = module.exports = {};

ctrip.signature = function (requesttype, allianceid, apikey, sid) {
  return md5(new Date().getTime() + allianceid + md5(apikey).toUpperCase() + sid + requesttype).toUpperCase();
};

ctrip.header = function (requesttype, allianceid, apikey, sid) {
  var timestamp = new Date().getTime();
  var signature = ctrip.signature(requesttype, allianceid, apikey, sid);

  return '<Header AllianceID="' + allianceid + 
    '" SID="' + sid + 
    '" TimeStamp="' + timestamp + 
    '" Signature="' + signature + 
    '" RequestType="' + requesttype + '"/>';
};

ctrip.request = function (path, data, callback){
  var url = baseUrl + path + wsdl;
  soap.createClient(url, function(err, client) {
    var param = {
      requestXML: data
    };
    client.Request(param, callback);
  });
};
