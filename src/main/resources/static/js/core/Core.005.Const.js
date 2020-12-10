/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreConst = function() {

    /** lang **/
    this.language = 'ko';
    this.country = 'KR';
    this.locale = this.language + '_' + this.country;

    /** 구분자 **/
    this.dateDiv = '-'; // 날짜
    this.timeDiv = ':'; // 시간
    this.telNoDiv = '-'; // 전화번호
    this.bizNoDiv = '-'; // 사업자번호
    this.cardNoDiv = '-'; // 카드번호
    this.zipNoDiv = '-'; // 우편번호

    /** 기본포멧 **/
    this.monthFormat = this.getMonthFormat();
    this.dateFormat = this.getDateFormat();
    this.timeFormat = this.getTimeFormat();
    this.datetimeFormat = this.getDateTimeFormat();
    this.pickerDateFormat = this.getPickerDateFormat();
    this.pickerMonthFormat = this.getPickerMonthFormat();

    this.dialogProp = {
        modal: true,
        resizable: false,
        show: "fadeIn",
        hide: "fadeOut",
        close: false
    };

    this.blockUICss = {
        "font-weight": "700",
        "height": "80px",
        "color": "#000",
        "opacity": "1",
        "font-size": "10pt",
        "line-height": "1.8",
        "padding-top": "8px"
    };

    this.resultCd = {
        'OK': '00',
        'ERROR': '99'
    };

};
CoreConst.prototype.getDialogProp = function() {
    return $.extend(true, {}, this.dialogProp);
};
CoreConst.prototype.getMonthFormat = function() {
    return 'yyyy' + this.dateDiv + 'mm';
};
CoreConst.prototype.getDateFormat = function() {
    return 'yyyy' + this.dateDiv + 'mm' + this.dateDiv + 'dd';
};
CoreConst.prototype.getTimeFormat = function() {
    return 'hh' + this.timeDiv + 'mi' + this.timeDiv + 'ss';
};
CoreConst.prototype.getDateTimeFormat = function() {
    return this.getDateFormat() + ' ' + this.getTimeFormat();
};
CoreConst.prototype.getPickerMonthFormat = function() {
    return 'yy' + this.dateDiv + 'mm';
};
CoreConst.prototype.getPickerDateFormat = function() {
    return 'yy' + this.dateDiv + 'mm' + this.dateDiv + 'dd';
};

$.extend({ Const: new CoreConst() });