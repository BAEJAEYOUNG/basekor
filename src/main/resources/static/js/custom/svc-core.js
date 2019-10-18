/*
 * Developed by JAEYOUNG BAE on 19. 4. 10 오전 11:34.
 * Last modified 19. 4. 10 오전 11:34.
 * Copyright (c) 2019. All rights reserved.
 */

svc.ui = {};
svc.form = {};
svc.net = {};
svc.util = {};

/*######################################
    svc.ui
######################################*/


/*---------------------------------------
    property
---------------------------------------*/

svc.ui.dialogProp = {

    modal    : true,
    resizable: false,
    show     : "fadeIn",
    hide     : "fadeOut",
    close    : false

};

/*---------------------------------------
    alert, confirm
---------------------------------------*/

svc.ui.alert = function( msg, callbackFunc ) {
    // svc.ui.alertDefault(msg, callbackFunc);
    svc.ui.alertJQ( msg, callbackFunc );
};
svc.ui.alertDefault = function( msg, callbackFunc ) {
    alert( msg );
    if( typeof ( callbackFunc ) == "function" ) {
        callbackFunc();
    }
};
svc.ui.alertJQ = function( msg, callbackFunc ) {
    $.alert( {
        theme            : 'light',
        type             : 'dark',
        draggable        : true,
        keyboardEnabled  : true,
        backgroundDismiss: false,
        title            : '확인',
        content          : msg,
        boxWidth         : '400px',
        useBootstrap     : false,
        buttons          : {
            specialKey: {
                text  : '확인',
                keys  : ['enter'],
                action: function() {
                    if( typeof ( callbackFunc ) == "function" ) {
                        callbackFunc();
                    }
                }
            }
        }
    } );
};
svc.ui.confirm = function( msg, callbackFunc, cancelFunc ) {
    // svc.ui.confirmDefault(msg, callbackFunc, cancelFunc);
    svc.ui.confirmJQ( msg, callbackFunc, cancelFunc );
};
svc.ui.confirmDefault = function( msg, callbackFunc, cancelFunc ) {
    if( confirm( msg ) ) {
        if( typeof ( callbackFunc ) == "function" ) {
            callbackFunc();
        }
    } else {
        if( typeof ( cancelFunc ) == "function" ) {
            cancelFunc();
        }
    }
};
svc.ui.confirmJQ = function( msg, callbackFunc, cancelFunc ) {
    return $.confirm( {
        title            : '확인',
        type             : 'dark',
        draggable        : true,
        keyboardEnabled  : true,
        backgroundDismiss: false,
        content          : msg,
        boxWidth         : '400px',
        useBootstrap     : false,
        escapeKey        : 'cancel',
        buttons          : {
            specialKey: {
                text  : '확인',
                keys  : ['enter'],
                action: function() {
                    if( typeof ( callbackFunc ) == "function" ) {
                        callbackFunc();
                    }
                }
            },
            cancel    : {
                text  : '취소',
                action: function() {
                    if( typeof ( cancelFunc ) == "function" ) {
                        cancelFunc();
                    }
                }
            }
        }
    } );
};


/*---------------------------------------
    window open 관련 함수
---------------------------------------*/

svc.ui.window = function( url, name, argOpts ) {

    this.url = ( url ) ? url : "about:blank";
    this.name = ( name ) ? name : "";
    this.options = {};
    this.options.location = 0;
    this.options.toolbar = 0;
    this.options.directories = 0;
    this.options.status = 0;
    this.options.menubar = 0;
    this.options.scrollbars = 0;
    this.options.resizable = 1;
    this.options.width = 800;
    this.options.height = 600;

    if( argOpts ) {
        $.extend( true, this.options, argOpts );
    }

    // top 이 지정되지 않았으면 센터
    if( !this.options.top ) {
        this.options.top = $( window ).height() / 2 - this.options.height / 2;
    }

    //left 이 지정되지 않았으면 센터
    if( !this.options.left ) {
        this.options.left = $( window ).width() / 2 - this.options.width / 2;
    }

    return this;

};
svc.ui.window.prototype.open = function( params ) {
    //최종옵션문자열 생성
    var strOptions = "";
    for( var key in this.options ) {
        if( this.options[key] != null ) {
            strOptions += key + "=" + this.options[key] + ",";
        }
    }
    // console.log( "strOptions", strOptions );
    strOptions = strOptions.substring( 0, strOptions.length - 1 );

    if( params ) {
        var form = document.createElement( "form" );
        form.setAttribute( "method", "post" );
        form.setAttribute( "action", this.url );
        form.setAttribute( "target", this.name );
        // console.log( 'form', form );
        for( var key in params ) {
            var input = document.createElement( "input" );
            input.type = "hidden";
            input.name = key;
            input.value = params[key];
            form.appendChild( input );
        }
        // console.log( 'form', form );
        document.body.appendChild( form );
        var rtnWin = new svc.ui.window( "about:blank", this.name, strOptions ).open();
        form.submit();
        document.body.removeChild( form );
        return rtnWin;
    } else {
        return window.open( this.url, this.name, strOptions );
    }

};


/*---------------------------------------
    combobox(select) 관련 함수
---------------------------------------*/

svc.ui.bindCombo = function( combo, listOptions, bTextOnly ) {

    //옵션추가전 기존설정된 옵션삭제
    $( combo ).find( "option" ).remove();

    // data-empty-text attr 이 존재한다면 빈값으로 추가한다.
    var emptyText = $( combo ).attr( "data-empty-text" );
    if( emptyText ) {
        $( combo ).append( "<option value=''>" + emptyText + "</option>" );
    }

    var selectedValue = $( combo ).attr( "data-selected-value" );
    //option 추가
    for( var i = 0; i < listOptions.length; i++ ) {
        var option = listOptions[i];
        var selected = ( selectedValue == option.cd ) ? "selected" : "";
        var selectText = ( bTextOnly == true ) ? option.cdNm : ( option.cdNm == null ) ? option.cd : option.cdNm;
        $( combo ).append( "<option value='" + option.cd + "' " + selected + "> " + selectText + "</option>" );
    }

    //선택된 옵션이 없고 emptyText 가 존재하면 emptyText 선택
    if( !selectedValue && emptyText ) {
        $( combo ).val( "" );
    }

    //data-hide-options attr 이 존재하면 해당 option remove
    var hideOptions = $( combo ).attr( "data-hide-options" );
    if( hideOptions ) {
        var hideValues = hideOptions.split( ',' );
        for( var i = 0; i < hideValues.length; i++ ) {
            $( combo ).find( "option[value='" + hideValues[i] + "']" ).remove();
        }
    }

};


/*######################################
    Date 관련함수
######################################*/

svc.flushYm = function( sDt ) {
    var rtnStr = '';
    try {
        switch( svc.language ) {
            case 'vi' :
                var strDt = sDt.forceNumber();
                if( strDt.length == 6 ) {
                    rtnStr = new svc.datetime( strDt.substring( 2, 6 ) + strDt.substring( 0, 2 ) + '00' ).getDate( 'yyyymm' );
                }
                break;
            case 'etc':
                break;
            default:
                rtnStr = sDt.forceNumber();
                break;
        }
    } catch(e) {
        // console.log( e );
    }
    return rtnStr;
};

svc.flushDate = function( sDt ) {
    var rtnStr = '';
    try {
        switch( svc.language ) {
            case 'vi' :
                var strDt = sDt.forceNumber();
                if( strDt.length == 8 ) {
                    rtnStr = new svc.datetime( strDt.substring( 4, 8 ) + strDt.substring( 2, 4 ) + strDt.substring( 0, 2 ) ).getDate( 'yyyymmdd' );
                }
                break;
            case 'etc':
                break;
            default:
                rtnStr = sDt.forceNumber();
                break;
        }
    } catch(e) {
        // console.log( e );
    }
    return rtnStr;
};
svc.flushDttm = function( sDt ) {
    var rtnStr = '';
    try {
        switch( svc.language ) {
            case 'vi' :
                var strDt = sDt.forceNumber();
                if( strDt.length == 14 ) {
                    rtnStr = new svc.datetime( strDt.substring( 4, 8 ) + strDt.substring( 2, 4 ) + strDt.substring( 0, 2 ) + strDt.substring( 8 ) ).getDate( 'yyyymmddhhmiss' );
                }
                break;
            case 'etc':
                break;
            default:
                rtnStr = sDt.forceNumber();
                break;
        }
    } catch(e) {
        // console.log( e );
    }
    return rtnStr;
};
svc.flushDttmms = function( sDt ) {
    var rtnStr = '';
    try {
        switch( svc.language ) {
            case 'vi' :
                var strDt = sDt.forceNumber();
                if( strDt.length == 17 ) {
                    rtnStr = new svc.datetime( strDt.substring( 4, 8 ) + strDt.substring( 2, 4 ) + strDt.substring( 0, 2 ) + strDt.substring( 8 ) ).getDate( 'yyyymmddhhmiss' );
                }
                break;
            case 'etc':
                break;
            default:
                rtnStr = sDt.forceNumber();
                break;
        }
    } catch(e) {
        // console.log( e );
    }
    return rtnStr;
};
svc.bindYm = function( strDt ) {
    var rtnStr = '';
    if( strDt.length >= 6 ) {
        rtnStr = new svc.datetime( strDt + '01' ).getDate( svc.dateFormat.inputMonth );
    }
    return rtnStr;
};
svc.bindDate = function( strDt ) {
    var rtnStr = '';
    if( strDt.length >= 8 ) {
        rtnStr = new svc.datetime( strDt ).getDate( svc.dateFormat.input );
    }
    return rtnStr;
};
svc.bindDttm = function( strDt ) {
    var rtnStr = '';
    if( strDt.length >= 8 ) {
        rtnStr = new svc.datetime( strDt ).getDate( svc.dateFormat.input + ' hh:mi:ss' );
    }
    return rtnStr;
};
svc.bindDttmms = function( strDt ) {
    var rtnStr = '';
    if( strDt.length >= 8 ) {
        rtnStr = new svc.datetime( strDt.substring( 0, 14 ) ).getDate( svc.dateFormat.input + ' hh:mi:ss ' + strDt.substring( 14, 17 ) );
    }
    return rtnStr;
};

svc.dateLocalString = function( language, sDt ) {
    var rtnStr = '';
    try {
        switch( language ) {
            case 'vi' :
                rtnStr = new svc.datetime( new Date( sDt ) ).getDate( 'yyyymmdd' );
                break;
            case 'etc':
                break;
            default:
                rtnStr = sDt.forceNumber();
                break;
        }
    } catch(e) {
        // console.log( e );
    }
    return rtnStr;
};

svc.datetime = function( oDate ) {

    this.date = null;
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
    this.isPm = false;  // 오루인지여부
    this.dayKor = "";
    this.dayEng = "";
    this.dayCnt = 0;
    this.arrDayCnt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    this.arrDayKor = ["일", "월", "화", "수", "목", "금", "토"];
    this.arrDayEng = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if( oDate ) {
        if( typeof ( oDate ) == 'date' ) {
            this.date = oDate;
        } else if( typeof ( oDate ) == 'string' ) {
            this.setDate( oDate );
        }
    } else {
        this.date = new Date();
    }

    this.setProperty();

    return this;

};
svc.datetime.prototype.setDate = function( sDate ) {

    var strDate = sDate.toUpperCase();

    var eraseChar = '-./: 년월일시분초월화수목금토일()TZD';
    for( var i = 0; i < eraseChar.length; i++ ) {
        strDate = strDate.replaceAll( eraseChar[i], '' );
    }

    if( strDate.indexOf( '오후' ) > -1 ) {
        this.isPm = true;
    }
    strDate = strDate.replaceAll( '오전', '' ).replaceAll( '오후', '' );

    if( strDate.indexOf( 'PM' ) > -1 ) {
        this.isPm = true;
    }
    strDate = strDate.replaceAll( 'AM', '' ).replaceAll( 'PM', '' ).forceNumber();

    if( strDate.length < 8 ) {
        return null;
    } else {
        this.year = strDate.substring( 0, 4 ).toNumber();
        this.month = strDate.substring( 4, 6 ).toNumber();
        this.day = strDate.substring( 6, 8 ).toNumber();
        this.hour = ( strDate.length >= 10 ) ? strDate.substring( 8, 10 ).toNumber() : 0;
        if( this.isPm ) {
            this.hour += 12;
        }
        this.minute = ( strDate.length >= 12 ) ? strDate.substring( 10, 12 ).toNumber() : 0;
        this.second = ( strDate.length >= 14 ) ? strDate.substring( 12, 14 ).toNumber() : 0;
        this.date = new Date( this.year, this.month - 1, this.day, this.hour, this.minute, this.second );
        this.setProperty();
        return this;
    }


};
svc.datetime.prototype.setProperty = function() {

    this.year = this.date.getFullYear();
    this.month = this.date.getMonth() + 1;
    this.day = this.date.getDate();
    this.hour = this.date.getHours();
    this.minute = this.date.getMinutes();
    this.second = this.date.getSeconds();

    if( ( this.year % 4 == 0 || this.year % 100 == 0 ) && ( this.year % 400 == 0 ) ) {
        this.arrDayCnt[1] = 29;
    } else {
        this.arrDayCnt[1] = 28;
    }

    this.dayCnt = this.arrDayCnt[this.mm - 1];

    this.dayKor = this.arrDayKor[this.date.getDay()];
    this.dayEng = this.arrDayEng[this.date.getDay()];

};
svc.datetime.prototype.getApm = function() {
    return ( this.hour < 12 ) ? "오전" : "오후";
};
svc.datetime.prototype.getApmEng = function() {
    return ( this.hour < 12 ) ? "AM" : "PM";
};
svc.datetime.prototype.after = function( years, months, dates, hours, miniutes, seconds, mss ) {
    if( years == undefined ) {
        years = 0;
    }
    if( months == undefined ) {
        months = 0;
    }
    if( dates == undefined ) {
        dates = 0;
    }
    if( hours == undefined ) {
        hours = 0;
    }
    if( miniutes == undefined ) {
        miniutes = 0;
    }
    if( seconds == undefined ) {
        seconds = 0;
    }
    if( mss == undefined ) {
        mss = 0;
    }
    this.date = this.date.after( years, months, dates, hours, miniutes, seconds, mss );
    this.setProperty();
    return this;
};
svc.datetime.prototype.before = function( years, months, dates, hours, miniutes, seconds, mss ) {
    if( years == undefined ) {
        years = 0;
    }
    if( months == undefined ) {
        months = 0;
    }
    if( dates == undefined ) {
        dates = 0;
    }
    if( hours == undefined ) {
        hours = 0;
    }
    if( miniutes == undefined ) {
        miniutes = 0;
    }
    if( seconds == undefined ) {
        seconds = 0;
    }
    if( mss == undefined ) {
        mss = 0;
    }
    this.date = this.date.before( years, months, dates, hours, miniutes, seconds, mss );
    this.setProperty();
    return this;
};
svc.datetime.prototype.getDate = function( dateFormat ) {
    var rtnDate = dateFormat;

    if( rtnDate.indexOf( 'yyyy' ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'yyyy', this.year );
    }

    if( rtnDate.indexOf( 'yy' ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'yy', this.year.toString().right( 2 ) );
    }

    if( rtnDate.indexOf( "mmN" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'mmN', this.month );
    }

    if( rtnDate.indexOf( "mm" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'mm', this.month.toString().lpad( '0', 2 ) );
    }

    if( rtnDate.indexOf( "ddN" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'ddN', this.day );
    }

    if( rtnDate.indexOf( "dd" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'dd', this.day.toString().lpad( '0', 2 ) );
    }

    if( rtnDate.indexOf( "hhN" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'hhN', this.hour );
    }

    if( rtnDate.indexOf( "hh" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'hh', this.hour.toString().lpad( '0', 2 ) );
    }

    if( rtnDate.indexOf( "miN" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'miN', this.minute );
    }

    if( rtnDate.indexOf( "mi" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'mi', this.minute.toString().lpad( '0', 2 ) );
    }

    if( rtnDate.indexOf( "ssN" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'ssN', this.second );
    }

    if( rtnDate.indexOf( "ss" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'ss', this.second.toString().lpad( '0', 2 ) );
    }

    if( rtnDate.indexOf( "eday" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'eday', this.arrDayCnt[this.month - 1] );
    }

    if( rtnDate.indexOf( "kday" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'kday', this.dayKor );
    }

    if( rtnDate.indexOf( "day" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'day', this.dayEng );
    }

    if( rtnDate.indexOf( "kampm" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'kampm', this.getApm() );
    }

    if( rtnDate.indexOf( "ampm" ) > -1 ) {
        rtnDate = rtnDate.replaceAll( 'ampm', this.getApmEng() );
    }

    return rtnDate;
};


/*######################################
    svc.form
######################################*/
svc.form.data = {
    primary : {},    // 현재 사용하는 값 저장
    original: {}    // 최초 값 저장
};
svc.form.applyElementFormat = function( panelId, refElem, sFormat ) {
    switch( sFormat ) {
        case "rate":
            refElem.css( { "text-align": "right" } );
            refElem.blur( function() {
                refElem.val( refElem.val().formatDecimal( 2 ) );
            } );
            break;
        case "money":
        case "number":
            refElem.css( { "text-align": "right" } );
            refElem.keyup( function() {
                refElem.val( refElem.val().formatNumber() );
            } );
            break;
        case "no":
            refElem.keyup( function() {
                refElem.val( refElem.val().forceNumber() );
            } ).blur( function() {
                refElem.val( refElem.val().forceNumber() );
            } );
            break;
        case "tel_no":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatTelNo() );
            } ).blur( function() {
                refElem.val( refElem.val().formatTelNo() );
            } );
            break;
        case "biz_no":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatBizNo() );
            } ).blur( function() {
                refElem.val( refElem.val().formatBizNo() );
            } );
            break;
        case "zip_no":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatZipNo() );
            } ).blur( function() {
                refElem.val( refElem.val().formatZipNo() );
            } );
            break;
        case "card_no":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatCardNo() );
            } ).blur( function() {
                refElem.val( refElem.val().formatCardNo() );
            } );
            break;
        case 'ym' : // 월선택
            refElem.css( { 'text-align': 'center' } );
            refElem.keyup( function() {
                refElem.val( refElem.val().formatYm() );
            } ).blur( function() {
                refElem.val( refElem.val().formatYm() );
            } );
            var options = {
                Button    : '<img class="icon" src="' + imagePath + '/ksid/ico_cal.png" style="margin-left:3px;cursor:pointer" title="' + refElem.attr( 'title' ) + '" alt="" />'
                , MinMonth: -10000
                , MaxMonth: 10000
            };
            if( svc.language == 'en' ) {
                options.i18n = {
                    year       : 'Year',
                    prevYear   : 'Previous Year',
                    nextYear   : 'Next Year',
                    next12Years: 'Jump Forward 12 Years',
                    prev12Years: 'Jump Back 12 Years',
                    nextLabel  : 'Next',
                    prevLabel  : 'Prev',
                    buttonText : 'Open Month Chooser',
                    jumpYears  : 'Jump Years',
                    backTo     : 'Back to',
                    months     : ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
                };
            } else if( svc.language == 'ko' ) {
                options.i18n = {
                    year       : '년도-',
                    prevYear   : '이전 년도',
                    nextYear   : '다음 년도',
                    next12Years: '다음 12 년으로 이동',
                    prev12Years: '이전 12 년으로 이동',
                    nextLabel  : '이전',
                    prevLabel  : '다음',
                    buttonText : '월 선택창 열기',
                    jumpYears  : '년도 이동',
                    backTo     : '뒤로 가기',
                    months     : ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
                };
            } else if( svc.language == 'vi' ) {
                options.i18n = {
                    year       : 'Year',
                    prevYear   : 'Previous Year',
                    nextYear   : 'Next Year',
                    next12Years: 'Jump Forward 12 Years',
                    prev12Years: 'Jump Back 12 Years',
                    nextLabel  : 'Next',
                    prevLabel  : 'Prev',
                    buttonText : 'Open Month Chooser',
                    jumpYears  : 'Jump Years',
                    backTo     : 'Back to',
                    months     : ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
                };
            }
            options.MonthFormat = svc.dateFormat.pickerMonth;
            refElem.MonthPicker( options );
            break;
        case "date":
            var applyFieldOptionClickDate;
            refElem.click( function() {
                applyFieldOptionClickDate = $( this ).val();
            } );
            var datepickerProp = {
                showOn         : "both",
                buttonImage    : imagePath + "/ksid/ico_cal.png",
                buttonImageOnly: true,
                changeYear     : true,
                changeMonth    : true,
                yearRange      : 'c-100:c+10',
                minDate        : '-100y',
                showAnim       : "fadeIn",
                dateFormat     : svc.dateFormat.picker,  //"yy-mm-dd",
                onSelect       : function() {refElem.change();},
                buttonText     : refElem.attr( 'title' )
            };
            if( typeof ( $( this ).attr( "dateFormat" ) ) != "undefined" ) {
                datepickerProp.dateFormat = $( this ).attr( "dateFormat" );
            }
            if( refElem.attr( "disabled" ) == "disabled" ) {
                datepickerProp.disabled = true;
            }
            //                $.datepicker.setDefaults($.datepicker.regional[ksid.language]);
            $.datepicker.setDefaults( $.datepicker.regional['ko'] );
            refElem.css( { "text-align": "center", "width": "80px" } ).attr( "readonly", false ).datepicker( datepickerProp ).blur( function() {
                var lsDate = refElem.val().toString().formatDate();
                //                    if(isNaN(Date.parse(lsDate)) == true || lsDate.length != 10) {
                if( lsDate.length != 10 ) {
                    if( lsDate == "" ) {
                    } else {
                        if( applyFieldOptionClickDate.length != 10 ) {
                            refElem.val( "" );
                        } else {
                            refElem.val( applyFieldOptionClickDate ).focus().select();
                        }

                    }
                } else {
                    refElem.val( lsDate ).change();
                }
            } );
            $( this ).attr( "title", $( this ).datepicker( "option", "buttonText" ) );
            refElem.change( function() {
                $( this ).attr( "title", $( this ).datepicker( "option", "buttonText" ) );
                svc.form.nextElement( panelId, this );
            } );
            break;
        case "time":
            var timepickerProp = {
                dateFormat      : 'yy-mm-dd'
                , timeFormat    : 'HH:mm:ss'
                , showTimePicker: true
                , showSecond    : true
                , showMillisec  : false
                , showMicrosec  : false
                , showTimezone  : false
            };
            refElem.css( { 'text-align': 'center' } );
            refElem.timepicker( timepickerProp );
            break;
        case "ym":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatYm() );
            } ).blur( function() {
                refElem.val( refElem.val().formatYm() );
            } );
            break;
        case "dttm10":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatDttm10() );
            } ).blur( function() {
                refElem.val( refElem.val().formatDttm10() );
            } );
            break;
        case "dttm12":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatDttm12() );
            } ).blur( function() {
                refElem.val( refElem.val().formatDttm12() );
            } );
            break;
        case "dttm14":
            refElem.keyup( function() {
                refElem.val( refElem.val().formatDttm14() );
            } ).blur( function() {
                refElem.val( refElem.val().formatDttm14() );
            } );
            break;
        default:
            break;
    }
};

// next element function
svc.form.nextElement = function( panelId, elem ) {

    if( $( elem ).attr( "data-next" ) ) {
        var nextElem = $( '#' + panelId + " *[name=" + $( elem ).attr( "data-next" ) + "]" );
        var i = 0;
        while( ( typeof ( nextElem.attr( "disabled" ) ) != "undefined" || typeof ( nextElem.attr( "readonly" ) ) != "undefined" || nextElem.attr( "" ) == true ) && i < 10 ) {
            nextElem = $( '#' + panelId + " *[name=" + nextElem.attr( "data-next" ) + "]" );
            i++;
        }
        nextElem.focus();
    }

};


/*######################################
    svc.net
######################################*/

svc.net.ajax = function( options, successFunc ) {

    var ajaxOptions = {};
    ajaxOptions.url = null;
    ajaxOptions.type = 'POST';
    ajaxOptions.dataType = 'json';
    ajaxOptions.data = {};
    ajaxOptions.beforeSend = function( xmlHttpRequest ) {
        xmlHttpRequest.setRequestHeader( "AJAX", "true" ); // ajax 호출을  header에 기록
    };
    ajaxOptions.success = function( result ) {
        if( typeof ( successFunc ) == 'function' ) {
            successFunc( result );
        }
    };
    ajaxOptions.error = function( x, e ) {
        svc.net.alertErrorStatus( x.status, e );
    };

    $.extend( true, ajaxOptions, options );

    if( ajaxOptions.url == null ) {
        svc.ui.alert( 'svc.net.ajax call does not have url in options.' );
        return;
    }

    $.ajax( ajaxOptions );

};
svc.net.sjaxCall = function( url, params, callback, options ) {
    if( !options ) {
        options = {};
    }
    var ajaxOptions = $.extend( true, {
        url    : url
        , data : params
        , async: false
    }, options );
    svc.net.ajax( ajaxOptions, function( result ) {
        if( callback ) {
            callback( result );
        }
    } );
};
svc.net.ajaxCall = function( url, params, callback, options ) {
    if( !options ) {
        options = {};
    }
    var ajaxOptions = $.extend( true, {
        url   : url
        , data: params
    }, options );

    svc.net.ajax( ajaxOptions, function( result ) {
        // console.log( "result", result );
        if( result.resultCd == "99" ) {
            // svc.ui.alert(result.resultData);
        }
        if( callback ) {
            callback( result );
        }
    } );
};
svc.net.ajaxList = function( url, params, callback ) {
    svc.net.ajax( {
        url          : url
        , data       : JSON.stringify( params )
        , contentType: "application/json; charset=UTF-8"
    }, function( result ) {
        if( callback ) {
            callback( result );
        }
    } );
};
svc.net.ajaxJqGrid = function( jqGrid, url, params, callback ) {

    // console.log( 'svc.net.ajaxJqGrid', jqGrid, url, params );

    jqGrid.initGridData();

    jqGrid.showLoading();

    svc.net.ajaxCall( url, params, function( result ) {

        jqGrid.hideLoading();

        // console.log( 'ajaxJqGrid > result', result );

        if( result.resultCd == "00" ) {

            jqGrid.bindGrid( result.resultData );

            if( typeof ( callback ) == 'function' ) {
                callback( result );
            }

        } else {
            svc.ui.alert( '조회 중 오류가 발생했습니다.<br/>' + result.resultMsg );
        }

    } );
    jqGrid.hideLoading();
};
svc.net.ajaxCombo = function( combo, url, params, callback ) {
    svc.net.sjaxCall( url, params, function( result ) {
        if( result.resultCd == "00" ) {
            svc.ui.bindCombo( combo, result.resultData );
            if( callback ) {
                callback( result );
            }
        }
    } );
};

svc.net.getExcelFileNm = function( fileNm ) {
    var dttm = new svc.datetime().getDate( 'yyyymmddhhmiss' );
    return fileNm + '_' + dttm;
};

svc.net.getExcelGroupHeader = function( oGrid ) {
    var groupHeadersOptions = $( "#" + oGrid.id + "" ).jqGrid( "getGridParam", "groupHeader" );
    var excelGroupHeader = null;

    if( groupHeadersOptions != null ) {
        excelGroupHeader = [];
        var arrGridModel = oGrid.getExcelColModel();
        for( var i = 0; i < groupHeadersOptions.groupHeaders.length; i++ ) {
            for( var j = 0; j < arrGridModel.length; j++ ) {
                if( groupHeadersOptions.groupHeaders[i].startColumnName == arrGridModel[j].name ) {
                    excelGroupHeader.push( [0, 0, j, j + groupHeadersOptions.groupHeaders[i].numberOfColumns - 1, groupHeadersOptions.groupHeaders[i].titleText] );
                }
            }
        }
    }

    return excelGroupHeader;
};

svc.net.ajaxExcel = function( url, fileNm, params, oGrid ) {

    if( !svc.util.checkParams( { url: url, fileNm: fileNm, params: params } ) ) {
        return;
    }

    var excelGroupHeader = svc.net.getExcelGroupHeader( oGrid );

    var excelParams = {};
    excelParams.fileNm = svc.net.getExcelFileNm( fileNm );
    excelParams.param = params;
    excelParams.colModel = oGrid.getExcelColModel();
    if( excelGroupHeader != null ) {
        excelParams.groupHeader = JSON.stringify( excelGroupHeader );
    }

    svc.ui.confirm( '(0) 파일을 다운로드 하시겠습니까?'.replaceAll( '(0)', fileNm ), function() {
        $( "#form_excel" ).attr( "action", url );
        $( "#form_excel input[name=params]" ).val( encodeURIComponent( JSON.stringify( excelParams ) ) );
        $( "#form_excel" ).submit();
    }, function() {
        svc.ui.alert( '취소되었습니다.' );
    } );

};

svc.net.ajaxExcelGrid = function( url, fileNm, oGrid ) {

    if( !svc.util.checkParams( { url: url, fileNm: fileNm } ) ) {
        return;
    }

    var excelGroupHeader = svc.net.getExcelGroupHeader( oGrid );

    var data = ( oGrid.rows == null ) ? [] : $.extend( true, [], oGrid.rows );
    //        // console.log('data', data);

    var excelModel = oGrid.getExcelColModel();

    // 하단 합계가 존재할 경우
    if( oGrid.prop.footerrow == true ) {

        var footerData = {};

        $( "#gview_" + oGrid.id ).find( ".ui-jqgrid-ftable td" ).each( function() {
            var colName = $( this ).attr( 'aria-describedby' ).replaceAll( oGrid.id + '_', '' );
            var colValue = $( this ).text().replaceAll( '&nbsp;', '' );
            if( colValue != "합계" && colValue != '' ) {
                try {
                    colValue = colValue.toString().toNumber();
                } catch(e) {
                }
            }
            for( var i = 0; i < excelModel.length; i++ ) {
                if( excelModel[i].name == colName ) {
                    footerData[colName] = colValue;
                }
            }
        } );

        data.unshift( footerData );
    }

    var excelParams = {};
    excelParams.fileNm = svc.net.getExcelFileNm( fileNm );
    excelParams.colModel = excelModel;
    excelParams.data = data;
    if( excelGroupHeader != null ) {
        excelParams.groupHeader = JSON.stringify( excelGroupHeader );
    }

    svc.ui.confirm( '(0) 파일을 다운로드 하시겠습니까?'.replaceAll( '(0)', fileNm ), function() {

        $( "#form_excel" ).attr( "action", url );
        $( "#form_excel input[name=params]" ).val( encodeURIComponent( JSON.stringify( excelParams ) ) );
        $( "#form_excel" ).submit();

    }, function() {
        svc.ui.alert( '취소되었습니다.' );
    } );

};

svc.net.alertErrorStatus = function( status, e ) {
    if( status == 0 ) {
        svc.ui.alert( 'You are offline!!\n Please Check Your Network.' );
    } else if( status == 404 ) {
        svc.ui.alert( 'Requested URL not found.' );
    } else if( status == 500 ) {
        svc.ui.alert( 'Internel Server Error.' );
    } else if( status == 600 ) {
        svc.ui.alert( 'Session Error.' );
    } else if( e == 'parsererror' ) {
        svc.ui.alert( 'Error.\nParsing JSON Request failed.' );
    } else if( e == 'timeout' ) {
        svc.ui.alert( 'Request Time out.' );
    } else {
        svc.ui.alert( 'Transfer Error.' );
    }
};


/*######################################
    Etc Function
######################################*/

svc.util.checkParams = function( params ) {
    var rtnVal = true;
    for( var key in params ) {
        if( typeof ( params[key] ) == 'undefined' ) {
            svc.ui.alert( key + ' is undefined' );
            rtnVal = false;
            break;
        }
    }
    return rtnVal;
};
svc.util.clone = function( obj ) {
    return JSON.parse( JSON.stringify( obj ) );
};

svc.isMobile = function() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test( navigator.userAgent );
};
svc.isBlank = function( obj ) {
    return ( !obj || $.trim( obj ) === "" );
};
svc.isEmpty = function( obj ) {
    return ( !obj || undefined === obj || null === obj );
};
svc.isNotBlank = function( obj ) {
    return ( !obj || $.trim( obj ) === "" ) ? false : true;
};
svc.isNotEmpty = function( obj ) {
    return ( !obj || undefined === obj || null === obj ) ? false : true;
};


/*######################################
    Javascript Prototype Extention
######################################*/

//-- Number --

Number.prototype.read = function() {
    if( this == 0 ) {
        return '영';
    }
    var phonemic = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    var unit = ['', '', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조'];

    var ret = '';
    var part = [];
    for( var x = 0; x < String( this ).length; x++ ) part[x] = String( this ).substring( x, x + 1 );
    for( var i = 0, cnt = String( this ).length; cnt > 0; --cnt, ++i ) {
        p = phonemic[part[i]];
        p += ( p ) ? ( cnt > 4 && phonemic[part[i + 1]] ) ? unit[cnt].substring( 0, 1 ) : unit[cnt] : '';
        ret += p;
    }
    return ret;
};

//-- String --

String.prototype.nvl = function( initVal ) {
    if( this.length == 0 ) {
        return initVal;
    } else {
        return this;
    }
};

String.prototype.left = function( size ) {
    if( this.length < size ) {
        return this;
    } else {
        return this.substring( 0, size );
    }
};
String.prototype.right = function( size ) {
    if( this.length < size ) {
        return this;
    } else {
        return this.substring( this.length - size );
    }
};

String.prototype.ltrim = function( str ) {
    var rtnStr = this.replace( /^\s+/g, '' );
    if( str ) {
        while( rtnStr.left( str.length ) == str ) {
            if( rtnStr.length < str.length || rtnStr.left( str.length ) != str ) {
                break;
            }
            rtnStr = rtnStr.substring( str.length );
        }
    }
    return rtnStr.replace( /^\s+/g, '' );
};
String.prototype.rtrim = function( str ) {
    var rtnStr = this.replace( /\s+$/g, '' );
    if( str ) {
        while( rtnStr.right( str.length ) == str ) {
            if( rtnStr.length < str.length || rtnStr.right( str.length ) != str ) {
                break;
            }
            rtnStr = rtnStr.substring( 0, rtnStr.length - str.length );
        }
    }
    return rtnStr.replace( /\s+$/g, '' );
};
String.prototype.trim = function( str ) {
    return this.ltrim( str ).rtrim( str );
};

String.prototype.lpad = function( size, fillStr ) {
    if( typeof ( size ) == 'string' ) {
        return this.lpad( fillStr, size );
    }
    if( !fillStr ) {
        fillStr = ' ';
    }
    var rtnStr = this.trim();
    while( rtnStr.length < size ) {
        rtnStr = fillStr + rtnStr;
    }
    return rtnStr;
};
String.prototype.rpad = function( size, fillStr ) {
    if( typeof ( size ) == 'string' ) {
        return this.lpad( fillStr, size );
    }
    if( !fillStr ) {
        fillStr = ' ';
    }
    var rtnStr = this.trim();
    while( rtnStr.length < size ) {
        rtnStr = rtnStr + fillStr;
    }
    return rtnStr;
};
String.prototype.replaceAll = function( str, rStr ) {
    return this.split( str ).join( rStr );
};
String.prototype.forceNumber = function() {
    return this.replace( /[^0-9]/g, '' );
};
String.prototype.forceDecimal = function() {
    return this.replace( /[^0-9\.]/g, '' );
};
String.prototype.forceInt = function() {
    var str = this;
    if( str.indexOf( '.' ) > -1 ) {
        str = str.substring( 0, str.indexOf( '.' ) );
    }
    str = ( str.forceNumber() == '' || str.forceNumber() == '0' ) ? '0' : str.forceNumber().ltrim( '0' );
    return str;
};
String.prototype.toNumber = function() {
    return Number( this.forceInt() );
};
String.prototype.toDecimal = function( digit ) {
    if( !digit ) {
        digit = 2;
    }
    return Number( Number( this.forceDecimal() ).toFixed( digit ) );
};
String.prototype.formatTelNo = function( separator ) {
    if( !separator ) {
        separator = '-';
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length > 12 ) {
        rtnStr = rtnStr.left( 12 );
    }
    if( rtnStr.length >= 9 ) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1" + separator + "$2" + separator + "$3");
    } else if( rtnStr.length > 5 ) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]{3,4})([0-9]*)/, "$1" + separator + "$2" + separator + "$3");
    } else if( rtnStr.length > 3 ) {
        rtnStr = rtnStr.replace(/(^02.{0}|^0.{2}|[0-9]{3})([0-9]*)/, "$1" + separator + "$2");
    }
    return rtnStr.rtrim( separator );
};
String.prototype.formatBizNo = function( separator ) {
    if( !separator ) {
        separator = '-';
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length > 10 ) {
        rtnStr = rtnStr.left( 10 );
    }
    if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 3 ) + separator + rtnStr.substring( 3, 5 ) + separator + rtnStr.substring( 5, 10 );
    } else if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 3 ) + separator + rtnStr.substring( 3, 5 ) + separator + rtnStr.substring( 5 );
    } else if( rtnStr.length > 3 ) {
        rtnStr = rtnStr.substring( 0, 3 ) + separator + rtnStr.substring( 3 );
    }
    return rtnStr.rtrim( separator );
};
String.prototype.formatCardNo = function( separator ) {
    if( !separator ) {
        separator = '-';
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length > 20 ) {
        rtnStr = rtnStr.left( 20 );
    }
    if( rtnStr.length >= 17 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separator + rtnStr.substring( 4, 8 ) + separator + rtnStr.substring( 8, 12 ) + separator + rtnStr.substring( 12, 16 ) + separator + rtnStr.substring( 16 );
    } else if( rtnStr.length >= 13 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separator + rtnStr.substring( 4, 8 ) + separator + rtnStr.substring( 8, 12 ) + separator + rtnStr.substring( 12 );
    } else if( rtnStr.length >= 9 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separator + rtnStr.substring( 4, 8 ) + separator + rtnStr.substring( 8 );
    } else if( rtnStr.length >= 5 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separator + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separator );
};
String.prototype.formatZipNo = function( separator ) {
    if( !separator ) {
        separator = '-';
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length > 6 ) {
        rtnStr = rtnStr.left( 6 );
    }
    if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 3 ) + separator + rtnStr.substring( 3, 6 );
    } else if( rtnStr.length > 3 ) {
        rtnStr = rtnStr.substring( 0, 3 ) + separator + rtnStr.substring( 3 );
    }
    return rtnStr.rtrim( separator );
};
String.prototype.formatYm = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatYmUs( separatorDate );
            break;
        case 'etc':
            break;
        default :
            rtnStr = this.formatYmKo( separatorDate );
            break;
    }
    return rtnStr;
};
String.prototype.formatYmKo = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 6 ) {
        rtnStr = rtnStr.left( 6 );
    }
    if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 );
    } else if( rtnStr.length > 3 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatYmUs = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 6 ) {
        rtnStr = rtnStr.left( 6 );
    }
    if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 6 );
    } else if( rtnStr.length > 3 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatDate = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatDateUs( separatorDate );
            break;
        case 'etc':
            break;
        default :
            rtnStr = this.formatDateKo( separatorDate );
            break;
    }
    return rtnStr;
};
String.prototype.formatDateKo = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 8 ) {
        rtnStr = rtnStr.left( 8 );
    }
    if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 );
    } else if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatDateUs = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 8 ) {
        rtnStr = rtnStr.left( 8 );
    }
    if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 );
    } else if( rtnStr.length >= 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatTime = function( separatorTime ) {
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 6 ) {
        rtnStr = rtnStr.left( 6 );
    }
    if( rtnStr.length >= 6 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorTime + rtnStr.substring( 2, 4 ) + separatorTime + rtnStr.substring( 4, 6 );
    } else if( rtnStr.length >= 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorTime + rtnStr.substring( 2, 4 ) + separatorTime + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorTime + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorTime );
};
String.prototype.formatDttm10 = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatDttm10Us( separatorDate );
            break;
        case 'etc':
            break;
        default :
            rtnStr = this.formatDttm10Ko( separatorDate );
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm10Ko = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 10 ) {
        rtnStr = rtnStr.left( 10 );
    }
    if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatDttm10Us = function( separatorDate ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 10 ) {
        rtnStr = rtnStr.left( 10 );
    }
    if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length >= 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate );
};
String.prototype.formatDttm12 = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatDttm12Us( separatorDate, separatorTime );
            break;
        case 'etc':
            break;
        default :
            rtnStr = this.formatDttm12Ko( separatorDate, separatorTime );
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm12Ko = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 12 ) {
        rtnStr = rtnStr.left( 12 );
    }
    if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDttm12Us = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 12 ) {
        rtnStr = rtnStr.left( 12 );
    }
    if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length >= 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDttm = function( separatorDate, separatorTime ) {
    return this.formatDttm14( separatorDate, separatorTime );
};
String.prototype.formatDttm14 = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatDttm14Us( separatorDate, separatorTime );
            break;
        case 'etc':
            break;
        default :
            rtnStr = this.formatDttm14Ko( separatorDate, separatorTime );
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm14Ko = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 14 ) {
        rtnStr = rtnStr.left( 14 );
    }
    if( rtnStr.length >= 14 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 );
    } else if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDttm14Us = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 14 ) {
        rtnStr = rtnStr.left( 14 );
    }
    if( rtnStr.length >= 14 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 );
    } else if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDttm17 = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = '';
    switch( svc.language ) {
        case 'vi':
            rtnStr = this.formatDttm17Us( separatorDate, separatorTime );
            break;
        default :
            rtnStr = this.formatDttm17Ko( separatorDate, separatorTime );
            break;
    }
    return rtnStr;
};
String.prototype.formatDttm17Ko = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 17 ) {
        rtnStr = rtnStr.left( 17 );
    }
    if( rtnStr.length >= 17 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 ) + ' ' + +separatorTime + rtnStr.substring( 14, 17 );
    } else if( rtnStr.length >= 14 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 );
    } else if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 6 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4, 6 ) + separatorDate + rtnStr.substring( 6 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 4 ) + separatorDate + rtnStr.substring( 4 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDttm17Us = function( separatorDate, separatorTime ) {
    if( !separatorDate ) {
        separatorDate = svc.dateFormat.dateDiv;
    }
    if( !separatorTime ) {
        separatorTime = svc.dateFormat.timeDiv;
    }
    var rtnStr = this.forceNumber();
    if( rtnStr.length < 17 ) {
        rtnStr = rtnStr.left( 17 );
    }
    if( rtnStr.length >= 17 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 ) + ' ' + +separatorTime + rtnStr.substring( 14, 17 );
    } else if( rtnStr.length >= 14 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12, 14 );
    } else if( rtnStr.length >= 12 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10, 12 ) + separatorTime + rtnStr.substring( 12 );
    } else if( rtnStr.length >= 10 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8, 10 ) + separatorTime + rtnStr.substring( 10 );
    } else if( rtnStr.length >= 8 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4, 8 ) + ' ' + rtnStr.substring( 8 );
    } else if( rtnStr.length > 4 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2, 4 ) + separatorDate + rtnStr.substring( 4 );
    } else if( rtnStr.length > 2 ) {
        rtnStr = rtnStr.substring( 0, 2 ) + separatorDate + rtnStr.substring( 2 );
    }
    return rtnStr.rtrim( separatorDate ).rtrim( separatorTime );
};
String.prototype.formatDateLocale = function( separator ) {
    var rtnStr;
    if( this.length < 8 ) {
        return this;
    }
    if( !separator ) {
        separator = '-';
    }
    var sFormat = "yyyy/mm/dd";
    switch( country ) {
        case 'KR' :
            sFormat = 'yyyy/mm/dd';
            break;
        case 'US' :
            sFormat = 'mm/dd/yyyy';
            break;
        default :
            sFormat = 'mm/dd/yyyy';
    }
    sFormat = sFormat.replaceAll( '/', separator );
    try {
        rtnStr = new svc.datetime( this ).getDate( sFormat );
    } catch(e) {
        rtnStr = this
    }
    return rtnStr;
};
String.prototype.formatDttmLocale = function( separatorDate, seperatorTime ) {
    var rtnStr;
    if( this.length < 14 ) {
        return this;
    }
    if( !separatorDate ) {
        separatorDate = '-';
    }
    if( !seperatorTime ) {
        seperatorTime = ':';
    }
    var sFormat = "yyyy/mm/dd hh:mi:ss";
    switch( country ) {
        case 'KR' :
            sFormat = 'yyyy/mm/dd hh:mi:ss';
            break;
        case 'US' :
            sFormat = 'mm/dd/yyyy hh:mi:ss';
            break;
        default :
            sFormat = 'mm/dd/yyyy hh:mi:ss';
    }
    sFormat = sFormat.replaceAll( '/', separatorDate ).replaceAll( ':', seperatorTime );
    try {
        rtnStr = new svc.datetime( this ).getDate( sFormat );
    } catch(e) {
        rtnStr = this
    }
    return rtnStr;
};
String.prototype.formatNumber = function() {
    try {
        return this.forceInt().replace( /\B(?=(\d{3})+(?!\d))/g, "," );
    } catch(e) {
        // console.log( e );
        return 0;
    }
};
String.prototype.formatDecimal = function( digit ) {
    if( !digit ) {
        digit = 2;
    }
    try {
        var rtnStr = this.toDecimal( digit ).toString();
        if( rtnStr.indexOf( '.' ) > -1 ) {
            var arrStr = rtnStr.split( '.' );
            return arrStr[0].formatNumber() + '.' + ( ( arrStr[1].length >= digit ) ? arrStr[1].right( digit ) : arrStr[1].rpad( digit, '0' ) );
        } else {
            return rtnStr.formatNumber() + '.' + '0'.rpad( digit, '0' );
        }
    } catch(e) {
        // console.log( e );
        return '0.' + '0'.rpad( digit, '0' );
    }
};
String.prototype.htmlEnc = function() {
    return this.replaceAll( '<', '＜' ).replaceAll( '>', '＞' ).replaceAll( "'", '′' ).replaceAll( '"', '″' );
};
String.prototype.htmlDec = function() {
    return this.replaceAll( '＜', '<' ).replaceAll( '＞', '>' ).replaceAll( '′', "'" ).replaceAll( '″', '"' );
};
String.prototype.formatBitUnit = function() {
    var returnStr = "";

    var size = this.toNumber();

    if( size < 1024 ) {
        returnStr = size + " Bytes";
    } else {
        size /= 1024;
        if( size < 1024 ) {
            returnStr = size.toNumberFixed( 2 ) + " KB";
        } else {
            size /= 1024;
            if( size < 1024 ) {
                returnStr = size.toNumberFixed( 2 ) + " MB";
            } else {
                size /= 1024;
                returnStr = size.toNumberFixed( 2 ) + " GB";
            }
        }
    }

    return returnStr;
};

//-- Array --

Array.prototype.sortBy = function() {
    function _sortByAttr( attr ) {
        var sortOrder = 1;
        if( attr[0] == "-" ) {
            sortOrder = -1;
            attr = attr.substr( 1 );
        }
        return function( a, b ) {
            var result = ( a[attr] < b[attr] ) ? -1 : ( a[attr] > b[attr] ) ? 1 : 0;
            return result * sortOrder;
        }
    }

    function _getSortFunc() {
        if( arguments.length == 0 ) {
            throw "Zero length arguments not allowed for Array.sortBy()";
        }
        var args = arguments;
        return function( a, b ) {
            for( var result = 0, i = 0; result == 0 && i < args.length; i++ ) {
                result = _sortByAttr( args[i] )( a, b );
            }
            return result;
        }
    }

    return this.sort( _getSortFunc.apply( null, arguments ) );
};


//-- Date --

Date.prototype.after = function( years, months, dates, hours, minutes, seconds, mss ) {
    if( years == undefined ) {
        years = 0;
    }
    if( months == undefined ) {
        months = 0;
    }
    if( dates == undefined ) {
        dates = 0;
    }
    if( hours == undefined ) {
        hours = 0;
    }
    if( minutes == undefined ) {
        minutes = 0;
    }
    if( seconds == undefined ) {
        seconds = 0;
    }
    if( mss == undefined ) {
        mss = 0;
    }
    return new Date( this.getFullYear() + years
        , this.getMonth() + months
        , this.getDate() + dates
        , this.getHours() + hours
        , this.getMinutes() + minutes
        , this.getSeconds() + seconds
        , this.getMilliseconds() + mss );
};
Date.prototype.before = function( years, months, dates, hours, minutes, seconds, mss ) {
    if( years == undefined ) {
        years = 0;
    }
    if( months == undefined ) {
        months = 0;
    }
    if( dates == undefined ) {
        dates = 0;
    }
    if( hours == undefined ) {
        hours = 0;
    }
    if( minutes == undefined ) {
        minutes = 0;
    }
    if( seconds == undefined ) {
        seconds = 0;
    }
    if( mss == undefined ) {
        mss = 0;
    }
    return new Date( this.getFullYear() - years
        , this.getMonth() - months
        , this.getDate() - dates
        , this.getHours() - hours
        , this.getMinutes() - minutes
        , this.getSeconds() - seconds
        , this.getMilliseconds() - mss );
};


/*######################################
    Jquery Function Extention
######################################*/

( function( $ ) {

    $.fn.svcDialog = function( prop ) {
        $( this ).dialog( prop );
        $( this ).parent( '.ui-dialog' ).css( {
            'border'    : '2px solid #444',
            'box-shadow': '6px 6px 10px rgba(0,0,0,0.8)'
        } );
    };

    $.fn.timeFocus = function( ms ) {
        var _ref = this;
        setTimeout( function() {
            $( _ref ).focus();
        }, ms );
    };

    // -- panel data flush --
    $.fn.flushPanel = function() {

        // var panelId = $(this).attr('id');
        var rtnJson = {};

        $( this ).find( 'input, select, textarea, span, th, td' ).each( function() {

            if( $( this ).attr( "name" ) ) {
                switch( $( this ).prop( "tagName" ).toLowerCase() ) {
                    case 'input':
                        switch( $( this ).attr( "type" ).toLowerCase() ) {
                            case 'button':
                                break;
                            case 'radio':
                                if( $( this ).is( ":checked" ) ) {
                                    rtnJson[$( this ).attr( "name" )] = $( this ).val();
                                } else {
                                    if( !rtnJson[$( this ).attr( "name" )] ) {
                                        rtnJson[$( this ).attr( "name" )] = "";
                                    }
                                }
                                break;
                            case "checkbox":
                                if( $( this ).is( ":checked" ) ) {
                                    if( rtnJson.hasOwnProperty( $( this ).attr( "name" ) ) ) {
                                        if( rtnJson[$( this ).attr( "name" )] != "" ) {
                                            rtnJson[$( this ).attr( "name" )] += ",";
                                        }
                                        rtnJson[$( this ).attr( "name" )] += $( this ).val();
                                    } else {
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val();
                                    }
                                } else {
                                    // 단일 혹은 그룹체크에서 모두 체크가 안되었을경우 jsonData 에 항목이 누락되는걸 방지하기 위
                                    if( !rtnJson[$( this ).attr( "name" )] ) {
                                        rtnJson[$( this ).attr( "name" )] = "";
                                    }
                                }
                                break;
                            default:    // TEXT , HIDDEN , PASSWORD
                                switch( $( this ).attr( "data-format" ) ) {
                                    case "rate":
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val().toDecimal( 2 );
                                        break;
                                    case "money":
                                    case "number":
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val().toNumber();
                                        break;
                                    case "no":
                                    case "tel_no":
                                    case "biz_no":
                                    case "zip_no":
                                    case "card_no":
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val().forceNumber();
                                        break;
                                    case "ym":
                                        rtnJson[$( this ).attr( "name" )] = svc.flushYm( $( this ).val() );
                                        break;
                                    case "date":
                                        rtnJson[$( this ).attr( "name" )] = svc.flushDate( $( this ).val() );
                                        break;
                                    case "time":
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val().forceNumber();
                                        break;
                                    case "dttm":
                                        rtnJson[$( this ).attr( "name" )] = svc.flushDttm( $( this ).val() );
                                        break;
                                    case "dttmms":
                                        rtnJson[$( this ).attr( "name" )] = svc.flushDttmms( $( this ).val() );
                                        break;
                                    default:
                                        rtnJson[$( this ).attr( "name" )] = $( this ).val().htmlEnc();
                                        break;
                                }
                                break;
                        }
                        break;
                    case "select":
                        rtnJson[$( this ).attr( "name" )] = $( this ).val();
                        break;
                    case "textarea":
                        rtnJson[$( this ).attr( "name" )] = $( this ).val().htmlEnc();
                        break;
                    case "span":
                    case "th":
                    case "td":
                        switch( $( this ).attr( "data-format" ) ) {
                            case "rate":
                                rtnJson[$( this ).attr( "name" )] = $( this ).text().toDecimal( 2 );
                                break;
                            case "money":
                            case "number":
                                rtnJson[$( this ).attr( "name" )] = $( this ).text().toNumber();
                                break;
                            case "no":
                            case "tel_no":
                            case "biz_no":
                            case "zip_no":
                            case "card_no":
                            case "time":
                                rtnJson[$( this ).attr( "name" )] = $( this ).text().forceNumber();
                                break;
                            case "ym":
                                rtnJson[$( this ).attr( "name" )] = svc.flushYm( $( this ).text() );
                                break;
                            case "date":
                                rtnJson[$( this ).attr( "name" )] = svc.flushDate( $( this ).text() );
                                break;
                            case "dttm":
                                rtnJson[$( this ).attr( "name" )] = svc.flushDttm( $( this ).text() );
                                break;
                            case "dttmms":
                                rtnJson[$( this ).attr( "name" )] = svc.flushDttmms( $( this ).text() );
                                break;
                            default:
                                rtnJson[$( this ).attr( "name" )] = $( this ).text().htmlEnc();
                                break;
                        }
                        break;
                    default :
                        break;
                }
            }

        } );

        return rtnJson;

    };

    // -- panel data binding --
    $.fn.bindPanel = function( jsonData ) {

        var panelId = $( this ).attr( 'id' );

        // console.log( 'bindPanel() > panelId, jsonData', panelId, jsonData );

        $( this ).find( 'div, input, select, textarea, span, th, td' ).each( function() {

            if( typeof ( $( this ).attr( "name" ) ) != 'undefined' ) {

                var tagName = $( this ).prop( "tagName" ).toLowerCase();
                var dataKey = $( this ).attr( "name" );

                // data 가 존재할때만 bind 한다.
                if( typeof ( jsonData[dataKey] ) != 'undefined' ) {

                    var value = String( jsonData[dataKey] );

                    switch( tagName ) {
                        case 'button':
                            break;
                        case 'input':
                            switch( $( this ).attr( "type" ).toLowerCase() ) {
                                case 'button':
                                    break;
                                case 'radio':
                                    if( value != '' ) {
                                        if( $( this ).val() == value ) {
                                            $( this ).prop( "checked", true );
                                        }
                                    }
                                    break;
                                case "checkbox":
                                    $( '#' + panelId + ' input[name=' + dataKey + ']' ).each( function() {
                                        $( this ).prop( "checked", false );
                                    } );
                                    if( value != '' ) {
                                        var arrValue = value.split( ',' );
                                        for( var i = 0; i < arrValue.length; i++ ) {
                                            $( '#' + panelId + ' input[name=' + dataKey + ']' ).each( function() {
                                                if( arrValue[i] == $( this ).val() ) {
                                                    $( this ).prop( "checked", true );
                                                }
                                            } );
                                        }
                                    }
                                    break;
                                case 'text' :
                                    switch( $( this ).attr( "data-format" ) ) {
                                        case "rate":
                                            $( this ).val( value.formatDecimal( 2 ) );
                                            break;
                                        case "money":
                                        case "number":
                                            $( this ).val( value.toString().formatNumber() );
                                            break;
                                        case "no":
                                            $( this ).val( value.forceNumber() );
                                            break;
                                        case "tel_no":
                                            $( this ).val( value.formatTelNo() );
                                            break;
                                        case "biz_no":
                                            $( this ).val( value.formatBizNo() );
                                            break;
                                        case "zip_no":
                                            $( this ).val( value.formatZipNo() );
                                            break;
                                        case "card_no":
                                            $( this ).val( value.formatCardNo() );
                                            break;
                                        case "date":
                                            $( this ).val( svc.bindDttm( value ).formatDate() );
                                            break;
                                        case "time":
                                            $( this ).val( value.formatTime() );
                                            break;
                                        case "ym":
                                            $( this ).val( svc.bindYm( value ).formatYm() );
                                            break;
                                        case "dttm10":
                                            $( this ).val( svc.bindDttm( value ).formatDttm10() );
                                            break;
                                        case "dttm12":
                                            $( this ).val( svc.bindDttm( value ).formatDttm12() );
                                            break;
                                        case "dttm":
                                        case "dttm14":
                                            $( this ).val( svc.bindDttm( value ).formatDttm14() );
                                            break;
                                        case "dttmms":
                                            $( this ).val( svc.bindDttm( value ).formatDttm17() );
                                            break;
                                        default:
                                            $( this ).val( value );
                                            break;
                                    } // close switch ($(this).attr("data-format")) {
                                    break;
                                default:
                                    $( this ).val( value );
                                    break;
                            } // close switch ($(this).attr("type").toLowerCase()) {
                            break;
                        case "select":
                            switch( $( this ).attr( "data-format" ) ) {
                                case "ym":
                                    $( this ).val( value.toString().toNumber() ).trigger( 'change' );
                                    break;
                                case 'etc':
                                    break;
                                default:
                                    $( this ).val( value ).trigger( 'change' );
                                    break;
                            }
                            break;
                        case "textarea":
                            $( this ).val( value );
                            break;
                        case "span":
                        case "th":
                        case "td":
                            switch( $( this ).attr( "data-format" ) ) {
                                case "rate":
                                    $( this ).text( value.formatDecimal( 2 ) );
                                    break;
                                case "money":
                                case "number":
                                    $( this ).text( value.formatNumber() );
                                    break;
                                case "no":
                                    $( this ).text( value.forceNumber() );
                                    break;
                                case "tel_no":
                                    $( this ).text( value.formatTelNo() );
                                    break;
                                case "biz_no":
                                    $( this ).text( value.formatBizNo() );
                                    break;
                                case "zip_no":
                                    $( this ).text( value.formatZipNo() );
                                    break;
                                case "card_no":
                                    $( this ).text( value.formatCardNo() );
                                    break;
                                case "date":
                                    $( this ).text( svc.bindDttm( value ).formatDate() );
                                    break;
                                case "time":
                                    $( this ).text( value.formatTime() );
                                    break;
                                case "ym":
                                    $( this ).text( svc.bindYm( value ).formatYm() );
                                    break;
                                case "dttm10":
                                    $( this ).text( svc.bindDttm( value ).formatDttm10() );
                                    break;
                                case "dttm12":
                                    $( this ).text( svc.bindDttm( value ).formatDttm12() );
                                    break;
                                case "dttm":
                                case "dttm14":
                                    $( this ).text( svc.bindDttm( value ).formatDttm14() );
                                    break;
                                case "dttmms":
                                    $( this ).text( svc.bindDttm( value ).formatDttm17() );
                                    break;
                                default:
                                    $( this ).text( value );
                                    if( $( this ).parent().prop( "tagName" ).toUpperCase() == 'TD' ) {
                                        $( this ).parent().attr( 'title', value );
                                    }
                                    break;
                            }
                            break;
                        default:
                            break;

                    }   // close switch(tagName) {

                }   // if(typeof(jsonData[dataKey]) != 'undefined') {

            }   // if(typeof($(this).attr("name")) != 'undefined') {

        } );   // $(this).find('div, input, select, textarea, span, th, td').each(function() {

        return this;

    };

    // -- mode 값[I:insert, U:update] 에 따라 바뀌는 display 세팅  --
    $.fn.applyModeStyle = function( mode ) {

        if (!mode) mode = $(this).find('input[name=mode]').val();

        $( this ).find( 'input, select, textarea, button' ).each( function() {

            if( $( this ).attr( 'data-mode-style' ) ) {
                var value = $( this ).attr( 'data-mode-style' );
                if( mode == 'U' ) {
                    if( value == "enable" ) {
                        $( this ).attr( "disabled", true );
                    } else if( value == "disable" ) {
                        $( this ).attr( "disabled", false );
                    } else if( value == "show" ) {
                        $( this ).hide();
                    } else if( value == "hide" ) {
                        $( this ).show();
                    }
                } else {
                    if( value == "enable" ) {
                        $( this ).attr( "disabled", false );
                    } else if( value == "disable" ) {
                        $( this ).attr( "disabled", true );
                    } else if( value == "show" ) {
                        $( this ).show();
                    } else if( value == "hide" ) {
                        $( this ).hide();
                    }
                }
            }

        } );

        return this;

    };

    // -- form element focus, format, next, command setting --
    $.fn.applyFieldOption = function() {

        var panelId = $( this ).attr( 'id' );

        $( '#' + panelId + ' input,select,textarea' ).each( function() {
            if( typeof ( $( this ).attr( "id" ) ) != "undefined" && typeof ( $( this ).parent( 'dd' ).prev().html() ) != "undefined" ) {
                if( $( this ).parent( 'dd' ).prev().children( 'label' ).length < 1 ) {
                    $( this ).parent( 'dd' ).prev().html( '<label for="' + $( this ).attr( "id" ) + '">' + $( this ).parent( 'dd' ).prev().html() + '</label>' );
                }
                // if( $(this).prop('tagName').toLowerCase() == 'input' && $(this).attr('type').toLowerCase() == 'text' ) {
                //     if(!$(this).hasClass('form-input-text')) {
                //         $(this).addClass('form-input-text');
                //     }
                // }
            }
        } );

        $( '#' + panelId + ' dt' ).each( function() {
            if( $( this ).children( 'label' ).length < 1 ) {
                $( this ).html( '<label>' + $( this ).html() + '</label>' );
            }
        } );

        $( '#' + panelId + ' *[data-required]' ).each( function() {
            // $( this ).parent( 'td' ).prev().addClass( "title_on" );
            $( this ).parent( 'dd' ).prev().addClass( "title_on" );
        } );

        $( '#' + panelId + ' input[type=text]' ).focusin( function() {
            if( !( $( this ).attr( "readonly" ) == "readonly" || $( this ).attr( "readonly" ) == true ) ) {
                $( this ).select();
            }
        } );

        /** input text format setting **/
        $( '#' + panelId + ' input[type=text]' ).each( function() {
            if( $( this ).attr( "data-format" ) ) {
                svc.form.applyElementFormat( panelId, $( this ), $( this ).attr( "data-format" ) );
            }
        } );

        $( '#' + panelId + ' [data-colspan]' ).each( function() {
            $(this).parent().addClass("relative");
            $(this).hide();
            var arrColSpan = [];
            arrColSpan.push( Number( $( this ).attr( "data-colspan" ).split( "-" )[0] ) - 1 );
            arrColSpan.push( Number( $( this ).attr( "data-colspan" ).split( "-" )[1] ) - 1 );
            var arrWidth = [];
            var wColSpan = 0;
            $( '#' + panelId + ' div dl:first-child>dt,#' + panelId + ' div dl:first-child>dd' ).each( function() {
                // console.log($(this).prop('tagName'), $(this).outerHTML(), $( this ).outerWidth());
                arrWidth.push( $( this ).outerWidth() );
            } );
            // console.log(panelId + ' - arrWidth', arrWidth);
            for( var i = arrColSpan[0]; i <= arrColSpan[1]; i++ ) {
                wColSpan += arrWidth[i];
                // console.log('wColSpan', wColSpan, arrWidth[i]);
            }
            var nSpanOffset = ( arrColSpan[1] - arrColSpan[0] + 1 - 2 ) * 10;
            // console.log('nSpanOffset', nSpanOffset);
            $( this ).css( {
                "position" : "absolute",
                "top"   : "0",
                "left" : "3px",
                "width"  : wColSpan + "px",
                "transition" : "all 0.5s"
            } ).show().children('input[type=text]').css("width", "calc(100% - " + nSpanOffset + "px)");
        } );

        /**
         * ajaxCombo 가 비동기로 데이터를 불러오기 때문에
         * 조회조건에 콤보가 있는상태에서 로딩 후 자동조회시 문제가 된다.
         * 따라서 콤보로딩시까지 page 를 block 시키고,
         * 콤보로딩 후 BindComboAfterFunc() 함수를 페이지내에 추가하여
         * 해당함수에서 doQuery() 함수를 call 하면 처리가 원할하다.
         * 또한, 해당 콤보의 데이터 존재여부도 체크하였다.
         */
        var comboAjaxCnt = 0;
        var totComboAjaxCnt = 0;

        $( '#' + panelId + " select" ).each( function() {
            if( $( this ).attr( "data-grpcd" ) ) {
                totComboAjaxCnt++;
            }
        } );

        $( '#' + panelId + " select" ).each( function() {

            var grpCd = $( this ).attr( "data-grpcd" );
            var cbName = $( this ).attr( "name" );

            if( grpCd ) {
                if( comboAjaxCnt == 0 ) {
                    $.blockUI( {
                        message: 'Loading the initial data needed for the page. <br/> Please wait ...',
                        css    : { "font-weight": "bold", "height": "80px", "color": "#000", "opacity": "1", "font-size": "10pt", "line-height": "1.8", "padding-top": "8px", "font-family": "굴림체" }
                    } );
                }
                var params = { "grpCd": grpCd.toUpperCase() };

                if( $( this ).attr( "textonly" ) ) {
                    params["textonly"] = true;
                }

                svc.net.ajaxCombo( this, svc.contextPath + "/system/cd/comboList", params, function( result ) {
                    if( result.resultCd != "00" ) {
                        $.unblockUI();
                        svc.ui.alert( "select name='" + cbName + "' grpCd = '" + grpCd + "'" + " - Could not fetch data from." );
                    }
                    comboAjaxCnt++;
                    if( comboAjaxCnt == totComboAjaxCnt ) {
                        $( '#' + panelId + " select" ).select2();
                        setTimeout( '$.unblockUI()', 1000 );
                        try {
                            var callFuncName = panelId.replaceAll( '-', '' ).replaceAll( '#', '' ) + 'BindComboAfterFunc()';
                            eval( callFuncName );
                        } catch(e) {
                        }
                    }
                }, function() {$.unblockUI();} );

            }

        } );

        $( window ).resize( function() {
            try {
                $( '#' + panelId + " select" ).select2();
            } catch(e) {
            }

        } );

        /** input keydown setting **/
        $( '#' + panelId + ' input[type=text], #' + panelId + ' input[type=password]' ).keydown( function( e ) {
            if( e.keyCode == 13 ) {
                if( typeof ( $( this ).attr( "data-command" ) ) != "undefined" ) {
                    e.preventDefault();
                    eval( $( this ).attr( "data-command" ) );
                } else if( typeof ( $( this ).attr( "data-next" ) ) != "undefined" ) {
                    e.preventDefault();
                    svc.form.nextElement( panelId, this );
                } else {
                    if( $( this ).parent().prev( 'input' ).attr( 'data-next' ) ) {
                        var nextElemNm = $( this ).parent().prev( 'input' ).attr( 'data-next' );
                        var nextElem = $( '#' + panelId + ' input[name=' + nextElemNm + ']' );
                        nextElem.prev( 'input' ).focus();
                    }
                }
            }
        } );

        $( '#' + panelId + " .ui-datepicker-trigger" ).each( function() {
            $( this ).css( { "margin-left": "3px;" } );
            if( $( this ).prev().attr( "title" ) != undefined ) {
                $( this ).attr( "alt", $( this ).prev().attr( "title" ) );
                $( this ).attr( "title", $( this ).prev().attr( "title" ) );
            }
        } );

        return this;

    };

    $.fn.panelNumAnimate = function( data, duration ) {
        $( this ).find( 'span[data-format=number]' ).each( function() {
            if( data.hasOwnProperty( $( this ).attr( 'name' ) ) ) {
                //                $(this).numAnimate($(this).text(), data[$(this).attr('name')], duration);
                var refThis = $( this );
                if( refThis.text().toNumber() != data[refThis.attr( 'name' )].toString().toNumber() ) {
                    refThis.numAnimate( '0', data[$( this ).attr( 'name' )], duration );
                    refThis.addClass( 'textBold' );
                } else {
                    refThis.removeClass( 'textBold' );
                }
                //                $(this).numAnimate('0', data[$(this).attr('name')], duration);
            }
        } );

        return this;
    };

    $.fn.outerHTML = function() {
        return jQuery('<div />').append(this.eq(0).clone()).html();
    };

    $.fn.validateForm = function() {

        // // console.log("######  validateForm start  ###########");

        // var panelId = $(this).attr('id');

        var bValidate = true;
        var titleList = '';
        var title = '';

        $( this ).find( 'input, select, textarea' ).each( function() {

            if( typeof ( $( this ).attr( "name" ) ) != 'undefined' ) {
                // // console.log("data-required name, val", $(this).attr("name"), $(this).val(), $(this).attr('data-required'));
                if( typeof ( $( this ).attr( 'data-required' ) ) != 'undefined' ) {
                    // // console.log("data-required name, val", $(this).attr("name"), $(this).val());
                    if( $( this ).val() + '' == '' ) {
                        bValidate = false;
                        title = ( typeof $( this ).attr( "data-title" ) == "undefined" ) ? "Item" : $( this ).attr( "data-title" );
                        titleList += ( titleList == "" ) ? title : ", " + title;
                    }
                }

            }

        } );

        if( bValidate == false ) {
            //$.ksid.ui.alert("<strong>[ " + titleList + " ]</strong><br />" + "위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
            svc.ui.alert( "<strong>[ " + titleList + " ]</strong><br />" + '위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.' );
        }

        return bValidate;

    };

    $.fn.numAnimate = function( sVal, eVal, duration ) {
        $( this ).easy_number_animate( {
            start_value: sVal.toNumber()
            , end_value: eVal
            , duration : ( typeof ( duraltion ) == 'undefined' ) ? 2000 : duration
        } );
    };

}( jQuery ) );

