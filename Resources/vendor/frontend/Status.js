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
    goog.provide('Apiomat.Status');
}
if(typeof exports === 'undefined')
{
    var Apiomat = Apiomat || {};
}
/* apiOmat status codes */
(function(Apiomat)
{
Apiomat.Status = {
    SCRIPT_ERROR: 701,
    APPLICATION_NOT_ACTIVE: 702,
    BAD_IMAGE: 703,
    BAD_ID: 704,
    CONCURRENT_ACCESS: 705,
    APPLICATION_SANDBOX: 706,
    MODEL_NOT_DEPLOYED: 707,
    WRONG_REF_TYPE: 709,
    ATTRIBUTE_NOT_SET: 710,
    OPERATION_NOT_POSSIBLE: 711,
    APPLICATION_NAME_MISMATCH: 712,
    WRONG_AUTH_HEADER: 713,
    MODEL_STILL_USED: 714,
    COLLECTION_NOT_ALLOWED: 715,
    FB_NO_VALID_MEMBER: 716,
    FB_NO_OAUTH_TOKEN: 717,
    FB_POST_ID_MISSING: 718,
    RESTORE_NO_DUMPS_FOUND: 719,
    TW_NO_VALID_MEMBER: 720,
    TW_NO_OAUTH_TOKEN: 721,
    IMEXPORT_WRONG_ENCODING: 722,
    IMEXPORT_WRONG_CONTENT: 723,
    PUSH_PAYLOAD_EXCEEDED: 724,
    PUSH_ERROR: 725,
    BAD_EMAIL: 726,
    BAD_PROMOTIONCODE_DISCOUNT: 727,
    BAD_PROMOTIONCODE_CODE: 728,
    PLAN_PRICE: 729,
    PLAN_NO_SYSTEMS: 730,
    SCRIPT_TIME_ERROR: 731,
    INVALID_NAME: 732,
    ATTRIBUTE_IN_SUPERCLASS: 733,
    JSON_TYPE_ERROR: 734,
    TBLR_NO_VALID_MEMBER: 735,
    TBLR_NO_OAUTH_TOKEN: 736,
    TBLR_POST_ID_MISSING: 737,
    LOCATION_INVALID: 738,
    SCRIPT_EXCEPTION: 739,
    BAD_CUSTOMERNAME: 740,
    QUERY_ERROR: 708,
    BAD_TYPE_IN_QUERY: 741,
    UNKNOWN_CLASS_IN_QUERY: 742,
    WRONG_NUM_FORMAT_IN_QUERY: 743,
    QUERY_PARSE_ERROR: 744,
    UNKNOWN_ATTRIBUTE_IN_QUERY: 745,
    BAD_IMAGE_ALPHA: 746,
    BAD_IMAGE_BGCOLOR: 747,
    BAD_IMAGE_FORMAT: 748,
    APPLICATION_NOT_FOUND: 801,
    CUSTOMER_NOT_FOUND: 802,
    ID_NOT_FOUND: 803,
    MODEL_NOT_FOUND: 804,
    MODULE_NOT_FOUND: 805,
    METAMODEL_NOT_FOUND: 806,
    PLAN_NOT_FOUND: 807,
    PROMOCODE_NOT_FOUND: 808,
    MODULE_USE_FORBIDDEN: 820,
    PUSH_ERROR_APIKEY: 821,
    PUSH_ERROR_CERTIFICATE: 822,
    SAME_NAME_USED_IN_SUPERCLASS: 823,
    PAYMENT_MAX_MODULE: 824,
    PAYMENT_SYSTEM: 825,
    PAYMENT_DOWNGRADE: 826,
    SAVE_REFERENECE_BEFORE_REFERENCING: 827,
    PAYMENT_DB_SIZE: 828,
    ENDPOINT_PATH_NOT_ALLOWED: 829,
    PAYMENT_NO_CRON: 1820,
    PAYMENT_MODULE_NOT_FREE: 1821,
    ID_EXISTS: 830,
    NAME_RESERVED: 831,
    CIRCULAR_DEPENDENCY: 832,
    UNAUTHORIZED: 840,
    WRONG_APIKEY: 841,
    EVALANCHE_UNAUTH: 842,
    PW_CHANGE_W_TOKEN: 843,
    CRUD_ERROR: 901,
    IMEXPORT_ERROR: 902,
    COMPILE_ERROR: 903,
    REFERENCE_ERROR: 904,
    PUSH_PAYLOAD_ERROR: 905,
    PUSH_SEND_ERROR: 906,
    PUSH_INIT_FAILED: 907,
    FACEBOOK_ERROR: 908,
    FACEBOOK_OAUTH_ERROR: 910,
    FACEBOOK_OAUTH_ERROR2: 917,
    MEMBER_NOT_FOUND: 911,
    WORDPRESS_FETCH_DATA_ERROR: 912,
    TUMBLR_OAUTH_ERROR: 913,
    TUMBLR_ERROR: 914,
    EXECUTE_METHOD_ERROR_PRIMITIVE: 915,
    EXECUTE_METHOD_ERROR: 916,
    OAUTH_TOKEN_REQUEST_ERROR: 918,
    FINDING_RESOURCE_ERROR: 919,
    HREF_NOT_FOUND: 601,
    WRONG_URI_SYNTAX: 602,
    WRONG_CLIENT_PROTOCOL: 603,
    IO_EXCEPTION: 604,
    UNSUPPORTED_ENCODING: 605,
    INSTANTIATE_EXCEPTION: 606,
    IN_PERSISTING_PROCESS: 607,
    VERIFY_SOCIALMEDIA: 608,
    TOO_MANY_LOCALIDS: 6089,
    MAX_CACHE_SIZE_REACHED: 6090,
    CANT_WRITE_IN_CACHE: 6091,
    BAD_DATASTORE_CONFIG: 610,
    NO_TOKEN_RECEIVED: 611,
    MALICIOUS_MEMBER: 950,


getReasonPhrase : function(statusCode) {
    var phrase = undefined;
    switch (statusCode) {
    case Apiomat.Status.SCRIPT_ERROR:
        phrase = "Script error!";
        break;
    case Apiomat.Status.APPLICATION_NOT_ACTIVE:
        phrase = "Application is deactivated!";
        break;
    case Apiomat.Status.BAD_IMAGE:
        phrase = "Image format seems to be corrupted!";
        break;
    case Apiomat.Status.BAD_ID:
        phrase = "ID format is wrong!";
        break;
    case Apiomat.Status.CONCURRENT_ACCESS:
        phrase = "Concurrent access forbidden!";
        break;
    case Apiomat.Status.APPLICATION_SANDBOX:
        phrase = "Application is in sandbox mode!";
        break;
    case Apiomat.Status.MODEL_NOT_DEPLOYED:
        phrase = "Model is not deployed!";
        break;
    case Apiomat.Status.WRONG_REF_TYPE:
        phrase = "Wrong reference type!";
        break;
    case Apiomat.Status.ATTRIBUTE_NOT_SET:
        phrase = "Attribute not set!";
        break;
    case Apiomat.Status.OPERATION_NOT_POSSIBLE:
        phrase = "CRUD operation not possible on this model!";
        break;
    case Apiomat.Status.APPLICATION_NAME_MISMATCH:
        phrase = "Application name does not match the one defined in the model!";
        break;
    case Apiomat.Status.WRONG_AUTH_HEADER:
        phrase = "Wrong authentication header format, must be 'username:password'";
        break;
    case Apiomat.Status.MODEL_STILL_USED:
        phrase = "Model is still used by other attributes, scripts or subclasses!'";
        break;
    case Apiomat.Status.COLLECTION_NOT_ALLOWED:
        phrase = "Collection is not supported for this model type!";
        break;
    case Apiomat.Status.FB_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
    case Apiomat.Status.FB_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
    case Apiomat.Status.FB_POST_ID_MISSING:
        phrase = "Facebook post id has to be set!";
        break;
    case Apiomat.Status.RESTORE_NO_DUMPS_FOUND:
        phrase = "No dumps for app on this date exist!";
        break;
    case Apiomat.Status.TW_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
    case Apiomat.Status.TW_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
    case Apiomat.Status.IMEXPORT_WRONG_ENCODING:
        phrase = "Wrong Encoding";
        break;
    case Apiomat.Status.IMEXPORT_WRONG_CONTENT:
        phrase = "Wrong Filecontent";
        break;
    case Apiomat.Status.PUSH_PAYLOAD_EXCEEDED:
        phrase = "Payload size exceeded!";
        break;
    case Apiomat.Status.PUSH_ERROR:
        phrase = "Error in push request!";
        break;
    case Apiomat.Status.BAD_EMAIL:
        phrase = "eMail format is wrong!";
        break;
    case Apiomat.Status.BAD_PROMOTIONCODE_DISCOUNT:
        phrase = "Discount value is wrong!";
        break;
    case Apiomat.Status.BAD_PROMOTIONCODE_CODE:
        phrase = "Code is invalid";
        break;
    case Apiomat.Status.PLAN_PRICE:
        phrase = "Plan price must be >= 0!";
        break;
    case Apiomat.Status.PLAN_NO_SYSTEMS:
        phrase = "Plan must have at leat one system!";
        break;
    case Apiomat.Status.SCRIPT_TIME_ERROR:
        phrase = "Script was interrupted, execution took too long.";
        break;
    case Apiomat.Status.INVALID_NAME:
        phrase = "Name must start with a letter, followed only by letters or numbers.";
        break;
    case Apiomat.Status.ATTRIBUTE_IN_SUPERCLASS:
        phrase = "Attribute is already defined in superclass.";
        break;
    case Apiomat.Status.JSON_TYPE_ERROR:
        phrase = "The @type is not correctly defined in your JSON (must be: APPNAMEMain$CLASSNAME";
        break;
    case Apiomat.Status.TBLR_NO_VALID_MEMBER:
        phrase = "Request send from no valid member";
        break;
    case Apiomat.Status.TBLR_NO_OAUTH_TOKEN:
        phrase = "Requesting member has no oAuth token, please authenticate! See http://doc.apiomat.com";
        break;
    case Apiomat.Status.TBLR_POST_ID_MISSING:
        phrase = "Tumblr post id has to be set!";
        break;
    case Apiomat.Status.LOCATION_INVALID:
        phrase = "Location data is invalid (latitude or longitude missing)!";
        break;
    case Apiomat.Status.SCRIPT_EXCEPTION:
        phrase = "Exception was raised in script!";
        break;
    case Apiomat.Status.BAD_CUSTOMERNAME:
        phrase = "Customer name must contain only characters A-Z,a-z or 0-9!";
        break;
    case Apiomat.Status.QUERY_ERROR:
        phrase = "Query could not be parsed!";
        break;
    case Apiomat.Status.BAD_TYPE_IN_QUERY:
        phrase = "The query contains a value with the wrong type";
        break;
    case Apiomat.Status.UNKNOWN_CLASS_IN_QUERY:
        phrase = "The definition of the class couldn't be found";
        break;
    case Apiomat.Status.WRONG_NUM_FORMAT_IN_QUERY:
        phrase = "A number was supplied in the wrong format";
        break;
    case Apiomat.Status.QUERY_PARSE_ERROR:
        phrase = "The query couldn't be parsed";
        break;
    case Apiomat.Status.UNKNOWN_ATTRIBUTE_IN_QUERY:
        phrase = "An attribute that was used in the query doesn't exist in the class";
        break;
    case Apiomat.Status.BAD_IMAGE_ALPHA:
        phrase = "alpha is wrong (must be a double value between 0.0 and 1.0)";
        break;
    case Apiomat.Status.BAD_IMAGE_BGCOLOR:
        phrase = "bgcolor is wrong (must be an RGB hex value without #, like 'FF0000' for red)";
        break;
    case Apiomat.Status.BAD_IMAGE_FORMAT:
        phrase = "format is wrong (can only be png, gif, bmp or jpg/jpeg)";
        break;
    case Apiomat.Status.APPLICATION_NOT_FOUND:
        phrase = "Application was not found!";
        break;
    case Apiomat.Status.CUSTOMER_NOT_FOUND:
        phrase = "Customer was not found!";
        break;
    case Apiomat.Status.ID_NOT_FOUND:
        phrase = "ID was not found!";
        break;
    case Apiomat.Status.MODEL_NOT_FOUND:
        phrase = "Model was not found!";
        break;
    case Apiomat.Status.MODULE_NOT_FOUND:
        phrase = "Module was not found!";
        break;
    case Apiomat.Status.METAMODEL_NOT_FOUND:
        phrase = "Meta Model was not found!";
        break;
    case Apiomat.Status.PLAN_NOT_FOUND:
        phrase = "Plan was not found!";
        break;
    case Apiomat.Status.PROMOCODE_NOT_FOUND:
        phrase = "Promotion code not valid!";
        break;
    case Apiomat.Status.MODULE_USE_FORBIDDEN:
        phrase = "Required module is not attached to app";
        break;
    case Apiomat.Status.PUSH_ERROR_APIKEY:
        phrase = "No API Key defined for Push service!";
        break;
    case Apiomat.Status.PUSH_ERROR_CERTIFICATE:
        phrase = "No certificate defined for Push service!";
        break;
    case Apiomat.Status.SAME_NAME_USED_IN_SUPERCLASS:
        phrase = "Same name is already used in a superclass.";
        break;
    case Apiomat.Status.PAYMENT_MAX_MODULE:
        phrase = "Maximum number of used modules exceeded for this plan.";
        break;
    case Apiomat.Status.PAYMENT_SYSTEM:
        phrase = "Selected system use is not allowed for this plan.";
        break;
    case Apiomat.Status.PAYMENT_DOWNGRADE:
        phrase = "Up/Downgrading plans is only allowed for super admins.";
        break;
    case Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING:
        phrase = "Object you are trying to reference is not on the server. Please save it first.";
        break;
    case Apiomat.Status.PAYMENT_DB_SIZE:
        phrase = "Used database size exceeds plan";
        break;
    case Apiomat.Status.ENDPOINT_PATH_NOT_ALLOWED:
        phrase = "Endpoint not allowed for app; please add path to your app's config.";
        break;
    case Apiomat.Status.PAYMENT_NO_CRON:
        phrase = "Cronjobs are not allowed for this plan.";
        break;
    case Apiomat.Status.PAYMENT_MODULE_NOT_FREE:
        phrase = "This module is not available for free plan.";
        break;
    case Apiomat.Status.ID_EXISTS:
        phrase = "ID exists!";
        break;
    case Apiomat.Status.NAME_RESERVED:
        phrase = "Name is reserved!";
        break;
    case Apiomat.Status.CIRCULAR_DEPENDENCY:
        phrase = "One of the parent classes must not be the same class!";
        break;
    case Apiomat.Status.UNAUTHORIZED:
        phrase = "Authorization failed!";
        break;
    case Apiomat.Status.WRONG_APIKEY:
        phrase = "API Key was not correct!";
        break;
    case Apiomat.Status.EVALANCHE_UNAUTH:
        phrase = "Authorization failed! Maybe username/password was not set for evelanche configuration?";
        break;
    case Apiomat.Status.PW_CHANGE_W_TOKEN:
        phrase = "Not authorized to change a user's password when authenticating with a token.";
        break;
    case Apiomat.Status.CRUD_ERROR:
        phrase = "Internal error during CRUD operation";
        break;
    case Apiomat.Status.IMEXPORT_ERROR:
        phrase = "Error during im/export!";
        break;
    case Apiomat.Status.COMPILE_ERROR:
        phrase = "Data models could not be compiled!";
        break;
    case Apiomat.Status.REFERENCE_ERROR:
        phrase = "Error in model reference!";
        break;
    case Apiomat.Status.PUSH_PAYLOAD_ERROR:
        phrase = "Failed to create payload!";
        break;
    case Apiomat.Status.PUSH_SEND_ERROR:
        phrase = "Failed to send message(s)!";
        break;
    case Apiomat.Status.PUSH_INIT_FAILED:
        phrase = "Failed to initialize push service!";
        break;
    case Apiomat.Status.FACEBOOK_ERROR:
        phrase = "An error occured while communicating with facebook!";
        break;
    case Apiomat.Status.FACEBOOK_OAUTH_ERROR:
        phrase = "facebook throws oAuth error! Please show login dialog again";
        break;
    case Apiomat.Status.FACEBOOK_OAUTH_ERROR2:
        phrase = "Received OAuth2 error from Facebook";
        break;
    case Apiomat.Status.MEMBER_NOT_FOUND:
        phrase = "Can't find member with this id/username";
        break;
    case Apiomat.Status.WORDPRESS_FETCH_DATA_ERROR:
        phrase = "Can't fetch data for wordpress blog";
        break;
    case Apiomat.Status.TUMBLR_OAUTH_ERROR:
        phrase = "tumblr throws oAuth error! Please show login dialog again";
        break;
    case Apiomat.Status.TUMBLR_ERROR:
        phrase = "Error communicationg with tumblr!";
        break;
    case Apiomat.Status.EXECUTE_METHOD_ERROR_PRIMITIVE:
        phrase = "Only primitive types are allowed";
        break;
    case Apiomat.Status.EXECUTE_METHOD_ERROR:
        phrase = "Execute method fails";
        break;
    case Apiomat.Status.OAUTH_TOKEN_REQUEST_ERROR:
        phrase = "An error occured during requesting an apiOmat OAuth2 token";
        break;
    case Apiomat.Status.FINDING_RESOURCE_ERROR:
        phrase = "An error occured while trying to find the resource";
        break;
    case Apiomat.Status.HREF_NOT_FOUND:
        phrase = "Model has no HREF; please save it first!";
        break;
    case Apiomat.Status.WRONG_URI_SYNTAX:
        phrase = "URI syntax is wrong";
        break;
    case Apiomat.Status.WRONG_CLIENT_PROTOCOL:
        phrase = "Client protocol is wrong";
        break;
    case Apiomat.Status.IO_EXCEPTION:
        phrase = "IOException was thrown";
        break;
    case Apiomat.Status.UNSUPPORTED_ENCODING:
        phrase = "Encoding is not supported";
        break;
    case Apiomat.Status.INSTANTIATE_EXCEPTION:
        phrase = "Error on class instantiation";
        break;
    case Apiomat.Status.IN_PERSISTING_PROCESS:
        phrase = "Object is in persisting process. Please try again later";
        break;
    case Apiomat.Status.VERIFY_SOCIALMEDIA:
        phrase = "Can't verify against social media provider";
        break;
    case Apiomat.Status.TOO_MANY_LOCALIDS:
        phrase = "Can't create more localIDs. Please try again later";
        break;
    case Apiomat.Status.MAX_CACHE_SIZE_REACHED:
        phrase = "The maximum cache size is reached.";
        break;
    case Apiomat.Status.CANT_WRITE_IN_CACHE:
        phrase = "Can't persist data to cache.";
        break;
    case Apiomat.Status.BAD_DATASTORE_CONFIG:
        phrase = "For requesting a session token without a refresh token, the Datastore must be configured with a username and password";
        break;
    case Apiomat.Status.NO_TOKEN_RECEIVED:
        phrase = "The response didn't contain a token";
        break;
    case Apiomat.Status.MALICIOUS_MEMBER:
        phrase = "Malicious use of member detected!";
        break;
    default:
        phrase = "No reason found";
    };
    return phrase;
},

getStatusForCode : function(httpCode) {
    var statusCode = undefined;
    switch (httpCode) {
    case 701:
        statusCode = Apiomat.Status.SCRIPT_ERROR;
        break;
    case 702:
        statusCode = Apiomat.Status.APPLICATION_NOT_ACTIVE;
        break;
    case 703:
        statusCode = Apiomat.Status.BAD_IMAGE;
        break;
    case 704:
        statusCode = Apiomat.Status.BAD_ID;
        break;
    case 705:
        statusCode = Apiomat.Status.CONCURRENT_ACCESS;
        break;
    case 706:
        statusCode = Apiomat.Status.APPLICATION_SANDBOX;
        break;
    case 707:
        statusCode = Apiomat.Status.MODEL_NOT_DEPLOYED;
        break;
    case 709:
        statusCode = Apiomat.Status.WRONG_REF_TYPE;
        break;
    case 710:
        statusCode = Apiomat.Status.ATTRIBUTE_NOT_SET;
        break;
    case 711:
        statusCode = Apiomat.Status.OPERATION_NOT_POSSIBLE;
        break;
    case 712:
        statusCode = Apiomat.Status.APPLICATION_NAME_MISMATCH;
        break;
    case 713:
        statusCode = Apiomat.Status.WRONG_AUTH_HEADER;
        break;
    case 714:
        statusCode = Apiomat.Status.MODEL_STILL_USED;
        break;
    case 715:
        statusCode = Apiomat.Status.COLLECTION_NOT_ALLOWED;
        break;
    case 716:
        statusCode = Apiomat.Status.FB_NO_VALID_MEMBER;
        break;
    case 717:
        statusCode = Apiomat.Status.FB_NO_OAUTH_TOKEN;
        break;
    case 718:
        statusCode = Apiomat.Status.FB_POST_ID_MISSING;
        break;
    case 719:
        statusCode = Apiomat.Status.RESTORE_NO_DUMPS_FOUND;
        break;
    case 720:
        statusCode = Apiomat.Status.TW_NO_VALID_MEMBER;
        break;
    case 721:
        statusCode = Apiomat.Status.TW_NO_OAUTH_TOKEN;
        break;
    case 722:
        statusCode = Apiomat.Status.IMEXPORT_WRONG_ENCODING;
        break;
    case 723:
        statusCode = Apiomat.Status.IMEXPORT_WRONG_CONTENT;
        break;
    case 724:
        statusCode = Apiomat.Status.PUSH_PAYLOAD_EXCEEDED;
        break;
    case 725:
        statusCode = Apiomat.Status.PUSH_ERROR;
        break;
    case 726:
        statusCode = Apiomat.Status.BAD_EMAIL;
        break;
    case 727:
        statusCode = Apiomat.Status.BAD_PROMOTIONCODE_DISCOUNT;
        break;
    case 728:
        statusCode = Apiomat.Status.BAD_PROMOTIONCODE_CODE;
        break;
    case 729:
        statusCode = Apiomat.Status.PLAN_PRICE;
        break;
    case 730:
        statusCode = Apiomat.Status.PLAN_NO_SYSTEMS;
        break;
    case 731:
        statusCode = Apiomat.Status.SCRIPT_TIME_ERROR;
        break;
    case 732:
        statusCode = Apiomat.Status.INVALID_NAME;
        break;
    case 733:
        statusCode = Apiomat.Status.ATTRIBUTE_IN_SUPERCLASS;
        break;
    case 734:
        statusCode = Apiomat.Status.JSON_TYPE_ERROR;
        break;
    case 735:
        statusCode = Apiomat.Status.TBLR_NO_VALID_MEMBER;
        break;
    case 736:
        statusCode = Apiomat.Status.TBLR_NO_OAUTH_TOKEN;
        break;
    case 737:
        statusCode = Apiomat.Status.TBLR_POST_ID_MISSING;
        break;
    case 738:
        statusCode = Apiomat.Status.LOCATION_INVALID;
        break;
    case 739:
        statusCode = Apiomat.Status.SCRIPT_EXCEPTION;
        break;
    case 740:
        statusCode = Apiomat.Status.BAD_CUSTOMERNAME;
        break;
    case 708:
        statusCode = Apiomat.Status.QUERY_ERROR;
        break;
    case 741:
        statusCode = Apiomat.Status.BAD_TYPE_IN_QUERY;
        break;
    case 742:
        statusCode = Apiomat.Status.UNKNOWN_CLASS_IN_QUERY;
        break;
    case 743:
        statusCode = Apiomat.Status.WRONG_NUM_FORMAT_IN_QUERY;
        break;
    case 744:
        statusCode = Apiomat.Status.QUERY_PARSE_ERROR;
        break;
    case 745:
        statusCode = Apiomat.Status.UNKNOWN_ATTRIBUTE_IN_QUERY;
        break;
    case 746:
        statusCode = Apiomat.Status.BAD_IMAGE_ALPHA;
        break;
    case 747:
        statusCode = Apiomat.Status.BAD_IMAGE_BGCOLOR;
        break;
    case 748:
        statusCode = Apiomat.Status.BAD_IMAGE_FORMAT;
        break;
    case 801:
        statusCode = Apiomat.Status.APPLICATION_NOT_FOUND;
        break;
    case 802:
        statusCode = Apiomat.Status.CUSTOMER_NOT_FOUND;
        break;
    case 803:
        statusCode = Apiomat.Status.ID_NOT_FOUND;
        break;
    case 804:
        statusCode = Apiomat.Status.MODEL_NOT_FOUND;
        break;
    case 805:
        statusCode = Apiomat.Status.MODULE_NOT_FOUND;
        break;
    case 806:
        statusCode = Apiomat.Status.METAMODEL_NOT_FOUND;
        break;
    case 807:
        statusCode = Apiomat.Status.PLAN_NOT_FOUND;
        break;
    case 808:
        statusCode = Apiomat.Status.PROMOCODE_NOT_FOUND;
        break;
    case 820:
        statusCode = Apiomat.Status.MODULE_USE_FORBIDDEN;
        break;
    case 821:
        statusCode = Apiomat.Status.PUSH_ERROR_APIKEY;
        break;
    case 822:
        statusCode = Apiomat.Status.PUSH_ERROR_CERTIFICATE;
        break;
    case 823:
        statusCode = Apiomat.Status.SAME_NAME_USED_IN_SUPERCLASS;
        break;
    case 824:
        statusCode = Apiomat.Status.PAYMENT_MAX_MODULE;
        break;
    case 825:
        statusCode = Apiomat.Status.PAYMENT_SYSTEM;
        break;
    case 826:
        statusCode = Apiomat.Status.PAYMENT_DOWNGRADE;
        break;
    case 827:
        statusCode = Apiomat.Status.SAVE_REFERENECE_BEFORE_REFERENCING;
        break;
    case 828:
        statusCode = Apiomat.Status.PAYMENT_DB_SIZE;
        break;
    case 829:
        statusCode = Apiomat.Status.ENDPOINT_PATH_NOT_ALLOWED;
        break;
    case 1820:
        statusCode = Apiomat.Status.PAYMENT_NO_CRON;
        break;
    case 1821:
        statusCode = Apiomat.Status.PAYMENT_MODULE_NOT_FREE;
        break;
    case 830:
        statusCode = Apiomat.Status.ID_EXISTS;
        break;
    case 831:
        statusCode = Apiomat.Status.NAME_RESERVED;
        break;
    case 832:
        statusCode = Apiomat.Status.CIRCULAR_DEPENDENCY;
        break;
    case 840:
        statusCode = Apiomat.Status.UNAUTHORIZED;
        break;
    case 841:
        statusCode = Apiomat.Status.WRONG_APIKEY;
        break;
    case 842:
        statusCode = Apiomat.Status.EVALANCHE_UNAUTH;
        break;
    case 843:
        statusCode = Apiomat.Status.PW_CHANGE_W_TOKEN;
        break;
    case 901:
        statusCode = Apiomat.Status.CRUD_ERROR;
        break;
    case 902:
        statusCode = Apiomat.Status.IMEXPORT_ERROR;
        break;
    case 903:
        statusCode = Apiomat.Status.COMPILE_ERROR;
        break;
    case 904:
        statusCode = Apiomat.Status.REFERENCE_ERROR;
        break;
    case 905:
        statusCode = Apiomat.Status.PUSH_PAYLOAD_ERROR;
        break;
    case 906:
        statusCode = Apiomat.Status.PUSH_SEND_ERROR;
        break;
    case 907:
        statusCode = Apiomat.Status.PUSH_INIT_FAILED;
        break;
    case 908:
        statusCode = Apiomat.Status.FACEBOOK_ERROR;
        break;
    case 910:
        statusCode = Apiomat.Status.FACEBOOK_OAUTH_ERROR;
        break;
    case 917:
        statusCode = Apiomat.Status.FACEBOOK_OAUTH_ERROR2;
        break;
    case 911:
        statusCode = Apiomat.Status.MEMBER_NOT_FOUND;
        break;
    case 912:
        statusCode = Apiomat.Status.WORDPRESS_FETCH_DATA_ERROR;
        break;
    case 913:
        statusCode = Apiomat.Status.TUMBLR_OAUTH_ERROR;
        break;
    case 914:
        statusCode = Apiomat.Status.TUMBLR_ERROR;
        break;
    case 915:
        statusCode = Apiomat.Status.EXECUTE_METHOD_ERROR_PRIMITIVE;
        break;
    case 916:
        statusCode = Apiomat.Status.EXECUTE_METHOD_ERROR;
        break;
    case 918:
        statusCode = Apiomat.Status.OAUTH_TOKEN_REQUEST_ERROR;
        break;
    case 919:
        statusCode = Apiomat.Status.FINDING_RESOURCE_ERROR;
        break;
    case 601:
        statusCode = Apiomat.Status.HREF_NOT_FOUND;
        break;
    case 602:
        statusCode = Apiomat.Status.WRONG_URI_SYNTAX;
        break;
    case 603:
        statusCode = Apiomat.Status.WRONG_CLIENT_PROTOCOL;
        break;
    case 604:
        statusCode = Apiomat.Status.IO_EXCEPTION;
        break;
    case 605:
        statusCode = Apiomat.Status.UNSUPPORTED_ENCODING;
        break;
    case 606:
        statusCode = Apiomat.Status.INSTANTIATE_EXCEPTION;
        break;
    case 607:
        statusCode = Apiomat.Status.IN_PERSISTING_PROCESS;
        break;
    case 608:
        statusCode = Apiomat.Status.VERIFY_SOCIALMEDIA;
        break;
    case 6089:
        statusCode = Apiomat.Status.TOO_MANY_LOCALIDS;
        break;
    case 6090:
        statusCode = Apiomat.Status.MAX_CACHE_SIZE_REACHED;
        break;
    case 6091:
        statusCode = Apiomat.Status.CANT_WRITE_IN_CACHE;
        break;
    case 610:
        statusCode = Apiomat.Status.BAD_DATASTORE_CONFIG;
        break;
    case 611:
        statusCode = Apiomat.Status.NO_TOKEN_RECEIVED;
        break;
    case 950:
        statusCode = Apiomat.Status.MALICIOUS_MEMBER;
        break;
    };
    return statusCode;
}
};
})(typeof exports === 'undefined' ? Apiomat
        : exports);