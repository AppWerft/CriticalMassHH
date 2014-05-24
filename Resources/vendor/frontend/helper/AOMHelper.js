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
	goog.provide('Apiomat.AOMHelper');
}
if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat){

	Apiomat.AOMHelper = (function()
    {
    	return {

    		isTitaniumApp : function()
    		{
    			return typeof Ti === 'object';
    		},

    		/* event helper methods */
    		sendEvent : function(_eventName, _eventData)
    		{
    			var event = undefined;
    			if (Apiomat.AOMHelper.isTitaniumApp())
    			{
    				Ti.App.fireEvent(_eventName, _eventData || {});
    			} else
    			{
    				var event = undefined;
    				if (typeof CustomEvent !== 'undefined')
    				{
    					event = new CustomEvent(_eventName, _eventData || {});
    				} else
    				{
    					var event = document.createEvent("Event");
    					event.initEvent(_eventName, true, true);
    					event.customData = _eventData || {};
    				}

    				window.dispatchEvent(event);
    			}
    		},

    		addEventListener : function(_eventName, _callback)
    		{
    			if (Apiomat.AOMHelper.isTitaniumApp())
    			{
    				Ti.App.addEventListener(_eventName, _callback);
    			} else
    			{
    				window.addEventListener(_eventName, _callback);
    			}
    		}
    	};
    })();
})(typeof exports === 'undefined'? Apiomat: exports);

/**
 * This snippet implements the array filter function for browsers that doesn't support this native
 * The native filter function is ECMA-262 standard
 *   
 */
if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fun /*, thisp*/)
	{
		'use strict';

		if (!this)
		{
			throw new TypeError();
		}

		var objects = Object(this);
		var len = objects.length >>> 0;
		if (typeof fun !== 'function')
		{
			throw new TypeError();
		}

		var res = [];
		var thisp = arguments[1];
		for ( var i in objects)
		{
			if (objects.hasOwnProperty(i))
			{
				if (fun.call(thisp, objects[i], i, objects))
				{
					res.push(objects[i]);
				}
			}
		}

		return res;
	};
}
/**
 * This method checks if a string ends with a given pattern
 * 
 * @param {Object} suffix
 */
if (!String.prototype.endsWith)
{
	String.prototype.endsWith = function(suffix)
	{
		return this.indexOf(suffix, this.length - suffix.length) !== -1;
	};
}

/**
 * Implementation of Object.keys for browser that doesn't support this method natively  
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 */
if (!Object.keys)
{
	Object.keys = (function()
	{
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty, hasDontEnumBug = !({
			toString : null
		}).propertyIsEnumerable('toString'), dontEnums = [ 'toString',
				'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf',
				'propertyIsEnumerable', 'constructor' ], dontEnumsLength = dontEnums.length;

		return function(obj)
		{
			if (typeof obj !== 'object'
					&& (typeof obj !== 'function' || obj === null))
			{
				throw new TypeError('Object.keys called on non-object');
			}

			var result = [], prop, i;

			for (prop in obj)
			{
				if (hasOwnProperty.call(obj, prop))
				{
					result.push(prop);
				}
			}

			if (hasDontEnumBug)
			{
				for (i = 0; i < dontEnumsLength; i++)
				{
					if (hasOwnProperty.call(obj, dontEnums[i]))
					{
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}());
}