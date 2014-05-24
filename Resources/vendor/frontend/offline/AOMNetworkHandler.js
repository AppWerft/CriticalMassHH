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
	goog.provide('Apiomat.AOMNetworkHandler');

	goog.require('Apiomat.AOMHelper');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat)
{

	Apiomat.AOMNetworkHandler = (function()
	{

		return {
			AOMNETWORKEVENT : "AomNetworkEvent",

			isChecking : false,

			checkForConnection : function()
			{
				Apiomat.AOMNetworkHandler.isChecking = true;
				if (Apiomat.AOMNetworkHandler.isConnected() === false)
				{
					setTimeout(Apiomat.AOMNetworkHandler.checkForConnection,
							150);
				} else
				{
					console.log("Connection is back...");
					Apiomat.AOMNetworkHandler.isChecking = false;
					/* inform event listener that connection is back */
					Apiomat.AOMHelper.sendEvent(
							Apiomat.AOMNetworkHandler.AOMNETWORKEVENT, {
								"isConnected" : true
							});
				}
			},

			isConnected : function()
			{
				var connected = true;

				if (Apiomat.AOMHelper.isTitaniumApp())
				{
					connected = Titanium.Network.online;
				} else
				{
					connected = navigator.online;
				}

				/* force offline check (necessary for testing) */
				if (Apiomat.forceOffline === true)
				{
					connected = !Apiomat.forceOffline;
				}

				/* start check-connection timer if not connected */
				if (connected === false
						&& Apiomat.AOMNetworkHandler.isChecking === false)
				{
					Apiomat.AOMNetworkHandler.checkForConnection();
				}
				return connected;
			},

		};
	})();
})(typeof exports === 'undefined' ? Apiomat
		: exports);