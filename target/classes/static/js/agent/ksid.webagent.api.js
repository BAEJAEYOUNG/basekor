/*
 * Developed by JAEYOUNG BAE on 19. 5. 27 오후 4:40.
 * Last modified 19. 5. 27 오후 4:24.
 * Copyright (c) 2019. All rights reserved.
 */

/**
*
*  Javascript Interface for KSID Web Agent(Non-ActiveX)
*
**/

document.write('<script type="text/javascript" src="./js/agent/pidcrypt_util.js"></script>');
document.write('<script type="text/javascript" src="./js/agent/pidcrypt.js"></script>');
document.write('<script type="text/javascript" src="./js/agent/jquery-1.12.0.js"></script>');
document.write('<script type="text/javascript" src="./js/agent/sha256.js"></script>');
document.write('<script type="text/javascript" src="./js/agent/sha1.js"></script>');
document.write('<script type="text/javascript" src="./js/agent/json2.js"></script>');

var KSID_WEBAGENT_UPDATEURL = null;

// Utility
var KSID_WEBAGENT_API_UTIL = {
    getDomainFromUrl : function ( url ) {
       if (url.indexOf("://") > -1) {
        return url.split('/')[0] + "//" + url.split('/')[2];
    }
    else {
        return url.split('/')[0];
    }
  },

  jsonToString : function ( data ) {
        var results = [];

        for (var property in data) {
            var value = data[property];
            if (value) {
                if ( (typeof value) == "string" )
                    results.push(property.toString() + ': ' + value);
                else
                    results.push( KSID_WEBAGENT_API_UTIL.jsonToString( value ) );
            }
        }

        return '{' + results.join(', ') + '}';
  },

    setLocalCookie : function(sessionId,value) {
    var name = "SAFEICERTADM_" + sessionId;
    var path = "/";
    document.cookie = name + "=" + escape(value) + ";path=/";
  },

  getLocalCookie : function(sessionId) {
      if( sessionId == null || sessionId == "" )
          return null;

    var name = "SAFEICERTADM_" + sessionId;
    var namestr = name + "=";
    var namelen = namestr.length;
    var cookielen = document.cookie.length;

    var i = 0;
    while( i < cookielen)
    {
      var j = i + namelen;
      if(document.cookie.substring(i,j) == namestr)
      {
        var end = document.cookie.indexOf(";",j);
        if(end == -1)
          end = document.cookie.length;
        return unescape(document.cookie.substring(j,end));
      }
      i = document.cookie.indexOf(" ",i)+1;
      if(i == 0) break;
    }
    return null;
  },

  parseHexString : function(str) {
      str +="";
    var result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));
      str = str.substring(2, str.length);
    }

    var strOut="";
    for( var i=0; i<result.length; i++ )
      strOut += String.fromCharCode( result[i] );
    return strOut;
  },

  toHexString : function( instr ) {
      var outstr="";
      var tmp="";

      for( var i=0; i<instr.length; i++ )
      {
          tmp = instr.charCodeAt(i).toString(16);
          if( tmp.length == 1 )
              tmp = "0" + tmp;
          outstr += tmp;
      }

    return outstr.toLowerCase();
  },

  hexToBase64 : function(str) {
      str +="";
    var result = [];
    while (str.length >= 2) {
      result.push(parseInt(str.substring(0, 2), 16));
      str = str.substring(2, str.length);
    }

    alert( result.length );
    var b64 = KSID_WEBAGENT_API_UTIL.encodeB64( result, false );
    return b64;
  },

  genRandomString : function (len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len)
    {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr;
  },

  queryStringToArray : function( qs ) {
    var pairs = qs.split('&');
    var result = {};
    pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
    });
    return result;
  },

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encodeB64 : function (input, toutf8) {
    var output = null;

    if( window.atob )
    {
        if( toutf8 )
                input = KSID_WEBAGENT_API_UTIL.utf8_encode(input);

            output = btoa( input );
        }
        else
              output = pidCryptUtil.encodeBase64(input, toutf8);

        return output;
    },

    // public method for decoding
    decodeB64 : function (input, toutf8) {
    var output = null;

    if( window.atob )
    {
        output = atob( input );
        if( toutf8 )
                output = KSID_WEBAGENT_API_UTIL.utf8_decode(output);
        }
    else
    {
          output = pidCryptUtil.decodeBase64( input, toutf8 );
    }


        return output;

    },

    // private method for UTF-8 encoding
    utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while ( i < utftext.length ) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    },

    // private method for SHA1
    gen_sha1 : function (ibuf) {
        var h = pidCrypt.SHA1( ibuf );
        return h;
    },

    // private method for SHA256
    gen_sha256 : function (ibuf) {
        var h = pidCrypt.SHA256( ibuf );
        return h;
    }
};

// Response Function
var KSID_WEBAGENT_API_RESPONSE = function( msgResponse, context ) {

  context.setRecvTime();

    var resMsgType = msgResponse['msgType'];
  var resStatus = msgResponse['status'];
  if( !resStatus )
  {
      context.setMsgType( resMsgType );
        context.setStatus( "F" );
        context.setErrorCode( "1601" );
        context.setErrorText( "Result code is missing in response message" );
        context.callback( context );
            return false;
    }

  if( resStatus != 'S' )
  {
      var errorCode = msgResponse['errorCode'];
      var errorText = msgResponse['errorText'];

      if( !errorCode )
            errorCode = "1000";

      var encodeB64 = msgResponse['encodeB64'];
      if( encodeB64 != null && encodeB64 == "Y" )
            errorText = KSID_WEBAGENT_API_UTIL.decodeB64(errorText,true);

      context.setMsgType( resMsgType );
        context.setStatus( resStatus );
        context.setErrorCode( errorCode );

            if( resStatus == 'T' )
                    context.setErrorText( "Response timeout" );
            else
            {
                    if( !errorText )
                            context.setErrorText( "KSID Web Agent error" );
                    else
                            context.setErrorText( "KSID Web Agent error\r\n" + errorText );
            }
        context.callback( context );
            return false;
  }

  var responseEncoding = msgResponse['responseEncoding'];
  if( responseEncoding == null || responseEncoding.length == 0 )
      responseEncoding = "N";

  var responseData = msgResponse['responseData'];
  if( responseData != null && responseData != '' )
  {
        if( responseEncoding == "B" )		// Base64 Encoding
          msgResponse['responseData'] = KSID_WEBAGENT_API_UTIL.decodeB64(responseData,false);
      else if( responseEncoding == "H" )	// HexString
          msgResponse['responseData'] = KSID_WEBAGENT_API_UTIL.parseHexString(responseData);
    }

  var responseData = msgResponse['responseData'];
  if( responseData != null && responseData != '' )
  {
        responseData = KSID_WEBAGENT_API_UTIL.utf8_decode(responseData);

      if( responseData == 'KSID_WEBAGENT_NULL' )
          msgResponse['responseData'] = null;
      else
      {
          if( resMsgType == "GK" )
              msgResponse['responseData'] = KSID_WEBAGENT_API_UTIL.toHexString(responseData);
            else
              msgResponse['responseData'] = responseData;
            }
  }

  context.setStatus( "S" );
    context.setResultJSON( msgResponse );
    context.callback( context );
    return true;
};

KSID_WEBAGENT_API_ERROR = function( request, status, error, context ) {
    context.setStatus("F");
    context.setErrorCode(request.status);

    if( request.status == 0 || request.status == 12007 || request.status == 12029 )
    {
        if( context.getMsgType() == "SCC001" )
        {
                context.callback();
                return false;
        }
/*
        if( error && error != 'undefined' )
            context.setErrorText("Network Error("+error.toString()+")");
        else
            context.setErrorText("Network Error");
*/
        context.setErrorText( "KSID 웹에이전트 서비스가 설치되어 있지 않거나\r\n중지된 상태입니다.\r\n\r\n설치 또는 실행 후 다시 시도해주십시오." );
  }
    else
    {
        if( error && error != 'undefined' )
            context.setErrorText(error.toString());
        else
            context.setErrorText("Unknown Error");
  }
  context.callback();
    return false;
};

var KSID_WEBAGENT_API_CONTEXT = function() {
    // private property for response
    this._status = "S";
    this._msgType = null;
    this._lastMsgType = null;
    this._errorCode = "0000";
    this._errorText = "";
    this._callback = null;
    this._apiInstance = null;
    this._async = true;
    this._resultJSON = null;
    this._userCallback = null;
    this._userData = null;
    this._userCallFunction = null;

    this._startTime = null;
    this._sendTime = null;
    this._recvTime = null;
    this._endTime = null;

    this._updateUrl = null;
    this._version = "1.0.0.1";
};

KSID_WEBAGENT_API_CONTEXT.prototype = {

    setMsgType : function ( _msgType ) {
        this._msgType = _msgType;
    },

    getMsgType : function () {
        return this._msgType;
    },

    setLastMsgType : function ( _lastMsgType ) {
        this._lastMsgType = _lastMsgType;
    },

    getLastMsgType : function () {
        return this._lastMsgType;
    },

    setUpdateUrl : function ( _updateUrl ) {
        this._updateUrl = _updateUrl;
    },

    getUpdateUrl : function () {
        return this._updateUrl;
    },

    setVersion : function ( _version ) {
        this._version = _version;
    },

    getVersion : function () {
        return this._version;
    },

    setApiInstance : function ( _apiInstance ) {
        this._apiInstance = _apiInstance;
    },

    getApiInstance : function () {
        return this._apiInstance;
    },

    setCallback : function ( _callback ) {
        this._callback = _callback;
    },

    getCallback : function () {
        return this._callback;
    },

    setStatus : function ( _status ) {
        this._status = _status;
    },

    getStatus : function () {
        return this._status;
    },

    setErrorCode : function ( _errorCode ) {
        this._errorCode = _errorCode;
    },

    getErrorCode : function () {
        return this._errorCode;
    },

    setErrorText : function ( _errorText ) {
        this._errorText = _errorText;
    },

    getErrorText : function () {
        return this._errorText;
    },

    setAsync : function ( _async ) {
        this._async = _async;
    },

    getAsync : function () {
        return this._async;
    },

    setResultJSON : function ( _resultJSON ) {
        this._resultJSON = _resultJSON;
    },

    getResultJSON : function () {
        return this._resultJSON;
    },

    getResult : function () {
        if( this._resultJSON == null || this._resultJSON == '' )
            return null;
        else
            return this._resultJSON['responseData'];
    },

    setUserData : function ( _userData ) {
        this._userData = _userData;
    },

    getUserData : function () {
        return this._userData;
    },

    setUserCallback : function ( _userCallback ) {
        this._userCallback = _userCallback;
    },

    getUserCallback : function () {
        return this._userCallback;
    },

    setUserCallFunction : function( _userCallFunction )
    {
        this._userCallFunction = _userCallFunction;
    },

    getUserCallFunction : function()
    {
        return this._userCallFunction;
    },

    setStartTime : function()
    {
        this._startTime = new Date();
    },

    getStartTime : function()
    {
        return this._startTime;
    },

    setSendTime : function()
    {
        this._sendTime = new Date();
    },

    getSendTime : function()
    {
        return this._sendTime;
    },

    setRecvTime : function()
    {
        this._recvTime = new Date();
    },

    getRecvTime : function()
    {
        return this._recvTime;
    },

    setEndTime : function()
    {
        this._endTime = new Date();
    },

    getEndTime : function()
    {
        return this._endTime;
    },

    getElapseTime : function( flag )
    {
        var diffmilli = 0;

        if( flag == 1 )
            diffmilli = this._sendTime - this._startTime;
        else if( flag == 2 )
            diffmilli = this._recvTime - this._sendTime;
        else if( flag == 3 )
            diffmilli = this._endTime - this._recvTime;
        else if( flag == 4 )
            diffmilli = this._endTime - this._startTime;
        else
              return 0;

        if( diffmilli < 0 )
            return 0;
      else
            return diffmilli/1000;
    },

    callback : function () {

        this.setEndTime();

        if( this._callback && (typeof this._callback) === 'function' )
        {
            this._callback( this );
        }
        else
        {
            var msg = "오류코드 : " + this._errorCode + "\r\n";
            if( this._errorText != null )
                  msg += "오류내용 : " + this._errorText;
            alert( msg );
        }
    },

    userCallback : function () {

        this.setEndTime();

        if( this._userCallback && (typeof this._userCallback) === 'function' )
            this._userCallback( this );
        else
        {
            var msg = "Error Code : " + this._errorCode + "\r\n";
            if( this._errorText != null )
                  msg += "Error Text : " + this._errorText;
            alert( msg );
        }
    }

};

// KSID Web Agent API
var KSID_WEBAGENT_API = function() {
    // private property for framework connection
    var tmp = location.hostname.split('.');
    tmp.shift();
    this._siteDomain = tmp.join('.');
    this._protocol = location.protocol.toLowerCase();
    this._subDomain = "ksid";
//	this._url = "http://" + this._subDomain + "." + this._siteDomain;
    this._url = KSID_WEBAGENT_API_UTIL.getDomainFromUrl( location.href );
    this._httpPort = 18181;
    this._httpsPort = 18181;
    this._getUri = "/KSIDWebAgent.agt";
    this._postUri = "/KSIDWebAgent.agt";
    this._secure = false;
    this._method = "POST";
    this._updateUrl = null;
    this._version = "1.0.0.1";
    this._context = null;
};

KSID_WEBAGENT_API.prototype = {

    getStatus : function () {
        if( this._context != null )
          return this._context.getStatus();
        else
          return null;
    },

    getErrorCode : function () {
        if( this._context != null )
          return this._context.getErrorCode();
        else
          return null;
    },

    getErrorText : function () {
        if( this._context != null )
          return this._context.getErrorText();
        else
          return null;
    },

    getResult : function () {
        if( this._context != null )
          return this._context.getResultJSON();
        else
          return null;
    },

    getUrl : function()
    {
        return this._url;
    },

    setUrl : function( _url )
    {
        this._url = _url;
    },

    getHttpPort : function()
    {
        return this._httpPort;
    },

    setHttpPort : function( _httpPort )
    {
        this._httpPort = _httpPort;
    },

    getHttpsPort : function()
    {
        return this._httpsPort;
    },

    setHttpsPort : function( _httpsPort )
    {
        this._httpsPort = _httpsPort;
    },

    setProtocol : function( _protocol )
    {
        this._protocol = _protocol + ":";
    },

    getSecure : function()
    {
        return this._secure;
    },

    setSecure : function( _secure )
    {
        this._secure = _secure;
    },

    setMethod : function( _method )
    {
        this._method = _method.toUpperCase();
    },

    getMethod : function()
    {
        return this._method;
    },

    setUpdateUrl : function ( _updateUrl ) {
        this._updateUrl = _updateUrl;
    },

    getUpdateUrl : function () {
        return this._updateUrl;
    },

    setVersion : function ( _version ) {
        this._version = _version;
    },

    getVersion : function () {
        return this._version;
    },

    WebAgent_Context : function () {
        if( this._context == null )
            this._context = new KSID_WEBAGENT_API_CONTEXT();
        return this._context;
    },

    WebAgent_Callback : function ( callback ) {
        if( this._context == null )
            this._context = new KSID_WEBAGENT_API_CONTEXT();
        this._context.setCallback( callback );
    },

    WebAgent_SendPlain : function ( context, msgType, msgParam ) {
          if( msgParam != null && msgParam != '' )
          {
                var requestData = msgParam['requestData'];
                if( requestData != null && requestData != '' )
                msgParam['requestData'] = KSID_WEBAGENT_API_UTIL.encodeB64(requestData, true);
          }
          else
          {
                msgParam = {};
          }

          if( msgParam['fileName'] != null )
                msgParam['fileName'] = KSID_WEBAGENT_API_UTIL.encodeB64( msgParam['fileName'], true );

          msgParam['msgType'] = msgType;
          msgParam['msgEncrypt'] = "N";
          msgParam['version'] = context.getVersion();

      context.setSendTime();

          $.support.cors = true;

      if( this._method == "GET" )
      {
              var strParam = "scadata=" + encodeURI(JSON.stringify(msgParam));
              var sendUrl;

              if( this._protocol == "https:" )
                  sendUrl = "https://localhost:" + this._httpsPort + this._getUri;
              else
                  sendUrl = "http://127.0.0.1:" + this._httpPort + this._getUri;

                  var send = $.ajax( {
                      type: "GET",
                      url: sendUrl,
                      data: strParam,
                      dataType: "jsonp",
                      jsonp: "callback",
                      crossDomain: true,
                      cache: false,
                      success: function(msgResponse){ return KSID_WEBAGENT_API_RESPONSE(msgResponse,context); },
                      error: function(request,status,error) { return KSID_WEBAGENT_API_ERROR(request,status,error,context); }
                    } );
      }
      else
      {
              var strParam = encodeURI(JSON.stringify(msgParam));
              var sendUrl;

              if( this._protocol == "https:" )
                  sendUrl = "https://localhost:" + this._httpsPort + this._postUri;
              else
                  sendUrl = "http://127.0.0.1:" + this._httpPort + this._postUri;

                  var send = $.ajax( {
                      type: "POST",
                      url: sendUrl,
                      data: strParam,
//					  dataType: "json",
                      dataType: "json",
                      crossDomain: true,
                      cache: false,
                      success: function(msgResponse){ return KSID_WEBAGENT_API_RESPONSE(msgResponse,context); },
                      error: function(request,status,error) { return KSID_WEBAGENT_API_ERROR(request,status,error,context); }
                    } );
      }
    },

    WebAgent_Send : function ( context, msgType, msgParam ) {
      if( msgType == null )
          msgType = "XX";

          return this.WebAgent_SendPlain( context, msgType, msgParam );
    },

    WebAgent_Init : function () {

        // 1. Set Context
        var context = this.WebAgent_Context();

        context.setApiInstance( this );
        context.setUpdateUrl( this.getUpdateUrl() );
        context.setVersion( this.getVersion() );

    context.setStatus( "S" );
    context.callback();
    },

    WebAgent_InitCallback : function( response )
    {
        var resStatus = response.getStatus();
        if( resStatus != 'S' )
            response.userCallback( response );
        else
        {
              response.setCallback( response.getUserCallback() );

              var msgType = response.getMsgType();
           var userData = response.getUserData();
              var apiInstance = response.getApiInstance();

               if( userData != null && userData != '' )
              {
                  var param = {};
                  param["requestData"] = userData;

                  apiInstance.WebAgent_Send( response, msgType, param );
              }
              else
              {
                  apiInstance.WebAgent_Send( response, msgType, null );
              }
        }
    },

    WebAgent_Invoke : function() {
        // 1. Check Arguments
        if( arguments.length < 2 )
        {
              alert( "WebAgent_Invoke must be called with at least 2 parameters" );
              return;
        }
        if( typeof arguments[0] != "function" )
        {
              alert( "First parameter of WebAgent_Invoke must be Callback Function" );
              return;
        }

        // 2. Make QueryString for Invoke Method
        var queryString = "cmd=" + arguments[1];
        for( var i=2; i<arguments.length; i++ )
        {
              queryString += "&p" + (i-1) + "=" + KSID_WEBAGENT_API_UTIL.toHexString(KSID_WEBAGENT_API_UTIL.utf8_encode(arguments[i]));
        }

        // 3. Get Context
        var context = this.WebAgent_Context();

        // 4. Set Init Callback & User's dataString & User's Callback function
        context.setMsgType( arguments[1] );
        context.setCallback( this.WebAgent_InitCallback );
        context.setUserData( queryString );
        context.setUserCallback( arguments[0] );
//		context.setUserCallFunction( arguments[1] );
        context.setStartTime();

        if( arguments[1] == "AP" )
              context.setUserCallFunction( arguments[3] );
      else
              context.setUserCallFunction( "" );

        // 5. Init Session
        this.WebAgent_Init();
  },

    ksidwebagt_start : function() {
        this.WebAgent_Invoke( arguments[0], "AS", this.getVersion(), this.getUpdateUrl() );
    },

    ksidwebagt_stop : function() {
        this.WebAgent_Invoke( arguments[0], "AT" );
    },

    ksidwebagt_check : function() {
        this.WebAgent_Invoke( arguments[0], "AC" );
    },

    ksidwebagt_base64Encode : function() {
        // 1. Check Arguments
        if( arguments.length < 2 )
        {
              alert( "Usage : ksidwebagt_base64Encode( <response callback>, '<plain text>' )" );
              return;
        }
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_Base64Encode", arguments[1] );
    },

    ksidwebagt_base64Decode : function() {
        // 1. Check Arguments
        if( arguments.length < 2 )
        {
              alert( "Usage : ksidwebagt_base64Decode( <response callback>, '<encoding text>' )" );
              return;
        }
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_Base64Decode", arguments[1] );
    },

    ksidwebagt_genSHA1 : function() {
        // 1. Check Arguments
        if( arguments.length < 2 )
        {
              alert( "Usage : ksidwebagt_genSHA1( <response callback>, '<plain text>' )" );
              return;
        }

        var context = this.WebAgent_Context();

        context.setMsgType( "AP" );
        context.setCallback( arguments[0] );
        context.setUserData( null );
        context.setUserCallback( arguments[0] );
    context.setUserCallFunction( "KSIDCrypto_GenSHA1" );

    var h = KSID_WEBAGENT_API_UTIL.gen_sha1( arguments[1] );

    if( h != null )
           h = h.toUpperCase();

    var msgResponse = {};
    msgResponse['msgType'] = "AP";
    msgResponse['status'] = "S";
/*
    msgResponse['responseEncoding'] = "B";
      msgResponse['responseData'] = KSID_WEBAGENT_API_UTIL.encodeB64(h,false);
*/
    msgResponse['responseEncoding'] = "N";
      msgResponse['responseData'] = h;

        KSID_WEBAGENT_API_RESPONSE( msgResponse, context );
    },

    ksidwebagt_genSHA256 : function() {
        // 1. Check Arguments
        if( arguments.length < 2 )
        {
              alert( "Usage : ksidwebagt_genSHA256( <response callback>, '<plain text>' )" );
              return;
        }

        var context = this.WebAgent_Context();

        context.setMsgType( "AP" );
        context.setCallback( arguments[0] );
        context.setUserData( null );
        context.setUserCallback( arguments[0] );
    context.setUserCallFunction( "KSIDCrypto_GenSHA256" );

    var h = KSID_WEBAGENT_API_UTIL.gen_sha256( arguments[1] );
    if( h != null )
        h = h.toUpperCase();
    var msgResponse = {};
    msgResponse['msgType'] = "AP";
    msgResponse['status'] = "S";
//    msgResponse['responseEncoding'] = "B";
//	  msgResponse['responseData'] = KSID_WEBAGENT_API_UTIL.encodeB64(h,false);
    msgResponse['responseEncoding'] = "N";
      msgResponse['responseData'] = h;

        KSID_WEBAGENT_API_RESPONSE( msgResponse, context );
    },

    ksidwebagt_genKey : function() {
        // 1. Check Arguments
        if( arguments.length < 3 )
        {
              alert( "Usage : ksidwebagt_genKey( <response callback>, '<key size(16,24,32)>', '<encoding>' )" );
              return;
        }
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_GenKey", arguments[1], arguments[2] );
    },

    ksidwebagt_seedEncrypt : function() {
        // 1. Check Arguments
        if( arguments.length < 4 )
        {
              alert( "Usage : ksidwebagt_seedEncrypt( <response callback>, '<key(base64)>', '<plain text'>, '<output encoding'> )" );
              return;
        }
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_SEEDEncrypt", arguments[1], arguments[2], arguments[3] );
    },

    ksidwebagt_seedDecrypt : function() {
        // 1. Check Arguments
        if( arguments.length < 3 )
        {
              alert( "Usage : ksidwebagt_seedDecrypt( <response callback>, '<key(base64)>', '<encrypted text'>, '<input encoding'> )" );
              return;
        }
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_SEEDDecrypt", arguments[1], arguments[2], arguments[3] );
    },

    ksidwebagt_rsaEncrypt : function() {
        // 1. Check Arguments
        if( arguments.length < 4 )
        {
              alert( "Usage : ksidwebagt_rsaEncrypt( <response callback>, '<cert(base64)>', '<plain text'>, '<output encoding'> )" );
              return;
        }

        if( arguments[1] == null )
            arguments[1] = "";

        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_RSAEncrypt", arguments[1], arguments[2], arguments[3] );
    },

    ksidwebagt_rsaDecrypt : function() {
        // 1. Check Arguments
        if( arguments.length < 5 )
        {
              alert( "Usage : ksidwebagt_rsaDecrypt( <response callback>, '<pkey(base64)>', '<cert password>', '<encrypted text'>, '<input encoding'> )" );
              return;
        }

        if( arguments[1] == null )
      {
            arguments[1] = "";
            arguments[2] = "";
        }

        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_RSADecrypt", arguments[1], arguments[2], arguments[3], arguments[4] );
    },

    ksidwebagt_rsaSign : function() {
        // 1. Check Arguments
        if( arguments.length < 6 )
        {
              alert( "Usage : ksidwebagt_rsaSign( <response callback>, '<cert(base64)>', '<pkey(base64)>', '<cert password>', '<plain text'>, '<output encoding'> )" );
              return;
        }

        if( arguments[1] == null )
      {
            arguments[1] = "";
            arguments[2] = "";
            arguments[3] = "";
        }

        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_RSASign", arguments[1], arguments[2], arguments[3], arguments[4], arguments[5] );
    },

    ksidwebagt_rsaVerify : function() {
        // 1. Check Arguments
        if( arguments.length < 5 )
        {
              alert( "Usage : ksidwebagt_rsaVerify( <response callback>, '<cert(base64)>', '<plain text>', '<signature'>, '<input encoding'> )" );
              return;
        }

        if( arguments[1] == null )
      {
            arguments[1] = "";
        }

        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "KSIDCrypto_RSAVerify", arguments[1], arguments[2], arguments[3], arguments[4] );
    },

    ksidwebagt_deviceIdVerify : function() {
        this.WebAgent_Invoke( arguments[0], "AP", "CRPT", "ksidwebagt_deviceIdVerify" );
    }
};