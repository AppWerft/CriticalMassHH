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
if (typeof goog !== 'undefined')
{
	goog.provide('Apiomat.Datastore');

	goog.require('Apiomat.AOMHelper');
	goog.require('Apiomat.ApiomatRequestError');
	goog.require('base64');
	goog.require('XMLHttpRequest');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat){

Apiomat.AOMOfflineStrategy = {
	"NO_OFFLINE_HANDLING" : 0,
	"USE_OFFLINE_CACHE" : 1,
};

Apiomat.Datastore = (function()
{
	var instantiated;
	var _password;
	var _username;
	var _baseURL;
	var _apiKey;
	var _system;
	var _version;
	var _useASync = true;
	var _offlineStrategy = Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING;
	var _offlineHandler = undefined;

	/* is safari browser */
	var is_safari = typeof navigator === 'object'
			&& navigator.userAgent.indexOf('Chrom') <= 0
			&& navigator.userAgent.indexOf("Safari") > -1 || false;
	/* or is it titanium */
	var is_titanium = typeof Ti === 'object' || typeof Titanium === 'object';
	/* or is node.js and NOT Titanium */
	var is_nodejs = is_titanium === false && typeof module !== 'undefined' && module.exports;
	
	/*
	 * we have to save lastModified timestamps for safari browsers cause safari
	 * send always seconds instead of ms
	 */
	var lastModified = new Array();

	function init()
	{
		// all singleton code goes here
		return {

			getUsername : function()
			{
				return _username;
			},

			getPassword : function()
			{
				return _password;
			},

			setUseAsnycRequests : function(_asyncReq)
			{
				_useASync = _asyncReq;
			},

			loadFromServer : function(modelHref, callback, dataModel, _query,
					clazz)
			{
				_sendRequest("GET", modelHref, [ 200, 304 ],
						!dataModel ? callback : {
							onOk : function(obj)
							{
								if (callback && callback.onOk)
								{
									dataModel.fromJson(obj);
									callback.onOk();
								}
							},

							onError : function(error)
							{
								if (callback && callback.onError)
								{
									callback.onError(error);
								}
							}
						}, clazz, {
							"data" : _query
						});
			},

			loadResource : function(_url, _callback)
			{
				_sendRequest("GET", _url, [ 200 ], _callback, undefined, {
					"isByteData" : true
				});
			},

			loadListFromServerWithClass : function(_class, _query, _callback)
			{
				_sendRequest("GET", _createHrefFromClass(_class), [ 200, 304 ],
						_callback, _class, {
							"data" : _query
						});
			},

			postOnServer : function(dataModel, callback, href)
			{
				_postOnServer(dataModel, callback, href);
			},
			updateOnServer : function(dataModel, callback)
			{
				_updateOnServer(dataModel.getHref(), dataModel.toJson(), callback);
			},
			updateOnServerWithJSON : function(href, json, callback) 
			{
				_updateOnServer(href, json, callback);
			},
			deleteOnServer : function(_href, _callback)
			{
				_deleteOnServer(_href, undefined, _callback);
			},
			deleteModelOnServer : function(_dataModel, _callback)
			{
				_deleteOnServer(undefined, _dataModel, _callback);
			},
			postStaticDataOnServer : function(_data, _isImage, _callback)
			{
				var href = _createStaticDataHref(_isImage);
				this.postStaticDataOnServerWithHref(_data, href, _callback);
			},
			postStaticDataOnServerWithHref : function(_data, _href, _callback)
			{
				_sendRequest("POST", _href, [ 201 ], _callback, undefined, {
					"isByteData" : true,
					"data" : _data
				});
			},

			/* methods provided for offline handling */

			shouldSendOffline : function(_httpMethod)
			{
				var useOffline = this.getOfflineStrategy() != Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING
						&& this.getOfflineHandler() != undefined
						&& this.getOfflineHandler().isConnected() === false;
				/*
				 * switch(Apiomat.Datastore._offlineStrategy) { case
				 * Apiomat.AOMOfflineStrategy.USE_OFFLINE_CACHE: useOffline &=
				 * true; break; default: useOffline = false; break; }
				 */

				return useOffline;
			},

			getOfflineHandler : function()
			{
				return _offlineHandler;
			},

			getOfflineStrategy : function()
			{
				return _offlineStrategy;
			},

			/**
			 * Add the request to the request queue. This queue will be
			 * processed after internet connection is back
			 * 
			 * @param _httpMethod
			 *            http method name as String (POST, DELETE, PUT)
			 * @param _href
			 *            (optional) Href of class instance / static content (only used for
			 *            PUT/DELETE)
			 * @param _content
			 *            (optional) Content which will be sended to server
			 * @param _param
			 *            (optional) Can contain the reference name (on
			 *            creating reference between 2 models), a boolean (which
			 *            indicates if static content is an image or not) or
			 *            undefined
			 * @param _callback
			 *            (optional) the method that will be called after adding
			 *            request to queue is finished
			 */
			sendOffline : function(_httpMethod, _href, _content, _param,
					_callback)
			{
				var err = undefined;
				var isStaticData = false;
				/*
				 * if no href is given and content is of type
				 * AbstractClientDataModel try to create one
				 */
				if (!_href
						&& _content instanceof Apiomat.AbstractClientDataModel)
				{
					_href = _createModelHref(_content);
				}
				/*
				 * If there is no href and _content is not of type ACDM then we
				 * assume it is static content like image/file
				 */
				else if (!_href)
				{
					_href = _createStaticDataHref(_param);
					isStaticData = true;
				}

				var errorFunc = function(error)
				{
					if (typeof _callback !== 'undefined' && _callback.onError)
					{
						/* an error occured because there is no returned href */
						if (_httpMethod === "POST")
						{
							error = new Apiomat.ApiomatRequestError(
									Apiomat.Status.CRUD_ERROR, 201,
									"Can't save offline");
						}
						_callback.onError(error);
					} else if (typeof console !== 'undefined' && console.error)
					{
						console.error("Can't send request to offline queue: "
								+ error);
					}
				};
				var successFunc = function(returnedHref)
				{
					if (typeof _callback !== 'undefined' && _callback.onOk)
					{
						if (_httpMethod === "POST" && returnedHref)
						{
							_callback.onOk(returnedHref);
						} else
						{
							_callback.onOk();
						}
					}
				};
				/* send to offline queue */
				this.getOfflineHandler().addTask(_httpMethod, _href, _content,
						_param, successFunc, errorFunc);
			},
		};
	}

	/* private functions */
	function _postOnServer(dataModel, callback, href)
	{
		if (!href)
		{
			href = _createModelHref(dataModel);
		}
		_sendRequest("POST", href, [ 201 ], callback, undefined, {
			"data" :  dataModel.toJson()
		});
	}

	function _updateOnServer (_href,_json, _callback ) 
	{
		_sendRequest("PUT", _href, [ 200 ], _callback, undefined, 
		{
			"data" : _json
		});
	}

	function _deleteOnServer(_href, _dataModel, _callback)
	{
		if (_href)
		{
			_sendRequest("DELETE", _href, [ 204 ], _callback);
		} else if (_dataModel && _dataModel.getHref())
		{
			_sendRequest("DELETE", _dataModel.getHref(), [ 204 ], _callback);
		} else
		{
			var error = new Apiomat.ApiomatRequestError(
					Apiomat.Status.HREF_NOT_FOUND);
			if (_callback && _callback.onError)
			{
				_callback.onError(error);
			} else if (console && console.error)
			{
				console.error("Error occured: " + error);
			}
		}
	}

	/**
	 * private method to send request to apiOmat backend
	 * 
	 * @param _httpMethod
	 *            the http method (GET, POST, PUT, DELETE)
	 * @param _url
	 *            The url to connect
	 * @param _callback
	 *            object which will called when request is finished (needs 2
	 *            methods: onOk = function(arg) and onError =
	 *            function(errorCode, errorMsg))
	 * @param _expectedReturnCodes
	 *            the expected return code from HTTP request
	 * @param _args
	 *            Some optional arguments<br/>Valid key/values are: "data" =>
	 *            on POST/PUT the data to be send "isByteData" => set to true if
	 *            "data" field contains byte data (like image/video) "query" =>
	 *            for GET req we save query string here "clazz" => some object
	 *            which inherits from AbstractClientDataModel, where the result
	 *            will be saved
	 */
	function _sendRequest(_httpMethod, _url, _expectedReturnCodes, _callback,
			clazz, _args)
	{
		var isByteData = false;
		var data = undefined;
		if (_args)
		{
			data = _args.data; // could be query on GET or (json) data on
			// POST/PUT
			isByteData = _args.isByteData;
		}
		var http;
		// Code for titanium
		if (is_titanium)
		{
			Ti.API.log("Use HTTP client of titanium");
				http = Ti.Network
						.createHTTPClient({
							// function called when the response data is
							// available
							onload : function(e)
							{
								_processResponse(this, _expectedReturnCodes, _callback, _httpMethod, clazz);
							},
							// function called when an error occurs, including a
							// timeout
							onerror : function(e)
							{
								if (_expectedReturnCodes
												.indexOf(this.status) > -1)
								{
									throw e;
								}
								else
								{
									var error = new Apiomat.ApiomatRequestError(
											this.status, _expectedReturnCodes,
											this.responseText);
									if (typeof _callback !== 'undefined'
											&& _callback.onError)
									{
										_callback.onError(error);
									} else
									{
										Ti.API.error("Received HTTP error: "
												+ error);
									}
								}
							}
						});
		}
		// code for IE7+, Firefox, Chrome, Opera, Safari
		else if (typeof window === 'object' && window.XMLHttpRequest)
		{
			http = new XMLHttpRequest();
			// code for IE6, IE5
		} 
		/* load xmlhttprequst lib */
		else if(is_nodejs)
		{
			http = new exports.XMLHttpRequest();
		}
		else
		{
			http = new ActiveXObject("Microsoft.XMLHTTP");
		}

		/* should be query data so append to URL */
		if (_httpMethod === "GET" && data)
		{
			_url += "?q=" + encodeURIComponent(data);
		}
		_url = _createHref(_url);

		http.open(_httpMethod, _url, _useASync);
		_setHeader(_url, _httpMethod, http, isByteData);
		if (isByteData && _httpMethod === "GET")
		{
			http.overrideMimeType('text/plain; charset=x-user-defined');
		}
		/* set http body if there any data */
		if(is_titanium == false)
		{
			http.onreadystatechange = function()
			{
				if (http.readyState == 4)
				{
					_processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz);
				}
			};
		}
		if ((_httpMethod === "POST" || _httpMethod === "PUT")
				&& typeof data !== 'undefined')
		{
			/* let's if we have to send byte data instead of json */
			if (_args && _args.isByteData)
			{
				var bytes = data;
				if (is_titanium === false)
				{
					var uInt8Array = new Uint8Array(data);
					bytes = uInt8Array.buffer;
				}
				http.send(bytes);
			} else
			{
				http.send(data);
			}
		} else
		{
			http.send();
		}
	}
	
	function _processResponse(http, _expectedReturnCodes, _callback, _httpMethod, clazz)
	{
		var errorOccured = false;
		try
		{
			/* check if status code in expected ones */
			if (_expectedReturnCodes.indexOf(http.status) > -1)
			{
				if (_callback && _callback.onOk)
				{
					/* save lastModified for url if safari */
					if (is_safari && _httpMethod === "GET")
					{
						lastModified[_url] = http
								.getResponseHeader("Last-Modified");
					}

					var elem = http.responseText;
					if (_httpMethod === "GET"
							&& typeof clazz !== 'undefined')
					{
						/* check if array */
						var json = JSON.parse(http.responseText);
						if (json instanceof Array)
						{
							elem = [];
							for (var i = 0; i < json.length; i++)
							{
								var tmpElem = new clazz();
								tmpElem.fromJson(json[i]);
								elem.push(tmpElem);
							}
						} else
						{
							elem = new clazz();
							elem.fromJson(json);
						}
					}
					var returnedHref;
					if (_httpMethod === "POST")
					{
						returnedHref = http
								.getResponseHeader("Location");
					}
					_callback.onOk(_httpMethod === "GET" ? elem
							: returnedHref || undefined);
				}
			} else
			{
				errorOccured = true;
			}
		} catch (ex)
		{
			if(is_titanium)
			{
				Ti.API.log("Error occured: " + ex);
			}
			/* only if it is a error that has nth to do with apiOmat rethrow*/
			if(http && _expectedReturnCodes.indexOf(http.status) > -1)
			{
				throw ex;
			}
			else
			{
				errorOccured = true;
			}
		} finally
		{
			/* check if we have to set error */
			if (errorOccured)
			{
				var error = new Apiomat.ApiomatRequestError(
						http.status, _expectedReturnCodes,
						http.responseText);
				if (typeof _callback !== 'undefined'
						&& _callback.onError)
				{
					_callback.onError(error);
				} else
				{
					if (typeof console !== 'undefined' && console.error)
					{
						console.error("Error occured: " + error);
					}
				}
			}
		}
	}

	function _setHeader(_url, _httpMethod, http, _isByteData)
	{
		http.setRequestHeader("X-apiomat-system", _system);
		http.setRequestHeader("X-apiomat-apikey", _apiKey);
		if (typeof _isByteData !== 'undefined' && _isByteData)
		{
			http.setRequestHeader("Content-Type", "application/octet-stream");
		}
		else
		{
			http.setRequestHeader("Content-Type", "application/json");
			http.setRequestHeader("Accept", "application/json");
		}
		http.setRequestHeader("X-apiomat-fullupdate", "true");
		if (_username && _password)
		{
			var creds = _username + ":" + _password;
			if(is_nodejs)
			{
				try
				{
					var buffer = require('buffer').Buffer;
					creds = new buffer(creds).toString('base64');
				}
				catch (e) {
					/* can't find buffer try old method */
					creds = Base64.Base64.encode(creds);
				}
			}
			else
			{
				try
				{
					creds = Base64.encode(creds);
				}
				catch (e) {
					/* can't find buffer try old method */
					creds = Base64.Base64.encode(creds);
				}
			}
			http.setRequestHeader("Authorization", "Basic "
					+ creds);
		}
		http.setRequestHeader("X-apiomat-sdkVersion", _version);
		/*
		 * send saved lastModified for safari browser (cause safari uses seconds
		 * and not returned modified hedaer)
		 */
		if (is_safari && _httpMethod === "GET")
		{
			// disabled caching for Safari cause we don't get JSON element in
			// http.responseText on 304
			// var lastModifiedStr = _url in lastModified? lastModified[_url] :
			// "01.01.1970 00:00:00:00 CEST";
			var lastModifiedStr = "01.01.1970 00:00:00:00 CEST";
			http.setRequestHeader("If-Modified-Since", lastModifiedStr);
		}
	}

	function _createModelHref(_dataModel)
	{
		var href = _baseURL;
		href += "/models/";
		href += _dataModel.getModuleName();
		href += "/";
		href += _dataModel.getSimpleName();
		return href;
	}
	;

	function _createHrefFromClass(_class)
	{
		var href = _baseURL;
		href += "/models/";
		href += _class.prototype.getModuleName.call();
		href += "/";
		href += _class.prototype.getSimpleName.call();
		return href;
	}

	function _createStaticDataHref(isImage)
	{
		var href = _baseURL;
		href += "/data/";
		href += isImage ? "images" : "files";
		href += "/";
		return href;
	}

	function _createHref(href)
	{
		if (href.substring(0, 4) === 'http')
		{
			return href;
		}

		if (href.substring(0, 5) === "/apps")
		{
			return _baseURL.substring(0, _baseURL.indexOf("/apps")) + href;
		}

		return _baseURL + "/" + href;
	}

	return {
		getInstance : function()
		{
			if (!instantiated)
			{
				instantiated = init();
			}
			return instantiated;
		},
		configure : function(user)
		{
			_username = user.getUserName();
			_password = user.getPassword();
			this.configurePlain(Apiomat.User.AOMBASEURL,
					Apiomat.User.AOMAPIKEY, Apiomat.User.AOMSYS,
					Apiomat.User.AOMSDKVERSION);
		},

		configurePlain : function(baseURL, apiKey, system, version)
		{
			_baseURL = baseURL;
			_apiKey = apiKey;
			_system = system;
			_version = version;
		},

		/**
		 * Define the offline strategy for this application Please set callback
		 * method as parameter so that you will be informed after initalization
		 * was successfull
		 */
		setOfflineStrategy : function(offlineStrategy, _callback)
		{
			_offlineStrategy = offlineStrategy;
			/* init offline Handler if not there */
			if (!_offlineHandler
					&& _offlineStrategy != Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING)
			{
				_offlineHandler = new Apiomat.AOMOfflineHandler();
			}
			if (!_offlineHandler
					&& _offlineStrategy != Apiomat.AOMOfflineStrategy.NO_OFFLINE_HANDLING)
			{
				_offlineHandler = new Apiomat.AOMOfflineHandler();
			}
			if (typeof _offlineHandler !== 'undefined')
			{
				if (typeof _callback !== 'undefined')
				{
					_offlineHandler.init(_callback.onOk || undefined,
							_callback.onError || undefined);
				} else
				{
					_offlineHandler.init(undefined, undefined);
				}
			}
		}
	};
})();
})(typeof exports === 'undefined'? Apiomat : exports);