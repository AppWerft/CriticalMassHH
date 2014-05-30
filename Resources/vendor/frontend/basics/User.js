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
Apiomat.User = function() {
    this.data = new Object();
    this.data["dynamicAttributes"] = {};
    
    this.initDatastoreWithMembersCredentialsIfNeeded = function() {
        //if the datastore is not initialized then do so
        if(Apiomat.Datastore.getInstance().getUsername() == undefined && Apiomat.Datastore.getInstance().getPassword() == undefined) {
            if(this.getUserName() != undefined && this.getPassword() != undefined) {
                Apiomat.Datastore.configure(this);
            } else {
                throw new Error("Please set userName and password first for member!");
            }
        }
    };
    
    /* override save function */
    this.save = function(_callback) {
        this.initDatastoreWithMembersCredentialsIfNeeded();
        Apiomat.AbstractClientDataModel.prototype.save.apply(this, [_callback]);
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
    /* referenced object methods */
};
/* static constants */
Apiomat.User.AOMBASEURL = "https://apiomat.org/yambas/rest/apps/CM0";
Apiomat.User.AOMAPIKEY = "4701084103546717092";
Apiomat.User.AOMSYS = "LIVE";
Apiomat.User.AOMSDKVERSION = "1.12-119";
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
    this.initDatastoreWithMembersCredentialsIfNeeded();
    Apiomat.Datastore.getInstance().loadFromServer("models/me", callback, this);
};

Apiomat.User.prototype.getSimpleName = function() {
    return "User";
};

Apiomat.User.prototype.getModuleName = function() {
    return "Basics";
};

/* easy getter and setter */


        Apiomat.User.prototype.getSex = function() 
{
    return this.data.dynamicAttributes["sex"];
};

Apiomat.User.prototype.setSex = function(_sex) {
    this.data.dynamicAttributes["sex"] = _sex;
};

        Apiomat.User.prototype.getAge = function() 
{
    return this.data.dynamicAttributes["age"];
};

Apiomat.User.prototype.setAge = function(_age) {
    this.data.dynamicAttributes["age"] = _age;
};

        Apiomat.User.prototype.getDeviceToken = function() 
{
    return this.data.dynamicAttributes["deviceToken"];
};

Apiomat.User.prototype.setDeviceToken = function(_deviceToken) {
    this.data.dynamicAttributes["deviceToken"] = _deviceToken;
};

        Apiomat.User.prototype.getCompany = function() 
{
    return this.data.dynamicAttributes["company"];
};

Apiomat.User.prototype.setCompany = function(_company) {
    this.data.dynamicAttributes["company"] = _company;
};

        Apiomat.User.prototype.getPassword = function() 
{
    return this.data.password;
};

Apiomat.User.prototype.setPassword = function(_password) {
    this.data.password = _password;
};

        Apiomat.User.prototype.getProfession = function() 
{
    return this.data.dynamicAttributes["profession"];
};

Apiomat.User.prototype.setProfession = function(_profession) {
    this.data.dynamicAttributes["profession"] = _profession;
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
Apiomat.User.prototype.getImageURL = function(width, height, bgColorAsHex, alpha, format) 
{
    var url = this.data.dynamicAttributes["imageURL"];
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

Apiomat.User.prototype.loadImage = function(width, height, bgColorAsHex, alpha, format,_callback)
{
    var resUrl = this.getImageURL(width, height, bgColorAsHex, alpha, format);
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.User.prototype.postImage = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.dynamicAttributes["imageURL"] = _imgHref;
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

Apiomat.User.prototype.deleteImage = function(_callback) 
{
    var imageHref = this.data.dynamicAttributes["imageURL"];

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.dynamicAttributes["imageURL"];
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
})(typeof exports === 'undefined' ? Apiomat
        : exports);