/*
 * Copyright (c) 2011-2013, Apinauten GmbH
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *	* Redistributions of source code must retain the above copyright notice, this
 *		list of conditions and the following disclaimer.
 *	* Redistributions in binary form must reproduce the above copyright notice,
 *		this list of conditions and the following disclaimer in the documentation
 *		and/or other materials provided with the distribution.
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
	goog.provide('Apiomat.AOMOfflineInfo');
	goog.provide('Apiomat.AOMOfflineHandler');

	goog.require('Apiomat.AOMNetworkHandler');
	goog.require('Apiomat.AOMHelper');
	goog.require('Apiomat.Datastore');
	goog.require('Apiomat.Status');
	goog.require('Apiomat.AOMFileHandler');
	goog.require('Apiomat.AOMFileHandlerTi');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat)
{
	Apiomat.AOMOfflineInfo = function(_httpMethod, _url, _fileKey, _class,
			_localId, _refName, _isStaticData)
	{
		this.httpMethod = _httpMethod;
		this.fileKey = _fileKey;
		this.timestamp = _class;
		this.url = _url;
		this.clazz = _class;
		this.localId = _localId;
		this.refName = _refName;
		this.isStaticData = _isStaticData;
	};

	Apiomat.AOMOfflineHandler = function()
	{
		Apiomat.AOMOfflineHandler.AOMTASKEVENT = "AomTaskEvent";

		/* FIFO queue which holds the pending request tasks */
		var tasks = [];
		/* Map which maps localID -> HREF */
		var mapIdToHref = {};
		/* maps localID -> real class instance with local HREF */
		var mapIdToObj = {};
		/* list of used localIDs */
		var usedLocalIDs = [];

		var isWorking = false;

		var fileHandler = new Apiomat.AOMFileHandler();
		if (Apiomat.AOMHelper.isTitaniumApp())
		{
			fileHandler = new Apiomat.AOMFileHandlerTi();
		}

		/* add listener for network changes */
		Apiomat.AOMHelper.addEventListener(
				Apiomat.AOMNetworkHandler.AOMNETWORKEVENT, function(e)
				{
					sendTasks();
				});

		var restoreDataFromCache = function(fileName, list, _successCB,
				_errorCB)
		{
			fileHandler.readFile(fileName, function(content)
			{
				/* restore list from cache if there */
				if (content)
				{
					list = JSON.parse(content);
				}
				if (_successCB)
				{
					_successCB();
				}
			}, function(evt)
			{
				console.error("Error on restoring content of " + fileName
						+ " --> " + evt.code);
				if (_errorCB)
				{
					_errorCB(evt);
				}
			});
		};

		/* if connected then send waiting tasks to backend */
		var sendTasks = function()
		{
			/* if nothing todo or nothing can do return */
			if (tasks.length < 1)
			{
				/* cleanup hrefMap if there no task anymore */
				mapIdToHref = {};
				/* also update cache */
				writeHrefMapToCache();
				return;
			} else if (Apiomat.AOMNetworkHandler.isConnected() === false)
			{
				return;
			}

			var task = tasks.shift();
			/* remove localID from list of used localIDs */
			delete usedLocalIDs[task.localId];

			/* update cached lists of tasks and localIDs */
			updateCache();

			var errorHandler = function(error)
			{
				console.error("Error occured on reading file " + error);
			};
			/* get from disc cache */
			fileHandler.readFile(task.fileKey, function(content)
			{
				/* remove file */
				fileHandler.removeFile(task.fileKey);

				/* check if is request for static data */
				if (content && task.isStaticData === false)
				{
					/* create object from JSON */
					var tmpModel = new (task.clazz)();
					tmpModel.fromJson(content);
					content = tmpModel;
				}

				/* send class instance / data to backend */
				if (content || (task.isStaticData && task.url))
				{
					sendRequestToServer(task, content, task.isStaticData);
				}
			}, errorHandler);
		};

		var internalCallback = {
			extCallback : undefined,

			onOk : function(_returnedVar)
			{
				if (internalCallback.extCallback
						&& internalCallback.extCallback.onOk)
				{
					internalCallback.extCallback.onOk(_returnedVar);
				}
				/* send next task */
				sendTasks();
			},
			onError : function(error)
			{
				if (internalCallback.extCallback
						&& internalCallback.extCallback.onError)
				{
					internalCallback.extCallback.onError(error);
				}
				/* send next task */
				sendTasks();
			}
		};

		var sendRequestToServer = function(_task, _content, _isStaticReq)
		{
			var url = _task.url;
			/* check if it is an operation on a reference */
			var isRef = _task.refName != undefined && _task.refName.length > 0;
			var isSending = true;
			switch (_task.httpMethod)
			{
			case "POST":
				if (isRef && _isStaticReq === false)
				{
					var parentID = url.substring(url.lastIndexOf("/") + 1);
					/* add correct href to referenced class instance */
					getHref(_content);
					/* build correct url depending on parent */
					url = mapIdToHref[parentID] + "/" + _task.refName;
				}
				internalCallback.extCallback = {
					onOk : function(href)
					{
						if (href != null && href.length > 0)
						{
							mapIdToHref[_task.localId] = href;
							writeHrefMapToCache();

							if (_isStaticReq === false)
							{
								updateRealModel(_task.localId, href);
							}
							/* send event for all OK */
							Apiomat.AOMHelper.sendEvent(
									Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
										"wasSuccess" : true,
										"info" : _task,
										"href" : href
									});
						}
						isSending = false;
					},
					onError : function(error)
					{
						Apiomat.AOMHelper.sendEvent(
								Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
									"wasSuccess" : false,
									"reason" : error,
									"info" : _task,
									"href" : href
								});
						isSending = false;
					}
				};
				if (url)
				{
					if (_isStaticReq)
					{
						Apiomat.Datastore.getInstance()
								.postStaticDataOnServerWithHref(_content, url,
										internalCallback);
					} else
					{
						Apiomat.Datastore.getInstance().postOnServer(_content,
								internalCallback, url);
					}
				} else
				{
					Apiomat.AOMHelper.sendEvent(
							Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
								"wasSuccess" : false,
								"reason" : error,
								"info" : _task,
								"href" : href
							});
				}
				break;
			case "PUT":
				var href = getHref(_content);
				if (href !== undefined && href.length > 0)
				{
					internalCallback.extCallback = {
						onOk : function()
						{
							/* send event for all OK */
							Apiomat.AOMHelper.sendEvent(
									Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
										"wasSuccess" : true,
										"info" : _task
									});
							isSending = false;
						},
						onError : function(error)
						{
							Apiomat.AOMHelper.sendEvent(
									Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
										"wasSuccess" : false,
										"reason" : error,
										"info" : _task
									});
							isSending = false;
						}
					};
					Apiomat.Datastore.getInstance().updateOnServer(_content,
							internalCallback);
				} else
				{
					Apiomat.AOMHelper.sendEvent(
							Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
								"wasSuccess" : false,
								"reason" : Apiomat.Status.HREF_NOT_FOUND,
								"info" : _task
							});
				}
				break;
			case "DELETE":
				var href = undefined;
				if (_isStaticReq)
				{
					href = getHrefForLocalHref(url);
				} else
				{
					href = getHref(_content);
				}
				/* handle reference delete */
				if (isRef)
				{
					var parentID = url.substring(url.lastIndexOf("/") + 1);
					/* add correct href to referenced class instance */
					href = mapIdToHref[parentID] + '/' + _task.refName + "/"
							+ href.substring(href.lastIndexOf("/") + 1);
				}
				if (href && href.length > 0)
				{
					internalCallback.extCallback = {
						onOk : function()
						{
							Apiomat.AOMHelper.sendEvent(
									Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
										"wasSuccess" : true,
										"info" : _task
									});
							isSending = false;
						},
						onError : function(error)
						{
							Apiomat.AOMHelper.sendEvent(
									Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
										"wasSuccess" : false,
										"reason" : error,
										"info" : _task
									});
							isSending = false;
						}
					};

					if (isRef || _isStaticReq)
					{
						Apiomat.Datastore.getInstance().deleteOnServer(href,
								internalCallback);
					} else
					{
						Apiomat.Datastore.getInstance().deleteModelOnServer(
								_content, internalCallback);
					}
					;
				} else
				{
					Apiomat.sendEvent(Apiomat.AOMOfflineHandler.AOMTASKEVENT, {
						"wasSuccess" : false,
						"reason" : Apiomat.Status.HREF_NOT_FOUND,
						"info" : _task
					});
				}
				break;
			}
		};

		var createNewLocalId = function()
		{
			var trials = 0;
			var localID = Math.floor((Math.random() * 1000000) + 1);
			/* try to get new localID that is not used already */
			while (usedLocalIDs[localID] && trials < 5)
			{
				trials++;
				localID = Math.floor((Math.random() * 1000000) + 1);
			}
			/* too many trials throw exception */
			if (trials >= 4)
			{
				throw new Apiomat.ApiomatRequestError(
						Apiomat.Status.TOO_MANY_LOCALIDS);
			}
			return localID;
		};

		var getHref = function(_model)
		{
			var href = _model.getHref();
			if (_model.isOffline())
			{
				var id = _model.getID();
				if (id !== undefined && id.length > 0)
				{
					var tmpHref = mapIdToHref[id];
					/* inject server href */
					if (tmpHref)
					{
						href = tmpHref;
						_model.data.href = href;
					}
				}
				/* check if there also localHREFs for files / images in class instance */
				for ( var dataKey in _model.data)
				{
					if (dataKey.endsWith('URL'))
					{
						/* check if we can find a real href and substitute this */
						var realHref = getHrefForLocalHref(_model.data[dataKey]);
						if (realHref)
						{
							_model.data[dataKey] = realHref;
						}
					}
				}
			}
			return href;
		};

		/**
		 * Returns "real" href for given local href, if exists otherwise false
		 * 
		 * @return "real" href or undefined if not found in list
		 */
		var getHrefForLocalHref = function(_localHref)
		{
			var id = _localHref.substring(_localHref.lastIndexOf("/") + 1);
			return mapIdToHref[id];
		};

		/**
		 * persists current map of hrefs to disc cache
		 * 
		 * @return true if write was successfull otherwise false
		 */
		var writeHrefMapToCache = function()
		{
			return fileHandler.writeFile(
					Apiomat.AOMFileHandler.HREFMAP_FILENAME, JSON
							.stringify(mapIdToHref));
		};

		/**
		 * persists current task liste to disc cache
		 * 
		 * @return true if write was successfull otherwise false
		 */
		var updateCache = function()
		{
			fileHandler.writeFile(Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME,
					JSON.stringify(usedLocalIDs));
			fileHandler.writeFile(Apiomat.AOMFileHandler.TASKLIST_FILENAME,
					JSON.stringify(tasks));
		};

		/**
		 * This method updates the reference class instance with a the new href from
		 * server
		 * 
		 * @param _localId
		 * @param _href
		 */
		var updateRealModel = function(_localId, _href)
		{
			model = mapIdToObj[_localId];
			if (model && model.isOffline())
			{
				delete mapIdToObj[_localId];
				/* update the class instance */
				model.data.href = _href;
				model.setOffline(false);
			}
		};

		/**
		 * Persists given content to cache directory.
		 * 
		 * @return returns filename
		 */
		var persistObject = function(_content, _prefix, _successCB, _errorCB)
		{
			var hasDone = false;
			var fileKey = undefined;
			var sizeCB = function(sizeInBytes)
			{
				/* check if max. cache size is reached */
				if (sizeInBytes && sizeInBytes >= (this.cacheSizeInMB * 1024))
				{
					console
							.error("Max cache size is reached. Can't add to cache!");
					if (_errorCB)
					{
						_errorCB(new Apiomat.ApiomatRequestError(
								Apiomat.Status.MAX_CACHE_SIZE_REACHED));
					}
					return;
				}

				fileKey = fileHandler.createFileName(_prefix);

				fileHandler.writeFile(fileKey, _content || '', function()
				{
					if (_successCB)
					{
						_successCB(fileKey);
					}
				}, function(evt)
				{
					console.error("Can't persist to cache: " + evt.code);
					if (_errorCB)
					{
						_errorCB(new Apiomat.ApiomatRequestError(
								Apiomat.Status.CANT_WRITE_IN_CACHE));
					}
				});
			};

			/* the real stuff is in in the callback function sizeCB */
			fileHandler.getSizeOfAppDir(sizeCB);
		};

		/* public methods and properties */

		/* size of the cache in megabyte */
		this.cacheSizeInMB = 4;

		/**
		 * Add a new task to request queue and return temp HREF aka local href
		 * 
		 * @param _httpMethod
		 * @param _url
		 * @param _content
		 *            The content which we have to save, could be a subclass of
		 *            AbstractClientDataModel or a byte array
		 * @param _parentHref
		 *            (optional) The local HREF of parent class instance
		 * @return returns local HREF
		 */
		this.addTask = function(_httpMethod, _url, _content, _refName,
				_successCB, _errorCB)
		{
			var returnedUri = _url;
			var isStaticData = _content instanceof Apiomat.AbstractClientDataModel === false;
			var content = _content;
			if (isStaticData === false)
			{
				content = _content.toJson();
			}
			var localId = undefined;
			if (_httpMethod === "POST")
			{
				try
				{
					localId = createNewLocalId();
				} catch (error)
				{
					throw error;
				}
				returnedUri += "/" + (_refName ? _refName + '/' : '') + localId;
				/*
				 * also save reference to orginal model so that we can update
				 * this later
				 */
				if (isStaticData === false)
				{
					mapIdToObj[localId] = _content;
				}
			}

			/* persist content to filesystem */
			persistObject(content, localId || _httpMethod, function(fileKey)
			{
				if (fileKey)
				{
					var task = new Apiomat.AOMOfflineInfo(_httpMethod, _url,
							fileKey, _content ? _content.constructor
									: undefined, localId, _refName,
							isStaticData);
					tasks.push(task);
					updateCache();
				}

				if (_successCB)
				{
					_successCB(returnedUri);
				}
			}, function(error)
			{
				console.error("Got error on adding task to offline queue: "
						+ error);
				if (_errorCB)
				{
					_errorCB(error);
				}
			});
		};

		this.init = function(_successCB, _errorCB)
		{
			var initUsedLocalIds = function()
			{
				/* restore used local IDs */
				restoreDataFromCache(
						Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME,
						usedLocalIDs, function()
						{
							/* trying to send outstanding tasks */
							sendTasks();
							if (typeof _successCB !== 'undefined')
							{
								_successCB();
							}
						}, function(error)
						{
							if (typeof _errorCB !== 'undefined')
							{
								_errorCB(error);
							}
						});
			};

			var initMapIdToHref = function()
			{
				/* restore hrefMap */
				restoreDataFromCache(Apiomat.AOMFileHandler.HREFMAP_FILENAME,
						mapIdToHref, function()
						{
							initUsedLocalIds();
						}, function(error)
						{
							initUsedLocalIds();
						});
			};

			/* restore persisted list of waiting tasks */
			restoreDataFromCache(Apiomat.AOMFileHandler.TASKLIST_FILENAME,
					tasks, function()
					{
						initMapIdToHref();
					}, function(error)
					{
						initMapIdToHref();
					});
		};

		this.isConnected = function()
		{
			return Apiomat.AOMNetworkHandler.isConnected();
		};

		this.clearCache = function()
		{
			mapIdToHref = {};
			writeHrefMapToCache();

			/* walk through task list and delete objects from cache */
			for (var i = 0, j = tasks.length; i < j; i++)
			{
				var task = tasks[i];
				if (task.fileKey)
				{
					fileHandler.removeFile(task.fileKey);
				}
			}
			;

			mapIdToObj = {};
			tasks = [];
			updateCache();
		};
	};
})(typeof exports === 'undefined' ? Apiomat
		: exports);