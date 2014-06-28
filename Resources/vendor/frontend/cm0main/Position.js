/*
 * Copyright (c) 2011-2013, Apinauten GmbH
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 *
 *  * Redistributions of source code must retain the above copyright notice, this 
 *    list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice, 
 *    this list of conditions and the following disclaimer in the documentation 
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
 * IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF 
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE 
 * OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * THIS FILE IS GENERATED AUTOMATICALLY. DON'T MODIFY IT.
 */
 
/* define namespace */

if(typeof goog !== 'undefined')
{
    goog.provide('Apiomat.Position');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.Position = function() {
    this.data = new Object();
    /* referenced object methods */
};
/* static methods */

/**
* Returns a list of objects of this class from server.
*
* If query is given than returend list will be filtered by the given query
*
* @param query (optional) a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
* @param withReferencedHrefs set to true to get also all HREFs of referenced class instances
*/
Apiomat.Position.getPositions = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Position, query, callback);
};

/* inheritance */
Apiomat.Position.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.Position.prototype.constructor = Apiomat.Position;


Apiomat.Position.prototype.getSimpleName = function() {
    return "Position";
};

Apiomat.Position.prototype.getModuleName = function() {
    return "CM0Main";
};

/* easy getter and setter */

        Apiomat.Position.prototype.getUserid = function() 
{
    return this.data.userid;
};

Apiomat.Position.prototype.setUserid = function(_userid) {
    this.data.userid = _userid;
};

   Apiomat.Position.prototype.getPositionLatitude = function() 
{
    var locArr = this.data.position;
    if(locArr)
    {
        return locArr[0];
    }
};

Apiomat.Position.prototype.getPositionLongitude = function() 
{
    var locArr = this.data.position;
    if(locArr)
    {
        return locArr[1];
    }
};

Apiomat.Position.prototype.setPositionLatitude = function(_latitude) 
{
    var locArr = this.data.position;
    if(!locArr)
    {
        locArr = [_latitude, undefined];
    }
    else
    {
        locArr[0] = _latitude;
    }
    this.data.position = locArr;
};

Apiomat.Position.prototype.setPositionLongitude = function(_longitude) 
{
    var locArr = this.data.position;
    if(!locArr)
    {
        locArr = [0, _longitude];
    }
    else
    {
        locArr[1] = _longitude;
    }
    this.data.position = locArr;
};

        Apiomat.Position.prototype.getVersion = function() 
{
    return this.data.version;
};

Apiomat.Position.prototype.setVersion = function(_version) {
    this.data.version = _version;
};

        Apiomat.Position.prototype.getEnabled = function() 
{
    return this.data.enabled;
};

Apiomat.Position.prototype.setEnabled = function(_enabled) {
    this.data.enabled = _enabled;
};

        Apiomat.Position.prototype.getDevice = function() 
{
    return this.data.device;
};

Apiomat.Position.prototype.setDevice = function(_device) {
    this.data.device = _device;
};

        Apiomat.Position.prototype.getCity = function() 
{
    return this.data.city;
};

Apiomat.Position.prototype.setCity = function(_city) {
    this.data.city = _city;
};

        Apiomat.Position.prototype.getApi = function() 
{
    return this.data.api;
};

Apiomat.Position.prototype.setApi = function(_api) {
    this.data.api = _api;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);