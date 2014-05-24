if (typeof goog !== 'undefined')
{
	goog.provide('Apiomat.ApiomatRequestError');

	goog.require('Apiomat.Status');
}

if(typeof exports === 'undefined')
{
	var Apiomat = Apiomat || {};
}

(function(Apiomat)
{
	Apiomat.ApiomatRequestError = function(_statusCode, _expectedCodes,
			_message)
	{
		this.message = _message || Apiomat.Status.getReasonPhrase(_statusCode);
		this.name = "ApiomatRequestError";
		this.expectedCodes = _expectedCodes;
		this.statusCode = _statusCode;

		this.getStatusObj = function()
		{
			return Apiomat.Status.getStatusForCode(this.statusCode);
		};
	};

	Apiomat.ApiomatRequestError.prototype = new Error();
	Apiomat.ApiomatRequestError.prototype.constructor = Apiomat.ApiomatRequestError;
})(typeof exports === 'undefined' ? Apiomat
		: exports);