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

if(typeof goog !== 'undefined')
{
	goog.provide('Apiomat.AbstractClientDataModel');

	goog.require('Apiomat.Datastore');
	goog.require('Apiomat.AOMHelper');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat){

Apiomat.AbstractClientDataModel = function() {
	this.data = {};
	
	this.toJson = function() {
		if(this.getHref())
		{
			this.data["id"] = this.getID();
		}
		this.data["@type"] = this.getType();
		var jsonRet = JSON.stringify(this.data);
		delete this.data["id"];
		return jsonRet;
	};

	this.fromJson = function(json) {
		/* if already (Json) object */
		if (typeof json === 'object') {
			/* copy properties from server to class instance */
			for ( var key in json) {
				this.data[key] = json[key];
			}
		} else {
			this.data = JSON.parse(json);
		}
		return this;
	};
};

Apiomat.AbstractClientDataModel.prototype = {
	getModuleName : function() {
		throw new Apiomat.ApiomatRequestError(undefined, undefined, "Must be implemented by child");
	},

	getSimpleName : function() {
		throw new Apiomat.ApiomatRequestError(undefined, undefined, "Must be implemented by child");
	},

	getType : function() {
		return this.getModuleName() + "$" + this.getSimpleName();
	},

	getHref : function() {
		return this.data.href;
	},
	
	getAllowedRolesGrant : function( ) {
		return this.data.allowedRolesGrant;
	},

	setAllowedRolesGrant : function( _allowedRolesGrant ) {
		this.data.allowedRolesGrant = _allowedRolesGrant;
	},

	getAllowedRolesWrite : function( ) {
		return this.data.allowedRolesWrite;
	},

	setAllowedRolesWrite : function( _allowedRolesWrite ) {
		this.data.allowedRolesWrite = _allowedRolesWrite;
	},

	getAllowedRolesRead : function( ){
		return this.data.allowedRolesRead;
	},

	setAllowedRolesRead : function( _allowedRolesRead ){
		this.data.allowedRolesRead = _allowedRolesRead;
	},
	
	getRstrictResourceAccess : function( ){
		return this.data.restrictResourceAccess;
	},

	setRestrictResourceAccess : function( _restrictResourceAccess ){
		this.data.restrictResourceAccess = _restrictResourceAccess;
	},

	getForeignId : function() {
		return this.data.foreignId;
	},
	
	setForeignId : function(_foreignId) {
		this.data.foreignId = _foreignId;
	},
	
	getCreatedAt : function() {
		return new Date( this.data.createdAt );
	},
	
	getLastModifiedAt : function() {
		return new Date( this.data.lastModifiedAt );
	},
	
	getAppName : function() {
		return this.data.applicationName;
	},

	/* CRUD methods */
	load : function(callback) {
		this.loadWithHref(undefined, callback);
	},

	loadWithHref : function(href, callback) {
		Apiomat.Datastore.getInstance().loadFromServer(href || this.getHref(),
				callback, this);
	},

	save : function(_callback, loadAfterwards) {
		loadAfterwards = (typeof loadAfterwards !== "undefined" && loadAfterwards.constructor === Boolean) ? loadAfterwards : true;
		var internCallback = {
			onOk : function(href) {
				/* load again */
				if (!this.parent.getHref() && href) {
					this.parent.data.href = href;
				}
				this.parent.setOffline(this.wasLocalSave || false);
				
				/* if this was an offline request don't load again */
				if(!this.wasLocalSave && loadAfterwards)
				{
					this.parent.load({
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
				else if (_callback && _callback.onOk)
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
		if (!this.getHref())
		{
			/* decide if we have to handle offline usage */
			if(Apiomat.Datastore.getInstance().shouldSendOffline("POST"))
			{
				internCallback.wasLocalSave = true;
				Apiomat.Datastore.getInstance( ).sendOffline( "POST", undefined, this, undefined, internCallback );
			}
			else
			{
				Apiomat.Datastore.getInstance().postOnServer(this, internCallback);
			}
		}
		else
		{
			if(Apiomat.Datastore.getInstance().shouldSendOffline("PUT"))
			{
				internCallback.wasLocalSave = true;
				Apiomat.Datastore.getInstance( ).sendOffline( "PUT", this.getHref(), this, undefined, internCallback );
			}
			else
			{
				Apiomat.Datastore.getInstance().updateOnServer(this, internCallback);
			}
		}
	},

	deleteModel : function(_callback) {
		if(Apiomat.Datastore.getInstance().shouldSendOffline("DELETE"))
		{
			Apiomat.Datastore.getInstance( ).sendOffline( "DELETE", this.getHref(), this, undefined, _callback );
		}
		else
		{
			Apiomat.Datastore.getInstance().deleteModelOnServer(this, _callback);
		}
	},
	
	isOffline : function( )
	{
		return this.data.isOffline || false;
	},

	setOffline : function(_offline)
	{
		this.data.isOffline = _offline;
	},
	
	getID : function( )
	{
		/* extract from HREF */
		var id = this.getHref( ).substring( this.getHref( ).lastIndexOf( "/" ) + 1 );
		return id;
	},
};
})(typeof exports === 'undefined' ? Apiomat
: exports);