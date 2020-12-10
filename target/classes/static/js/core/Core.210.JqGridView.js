/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreJqGridView = function(gridId, oProp) {
    this.id             = gridId;
    this.grid           = null;    // jqGrid instance
    this.prop           = {};      // jqGrid properties
    this.clickedRowData = null;
    this.rows           = null;
    this.checkRowIds    = [];      // checkbox checked 인 rowid 저장배열
    this.selectRowId    = null;    // 현재 선택된 rowid를 저장
    this.bChkAll        = false;   // multiselect, checkboxonly 일경우 전체선택여부
    this.view           = null;    // 연결된 view 

    $.extend(true, this.prop, CoreJqGridView.defaultProp);

    var _this = this;

    if (oProp) {
        if(!oProp.hasOwnProperty('onSelectRow')) {
            oProp.onSelectRow = function(rowId) {
                var rowData = _this.clickedRowData = this.p.data[this.p._index[rowId]];
                rowData.mode = 'U';
                if(typeof(_this.onSelectRow) == 'function') {
                    _this.onSelectRow(rowData);
                }
            }
        }
        this.prop = $.extend(true, this.prop, oProp);
    }

    // console.log('this.prop', this.prop);

    
    this.init().loadGrid();
    return this;
};
CoreJqGridView.defaultProp = {
    datatype   : "local", // xml, json, jsonp, array, xmlstring, jsonstring, local,  script, function(...)
    loadonce   : true, // 한번에 모든 데이터 로드
    search     : true,
    shrinkToFit: false, // true 인경우 그리드 width에 맞춰 자동으로 컬럼이 맞춰짐
    autowidth  : true, // rownumbers 표시 - true로 설정하면 격자 너비가 부모 요소의 너비에 자동으로 다시 계산됩니다. 그리드가 생성 될 때만 초기에 수행됩니다. 상위 요소가 너비를 변경할 때 격자 크기를 조정하려면 사용자 지정 코드를 적용하고이 목적으로 setGridWidth 메서드를 사용해야합니다
    resizable  : true, // 컬럼 사이즈를 자유자제로 조절할 수 있음
    rownumbers : true, // rownumber 가 보이게 한다.
    scrollrows : true, // row 선택시 스크롤링
    gridview   : true, // 처리속도를 빠르게 해준다. 시간측정시 절반가량 로딩시간 감소!!! 하지만 다음 모듈엔 사용할 수 없다!! ==> treeGrid, subGrid, afterInsertRow(event)
    viewrecords: true, // 총페이지 현재페이지 정보를 노출
    pager      : "#pager1",
    rowNum     : 1000, // 100 개씩 보여준다.
    rowList    : [10, 20, 30, 40, 50, 70, 100, 200, 300, 500, 1000],
    height     : 300,
    altRows    : true, // 한칸걸러 row 색넣기
    altclass   : "jqgrid-alt-class",
    colModel   : []
};
CoreJqGridView.prototype.init = function() {
    for (var i = 0; i < this.prop.colModel.length; i++) {
        this.prop.colModel[i]["sortable"] = false;
        if (this.prop.colModel[i].hasOwnProperty("name") == false) {
            break;
        }

        var bWidth = (this.prop.colModel[i].hasOwnProperty("width") == true);
        var iWidth = 100;
        var sAlign = "left";

        if (this.prop.colModel[i].hasOwnProperty("format") == true) {
            var sFormat = this.prop.colModel[i].format;
            switch (sFormat) {
                case "string": // 문자열
                    break;
                case "number": // 숫자
                    sAlign = "right";
                    this.prop.colModel[i].formatter = "integer";
                    break;
                case "tel_no": // 전화번호
                    sAlign = "center";
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.tel_no;
                    break;
                case "biz_no":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 80;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.biz_no;
                    break;
                case "card_no":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 120;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.card_no;
                    break;
                case "zip_no":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 60;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.zip_no;
                    break;
                case "money":
                    sAlign = "right";
                    if (!bWidth) {
                        iWidth = 80;
                    }
                    this.prop.colModel[i].formatter = "currency";
                    this.prop.colModel[i].formatoption = CoreJqGridView.formatoption.money;
                    break;
                case "currency":
                    sAlign = "right";
                    this.prop.colModel[i].formatter = "currency";
                    this.prop.colModel[i].formatoption = CoreJqGridView.formatoption.currency;
                    break;
                case "file_size":
                    sAlign = "right";
                    if (!bWidth) {
                        iWidth = 60;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.file_size;
                    break;
                case "date":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 80;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.date;
                    break;
                case "ym":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 70;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.ym;
                    break;
                case "ymdh":
                    sAlign = "center";
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.ymdh;
                    break;
                case "time":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 60;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.time;
                    break;
                case "dttm":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 150;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.dttm;
                    break;
                case "dttmms":
                    sAlign = "center";
                    if (!bWidth) {
                        iWidth = 170;
                    }
                    this.prop.colModel[i].formatter = CoreJqGridView.formatter.dttmms;
                    break;
            }

            if (true == this.prop.colModel[i].editable) {
                switch (this.prop.colModel[i].edittype) {
                    case "date":
                        var datepickerProp = {
                            changeYear: true,
                            changeMonth: true,
                            dateFormat: "yy-mm-dd",
                            yearRange: "c-100:c+10",
                            minDate: "-100y",
                            showAnim: "fadeIn",
                            onSelect: function() {
                                $(this).change();
                            }
                        };
                        this.prop.colModel[i].edittype = "text";
                        this.prop.colModel[i].editrules = { required: true };
                        this.prop.colModel[i].editoptions = {
                            dataInit: function(el) {
                                $(el).datepicker(datepickerProp);
                            }
                        };
                        break;
                    case "select":
                        this.prop.colModel[i].formatter = "select";
                        this.prop.colModel[i].editoptions = { value: this.prop.colModel[i].editoptions };
                        break;
                    case "checkbox":
                        this.prop.colModel[i].edittype = "checkbox";
                        this.prop.colModel[i].editoptions = { value: "Y:N" };
                        break;
                    default:
                        break;
                }
            }

            delete this.prop.colModel[i].format;
        }

        //  index 가 없다면 name 과 동일한 값으로
        if (this.prop.colModel[i].hasOwnProperty("index") == false) {
            this.prop.colModel[i].index = this.prop.colModel[i].name;
        }

        // width 가 없다면 100 기본값으로
        if (bWidth == false) {
            this.prop.colModel[i].width = iWidth;
        }

        // align 이 없다면 left 기본으로
        if (this.prop.colModel[i].hasOwnProperty("align") == false) {
            this.prop.colModel[i].align = sAlign;
        }
    }

    return this;
};
CoreJqGridView.prototype.loadGrid = function() {
    if (this.grid == null) {
        this.grid = $("#" + this.id).jqGrid(this.prop);
        if (this.prop.hasOwnProperty("height")) {
            $("#" + this.id).jqGrid("setGridHeight", this.prop.height);
            $("#gbox_" + this.id).css({
                "border-top": "2px solid #4F81BD",
                "box-shadow": "1px 1px 1px gray"
            });
        }
    } else {
        this.initGridData();
    }
    return this;
};
CoreJqGridView.prototype.bindGrid = function(oData) {
    this.showLoading();
    this.initGridData();
    $("#" + this.id).jqGrid("setGridParam", { data: oData });
    this.reload();
    this.hideLoading();
};
CoreJqGridView.prototype.showLoading = function() {
    $("#load_" + this.id).show();
};
CoreJqGridView.prototype.hideLoading = function() {
    $("#load_" + this.id).fadeOut(100);
};
CoreJqGridView.prototype.reload = function() {
    $("#" + this.id).trigger("reloadGrid"); // grid 다시로딩
    this.initClickedData();
    return this;
};
CoreJqGridView.prototype.initClickedData = function() {
    this.clickedRowData = null;
    return this;
};
CoreJqGridView.prototype.initGridData = function() {
    this.initClickedData();
    this.rows = null;
    this.checkRowIds = [];
    try {
        $("#" + this.id).jqGrid("clearGridData");
    } catch (e) {}
    this.bChkAll = false;
    return this;
};
CoreJqGridView.prototype.getCheckedRows = function() {
    var selectedIds = $("#" + this.id).getGridParam("selarrrow");
    var rtnRows = [];
    var _this = $("#" + this.id)[0];
    for (var i = 0; i < selectedIds.length; i++) {
        rtnRows.push(_this.p.data[_this.p._index[selectedIds[i]]]);
    }
    return rtnRows;
};
CoreJqGridView.prototype.setSum = function(option) {
    var grid = $("#" + this.id);
    var loSum = {};
    for (var i = 0; i < option.col.length; i++) {
        loSum[option.col[i]] = grid.jqGrid("getCol", option.col[i], false, "sum");
    }
    var loSumProp = {};
    $.extend(true, loSumProp, option.label);
    if (option.hasOwnProperty("label") == true) {
        for (key in option.label) {
            $("#gview_" + this.id + " .ui-jqgrid-ftable [aria-describedby=" + this.id + "_" + key + "]").css({ "text-align": "center" });
        }
        $.extend(true, loSumProp, option.label);
    }
    $.extend(true, loSumProp, loSum);
    grid.jqGrid("footerData", "set", loSumProp);
    $("#gview_" + this.id + " .ui-jqgrid-ftable [aria-describedby=" + this.id + "_servNm]").css({ "text-align": "center" });
    $("#gview_" + this.id + " div.ui-jqgrid-sdiv").after($("#gview_" + this.id + " div.ui-jqgrid-bdiv"));
    return this;
};
CoreJqGridView.prototype.setAvg = function(aoMap) {
    var grid = $("#" + this.id);
    var loAvg = {};
    for (var i = 0; i < aoMap.col.length; i++) {
        loAvg[aoMap.col[i]] = grid.jqGrid("getCol", aoMap.col[i], false, "avg");
    }
    var loAvgProp = {};
    if (aoMap.hasOwnProperty("label") == true) {
        $.extend(true, loAvgProp, aoMap.label);
    }
    $.extend(true, loAvgProp, loAvg);
    grid.jqGrid("footerData", "set", loAvgProp);
    return this;
};
CoreJqGridView.prototype.showCol = function(asr_col) {
    $("#" + this.id).jqGrid("showCol", asr_col);
    return this;
};
CoreJqGridView.prototype.hideCol = function(asr_col) {
    $("#" + this.id).jqGrid("hideCol", asr_col);
    return this;
};
CoreJqGridView.prototype.firstRowSelection = function() {
    var ids = $("#" + this.id).jqGrid("getDataIDs");
    if (ids && ids.length > 0) {
        $("#" + this.id).jqGrid("setSelection", ids[0]);
    }
};
// jqgrid 확장 - 콤보박스와 select 따로 작동 beforeSelectRow
// CoreJqGridView.prototype.beforeSelectRow = function(rowId,e) {
//     if(e.target.type == "checkbox" ) {
//         var gridId = this.id;
//         this.checkRowIds = [];
//         var lsrcheckRowIds = [];
//         $('input:checkbox:checked[id^="jqg_' + this.id + '"]').each(function() {
//             lsrcheckRowIds.push($(this).attr("id").replace("jqg_" + gridId + "_", ""));
//         });
//         this.checkRowIds = lsrcheckRowIds;
//         return false;
//     } else if(e.target.type == "radio" ) {
//         var rowIds = $("#" + this.id).jqGrid('getDataIDs');     // 전체 rowid 가져오기
//         this.checkRowIds = [];
//         for (var i = 0; i < rowIds.length; i++) {
//             if($("input:radio[id='jqg_" + this.id + "_" + rowIds[i] + "']").is(":checked")){
//                 this.checkRowIds = [rowIds[i]];
//             }
//         }
//         return false;
//     } else {
//         return true;
//     }
//
// };
//  jqgrid 확장 - 콤보박스와 select 따로 작동 onSelectRow
// CoreJqGridView.prototype.onSelectRow = function(rowId, status, e) {
//     $("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", false);
//     for (var i = 0; i < this.checkRowIds.length; i++) {
//         $("input:checkbox[id='jqg_" + this.id + "_" + this.checkRowIds[i] + "']").attr("checked", true);
//     }
//     this.selectRowId = rowId;
//     $("#cb_" + this.id).attr("checked", this.bChkAll);
//     return this;
// };
// jqgrid 확장 - 콤보박스와 select 따로 작동 onSelectAll
// CoreJqGridView.prototype.onSelectAll = function(aRowids,status) {
//     $("#" + this.id).resetSelection();
//     $("#" + this.id).setSelection(this.selectRowId, true);
//     this.bChkAll = status;
//     if(status == true) {
//         $("#cb_" + this.id).attr("checked", true);
//         $("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", true);
//         var rowIds = $("#" + this.id).jqGrid('getDataIDs');     // 전체 rowid 가져오기
//         this.checkRowIds = [];
//         for (var i = 0; i < rowIds.length; i++) {
//             if($("input:checkbox[id='jqg_" + this.id + "_" + rowIds[i] + "']").is(":checked")){
//                 this.checkRowIds.push(rowIds[i]);
//             }
//         }
//     } else {
//         $("#cb_" + this.id).attr("checked", false);
//         $("input:checkbox[id^=jqg_" + this.id + "_]").attr("checked", false);
//         this.checkRowIds = [];
//     }
//     return this;
// };
//jqgrid validation
CoreJqGridView.prototype.validateRow = function() {
    //각 행의 필수 값 검사해서 알림
    var ids = $("#" + this.id).jqGrid("getDataIDs");
    var colModel = $("#" + this.id).jqGrid("getGridParam", "colModel");
    for (var i = 0; i < ids.length; i++) {
        var rowData = $("#" + this.id).getRowData(ids[i]);
        for (var j = 0; j < colModel.length; j++) {
            if (colModel[j].editrules && colModel[j].editrules.required && rowData[colModel[j].name] == "") {
                $.Utils.alert((i + 1) + "번째 행 " + colModel[j].label + " 값을 입력하세요.");
                return false;
            }
        }
    }
    return true;
};


/**
 * 같은 row를 합쳐주는 함수
 */
$.fn.jqgridRowspan = function(colIndexs) {
    var model = [];
    // 각 column의 ID를 수집.
    $.each(this.getGridParam("colModel"), function(idx, value) {
        model.push(value.name);
    });
    var data = this.getCol(model[colIndexs]);
    var rowspanData = {};
    var current;
    var currentIDX = 0;
    $.each(data, function(idx, value) {
        if (current != value) {
            currentIDX = idx;
            rowspanData[currentIDX] = 1;
        } else {
            rowspanData[currentIDX]++;
        }
        current = value;
    });
    $("tbody tr", this).each(function(row) {
        var tmpIDx = 0;
        $("td", this).each(function(col, colObject) {
            if (col == colIndexs && row > 0) { // 0번째 row는 숨겨진 row다 이것 때문에 width가 깨지는 현상 발생
                if (rowspanData[row - 1]) {
                    tmpIDx = rowspanData[row - 1];
                } else {
                    tmpIDx = 0;
                }
                if (tmpIDx > 0) {
                    $(colObject).attr("rowspan", tmpIDx);
                } else {
                    $(colObject).addClass("hide");
                }
            }
        });
    });
};

CoreJqGridView.formatter = {};
CoreJqGridView.formatoption = {};

CoreJqGridView.formatter.date = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return $.Form.bindDate(cellvalue.toString()).formatDate();
};
CoreJqGridView.formatter.ym = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatYm();
};
CoreJqGridView.formatter.ymdh = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatDttm10();
};
CoreJqGridView.formatter.time = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatTime();
};
CoreJqGridView.formatter.dttm = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    var rtnValue = "";
    switch (cellvalue.toString().length) {
        case 6:
            rtnValue = $.Form.bindYm(cellvalue.toString()).formatYm();
            break;
        case 8:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDate();
            break;
        case 10:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDttm10();
            break;
        case 12:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDttm12();
            break;
        case 14:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDttm14();
            break;
        case 17:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDttm17();
            break;
        default:
            rtnValue = $.Form.bindDttm(cellvalue.toString()).formatDttm14();
            break;
    }
    return rtnValue;
};
CoreJqGridView.formatter.dttmms = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatDttm17();
};
CoreJqGridView.formatter.currency = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatNumber();
};
CoreJqGridView.formatter.qty = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatDecimal(3);
};
CoreJqGridView.formatter.tel_no = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatTelNo();
};
CoreJqGridView.formatter.card_no = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatCardNo();
};
CoreJqGridView.formatter.file_size = function(cellvalue, options, rowObject) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatBitUnit();
};
CoreJqGridView.formatter.biz_no = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatBizNo();
};
CoreJqGridView.formatter.zip_no = function(cellvalue) {
    if (!cellvalue) {
        cellvalue = "";
    }
    return cellvalue.toString().formatZipNo();
};
CoreJqGridView.formatoption.money = {

    decimalSeparator: ".",
    thousandsSeparator: ",",
    decimalPlaces: 0,
    prefix: "",
    suffix: "",
    defaulValue: 0

};

CoreJqGridView.formatoption.currency = {

    decimalSeparator: ".",
    thousandsSeparator: ",",
    decimalPlaces: 2,
    prefix: "",
    suffix: "",
    defaulValue: 0.00

};


$.extend({ JqGridView: CoreJqGridView });