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
    goog.provide('Apiomat.Nutzer');
    goog.require('Apiomat.User');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.Nutzer = function(_username, _password) {
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
                Apiomat.Datastore.configurePlain(Apiomat.Nutzer.AOMBASEURL, Apiomat.Nutzer.AOMAPIKEY, Apiomat.Nutzer.AOMSYS);
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
Apiomat.Nutzer.AOMBASEURL = "https://apiomat.org/yambas/rest/apps/CM0";
Apiomat.Nutzer.AOMAPIKEY = "4701084103546717092";
Apiomat.Nutzer.AOMSYS = "LIVE";
Apiomat.Nutzer.AOMSDKVERSION = "1.13-133";
/* static methods */

/**
* Returns a list of objects of this class from server.
*
* If query is given than returend list will be filtered by the given query
*
* @param query (optional) a query filtering the results in SQL style (@see <a href="http://doc.apiomat.com">documentation</a>)
* @param withReferencedHrefs set to true to get also all HREFs of referenced class instances
*/
Apiomat.Nutzer.getNutzers = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.Nutzer, query, callback);
};

/* inheritance */
Apiomat.Nutzer.prototype = new Apiomat.User();
Apiomat.Nutzer.prototype.constructor = Apiomat.Nutzer;

/**
* Updates this class from server.
* Be sure that userName and password is set
*/
Apiomat.Nutzer.prototype.loadMe = function(callback) {
    this.initDatastoreIfNeeded(false);
    Apiomat.Datastore.getInstance().loadFromServer("models/me", callback, this);
};

Apiomat.Nutzer.prototype.getSimpleName = function() {
    return "Nutzer";
};

Apiomat.Nutzer.prototype.getModuleName = function() {
    return "CM0Main";
};

/* easy getter and setter */

    /**
 * Returns an URL of the image. <br/> You can provide several optional parameters to
 * manipulate the image:
 * 
 * @param width (optional)
 *            the width of the image, 0 to use the original size. If only width
 *            or height are provided, the other value is computed.
 * @param height (optional)
 *            the height of the image, 0 to use the original size. If only width
 *            or height are provided, the other value is computed.
 * @param backgroundColorAsHex (optional)
 *            the background color of the image, null or empty uses the original
 *            background color. Caution: Don't send the '#' symbol! Example:
 *            <i>ff0000</i>
 * @param alpha (optional)
 *            the alpha value of the image (between 0 and 1), null to take the original value.
 * @param format (optional)
 *            the file format of the image to return, e.g. <i>jpg</i> or <i>png</i>
  * @return the URL of the image
 */
Apiomat.Nutzer.prototype.getPhotoURL = function(width, height, bgColorAsHex, alpha, format) 
{
    var url = this.data.photoURL;
    if(!url)
    {
        return undefined;
    }
    url += ".img?apiKey=" + Apiomat.User.AOMAPIKEY + "&system=" + Apiomat.User.AOMSYS;
    if (width) {
        url += "&width=" + width;
    }
    if (height) {
        url += "&height=" + height;
    }
    if (bgColorAsHex) {
        url += "&bgcolor=" + bgColorAsHex;
    }
    if (alpha) {
        url += "&alpha=" + alpha;
    }
    if (format) {
        url += "&format=" + format;
    }
    return url;
}

Apiomat.Nutzer.prototype.loadPhoto = function(width, height, bgColorAsHex, alpha, format,_callback)
{
    var resUrl = this.getPhotoURL(width, height, bgColorAsHex, alpha, format);
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.Nutzer.prototype.postPhoto = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.photoURL = _imgHref;
                    /* update object again */
                    this.parent.save({
                        onOk : function() {
                            if (_callback && _callback.onOk) {
                                _callback.onOk();
                            }           
                        },
                        onError : function(error) {
                            if (_callback && _callback.onError) {
                                _callback.onError(error);
                            }
                        }
                    });
                }
                else {
                    var error = new Apiomat.ApiomatRequestError(Apiomat.Status.HREF_NOT_FOUND);
                    if (_callback && _callback.onError) {
                        _callback.onError(error);
                    } else if(console && console.log) {
                        console.log("Error occured: " + error);
                    }
                }
            },
            onError : function(error) {
                if (_callback && _callback.onError) {
                    _callback.onError(error);
                }
            }
    };
    postCB.parent = this;
    if(Apiomat.Datastore.getInstance().shouldSendOffline("POST"))
    {
        Apiomat.Datastore.getInstance( ).sendOffline( "POST", null, _data, true, postCB );
    }
    else
    {
        Apiomat.Datastore.getInstance().postStaticDataOnServer(_data, true, postCB);
    }
};

Apiomat.Nutzer.prototype.deletePhoto = function(_callback) 
{
    var imageHref = this.data.photoURL;

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.photoURL;
            /* update object again and save deleted image reference in object */
            this.parent.save({
                onOk : function() {
                    if (_callback && _callback.onOk) {
                        _callback.onOk();
                    }           
                },
                onError : function(error) {
                    if (_callback && _callback.onError) {
                        _callback.onError(error);
                    }
                }
            });
        },
        onError : function(error) {
            if (_callback && _callback.onError) {
                _callback.onError(error);
            }
        }
    };
    deleteCB.parent = this;
    if(Apiomat.Datastore.getInstance().shouldSendOffline("DELETE"))
    {
        Apiomat.Datastore.getInstance( ).sendOffline( "DELETE", imageHref, null, null, deleteCB );
    }
    else
    {
        Apiomat.Datastore.getInstance().deleteOnServer(imageHref, deleteCB);
    }
};

        Apiomat.Nutzer.prototype.getRatio = function() 
{
    return this.data.ratio;
};

Apiomat.Nutzer.prototype.setRatio = function(_ratio) {
    this.data.ratio = _ratio;
};

        Apiomat.Nutzer.prototype.getCity = function() 
{
    return this.data.city;
};

Apiomat.Nutzer.prototype.setCity = function(_city) {
    this.data.city = _city;
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);