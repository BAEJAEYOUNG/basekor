/*
 * Developed by JAEYOUNG BAE on 19. 4. 12 오전 11:23.
 * Last modified 19. 4. 12 오전 10:43.
 * Copyright (c) 2019. All rights reserved.
 */

svc.popup                      = function( aoProp ) {

    console.log( "svc.popup > aoProp", aoProp );

    if( aoProp.hasOwnProperty( "choice" ) ) {
        $( "#dialog-common button[name=btn-popup-choice]" ).show();
    } else {
        $( "#dialog-common button[name=btn-popup-choice]" ).hide();
    }
    this.prop = {
        title    : "팝업선택",
        gridTitle: "팝업선택 리스트",
        width    : 600,
        height   : 500
    };
    this.grid = null;
    $.extend( true, this.prop, aoProp );
    this.pager = null;
    this.init();
};
// -- init --
svc.popup.prototype.init       = function() {
    $( "#dialog-common-top" ).html( $( "#" + this.prop.popupId ).html() );
    $( "#dialog-common-grid-div" ).html( "<table id=\"dialog-common-grid\"></table>" );
};
// -- data bind --
svc.popup.prototype.searchBind = function( data ) {
    $( "#dialog-common-top" ).bindPanel( data );
};
// -- popup open --
svc.popup.prototype.open       = function() {
    var _ref = this;
    this.setPopup();
};
//###############################################################################
//###   요기서 위에서 추가한 함수를 만들자 !!!!!!!!!!!!!!!!!!!!!! (시작)
//###############################################################################
// -- setting popup --
svc.popup.prototype.setPopup = function() {
    var _ref          = this;
    var _prop         = {};
    _prop.colModel    = _ref.prop.colModel;
    _prop.onSelectRow = function( rowId, status, e ) {
        if( _ref.prop.hasOwnProperty( "click" ) ) {
            _ref.grid.setClickProp( rowId );
        }
    };
};
//###############################################################################
//###   요기서 위에서 추가한 함수를 만들자 !!!!!!!!!!!!!!!!!!!!!! (끝)
//###############################################################################