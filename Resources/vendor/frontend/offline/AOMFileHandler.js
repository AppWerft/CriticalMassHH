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
	goog.provide('Apiomat.AOMFileHandler');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat)
{

	Apiomat.AOMFileHandler = function()
	{
		var fileList = {};
		var fileSystem = undefined;
		var subdir = 'apiomatpersists';
		var supporFileApi = typeof window !== 'undefined' && window.File
				&& window.FileReader && window.FileList && window.Blob;

		/* if file system is supported get access */
		if (supporFileApi)
		{
			var fail = function(evt)
			{
				console.log(evt.target.error.code);
			};
			var gotFS = function(_fileSystem)
			{
				fileSystem = _fileSystem;
			};
			var persObj = window.PERSISTENT;
			if (!persObj && typeof LocalFileSystem !== 'undefined')
			{
				persObj = LocalFileSystem.PERSISTENT;
			}
			;
			if (persObj)
			{
				if (typeof window !== 'undefined' && window.requestFileSystem)
				{
					window.requestFileSystem(persObj, 0, gotFS, fail);
				}
			}
		}

		this.getAppDirectory = function(successCB, errorCB)
		{
			if (typeof fileSystem !== 'undefined')
			{
				fileSystem.root.getDirectory(subdir, {
					create : true
				}, function(dirEntry)
				{
					if (successCB)
					{
						successCB(dirEntry);
					}
				}, function(evt)
				{
					console.error("Can't get directory handle!!");
					if (errorCB)
					{
						errorCB(evt);
					}
				});
			} else if (successCB)
			{
				successCB(undefined);
			}
		};

		this.getFileHandler = function(_fileName, successCB, errorCB, _options)
		{
			var getDirCB = function(dir)
			{
				if (typeof dir !== 'undefined')
				{
					dir.getFile(_fileName, {}, function(fileEntry)
					{
						if (successCB)
						{
							successCB(fileEntry);
						}
					}, errorCB);
				} else
				{
					errorCB();
				}
			};
			this.getAppDirectory(getDirCB, errorCB);
		};

		this.getSizeOfAppDir = function(successCB, errorCB)
		{

			if (typeof fileSystem !== 'undefined')
			{
				var obj = this;
				var getSizeOfFiles = function(_entries, _name, _pointer,
						_currentSize, _successCB, _errorCB)
				{
					if (_pointer >= _entries.length)
					{
						_successCB(_currentSize);
						return;
					}

					obj.getFileHandler(_name, function(fileEntry)
					{
						fileEntry.file(function(file)
						{
							/* get size of file */
							_currentSize = _currentSize + file.size;
							/* lookup next file */
							var nextName = undefined;
							if (typeof _entries[++_pointer] !== 'undefined')
							{
								nextName = _entries[_pointer].name;
							}
							getSizeOfFiles(_entries, nextName, _pointer,
									_currentSize, _successCB, _errorCB);

						}, _errorCB);
					}, function(evt)
					{
						/* ignore not found errors */
						if (evt.code !== FileError.NOT_FOUND_ERR && errorCB)
						{
							_errorCB(evt);
						} else
						{
							if (typeof _entries[++_pointer] !== 'undefined')
							{
								nextName = _entries[_pointer].name;
							}
							getSizeOfFiles(_entries, _nextName, _pointer,
									_currentSize, _successCB, _errorCB);
						}
					});
				};
				var gotList = function(entries)
				{
					if (typeof entries !== undefined && entries.length > 0)
					{
						getSizeOfFiles(entries, entries[0].name, 0, 0,
								function(dirSize)
								{
									if (successCB)
									{
										successCB(dirSize);
									}
								}, errorCB);
					} else if (successCB)
					{
						successCB(0);
					}
				};
				var getSizeOfAppDir = function(dir)
				{
					/* read dir entries */
					var reader = dir.createReader();
					reader.readEntries(gotList, errorCB);
				};
				this.getAppDirectory(getSizeOfAppDir, errorCB);
			} else if (successCB)
			{
				successCB(0);
			}
		};

		this.createFileName = function(_prefix)
		{
			/* create a new filename based on localID and current timestamp */
			return _prefix + '_' + new Date().getTime();
		};

		this.removeFile = function(_fileName, successCB, errorCB)
		{
			if (typeof fileSystem !== 'undefined')
			{
				var getFileCB = function(file)
				{
					file.remove(function()
					{
						if (successCB)
						{
							successCB();
						}
					}, errorCB);
				};

				this.getFileHandler(_fileName, getFileCB, function(evt)
				{
					/* ignore not found errors */
					if (evt.code !== FileError.NOT_FOUND_ERR && errorCB)
					{
						errorCB(evt);
					} else
					{
						if (successCB)
						{
							successCB();
						}
					}
				});
			} else
			{
				delete fileList[_fileName];
				if (successCB)
				{
					successCB();
				}
			}
		};

		this.readFile = function(_fileName, successCB, errorCB)
		{
			if (typeof fileSystem !== 'undefined')
			{
				var getFileCB = function(fileEntry)
				{
					fileEntry.file(function(file)
					{
						var reader = new FileReader();

						reader.onloadend = function(evt)
						{
							/* send callback with result */
							if (successCB)
							{
								successCB(evt.target.result);
							}
						};
						/* read file */
						reader.readAsText(file);
					});
				};
				this.getFileHandler(_fileName, getFileCB, function(evt)
				{
					/* ignore not found errors */
					if (evt.code !== FileError.NOT_FOUND_ERR && errorCB)
					{
						errorCB(evt);
					} else
					{
						if (successCB)
						{
							successCB(undefined);
						}
					}
				});
			} else if (successCB)
			{
				successCB(fileList[_fileName]);
			}
		};

		this.writeFile = function(_fileName, _content, successCB, errorCB)
		{
			if (typeof fileSystem !== 'undefined')
			{
				var getFileCB = function(fileEntry)
				{
					var gotFileWriter = function(writer)
					{
						writer.onwriteend = function(evt)
						{
							if (successCB)
							{
								successCB();
							}
						};
						writer.write(_content);
					};
					fileEntry.createWriter(gotFileWriter, errorCB);
				};
				this.getFileHandler(_fileName, getFileCB, errorCB, {
					create : true,
					exclusive : false
				});
			} else
			{
				fileList[_fileName] = _content;
				if (successCB)
				{
					successCB();
				}
			}
		};
	};

	Apiomat.AOMFileHandler.HREFMAP_FILENAME = "hrefMap";
	Apiomat.AOMFileHandler.USEDLOCALIDS_FILENAME = "usedLocalIDs";
	Apiomat.AOMFileHandler.TASKLIST_FILENAME = "taskList";

	Apiomat.AOMFileHandler.prototype = {

	};
})(typeof exports === 'undefined' ? Apiomat
		: exports);