/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreNet = function() {};
CoreNet.prototype.ajax = function(options, successFunc) {

    var _this = this;

    this.ajaxCnt++;

    var ajaxOptions = {};
    ajaxOptions.url = null;
    ajaxOptions.type = "POST";
    ajaxOptions.dataType = "json";
    ajaxOptions.data = {};
    ajaxOptions.beforeSend = function(xmlHttpRequest) {
        xmlHttpRequest.setRequestHeader("AJAX", "true"); // ajax 호출을  header에 기록
    };
    ajaxOptions.success = function(result) {
        if(typeof(options.showLoading) != 'undefined') $.Utils.hideLoading({id:options.showLoading});
        if (typeof(successFunc) == "function") {
            successFunc(result);
        }
    };
    ajaxOptions.error = function(x, e) {
        if(typeof(options.showLoading) != 'undefined') $.Utils.hideLoading({id:options.showLoading});
        this.alertErrorStatus(x.status, e);
    };

    $.extend(true, ajaxOptions, options);

    if(ajaxOptions.hasOwnProperty('showLoading')) delete ajaxOptions.showLoading;

    if (ajaxOptions.url == null) {
        $.Utils.alert("CoreNet.prototype.ajax call does not have url in options.");
        return;
    }

    if(typeof(options.showLoading) != 'undefined') $.Utils.showLoading({id:options.showLoading});

    $.ajax(ajaxOptions);

};
CoreNet.prototype.sjaxCall = function(url, params, callback, options) {
    if (!options) {
        options = {};
    }
    var ajaxOptions = $.extend(true, {
        url: url,
        data: params,
        async: false
    }, options);
    this.ajax(ajaxOptions, function(result) {
        if (callback) {
            callback(result);
        }
    });
};
CoreNet.prototype.ajaxCall = function(url, params, callback, options) {
    if (!options) {
        options = {};
    }
    var ajaxOptions = $.extend(true, {
        url: url,
        data: params
    }, options);

    this.ajax(ajaxOptions, function(result) {
        // console.log( "result", result );
        if (result.resultCd == "99") {
            // $.Utils.alert(result.resultData);
        }
        if (callback) {
            callback(result);
        }
    });
};
CoreNet.prototype.ajaxList = function(url, params, callback) {
    this.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json; charset=UTF-8"
    }, function(result) {
        if (callback) {
            callback(result);
        }
    });
};
CoreNet.prototype.ajaxJqGrid = function(jqGrid, url, params, callback) {

    jqGrid.initGridData();

    jqGrid.showLoading();

    this.ajaxCall(url, params, function(result) {

        jqGrid.hideLoading();

        // console.log( 'ajaxJqGrid > result', result );

        if (result.resultCd == "00") {

            jqGrid.bindGrid(result.resultData);

            if (typeof(callback) == "function") {
                callback(result);
            }

        } else {
            $.Utils.alert("조회 중 오류가 발생했습니다.<br/>" + result.resultMsg);
        }

    });
    jqGrid.hideLoading();
};
CoreNet.prototype.ajaxCombo = function(combo, url, params, callback) {
    this.sjaxCall(url, params, function(result) {
        if (result.resultCd == "00") {
            $.Form.bindCombo(combo, result.resultData);
            if (callback) {
                callback(result);
            }
        }
    });
};
CoreNet.prototype.getExcelFileNm = function(fileNm) {
    var dttm = new $.Utils.datetime().getDate("yyyymmddhhmiss");
    return fileNm + "_" + dttm;
};
CoreNet.prototype.getExcelGroupHeader = function(oGrid) {
    var groupHeadersOptions = $("#" + oGrid.id + "").jqGrid("getGridParam", "groupHeader");
    var excelGroupHeader = null;

    if (groupHeadersOptions != null) {
        excelGroupHeader = [];
        var arrGridModel = oGrid.getExcelColModel();
        for (var i = 0; i < groupHeadersOptions.groupHeaders.length; i++) {
            for (var j = 0; j < arrGridModel.length; j++) {
                if (groupHeadersOptions.groupHeaders[i].startColumnName == arrGridModel[j].name) {
                    excelGroupHeader.push([0, 0, j, j + groupHeadersOptions.groupHeaders[i].numberOfColumns - 1, groupHeadersOptions.groupHeaders[i].titleText]);
                }
            }
        }
    }

    return excelGroupHeader;
};
CoreNet.prototype.ajaxExcel = function(url, fileNm, params, oGrid) {

    if (!$.Utils.checkParams({
            url: url,
            fileNm: fileNm,
            params: params
        })) {
        return;
    }

    var excelGroupHeader = this.getExcelGroupHeader(oGrid);

    var excelParams = {};
    excelParams.fileNm = this.getExcelFileNm(fileNm);
    excelParams.param = params;
    excelParams.colModel = oGrid.getExcelColModel();
    if (excelGroupHeader != null) {
        excelParams.groupHeader = JSON.stringify(excelGroupHeader);
    }

    $.Utils.confirm("(0) 파일을 다운로드 하시겠습니까?".replaceAll("(0)", fileNm), function() {
        $("#form_excel").attr("action", url);
        $("#form_excel input[name=params]").val(encodeURIComponent(JSON.stringify(excelParams)));
        $("#form_excel").submit();
    }, function() {
        $.Utils.alert("취소되었습니다.");
    });

};
CoreNet.prototype.ajaxExcelGrid = function(url, fileNm, oGrid) {

    if (!this.checkParams({
            url: url,
            fileNm: fileNm
        })) {
        return;
    }

    var excelGroupHeader = this.getExcelGroupHeader(oGrid);

    var data = (oGrid.rows == null) ? [] : $.extend(true, [], oGrid.rows);
    //        // console.log('data', data);

    var excelModel = oGrid.getExcelColModel();

    // 하단 합계가 존재할 경우
    if (oGrid.prop.footerrow == true) {

        var footerData = {};

        $("#gview_" + oGrid.id).find(".ui-jqgrid-ftable td").each(function() {
            var colName = $(this).attr("aria-describedby").replaceAll(oGrid.id + "_", "");
            var colValue = $(this).text().replaceAll("&nbsp;", "");
            if (colValue != "합계" && colValue != "") {
                try {
                    colValue = colValue.toString().toNumber();
                } catch (e) {}
            }
            for (var i = 0; i < excelModel.length; i++) {
                if (excelModel[i].name == colName) {
                    footerData[colName] = colValue;
                }
            }
        });

        data.unshift(footerData);
    }

    var excelParams = {};
    excelParams.fileNm = this.getExcelFileNm(fileNm);
    excelParams.colModel = excelModel;
    excelParams.data = data;
    if (excelGroupHeader != null) {
        excelParams.groupHeader = JSON.stringify(excelGroupHeader);
    }

    $.Utils.confirm("(0) 파일을 다운로드 하시겠습니까?".replaceAll("(0)", fileNm), function() {

        $("#form_excel").attr("action", url);
        $("#form_excel input[name=params]").val(encodeURIComponent(JSON.stringify(excelParams)));
        $("#form_excel").submit();

    }, function() {
        $.Utils.alert("취소되었습니다.");
    });

};
CoreNet.prototype.alertErrorStatus = function(status, e) {
    if (status == 0) {
        $.Utils.alert("You are offline!!\n Please Check Your Network.");
    } else if (status == 404) {
        $.Utils.alert("Requested URL not found.");
    } else if (status == 500) {
        $.Utils.alert("Internel Server Error.");
    } else if (status == 600) {
        $.Utils.alert("Session Error.");
    } else if (e == "parsererror") {
        $.Utils.alert("Error.\nParsing JSON Request failed.");
    } else if (e == "timeout") {
        $.Utils.alert("Request Time out.");
    } else {
        $.Utils.alert("Transfer Error.");
    }
};

$.extend({ Net: new CoreNet() });