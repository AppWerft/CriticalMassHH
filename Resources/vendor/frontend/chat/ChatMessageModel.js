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
    goog.provide('Apiomat.ChatMessageModel');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.ChatMessageModel = function() {
    this.data = new Object();
    /* referenced object methods */
    
    var sender = undefined;
    
    this.getSender = function() 
    {
        return sender;
    };
    
    this.loadSender = function(callback) 
    {
        var refUrl = this.data.senderHref;
        Apiomat.Datastore.getInstance().loadFromServer(refUrl, {
            onOk : function(obj) {
                sender = obj;
                callback.onOk(obj);
            },
            onError : function(error) {
                callback.onError(error);
            }
        }, undefined, undefined, Apiomat.MemberModel);
    };
    
    this.postSender = function(_refData, _callback) 
    {
        if(_refData == false || typeof _refData.getHref() === 'undefined') {
            var error = new Apiomat.ApiomatRequestError(Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING);
            if (_callback && _callback.onError) {
                    _callback.onError(error);
            } else if(console && console.log) {
                    console.log("Error occured: " + error);
            }
            return;
        }
        var callback = {
            onOk : function(refHref) {
                if (refHref) {
                                    sender = _refData;
                                }
                if (_callback && _callback.onOk) {
                    _callback.onOk(refHref);
                }
            },
            onError : function(error) {
                if (_callback && _callback.onError) {
                    _callback.onError(error);
                }
            }
        };
        if(Apiomat.Datastore.getInstance().shouldSendOffline("POST"))
        {
            Apiomat.Datastore.getInstance( ).sendOffline( "POST", this.getHref(), _refData, "sender", callback );
        }
        else
        {
            Apiomat.Datastore.getInstance().postOnServer(_refData, callback, this.data.senderHref);
        }
    };
    
    this.removeSender = function(_refData, _callback) 
    {
        var id = _refData.getHref().substring(_refData.getHref().lastIndexOf("/") + 1);
        var deleteHref = this.data.senderHref + "/" + id;
        var callback = {
            onOk : function(obj) {
                            sender = undefined
            ;                 
                if (_callback && _callback.onOk) {
                    _callback.onOk();
                }
            },
            onError : function(error) {
                if (_callback && _callback.onError) {
                    _callback.onError(error);
                }
            }
        };
        Apiomat.Datastore.getInstance().deleteOnServer(deleteHref, callback);
    };    
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
Apiomat.ChatMessageModel.getChatMessageModels = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.ChatMessageModel, query, callback);
};

/* inheritance */
Apiomat.ChatMessageModel.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.ChatMessageModel.prototype.constructor = Apiomat.ChatMessageModel;


Apiomat.ChatMessageModel.prototype.getSimpleName = function() {
    return "ChatMessageModel";
};

Apiomat.ChatMessageModel.prototype.getModuleName = function() {
    return "Chat";
};

/* easy getter and setter */

    /**
 * Returns an URL of the file.  * @return the URL of the file
 */
Apiomat.ChatMessageModel.prototype.getAttachedFileURL = function() 
{
    var url = this.data.attachedFileURL;
    if(!url)
    {
        return undefined;
    }
    url += ".img?apiKey=" + Apiomat.User.AOMAPIKEY + "&system=" + Apiomat.User.AOMSYS;
    return url;
}

Apiomat.ChatMessageModel.prototype.loadAttachedFile = function(_callback)
{
    var resUrl = this.getAttachedFileURL();
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.ChatMessageModel.prototype.postAttachedFile = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.attachedFileURL = _imgHref;
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

Apiomat.ChatMessageModel.prototype.deleteAttachedFile = function(_callback) 
{
    var imageHref = this.data.attachedFileURL;

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.attachedFileURL;
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

        Apiomat.ChatMessageModel.prototype.getSender = function() 
{
    return this.data.sender;
};

Apiomat.ChatMessageModel.prototype.setSender = function(_sender) {
    this.data.sender = _sender;
};

        Apiomat.ChatMessageModel.prototype.getText = function() 
{
    return this.data.text;
};

Apiomat.ChatMessageModel.prototype.setText = function(_text) {
    this.data.text = _text;
};

        Apiomat.ChatMessageModel.prototype.getSenderUserName = function() 
{
    return this.data.senderUserName;
};

Apiomat.ChatMessageModel.prototype.setSenderUserName = function(_senderUserName) {
    this.data.senderUserName = _senderUserName;
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
Apiomat.ChatMessageModel.prototype.getAttachedImageURL = function(width, height, bgColorAsHex, alpha, format) 
{
    var url = this.data.attachedImageURL;
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

Apiomat.ChatMessageModel.prototype.loadAttachedImage = function(width, height, bgColorAsHex, alpha, format,_callback)
{
    var resUrl = this.getAttachedImageURL(width, height, bgColorAsHex, alpha, format);
    return Apiomat.Datastore.getInstance().loadResource(resUrl, _callback);
}

Apiomat.ChatMessageModel.prototype.postAttachedImage = function(_data, _callback) 
{
    var postCB = {
            onOk : function(_imgHref) {
                if (_imgHref) {
                    this.parent.data.attachedImageURL = _imgHref;
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

Apiomat.ChatMessageModel.prototype.deleteAttachedImage = function(_callback) 
{
    var imageHref = this.data.attachedImageURL;

    var deleteCB = {
        onOk : function() {
            delete this.parent.data.attachedImageURL;
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

                
Apiomat.ChatMessageModel.prototype.send = function(arg1, callback) {
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