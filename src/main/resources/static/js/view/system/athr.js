var menuType;
var dialog1W = 700;
var dialog1H = 500;
var dialog2W = 1000;
var dialog2H = 600;

var controller = new $.Controller({
    url: {
        list1:'/system/athr/list',
        ins1:'/system/athr/ins',
        upd1:'/system/athr/upd',
        del1:'/system/athr/del',
        list2:'/system/athr/selAthrMngrList',
        ins2:'/system/athr/insAthrMngrList',
        upd2:'/system/athr/updAthrMngrList',
        del2:'/system/athr/delAthrMngrList',
        list3:'/system/athr/selAthrMenuList',
        ins3:'/system/athr/insAthrMenuList',
        upd3:'/system/athr/updAthrMenuList',
        del3:'/system/athr/delAthrMenuList',
        listDialog1:'/system/athr/selAthrMngrPopupList',
        listDialog2:'/system/athr/selAthrMenuPopupList'
    },
    buttonInfo: function() {
        this.buttonSelector = {
            search1      : 'button[data-exec=exec-search1]',
            new1         : 'button[data-exec=exec-new1]',
            save1        : 'button[data-exec=exec-save1]',
            delete1      : 'button[data-exec=exec-delete1]',
            new2         : 'button[data-exec=exec-new2]',
            delete2      : 'button[data-exec=exec-delete2]',
            new3         : 'button[data-exec=exec-new3]',
            save3        : 'button[data-exec=exec-save3]',
            delete3      : 'button[data-exec=exec-delete3]',
            searchDialog1: 'button[data-exec=exec-search-dialog1]',
            saveDialog1  : 'button[data-exec=exec-save-dialog1]',
            closeDialog1 : 'button[data-exec=exec-close-dialog1]',
            searchDialog2: 'button[data-exec=exec-search-dialog2]',
            saveDialog2  : 'button[data-exec=exec-save-dialog2]',
            closeDialog2 : 'button[data-exec=exec-close-dialog2]'
        }
        this.button = {};
        for(var key in this.buttonSelector) {
            this.button[key] = $(this.buttonSelector[key]);
        }
    },
    start: function() {
        this.buttonInfo();
        this.eventInit();
        this.doSearch1();
    },
    eventInit: function() {
        var _this = this;

        /** 권한 조회 **/
        $(document).on('click', this.buttonSelector.search1, function() {
            $.Net.ajaxJqGrid(controller.grid1, _this.url.list1, {}, function() {
                _this.doNew1();
            });
        });

        /** 권한 신규 **/
        $(document).on('click', this.buttonSelector.new1, function() {
             console.log('new1');
            _this.grid1.reload();
            _this.viewEdit.init({
                                    sortSn: ( $( "#grid1" ).jqGrid( 'getDataIDs' ).length + 1 ) * 10
                               });
            _this.grid2.initGridData();
            _this.grid3.initGridData();
            $( '#edit-panel input[name=athrCd]' ).timeFocus( 300 );
        });

        /** 권한 저장 **/
        $(document).on('click', this.buttonSelector.save1, function() {
            if(_this.viewEdit.elem.validateForm()) {
                $.Utils.confirm('저장하시겠습니까?', function() {
                    var params = _this.viewEdit.flush();
                    var url = (params.mode == 'I') ? _this.url.ins1 : _this.url.upd1;
                    $.Net.ajaxCall(url, params, function() {
                        // $.Utils.alert('저장되었습니다.');
                        _this.doSearch1();
                    });
                });
            }
        });

        /** 권한 삭제 **/
        $(document).on('click', this.buttonSelector.delete1, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('삭제할 행을 선택하세요');
                return;
            }
            $.Utils.confirm('선택하신 권한을 삭제하시면 소속된 모든 관리자,메뉴가 삭제됩니다. 정말로 삭제하시겠습니까?', function() {
                var params = _this.viewEdit.flush();
                var url = _this.url.del1;
                $.Net.ajaxCall(url, params, function() {
                    // $.Utils.alert('삭제되었습니다.');
                    _this.doSearch1();
                });
            });
        });

        /** 권한-관리자 등록 **/
        $(document).on('click', this.buttonSelector.new2, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('관리자를 등록하시려면 먼저 왼쪽 권한목록에서 권한을 선택하세요.');
                return;
            }
            var dialogProp = $.Const.getDialogProp();
            $.extend(true, dialogProp, {
                title : '권한-관리자 등록',
                width : dialog1W,
                height: dialog1H,
                open  : function() {
                            _this.doQueryDialog1();
                        }
            });
            $( "#dialogAthrMngr" ).svcDialog( dialogProp );
        });

        /** 권한-관리자 삭제 **/
        $(document).on('click', this.buttonSelector.delete2, function() {
            var selectedIds = $( "#grid2" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                $.Utils.alert( '선택한 관리자가 없습니다. 권한에 삭제할 관리자를 선택하세요' );
                return;
            }
            var athrMngrList = [];
            var grid1Data = _this.grid1.clickedRowData;
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid2" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = grid1Data.athrCd;
                paramMap.mngrId  = selectedData.mngrId;
                athrMngrList.push( paramMap );
            }
            $.Utils.confirm( '선택하신 관리자를 권한[{0}]에서 삭제하시겠습니까?'.replaceAll( "{0}", grid1Data.athrNm ), function() {
                var url = _this.url.del2;
                $.Net.ajaxList( url, athrMngrList, function( result ) {
                    if( result.resultCd == "00" ) {
                        _this.doSearch2();
                        _this.doQueryDialog1();
                    }
                } );
            });
        });

        /** 권한-관리자 등록 팝업 조회 **/
        $(document).on('click', this.buttonSelector.searchDialog1, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('관리자를 등록하시려면 먼저 왼쪽 권한목록에서 권한을 선택하세요.');
                return;
            }
            _this.doQueryDialog1();
        });

        /** 권한-관리자 등록 팝업 저장 **/
        $(document).on('click', this.buttonSelector.saveDialog1, function() {
            var selectedIds = $( "#grid4" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                $.Utils.alert( '선택한 관리자가 없습니다.\n권한에 등록할 관리자를 선택하세요' );
                return;
            }
            var athrMngrList = [];
            var grid1Data = _this.grid1.clickedRowData;
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid4" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = grid1Data.athrCd;
                paramMap.mngrId  = selectedData.mngrId;
                athrMngrList.push( paramMap );
            }
            // console.log('athrMngrList', athrMngrList);
            $.Utils.confirm( '선택하신 관리자를 권한[{0}]에 등록하시겠습니까?'.replaceAll( "{0}", grid1Data.athrNm ), function() {
                var url = _this.url.ins2;
                $.Net.ajaxList( url, athrMngrList, function( result ) {
                    if( result.resultCd == "00" ) {
                        _this.doSearch2();
                        _this.doQueryDialog1();
                        _this.button.closeDialog1.trigger('click');
                    }
                } );
            });
        });

        /** 권한-관리자 등록 팝업 닫기 **/
        $(document).on('click', this.buttonSelector.closeDialog1, function() {
            $('#dialogAthrMngr').dialog('close');
        });

        /** 권한-메뉴 등록 **/
        $(document).on('click', this.buttonSelector.new3, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('관리자를 등록하시려면 먼저 왼쪽 권한목록에서 권한을 선택하세요.');
                return;
            }
            var dialogProp = $.Const.getDialogProp();
            $.extend(true, dialogProp, {
                title : '권한-메뉴 등록',
                width : dialog2W,
                height: dialog2H,
                open  : function() {
                            _this.doQueryDialog2();
                        }
            });
            $( "#dialogAthrMenu" ).svcDialog( dialogProp );
        });

        /** 권한-메뉴 선택항목저장 **/
        $(document).on('click', this.buttonSelector.save3, function() {
            var selectedIds = $( "#grid3" ).getGridParam( 'selarrrow' );
            if( selectedIds.length == "0" ) {
                $.Utils.alert( '저장할 데이타를 먼저 추가해주세요.' );
                return;
            }
            //에디트 0,0으로 grid를 속인다.
            $( "#grid3" ).editCell( 0, 0, true );
            //validateRow 체크
            if( !_this.grid3.validateRow() ) {
                return;
            }
            for( i = 0; i < selectedIds.length; i++ ) {
                $( "#grid3" ).jqGrid( 'saveRow', selectedIds[ i ], true );
            }
            var athrMenuList = [];
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid3" ).getRowData( selectedIds[ i ] );
                athrMenuList.push( selectedData );
            }
            $.Utils.confirm( '해당 메뉴를 저장하시겠습니까?', function() {
                var url = _this.url.upd3;
                $.Net.ajaxList( url, athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        _this.doSearch3();
                    }
                } );
            } );
        });

        /** 권한-메뉴 삭제 **/
        $(document).on('click', this.buttonSelector.delete3, function() {
            var selectedIds = $( "#grid3" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                $.Utils.alert( '선택한 메뉴가 없습니다. 권한에 삭제할 메뉴를 선택하세요' );
                return;
            }
            var athrMenuList = [];
            var grid1Data = _this.grid1.clickedRowData;
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid3" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = grid1Data.athrCd;
                paramMap.menuId  = selectedData.menuId;
                athrMenuList.push( paramMap );
            }
            $.Utils.confirm( '선택하신 메뉴를 권한[{0}]에서 삭제하시겠습니까?'.replaceAll( "{0}", grid1Data.athrNm ), function() {
                var url = _this.url.del3;
                $.Net.ajaxList( url, athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        _this.doSearch3();
                    }
                } );
            } );
        });

        /** 권한-메뉴 등록 팝업 조회 **/
        $(document).on('click', this.buttonSelector.searchDialog2, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('메뉴를 등록하시려면 먼저 왼쪽 권한목록에서 권한을 선택하세요.');
                return;
            }
            _this.doQueryDialog2();
        });

        /** 권한-메뉴 등록 팝업 저장 **/
        $(document).on('click', this.buttonSelector.saveDialog2, function() {
            var selectedIds = $( "#grid5" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                $.Utils.alert( '선택한 메뉴가 없습니다. 권한에 등록할 메뉴를 선택하세요' );
                return;
            }
            var athrMenuList = [];
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid5" ).getRowData( selectedIds[ i ] );
                var paramMap = {};
                paramMap.athrCd = _this.grid1.clickedRowData.athrCd;
                paramMap.menuId = selectedData.menuId;
                athrMenuList.push( paramMap );
            }
            $.Utils.confirm( '선택하신 메뉴를 권한[{0}]에 등록하시겠습니까?'.replaceAll( "{0}", _this.grid1.clickedRowData.athrNm ), function() {
                var url = _this.url.ins3;
                $.Net.ajaxList( url, athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        _this.doSearch3();
                        _this.doQueryDialog2();
                        $( '#dialogAthrMenu' ).dialog( 'close' );
                    }
                } );
            } );
        });

        /** 권한-메뉴 등록 팝업 닫기 **/
        $(document).on('click', this.buttonSelector.closeDialog2, function() {
            $('#dialogAthrMenu').dialog('close');
        });

    },
    doNew1: function() {
        this.button.new1.trigger('click');
    },
    doSearch1: function() {
        this.button.search1.trigger('click');
    },
    doSave1: function() {
        this.button.save1.trigger('click');
    },
    /** 권한-관리자 목록 조회 **/
    doSearch2: function() {
        var params = this.grid1.clickedRowData;
        var url = this.url.list2;
        $.Net.ajaxJqGrid( this.grid2, url, params );
    },
    /** 권한-메뉴 목록 조회 **/
    doSearch3: function() {
        var params = this.grid1.clickedRowData;
        var url = this.url.list3;
        $.Net.ajaxJqGrid( this.grid3, url, params );
    },
    /** 권한-관리자 팝업내 목록 조회 **/
    doQueryDialog1: function() {
        var url = this.url.listDialog1;
        var params = {athrCd:this.grid1.clickedRowData.athrCd};
        $.Net.ajaxJqGrid( this.grid4, url, params, function( result ) {
        });
    },
    doQueryDialog2: function() {
        var url = this.url.listDialog2;
        var params = {athrCd:this.grid1.clickedRowData.athrCd};
        $.Net.ajaxJqGrid( this.grid5, url, params, function( result ) {
        });
    }
});

$(function() {

    // grid1 - Athr Grid
    var colModel1 = [];
    colModel1.push({ label: '사용여부' , name: 'useYn'   , hidden: true });
    colModel1.push({ label: '등록자'   , name: 'regId'   , hidden: true });
    colModel1.push({ label: '수정자'   , name: 'chgId'   , hidden: true });
    colModel1.push({ label: '등록일시' , name: 'regDttm' , hidden: true });
    colModel1.push({ label: '수정일시' , name: 'chgDttm' , hidden: true });
    colModel1.push({ label: '권한코드' , name: 'athrCd'   });
    colModel1.push({ label: '권한명'   , name: 'athrNm'   });
    colModel1.push({ label: '정렬순번' , name: 'sortSn'  , format: 'number', align: 'right' });
    colModel1.push({ label: '사용여부' , name: 'useYnNm'    });
    colModel1.push({ label: '비고'     , name: 'rm'      , width: 200 });
    var gridProp1 = {};
    gridProp1.colModel = colModel1;
    controller.grid1 = new $.JqGridView('grid1', gridProp1);
    controller.grid1.onSelectRow = function(data) {
        controller.viewEdit.bind(data);
        controller.doSearch2();
        controller.doSearch3();
    };

    // grid2 - 권한-관리자
    var colModel2 = [];
    colModel2.push({ label: '권한코드'     , name: 'athrCd'  , hidden: true });
    colModel2.push({ label: '관리자아이디' , name: 'mngrId'  , width: 150 });
    colModel2.push({ label: '관리자명'     , name: 'mngrNm'  , width: 200 });
    colModel2.push({ label: '이메일'       , name: 'email'   , width: 250 });
    colModel2.push({ label: '휴대폰번호'   , name: 'hpNo'    , width: 150    , format: 'tel_no' });
    var gridProp2         = {};
    gridProp2.colModel    = colModel2;
    gridProp2.multiselect = true;
    gridProp2.height      = 150;
    gridProp2.pager       = "#pager2";
    controller.grid2 = new $.JqGridView('grid2', gridProp2);
    controller.grid2.onSelectRow = function(data) {
        
    };

    // grid3 - 권한-관리자
    var paramsMenuTp = { "grpCd": "MENU_TP" };
    $.Net.sjaxCall( "/system/cd/comboList", paramsMenuTp, function( result ) {
        if( result.resultData.length > 0 ) {
            menuType = "";
            for( var i = 0; i < result.resultData.length; i++ ) {
                if( i == result.resultData.length - 1 ) {
                    menuType += result.resultData[ i ].cd + ":" + result.resultData[ i ].cdNm;
                } else {
                    menuType += result.resultData[ i ].cd + ":" + result.resultData[ i ].cdNm + ";";
                }
            }
        }
    } );
    //권한-메뉴 그리드 생성
    var colModel3 = [];
    colModel3.push( { label: '권한코드'        , name: 'athrCd'    , hidden: true } );
    colModel3.push( { label: '소속메뉴아이디'  , name: 'psMenuId'  , width: 100  , editable: true, edittype: 'text' } );
    colModel3.push( { label: '소속메뉴명'      , name: 'psMenuNm'  , width: 120  , format: 'string' } );
    colModel3.push( { label: '메뉴아이디'      , name: 'menuId'    , width: 80    } );
    colModel3.push( { label: '메뉴명'          , name: 'menuNm'    , width: 100  , editable: true , edittype: 'text'     , format: 'string', editrules: { required: true } } );
    colModel3.push( { label: '메뉴유형'        , name: 'menuTp'    , width: 80   , editable: true , edittype: "select"   , editrules: { required: true }, formatter: "select", editoptions: { value: menuType } } );
    colModel3.push( { label: '실행명령'        , name: 'execCmd'   , width: 300  , editable: true , edittype: 'text'     , format: 'string' } );
    colModel3.push( { label: '읽기'            , name: 'authR'     , width: 40   , editable: true , edittype: 'checkbox' , editoptions: {value: 'Y:N'} , align: 'center'});
    colModel3.push( { label: '변경'            , name: 'authW'     , width: 40   , editable: true , edittype: 'checkbox' , editoptions: {value: 'Y:N'} , align: 'center'});
    colModel3.push( { label: '삭제'            , name: 'authD'     , width: 40   , editable: true , edittype: 'checkbox' , editoptions: {value: 'Y:N'} , align: 'center'});
    colModel3.push( { label: '인쇄'            , name: 'authP'     , width: 40   , editable: true , edittype: 'checkbox' , editoptions: {value: 'Y:N'} , align: 'center'});
    colModel3.push( { label: '메뉴레벨'        , name: 'menuLv'    , width: 60   , editable: true , format: 'number'     , editrules: { number: true , required: true } });
    colModel3.push( { label: '정렬순번'        , name: 'sortSn'    , width: 60   , editable: true , format: 'number'     , editrules: { number: true , required: true } });
    colModel3.push( { label: '사용여부'        , name: 'useYn'     , width: 60   , editable: true , edittype: 'checkbox' , editoptions: {value: 'Y:N' }, align: 'center'});
    var gridProp3         = {};
    gridProp3.colModel    = colModel3;
    gridProp3.shrinkToFit = false;
    gridProp3.multiselect = true;
    gridProp3.cellsubmit  = "clientArray";    // 클라이언트에서 처리
    gridProp3.cellEdit    = true;             // 셀의 값변경을 정함 트루하면 바껴짐
    gridProp3.pager       = "#pager3";
    controller.grid3 = new $.JqGridView('grid3', gridProp3);
    controller.grid3.onSelectRow = function(data) {

    };

    //권한-관리자 팝업 그리드 생성
    var colModel4 = [];
    colModel4.push({ label: '관리자아이디'       , name: 'mngrId'      , width: 100 });
    colModel4.push({ label: '관리자명'           , name: 'mngrNm'      , width: 120 });
    colModel4.push({ label: '이메일'             , name: 'email'       , width: 200 });
    colModel4.push({ label: '휴대폰번호'         , name: 'hpNo'        , width: 200 , format: 'tel_no' });
    var gridProp4         = {};
    gridProp4.colModel    = colModel4;
    gridProp4.shrinkToFit = false;
    gridProp4.multiselect = true;
    gridProp4.pager       = "#pager4";
    controller.grid4 = new $.JqGridView('grid4', gridProp4);
    controller.grid4.onSelectRow = function(data) {

    };

    //권한-메뉴 팝업 그리드 생성
    var colModel5 = [];
    colModel5.push({ label: '메뉴유형'       , name: 'menuTp'   , hidden: true });
    colModel5.push({ label: '사용여부'       , name: 'useYn'    , hidden: true });
    colModel5.push({ label: '소속메뉴아이디' , name: 'psMenuId' , hidden: true });
    colModel5.push({ label: '메뉴아이디'     , name: 'menuId'    });
    colModel5.push({ label: '소속메뉴명'     , name: 'psMenuNm'  } );
    colModel5.push({ label: '메뉴명'         , name: 'menuNm'    });
    colModel5.push({ label: '메뉴유형'       , name: 'menuTpNm'  });
    colModel5.push({ label: '실행명령'       , name: 'execCmd'   });
    colModel5.push({ label: '메뉴레벨'       , name: 'menuLv'   , format: 'number' });
    colModel5.push({ label: '정렬순번'       , name: 'sortSn'   , format: 'number' });
    var gridProp5         = {};
    gridProp5.colModel    = colModel5;
    gridProp5.shrinkToFit = true;
    gridProp5.multiselect = true;
    gridProp5.pager       = "#pager5";
    controller.grid5 = new $.JqGridView('grid5', gridProp5);
    controller.grid5.onSelectRow = function(data) {

    };

    controller.viewEdit = new $.View({ id: 'edit-panel', name: 'edit-panel' });

     controller.addGridView([
        controller.grid1,
        controller.grid2,
        controller.grid3,
        controller.grid4,
        controller.grid5
    ]).addView([
        controller.viewEdit
    ]);
    controller.init();

    localResize();

});

function localResize() {
    var height1 = $( window ).height() - 277;
    $( "#grid1" ).jqGrid( "setGridHeight", height1 );

    var height3 = $( window ).height() - 393;
    $( "#grid3" ).jqGrid( "setGridHeight", height3 );

    $( "#grid4" ).jqGrid( 'setGridWidth', dialog1W - 2 );
    $( "#grid4" ).jqGrid( 'setGridHeight', dialog1H - 140 );
    $( "#grid5" ).jqGrid( 'setGridWidth', dialog2W - 2 );
    $( "#grid5" ).jqGrid( 'setGridHeight', dialog2H - 140 );
    $( ".ui-jqgrid-pager" ).css( 'width', '100%' );
}