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
    goog.provide('Apiomat.PushMessage');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.PushMessage = function() {
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
Apiomat.PushMessage.getPushMessages = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.PushMessage, query, callback);
};

/* inheritance */
Apiomat.PushMessage.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.PushMessage.prototype.constructor = Apiomat.PushMessage;


Apiomat.PushMessage.prototype.getSimpleName = function() {
    return "PushMessage";
};

Apiomat.PushMessage.prototype.getModuleName = function() {
    return "Push";
};

/* easy getter and setter */

        Apiomat.PushMessage.prototype.getReceiverUserNames = function() 
{
    return this.data.receiverUserNames;
};

Apiomat.PushMessage.prototype.setReceiverUserNames = function(_receiverUserNames) {
    this.data.receiverUserNames = _receiverUserNames;
};

        Apiomat.PushMessage.prototype.getScheduleTimestamp = function() 
{
    return this.data.scheduleTimestamp;
};

Apiomat.PushMessage.prototype.setScheduleTimestamp = function(_scheduleTimestamp) {
    this.data.scheduleTimestamp = _scheduleTimestamp;
};

        Apiomat.PushMessage.prototype.getSuccessCount = function() 
{
    return this.data.successCount;
};


        Apiomat.PushMessage.prototype.getPayload = function() 
{
    return this.data.payload;
};

Apiomat.PushMessage.prototype.setPayload = function(_payload) {
    this.data.payload = _payload;
};

        Apiomat.PushMessage.prototype.getCustomData = function() 
{
    return this.data.customData;
};

Apiomat.PushMessage.prototype.setCustomData = function(_customData) {
    this.data.customData = _customData;
};

    /**
 * Returns an URL of the file.  * @return the URL of the file
 */
Apiomat.PushMessage.prototype.getFileURL = function() 
{
    var url = this.data.fileURL;
    if(!url)
    {
        return undefined;
    }
    url += ".img?apiKey=" + Apiomat.User.AOMAPIKEY + "&system=" + Apiomat.User.AOMSYS;
    return url;
}

Apiomat.PushMessage.prototype.loadFile = function(_callback)
{
    var resUrl = this.getFileURL();
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.PushMessage.prototype.postFile = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.fileURL = _imgHref;
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
        Apiomat.Datastore.getInstance( ).sendOffline( "POST", null, _data, false, postCB );
    }
    else
    {
        Apiomat.Datastore.getInstance().postStaticDataOnServer(_data, false, postCB);
    }
};

Apiomat.PushMessage.prototype.deleteFile = function(_callback) 
{
    var imageHref = this.data.fileURL;

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.fileURL;
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

        Apiomat.PushMessage.prototype.getQuery = function() 
{
    return this.data.query;
};

Apiomat.PushMessage.prototype.setQuery = function(_query) {
    this.data.query = _query;
};

        Apiomat.PushMessage.prototype.getTimeToLive = function() 
{
    return this.data.timeToLive;
};

Apiomat.PushMessage.prototype.setTimeToLive = function(_timeToLive) {
    this.data.timeToLive = _timeToLive;
};

        Apiomat.PushMessage.prototype.getPushWasSent = function() 
{
    return this.data.pushWasSent;
};

Apiomat.PushMessage.prototype.setPushWasSent = function(_pushWasSent) {
    this.data.pushWasSent = _pushWasSent;
};

        Apiomat.PushMessage.prototype.getReceiverUserName = function() 
{
    return this.data.receiverUserName;
};

Apiomat.PushMessage.prototype.setReceiverUserName = function(_receiverUserName) {
    this.data.receiverUserName = _receiverUserName;
};

        Apiomat.PushMessage.prototype.getBadge = function() 
{
    return this.data.badge;
};

Apiomat.PushMessage.prototype.setBadge = function(_badge) {
    this.data.badge = _badge;
};

        Apiomat.PushMessage.prototype.getFailureCount = function() 
{
    return this.data.failureCount;
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
Apiomat.PushMessage.prototype.getImageURL = function(width, height, bgColorAsHex, alpha, format) 
{
    var url = this.data.imageURL;
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

Apiomat.PushMessage.prototype.loadImage = function(width, height, bgColorAsHex, alpha, format,_callback)
{
    var resUrl = this.getImageURL(width, height, bgColorAsHex, alpha, format);
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.PushMessage.prototype.postImage = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.imageURL = _imgHref;
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

Apiomat.PushMessage.prototype.deleteImage = function(_callback) 
{
    var imageHref = this.data.imageURL;

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.imageURL;
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

        Apiomat.PushMessage.prototype.getFailureReasons = function() 
{
    return this.data.failureReasons;
};


        Apiomat.PushMessage.prototype.getSoundName = function() 
{
    return this.data.soundName;
};

Apiomat.PushMessage.prototype.setSoundName = function(_soundName) {
    this.data.soundName = _soundName;
};

        
Apiomat.PushMessage.prototype.send = function(callback) {
    var dataArr = [];
    if(arguments.length > 1)
    {
        for(var i = 0; i < (arguments.length -1); i++)
        {
            dataArr.push(arguments[i]);
        }
    }
    Apiomat.Datastore.getInstance().updateOnServerWithJSON(this.getHref()+"/method/send",JSON.stringify(dataArr),callback);
};


})(typeof exports === 'undefined' ? Apiomat
        : exports);