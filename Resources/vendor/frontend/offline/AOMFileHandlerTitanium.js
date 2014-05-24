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
	goog.provide('Apiomat.AOMFileHandlerTi');

	goog.require('Apiomat.AOMFileHandler');
	goog.require('Apiomat.AOMHelper');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat)
{

	Apiomat.AOMFileHandlerTi = function()
	{
		var getDirectoryHandle = function()
		{
			var subdir = 'apiomatpersists';
			var appDir = Ti.Filesystem.applicationDataDirectory;
			var dir = Ti.Filesystem.getFile(appDir, subdir);
			/* create dir if not exists */
			if (dir.exists() === false)
			{
        dir.createDirectory();
			}
			;

			return dir;
		};

		this.getAppDirectory = function(successCB, errorCB)
		{
			var dir = getDirectoryHandle();

			if (typeof dir === 'undefined' && errorCB)
			{
				errorCB();
			} else if (successCB)
			{
				successCB(dir.nativePath);
			}
		};

		this.getSizeOfAppDir = function(successCB, errorCB)
		{

			var dir = getDirectoryHandle();
			if (typeof dir === 'undefined' && errorCB)
			{
				errorCB();
			} else if (successCB)
			{
				successCB(dir.size);
			}
			;
		};
	};

	/* only do this stuff if titanium is used */
	if (Apiomat.AOMHelper.isTitaniumApp())
	{
		/* inheritance */
		Apiomat.AOMFileHandlerTi.prototype = new Apiomat.AOMFileHandler();
		Apiomat.AOMFileHandlerTi.prototype.constructor = Apiomat.AOMFileHandlerTi;

		Apiomat.AOMFileHandlerTi.prototype.removeFile = function(_fileName,
				successCB, errorCB)
		{
			var success = false;
			var getDirCB = function(dir)
			{
				var f = Ti.Filesystem.getFile(dir, _fileName);
				if (f.exists() && f.writeable)
				{
					success = f.deleteFile();
				}

				if (success)
				{
					if (successCB)
					{
						successCB();
					}
				} else
				{
					if (errorCB)
					{
						errorCB();
					}
				}
			};

			this.getAppDirectory(getDirCB, errorCB);
		};

		Apiomat.AOMFileHandlerTi.prototype.readFile = function(_fileName,
				successCB, errorCB)
		{
			var getDirCB = function(dir)
			{
				var contents = undefined;
				var f = Ti.Filesystem.getFile(dir, _fileName);
				if(f.exists())
				{
					contents = f.read();
				}
				if (contents && typeof contents !== 'undefined')
				{
					if (successCB)
					{
						successCB(contents.text);
					}
				} else
				{
					if (successCB)
					{
						successCB(undefined);
					}
				}
			};

			this.getAppDirectory(getDirCB, errorCB);
		};

		Apiomat.AOMFileHandlerTi.prototype.writeFile = function(_fileName,
				_content, successCB, errorCB)
		{

			/* we do the real work in the callback function of getAppDirectory */
			var getDirCB = function(dir)
			{
				var f = Ti.Filesystem.getFile(dir, _fileName);
				/* write to fs */
				var success = f.write(_content);

				if (success)
				{
					if (successCB)
					{
						successCB();
					}
				} else
				{
					if (errorCB)
					{
						errorCB();
					}
				}
			};

			this.getAppDirectory(getDirCB, errorCB);
		};
	}
	;
})(typeof exports === 'undefined' ? Apiomat
		: exports);
