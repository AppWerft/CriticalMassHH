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
    goog.provide('Apiomat.ConversationModel');
    goog.require('Apiomat.AbstractClientDataModel');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
(function(Apiomat)
{
Apiomat.ConversationModel = function() {
    this.data = new Object();
    /* referenced object methods */
    
    var messages = [];
    
    this.getMessages = function() 
    {
        return messages;
    };
    
    this.loadMessages = function(query,callback) 
    {
        var refUrl = this.data.messagesHref;
        Apiomat.Datastore.getInstance().loadFromServer(refUrl, {
            onOk : function(obj) {
                messages = obj;
                callback.onOk(obj);
            },
            onError : function(error) {
                callback.onError(error);
            }
        }, undefined, query, Apiomat.ChatMessageModel);
    };
    
    this.postMessages = function(_refData, _callback) 
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
                                    /* only add reference data if not already in local list */
                    if(messages.filter(function(_elem) {
                        return _elem.getHref() && refHref && _elem.getHref() === refHref;
                    }).length < 1)
                    {
                        messages.push(_refData);
                    } 
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
            Apiomat.Datastore.getInstance( ).sendOffline( "POST", this.getHref(), _refData, "messages", callback );
        }
        else
        {
            Apiomat.Datastore.getInstance().postOnServer(_refData, callback, this.data.messagesHref);
        }
    };
    
    this.removeMessages = function(_refData, _callback) 
    {
        var id = _refData.getHref().substring(_refData.getHref().lastIndexOf("/") + 1);
        var deleteHref = this.data.messagesHref + "/" + id;
        var callback = {
            onOk : function(obj) {
                            /* Find and remove reference from local list */
                var i = messages.indexOf(_refData);
                if(i != -1) {
                    messages.splice(i, 1);
                }
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
Apiomat.ConversationModel.getConversationModels = function(query, callback) {
    Apiomat.Datastore.getInstance().loadListFromServerWithClass(Apiomat.ConversationModel, query, callback);
};

/* inheritance */
Apiomat.ConversationModel.prototype = new Apiomat.AbstractClientDataModel();
Apiomat.ConversationModel.prototype.constructor = Apiomat.ConversationModel;


Apiomat.ConversationModel.prototype.getSimpleName = function() {
    return "ConversationModel";
};

Apiomat.ConversationModel.prototype.getModuleName = function() {
    return "Chat";
};

/* easy getter and setter */

        Apiomat.ConversationModel.prototype.getSubject = function() 
{
    return this.data.subject;
};

Apiomat.ConversationModel.prototype.setSubject = function(_subject) {
    this.data.subject = _subject;
};

        Apiomat.ConversationModel.prototype.getMessages = function() 
{
    return this.data.messages;
};

Apiomat.ConversationModel.prototype.setMessages = function(_messages) {
    this.data.messages = _messages;
};

        Apiomat.ConversationModel.prototype.getAttendeeUserNames = function() 
{
    return this.data.attendeeUserNames;
};

Apiomat.ConversationModel.prototype.setAttendeeUserNames = function(_attendeeUserNames) {
    this.data.attendeeUserNames = _attendeeUserNames;
};
})(typeof exports === 'undefined' ? Apiomat
        : exports);