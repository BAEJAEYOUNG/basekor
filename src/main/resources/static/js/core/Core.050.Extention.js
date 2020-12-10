/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

(function($) {

    $.fn.svcDialog = function(prop) {
        if (!prop) prop = $.Const.dialogProp;
        $(this).dialog(prop);
        $(this).parent(".ui-dialog").css({
            "border": "2px solid #444",
            "box-shadow": "6px 6px 10px rgba(0,0,0,0.8)"
        });
    };

    $.fn.timeFocus = function(ms) {
        if (!ms) ms = 200;
        var _ref = this;
        setTimeout(function() {
            $(_ref).focus();
        }, ms);
    };

    // -- panel data flush --
    $.fn.flushPanel = function() {

        // var panelId = $(this).attr('id');
        var rtnJson = {};

        $(this).find("input, select, textarea, span, th, td").each(function() {

            if ($(this).attr("name")) {

                var elemName = $(this).attr('name');
                var tagName = $(this).prop("tagName").toLowerCase();
                var value = "";
                if (tagName == 'td' || tagName == 'th' || tagName == 'span') {
                    value = $(this).text();
                } else {
                    value = $(this).val();
                }

                switch (tagName) {
                    case "input":
                        switch ($(this).attr("type").toLowerCase()) {
                            case "button":
                                break;
                            case "radio":
                                if ($(this).is(":checked")) {
                                    rtnJson[elemName] = value;
                                } else {
                                    if (!rtnJson[elemName]) {
                                        rtnJson[elemName] = "";
                                    }
                                }
                                break;
                            case "checkbox":
                                if ($(this).is(":checked")) {
                                    if (rtnJson.hasOwnProperty(elemName)) {
                                        if (rtnJson[elemName] != "") {
                                            rtnJson[elemName] += ",";
                                        }
                                        rtnJson[elemName] += value;
                                    } else {
                                        rtnJson[elemName] = value;
                                    }
                                } else {
                                    // 단일 혹은 그룹체크에서 모두 체크가 안되었을경우 jsonData 에 항목이 누락되는걸 방지하기 위
                                    if (!rtnJson[elemName]) {
                                        rtnJson[elemName] = "";
                                    }
                                }
                                break;
                            default: // TEXT , HIDDEN , PASSWORD
                                switch ($(this).attr("data-format")) {
                                    case "rate":
                                        rtnJson[elemName] = value.toDecimal(2);
                                        break;
                                    case "money":
                                    case "number":
                                        rtnJson[elemName] = value.toNumber();
                                        break;
                                    case "no":
                                    case "tel_no":
                                    case "biz_no":
                                    case "zip_no":
                                    case "card_no":
                                        rtnJson[elemName] = value.forceNumber();
                                        break;
                                    case "ym":
                                        rtnJson[elemName] = $.Form.flushYm(value);
                                        break;
                                    case "date":
                                        rtnJson[elemName] = $.Form.flushDate(value);
                                        break;
                                    case "time":
                                        rtnJson[elemName] = value.forceNumber();
                                        break;
                                    case "dttm":
                                        rtnJson[elemName] = $.Form.flushDttm(value);
                                        break;
                                    case "dttmms":
                                        rtnJson[elemName] = $.Form.flushDttmms(value);
                                        break;
                                    default:
                                        // console.log('value', value);
                                        rtnJson[elemName] = value.htmlEnc();
                                        break;
                                }
                                break;
                        }
                        break;
                    case "select":
                        rtnJson[elemName] = value;
                        break;
                    case "textarea":
                        rtnJson[elemName] = value.htmlEnc();
                        break;
                    case "span":
                    case "th":
                    case "td":
                        switch ($(this).attr("data-format")) {
                            case "rate":
                                rtnJson[elemName] = value.toDecimal(2);
                                break;
                            case "money":
                            case "number":
                                rtnJson[elemName] = value.toNumber();
                                break;
                            case "no":
                            case "tel_no":
                            case "biz_no":
                            case "zip_no":
                            case "card_no":
                            case "time":
                                rtnJson[elemName] = value.forceNumber();
                                break;
                            case "ym":
                                rtnJson[elemName] = $.Form.flushYm(value);
                                break;
                            case "date":
                                rtnJson[elemName] = $.Form.flushDate(value);
                                break;
                            case "dttm":
                                rtnJson[elemName] = $.Form.flushDttm(value);
                                break;
                            case "dttmms":
                                rtnJson[elemName] = $.Form.flushDttmms(value);
                                break;
                            default:
                                rtnJson[elemName] = value.htmlEnc();
                                break;
                        }
                        break;
                    default:
                        break;
                }
            }

        });

        return rtnJson;

    };


    // -- panel data binding --
    $.fn.bindPanel = function(jsonData) {

        var panelId = $(this).attr("id");

        // console.log( 'bindPanel() > panelId, jsonData', panelId, jsonData );

        $(this).find("div, input, select, textarea, span, th, td").each(function() {

            if (typeof($(this).attr("name")) != "undefined") {

                var tagName = $(this).prop("tagName").toLowerCase();
                var elemName = $(this).attr("name");

                // data 가 존재할때만 bind 한다.
                if (typeof(jsonData[elemName]) != "undefined") {

                    var value = String(jsonData[elemName]);

                    switch (tagName) {
                        case "button":
                            break;
                        case "input":
                            switch ($(this).attr("type").toLowerCase()) {
                                case "button":
                                    break;
                                case "radio":
                                    if (value != "") {
                                        if ($(this).val() == value) {
                                            $(this).prop("checked", true);
                                        }
                                    }
                                    break;
                                case "checkbox":
                                    $("#" + panelId + " input[name=" + elemName + "]").each(function() {
                                        $(this).prop("checked", false);
                                    });
                                    if (value != "") {
                                        var arrValue = value.split(",");
                                        for (var i = 0; i < arrValue.length; i++) {
                                            $("#" + panelId + " input[name=" + elemName + "]").each(function() {
                                                if (arrValue[i] == $(this).val()) {
                                                    $(this).prop("checked", true);
                                                }
                                            });
                                        }
                                    }
                                    break;
                                case "text":
                                    switch ($(this).attr("data-format")) {
                                        case "rate":
                                            $(this).val(value.formatDecimal(2));
                                            break;
                                        case "money":
                                        case "number":
                                            $(this).val(value.formatNumber());
                                            break;
                                        case "no":
                                            $(this).val(value.forceNumber());
                                            break;
                                        case "tel_no":
                                            $(this).val(value.formatTelNo());
                                            break;
                                        case "biz_no":
                                            $(this).val(value.formatBizNo());
                                            break;
                                        case "zip_no":
                                            $(this).val(value.formatZipNo());
                                            break;
                                        case "card_no":
                                            $(this).val(value.formatCardNo());
                                            break;
                                        case "date":
                                            $(this).val($.Form.bindDttm(value).formatDate());
                                            break;
                                        case "time":
                                            $(this).val(value.formatTime());
                                            break;
                                        case "ym":
                                            $(this).val($.Form.bindYm(value).formatYm());
                                            break;
                                        case "dttm10":
                                            $(this).val($.Form.bindDttm(value).formatDttm10());
                                            break;
                                        case "dttm12":
                                            $(this).val($.Form.bindDttm(value).formatDttm12());
                                            break;
                                        case "dttm":
                                        case "dttm14":
                                            $(this).val($.Form.bindDttm(value).formatDttm14());
                                            break;
                                        case "dttmms":
                                            $(this).val($.Form.bindDttm(value).formatDttm17());
                                            break;
                                        default:
                                            $(this).val(value);
                                            break;
                                    } // close switch ($(this).attr("data-format")) {
                                    break;
                                default:
                                    $(this).val(value);
                                    break;
                            } // close switch ($(this).attr("type").toLowerCase()) {
                            break;
                        case "select":
                            switch ($(this).attr("data-format")) {
                                case "ym":
                                    $(this).val(value.toString().toNumber()).trigger("change");
                                    break;
                                case "etc":
                                    break;
                                default:
                                    $(this).val(value).trigger("change");
                                    break;
                            }
                            break;
                        case "textarea":
                            $(this).val(value);
                            break;
                        case "span":
                        case "th":
                        case "td":
                            switch ($(this).attr("data-format")) {
                                case "rate":
                                    $(this).text(value.formatDecimal(2));
                                    break;
                                case "money":
                                case "number":
                                    $(this).text(value.formatNumber());
                                    break;
                                case "no":
                                    $(this).text(value.forceNumber());
                                    break;
                                case "tel_no":
                                    $(this).text(value.formatTelNo());
                                    break;
                                case "biz_no":
                                    $(this).text(value.formatBizNo());
                                    break;
                                case "zip_no":
                                    $(this).text(value.formatZipNo());
                                    break;
                                case "card_no":
                                    $(this).text(value.formatCardNo());
                                    break;
                                case "date":
                                    $(this).text($.Form.bindDttm(value).formatDate());
                                    break;
                                case "time":
                                    $(this).text(value.formatTime());
                                    break;
                                case "ym":
                                    $(this).text($.Form.bindYm(value).formatYm());
                                    break;
                                case "dttm10":
                                    $(this).text($.Form.bindDttm(value).formatDttm10());
                                    break;
                                case "dttm12":
                                    $(this).text($.Form.bindDttm(value).formatDttm12());
                                    break;
                                case "dttm":
                                case "dttm14":
                                    $(this).text($.Form.bindDttm(value).formatDttm14());
                                    break;
                                case "dttmms":
                                    $(this).text($.Form.bindDttm(value).formatDttm17());
                                    break;
                                default:
                                    $(this).text(value);
                                    if ($(this).parent().prop("tagName").toUpperCase() == "TD") {
                                        $(this).parent().attr("title", value);
                                    }
                                    break;
                            }
                            break;
                        default:
                            break;

                    } // close switch(tagName) {

                } // if(typeof(jsonData[elemName]) != 'undefined') {

            } // if(typeof($(this).attr("name")) != 'undefined') {

        }); // $(this).find('div, input, select, textarea, span, th, td').each(function() {

        return this;

    };

    // -- mode 값[I:insert, U:update] 에 따라 바뀌는 display 세팅  --
    $.fn.applyModeStyle = function(mode) {

        // console.log('mode', mode);
        if (!mode) mode = $(this).find("input[name=mode]").val();
        // console.log('mode', mode);

        $(this).find("input, select, textarea, button").each(function() {

            if ($(this).attr("data-mode-style")) {
                var value = $(this).attr("data-mode-style");
                if (mode == "U") {
                    if (value == "enable") {
                        $(this).attr("disabled", true);
                    } else if (value == "disable") {
                        $(this).attr("disabled", false);
                    } else if (value == "show") {
                        $(this).hide();
                    } else if (value == "hide") {
                        $(this).show();
                    }
                } else {
                    if (value == "enable") {
                        $(this).attr("disabled", false);
                    } else if (value == "disable") {
                        $(this).attr("disabled", true);
                    } else if (value == "show") {
                        $(this).show();
                    } else if (value == "hide") {
                        $(this).hide();
                    }
                }
            }

        });

        return this;

    };

    // -- form element focus, format, next, command setting --
    $.fn.applyFieldOption = function(bindAfterCallbackFunc) {

        // console.log('applyFieldOption > bindAfterCallbackFunc', typeof(bindAfterCallbackFunc));

        var panelId = $(this).attr("id");

        $("#" + panelId + " input,select,textarea").each(function() {
            if (typeof($(this).attr("id")) != "undefined" && typeof($(this).parent("dd").prev().html()) != "undefined") {
                if ($(this).parent("dd").prev().children("label").length < 1) {
                    $(this).parent("dd").prev().html("<label for=\"" + $(this).attr("id") + "\">" + $(this).parent("dd").prev().html() + "</label>");
                }
                // if( $(this).prop('tagName').toLowerCase() == 'input' && $(this).attr('type').toLowerCase() == 'text' ) {
                //     if(!$(this).hasClass('form-input-text')) {
                //         $(this).addClass('form-input-text');
                //     }
                // }
            }
        });

        $("#" + panelId + " dt").each(function() {
            if ($(this).children("label").length < 1) {
                $(this).html("<label>" + $(this).html() + "</label>");
            }
        });

        $("#" + panelId + " *[data-required]").each(function() {
            // $( this ).parent( 'td' ).prev().addClass( "title_on" );
            $(this).parent("dd").prev().addClass("title_on");
        });

        $("#" + panelId + " input[type=text]").focusin(function() {
            if (!($(this).attr("readonly") == "readonly" || $(this).attr("readonly") == true)) {
                $(this).select();
            }
        });

        /** input text format setting **/
        $("#" + panelId + " input[type=text]").each(function() {
            if ($(this).attr("data-format")) {
                $.Form.applyElementFormat(panelId, $(this), $(this).attr("data-format"));
            }
        });

        $("#" + panelId + " [data-colspan]").each(function() {
            $(this).parent().addClass("relative");
            $(this).hide();
            var arrColSpan = [];
            arrColSpan.push(Number($(this).attr("data-colspan").split("-")[0]) - 1);
            arrColSpan.push(Number($(this).attr("data-colspan").split("-")[1]) - 1);
            var arrWidth = [];
            var wColSpan = 0;
            $("#" + panelId + " div dl:first-child>dt,#" + panelId + " div dl:first-child>dd").each(function() {
                // console.log($(this).prop('tagName'), $(this).outerHTML(), $( this ).outerWidth());
                arrWidth.push($(this).outerWidth());
            });
            // console.log(panelId + ' - arrWidth', arrWidth);
            for (var i = arrColSpan[0]; i <= arrColSpan[1]; i++) {
                wColSpan += arrWidth[i];
                // console.log('wColSpan', wColSpan, arrWidth[i]);
            }
            var nSpanOffset = (arrColSpan[1] - arrColSpan[0] + 1 - 2) * 10;
            // console.log('nSpanOffset', nSpanOffset);
            $(this).css({
                "position": "absolute",
                "top": "0",
                "left": "3px",
                "width": wColSpan + "px",
                "transition": "all 0.5s"
            }).show().children("input[type=text]").css("width", "calc(100% - " + nSpanOffset + "px)");
        });

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

        $("#" + panelId + " select").each(function() {
            if ($(this).attr("data-grpcd")) {
                totComboAjaxCnt++;
            }
        });

        $("#" + panelId + " select").each(function() {

            var grpCd = $(this).attr("data-grpcd");
            var cbName = $(this).attr("name");

            if (grpCd) {
                if (comboAjaxCnt == 0) {
                    $.blockUI({
                        message: "Loading the initial data needed for the page. <br/> Please wait ...",
                        css: {
                            "font-weight": "bold",
                            "height": "80px",
                            "color": "#000",
                            "opacity": "1",
                            "font-size": "10pt",
                            "line-height": "1.8",
                            "padding-top": "8px",
                            "font-family": "굴림체"
                        }
                    });
                }
                var params = { "grpCd": grpCd.toUpperCase() };

                if ($(this).attr("textonly")) {
                    params["textonly"] = true;
                }

                $.Net.ajaxCombo(this, $.Page.contextPath + "/system/cd/comboList", params, function(result) {
                        if (result.resultCd != "00") {
                            $.unblockUI();
                            $.Utils.alert("select name='" + cbName + "' grpCd = '" + grpCd + "'" + " - Could not fetch data from.");
                        }
                        comboAjaxCnt++;
                        if (comboAjaxCnt == totComboAjaxCnt) {
                            $("#" + panelId + " select").select2();
                            setTimeout("$.unblockUI()", 1000);
                            try {
                                if (typeof(bindAfterCallbackFunc) == 'function') {
                                    bindAfterCallbackFunc();
                                } else {
                                    var callFuncName = panelId.replaceAll("-", "").replaceAll("#", "") + "BindComboAfterFunc()";
                                    eval(callFuncName);
                                }
                            } catch (e) {}
                        }
                    },
                    function() {
                        $.unblockUI();
                    });

            }

        });

        $(window).resize(function() {
            try {
                $("#" + panelId + " select").select2();
            } catch (e) {}

        });

        /** input keydown setting **/
        $("#" + panelId + " input[type=text], #" + panelId + " input[type=password]").keydown(function(e) {
            if (e.keyCode == 13) {
                if (typeof($(this).attr("data-command")) != "undefined") {
                    e.preventDefault();
                    eval($(this).attr("data-command"));
                } else if (typeof($(this).attr("data-next")) != "undefined") {
                    e.preventDefault();
                    $.Form.nextElement(panelId, this);
                } else {
                    if ($(this).parent().prev("input").attr("data-next")) {
                        var nextElemNm = $(this).parent().prev("input").attr("data-next");
                        var nextElem = $("#" + panelId + " input[name=" + nextElemNm + "]");
                        nextElem.prev("input").focus();
                    }
                }
            }
        });

        $("#" + panelId + " .ui-datepicker-trigger").each(function() {
            $(this).css({ "margin-left": "3px;" });
            if ($(this).prev().attr("title") != undefined) {
                $(this).attr("alt", $(this).prev().attr("title"));
                $(this).attr("title", $(this).prev().attr("title"));
            }
        });

        return this;

    };

    $.fn.panelNumAnimate = function(data, duration) {
        $(this).find("span[data-format=number]").each(function() {
            if (data.hasOwnProperty($(this).attr("name"))) {
                //                $(this).numAnimate($(this).text(), data[$(this).attr('name')], duration);
                var refThis = $(this);
                if (refThis.text().toNumber() != data[refThis.attr("name")].toString().toNumber()) {
                    refThis.numAnimate("0", data[$(this).attr("name")], duration);
                    refThis.addClass("textBold");
                } else {
                    refThis.removeClass("textBold");
                }
                //                $(this).numAnimate('0', data[$(this).attr('name')], duration);
            }
        });

        return this;
    };

    $.fn.outerHTML = function() {
        return jQuery("<div />").append(this.eq(0).clone()).html();
    };

    $.fn.validateForm = function() {

        // // console.log("######  validateForm start  ###########");

        // var panelId = $(this).attr('id');

        var bValidate = true;
        var titleList = "";
        var title = "";

        $(this).find("input, select, textarea").each(function() {

            if (typeof($(this).attr("name")) != "undefined") {
                // // console.log("data-required name, val", $(this).attr("name"), $(this).val(), $(this).attr('data-required'));
                if (typeof($(this).attr("data-required")) != "undefined") {
                    // // console.log("data-required name, val", $(this).attr("name"), $(this).val());
                    if ($(this).val() + "" == "") {
                        bValidate = false;
                        title = (typeof $(this).attr("data-title") == "undefined") ? "Item" : $(this).attr("data-title");
                        titleList += (titleList == "") ? title : ", " + title;
                    }
                }

            }

        });

        if (bValidate == false) {
            //$.ksid.ui.alert("<strong>[ " + titleList + " ]</strong><br />" + "위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
            $.Utils.alert("<strong>[ " + titleList + " ]</strong><br />" + "위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.");
        }

        return bValidate;

    };

    $.fn.numAnimate = function(sVal, eVal, duration) {
        $(this).easy_number_animate({
            start_value: sVal.toNumber(),
            end_value: eVal,
            duration: (typeof(duraltion) == "undefined") ? 2000 : duration
        });
    };

})(jQuery);