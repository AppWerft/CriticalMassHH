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
    goog.provide('Apiomat.User');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.User = function(_username, _password) {
    this.data = new Object();
    this.data["dynamicAttributes"] = {};
    
    if(typeof _username !== 'undefined')
    {
        this.setUserName(_username);
    }
    
    if(typeof _password !== 'undefined')
    {
        this.setPassword(_password);
    }
    
    this.initDatastoreIfNeeded = function(allowGuest) {
        //if the datastore is not initialized then do so
        if(Apiomat.Datastore.isInstantiated() === false)
        {
            if(typeof this.getUserName() !== 'undefined' &&  typeof this.getPassword() !== 'undefined')
            {
                Apiomat.Datastore.configureWithCredentials(this);
            }
            else if(this.hasOwnProperty('getSessionToken') && typeof this.getSessionToken() !== 'undefined' && this.getSessionToken())
            {
                Apiomat.Datastore.configureWithUserSessionToken(this);
            }
            else if (typeof allowGuest !== 'undefined' && allowGuest)
            {
                Apiomat.Datastore.configurePlain(Apiomat.User.AOMBASEURL, Apiomat.User.AOMAPIKEY, Apiomat.User.AOMSYS);
            }
            else
            {
                throw new Error('The Datastore needs to be configured with user credentials or a session token for this method to work.');
            }
        }
    };
    
    /* override save function */
    this.save = function(_callback, loadAfterwards) {
        this.initDatastoreIfNeeded(false);
        Apiomat.AbstractClientDataModel.prototype.save.apply(this, [_callback, loadAfterwards]);
    };

    /* Requests a new password; user will receive an email to confirm*/
    this.requestNewPassword = function() {
        var callback = {
            onOk : function(refHref) {
            },
            onError : function(error) {
            }
        };
        Apiomat.Datastore.getInstance().postOnServer(this, callback, "models/requestResetPassword/" );
    };
    
    /**
    * Reset password 
    * @param newPassword the new password
    */
    this.resetPassword = function(newPassword, _callback) {
        var internCallback = {
            onOk : function() {
                this.parent.setOffline(this.wasLocalSave || false);
                Apiomat.Datastore.configure(this.parent);
                if (_callback && _callback.onOk)
                {
                    _callback.onOk();
                }
            },
            onError : function(error) {
                if (_callback && _callback.onError) {
                    _callback.onError(error);
                }
            }
        };
        internCallback.parent = this;
        this.setPassword( newPassword );
        if(Apiomat.Datastore.getInstance().shouldSendOffline("PUT"))
        {
            internCallback.wasLocalSave = true;
            Apiomat.Datastore.getInstance( ).sendOffline( "PUT", this.getHref(), this, undefined, internCallback );
        }
        else
        {
            Apiomat.Datastore.getInstance().updateOnServer(this, internCallback);
        }
    };
    
    /**
     * Request a session token with the credentials saved in this User object.
     * Optionally sets the attribute of the user and configures the datastore with the session token automatically.
     * In callback a JS object that maps "SessionToken", "RefreshToken" and "ExpirationDate" (Unix UTC timestamp) to their values will be returned
     *
     * @param configure Set flag to false if you don't want the Datastore to automatically be configured with the received session token and also don't want to save the token in the user object
     * @param callback The callback
     */
     this.requestSessionToken = function(configure, callback)
     {
        this.requestSessionTokenWithRefreshToken(undefined, configure, callback);
     };
     
     /**
     * Request a session token with a refresh token. Optionally configures the datastore with the received token and saves it in the user object.
     *
     * @param refreshToken The refresh token to use for requesting a new session token
     * @param configure Set flag to true if you want the Datastore to automatically be configured with the received session token and also save it in the user object.
     * @param callback The callback
     */
     this.requestSessionTokenWithRefreshToken = function(refreshToken, configure, callback)
     {
        refreshToken = refreshToken || undefined;
        this.initDatastoreIfNeeded(refreshToken === 'undefined' ? false : true);
        var internCB = callback;
        if (typeof configure !== 'undefined' && configure)
        {
            internCB = {
                onOk : function(result) {
                    /* Configure Datastore with session token */
                    var sessionToken = result.SessionToken || '';
                    if(sessionToken === '')
                    {
                        /* return error  if no token is there */
                        if(typeof callback !== 'undefined' && callback.onError)
                        {
                            callback.onError(new Apiomat.ApiomatRequestError(Apiomat.Status.NO_TOKEN_RECEIVED, 200));
                        }
                    }
                    else
                    {
                        this.parent.setSessionToken(sessionToken);
                        Apiomat.Datastore.configureWithUserSessionToken(this.parent);
                        if(typeof callback !== 'undefined' && callback.onOk)
                        {
                            callback.onOk(result);
                        }
                    }
                },
                onError : function(error) {
                    if(typeof callback !== 'undefined' && callback.onError)
                    {
                        callback.onError(error);
                    }
                }
            };
            internCB.parent = this;
        }
        if(typeof refreshToken === 'undefined')
        {
            Apiomat.Datastore.getInstance().requestSessionToken(internCB);
        }
        else
        {
            Apiomat.Datastore.getInstance().requestSessionToken(internCB);
        }
        
     };
    /* referenced object methods */
};
/* static constants */
Apiomat.User.AOMBASEURL = "https://apiomat.org/yambas/rest/apps/CM0";
Apiomat.User.AOMAPIKEY = "4701084103546717092";
Apiomat.User.AOMSYS = "LIVE";
Apiomat.User.AOMSDKVERSION = "1.13-133";
/* static methods */

/**
* Returns a list of objects of this class from server.
*
* If query is given than returend list will be filtered by the given query
*
* @param query (optional) a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
* @param withReferencedHrefs set to true to get also all HREFs of referenced class instances
*/
Apiomat.User.getUsers = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.User, query, callback);
};

/* inheritance */
Apiomat.User.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.User.prototype.constructor = Apiomat.User;

/**
* Updates this class from server.
* Be sure that userName and password is set
*/
Apiomat.User.prototype.loadMe = function(callback) {
    this.initDatastoreIfNeeded(false);
    Apiomat.Datastore.getInstance().loadFromServer("models/me", callback, this);
};

Apiomat.User.prototype.getSimpleName = function() {
    return "User";
};

Apiomat.User.prototype.getModuleName = function() {
    return "Basics";
};

/* easy getter and setter */

        Apiomat.User.prototype.getPassword = function() 
{
    return this.data.password;
};

Apiomat.User.prototype.setPassword = function(_password) {
    this.data.password = _password;
};

        Apiomat.User.prototype.getLastName = function() 
{
    return this.data.lastName;
};

Apiomat.User.prototype.setLastName = function(_lastName) {
    this.data.lastName = _lastName;
};


        Apiomat.User.prototype.getFirstName = function() 
{
    return this.data.firstName;
};

Apiomat.User.prototype.setFirstName = function(_firstName) {
    this.data.firstName = _firstName;
};

    Apiomat.User.prototype.getDateOfBirth = function() 
{
    var retDate = this.data.dateOfBirth;
    return (typeof retDate != 'undefined')? new Date(retDate) : undefined;
};
    Apiomat.User.prototype.setDateOfBirth = function(_dateOfBirth) 
{
    this.data.dateOfBirth = _dateOfBirth.getTime();
};
    
        Apiomat.User.prototype.getUserName = function() 
{
    return this.data.userName;
};

Apiomat.User.prototype.setUserName = function(_userName) {
    this.data.userName = _userName;
};

        Apiomat.User.prototype.getRegistrationId = function() 
{
    return this.data.dynamicAttributes["registrationId"];
};

Apiomat.User.prototype.setRegistrationId = function(_registrationId) {
    this.data.dynamicAttributes["registrationId"] = _registrationId;
};

        Apiomat.User.prototype.getSessionToken = function() 
{
    return this.data.sessionToken;
};

Apiomat.User.prototype.setSessionToken = function(_sessionToken) {
    this.data.sessionToken = _sessionToken;
};

        Apiomat.User.prototype.getRefreshToken = function() 
{
    return this.data.refreshToken;
};


    Apiomat.User.prototype.getSessionTokenExpirationDate = function() 
{
    var retDate = this.data.sessionTokenExpirationDate;
    return (typeof retDate != 'undefined')? new Date(retDate) : undefined;
};
    
   Apiomat.User.prototype.getLocLatitude = function() 
{
    var locArr = this.data.loc;
    if(locArr)
    {
        return locArr[0];
    }
};

Apiomat.User.prototype.getLocLongitude = function() 
{
    var locArr = this.data.loc;
    if(locArr)
    {
        return locArr[1];
    }
};

Apiomat.User.prototype.setLocLatitude = function(_latitude) 
{
    var locArr = this.data.loc;
    if(!locArr)
    {
        locArr = [_latitude, undefined];
    }
    else
    {
        locArr[0] = _latitude;
    }
    this.data.loc = locArr;
};

Apiomat.User.prototype.setLocLongitude = function(_longitude) 
{
    var locArr = this.data.loc;
    if(!locArr)
    {
        locArr = [0, _longitude];
    }
    else
    {
        locArr[1] = _longitude;
    }
    this.data.loc = locArr;
};

        Apiomat.User.prototype.getDeviceToken = function() 
{
    return this.data.dynamicAttributes["deviceToken"];
};

Apiomat.User.prototype.setDeviceToken = function(_deviceToken) {
    this.data.dynamicAttributes["deviceToken"] = _deviceToken;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);