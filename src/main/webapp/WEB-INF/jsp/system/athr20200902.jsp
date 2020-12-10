<%--
  ~ Developed by JAEYOUNG BAE on 19. 5. 13 오후 3:53.
  ~ Last modified 19. 5. 13 오후 1:22.
  ~ Copyright (c) 2019. All rights reserved.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <%@ include file="/WEB-INF/jsp/inc/inc_header_page.jsp" %>
    <script type="text/javascript" src="${contextPath}/js/custom/svc-crud.js"></script>
    <script type="text/javascript">

        var grid2, grid3, grid4, grid5;
        var menuType;
        var dialog1W = 700;
        var dialog1H = 500;
        var dialog2W = 1000;
        var dialog2H = 600;

        var crud = new svc.crud();

        function init() {

            var args                 = crud.getInitProp();
            args.name                = 'athr-crud';
            args.keys                = [ 'athrCd' ];
            args.panel.search.exist  = false;
            args.cmd.search.url      = '/system/athr/list';
            args.cmd.save.insert.url = '/system/athr/ins';
            args.cmd.save.update.url = '/system/athr/upd';
            args.cmd.delete.url      = '/system/athr/del';
            args.onSelectRowAfter    = athrOnSelectRow;

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

            args.grid.prop.colModel = svc.util.clone( colModel1 );

            crud.init( args );


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

            grid2 = new svc.grid( "grid2", gridProp2 );
            grid2.loadGrid();


            // grid3 - 권한-관리자
            var paramsMenuTp = { "grpCd": "MENU_TP" };
            svc.net.sjaxCall( "/system/cd/comboList", paramsMenuTp, function( result ) {
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
            colModel3.push( { label: '소속메뉴아이디'  , name: 'psMenuId'  , width: 100  , editable: true, edittype: 'text', editrules: { required: true } } );
            colModel3.push( { label: '소속메뉴명'      , name: 'psMenuNm'  , width: 120  , format: 'string' } );
            colModel3.push( { label: '메뉴아이디'      , name: 'menuId'    , width: 80    } );
            colModel3.push( { label: '메뉴명'          , name: 'menuNm'    , width: 100  , editable: true , edittype: 'text'     , format: 'string', editrules: { required: true } } );
            colModel3.push( { label: '메뉴유형'        , name: 'menuTp'    , width: 80   , editable: true , edittype: "select"   , editrules: { required: true }, formatter: "select", editoptions: { value: menuType } } );
            colModel3.push( { label: '실행명령'        , name: 'execCmd'   , width: 300  , editable: true , edittype: 'text'     , format: 'string' } );
            colModel3.push({label: '읽기', name: 'authR', width: 40, editable: true, edittype: 'checkbox', editoptions: {value: 'Y:N'}, align: 'center'});
            colModel3.push({label: '변경', name: 'authW', width: 40, editable: true, edittype: 'checkbox', editoptions: {value: 'Y:N'}, align: 'center'});
            colModel3.push({label: '삭제', name: 'authD', width: 40, editable: true, edittype: 'checkbox', editoptions: {value: 'Y:N'}, align: 'center'});
            colModel3.push({label: '인쇄', name: 'authP', width: 40, editable: true, edittype: 'checkbox', editoptions: {value: 'Y:N'}, align: 'center'});
            colModel3.push( { label: '메뉴레벨'        , name: 'menuLv'    , width: 60   , editable: true , format: 'number', editrules: { number: true, required: true } } );
            colModel3.push( { label: '정렬순번'        , name: 'sortSn'    , width: 60   , editable: true , format: 'number', editrules: { number: true, required: true } } );
            colModel3.push( { label: '사용여부'        , name: 'useYn'     , width: 60   , editable: true , edittype: 'checkbox', editoptions: { value: 'Y:N' }, align: 'center' } );

            var gridProp3         = {};
            gridProp3.colModel    = colModel3;
            gridProp3.shrinkToFit = false;
            gridProp3.multiselect = true;
            gridProp3.cellsubmit  = "clientArray";  // 클라이언트에서 처리
            gridProp3.cellEdit    = true;             // 셀의 값변경을 정함 트루하면 바껴짐
            gridProp3.pager       = "#pager3";
            grid3                 = new svc.grid( "grid3", gridProp3 );
            grid3.loadGrid();


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

            grid4 = new svc.grid( "grid4", gridProp4 );
            grid4.loadGrid();

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
            colModel5.push({ label: '메뉴레벨'       , name: 'menuLv'   , format: 'number', align: 'right' });
            colModel5.push({ label: '정렬순번'       , name: 'sortSn'   , format: 'number', align: 'right' });


            var gridProp5         = {};
            gridProp5.colModel    = colModel5;
            gridProp5.shrinkToFit = true;
            gridProp5.multiselect = true;
            gridProp5.pager       = "#pager5";

            grid5 = new svc.grid( "grid5", gridProp5 );
            grid5.loadGrid();
        }

        function editpanelBindComboAfterFunc() {
            crud.panel.edit.setData();
            doSearch();
        }

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

        function doSearch() {
            crud.search( function() {
                doNew();
            } );
        }

        function doNew() {
            crud.grid.obj.reload();
            var params = {
                sortSn: ( $( "#grid1" ).jqGrid( 'getDataIDs' ).length + 1 ) * 10
            };
            crud.panel.edit.init( params );
            grid2.initGridData();
            grid3.initGridData();
            $( '#edit-panel input[name=athrCd]' ).timeFocus( 300 );
        }

        // 권한 선택시
        function athrOnSelectRow() {
            doSearch2();
            doSearch3();
        }

        // 권한 저장
        function doSave() {
            crud.save( function() {
                doSearch()
            } );
        }

        // 권한 삭제
        function doDelete() {
            crud.delete( function() {
                doSearch()
            } );
        }

        // 권한-관리자 목록 조회
        function doSearch2() {
            var params = crud.grid.obj.clickedRowData;
            svc.net.ajaxJqGrid( grid2, '/system/athr/selAthrMngrList', params );
        }

        // 권한-관리자 등록 팝업 오픈
        function doNew2() {
            if( crud.grid.obj.clickedRowData == null ) {
                svc.ui.alert( '관리자를 등록하시려면 먼저 왼쪽 권한목록에서 권한을 선택하세요.' );
                return;
            }
            var dialogProp = $.extend( true, {}, svc.ui.dialogProp );
            $.extend( true, dialogProp, {
                title : '권한-관리자 등록',
                width : dialog1W,
                height: dialog1H,
                open  : function() {
                    doQueryDialog1();
                }
            } );
            $( "#dialogAthrMngr" ).svcDialog( dialogProp );

        }

        // 팝업창에서 권한 관리자 조회
        function doQueryDialog1() {
            var params    = {};
            params.athrCd = crud.grid.obj.clickedRowData.athrCd;
            svc.net.ajaxJqGrid( grid4, "/system/athr/selAthrMngrPopupList", params, function( result ) {
            } );
        }

        // 팝업창에서 관리자 선택 저장
        function doSaveDialog1() {
            var selectedIds = $( "#grid4" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                svc.ui.alert( '선택한 관리자가 없습니다. 권한에 등록할 관리자를 선택하세요' );
                return;
            }

            var athrMngrList = [];

            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid4" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = crud.grid.obj.clickedRowData.athrCd;
                paramMap.mngrId  = selectedData.mngrId;
                athrMngrList.push( paramMap );
            }

            svc.ui.confirm( '선택하신 관리자를 권한[{0}]에 등록하시겠습니까?'.replaceAll( "{0}", crud.grid.obj.clickedRowData.athrNm ), function() {
                svc.net.ajaxList( "/system/athr/insAthrMngrList", athrMngrList, function( result ) {
                    if( result.resultCd == "00" ) {
                        doSearch2();
                        doQueryDialog1();
                        $( '#dialogAthrMngr' ).dialog( 'close' );
                    }
                } );
            } );

        }

        // 권한-관리자 목록 삭제
        function doDelete2() {
            var selectedIds = $( "#grid2" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                svc.ui.alert( '선택한 관리자가 없습니다. 권한에 삭제할 관리자를 선택하세요' );
                return;
            }
            var athrMngrList = [];
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid2" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = crud.grid.obj.clickedRowData.athrCd;
                paramMap.mngrId  = selectedData.mngrId;
                athrMngrList.push( paramMap );
            }
            svc.ui.confirm( '선택하신 관리자를 권한[{0}]에서 삭제하시겠습니까?'.replaceAll( "{0}", crud.grid.obj.clickedRowData.athrNm ), function() {
                svc.net.ajaxList( "/system/athr/delAthrMngrList", athrMngrList, function( result ) {
                    if( result.resultCd == "00" ) {
                        doSearch2();
                        doQueryDialog1();
                    }
                } );
            } );

        }

        // 권한-메뉴 목록 조회
        function doSearch3() {
            var params = crud.grid.obj.clickedRowData;
            svc.net.ajaxJqGrid( grid3, '/system/athr/selAthrMenuList', params );
        }

        // 권한-메뉴 등록 팝업 open
        function doNew3() {
            if( crud.grid.obj.clickedRowData == null ) {
                svc.ui.alert( '메뉴를 등록하시려면 먼저 왼쪽 권한조회에서 권한을 선택하세요.' );
                return;
            }
            var dialogProp = $.extend( true, {}, svc.ui.dialogProp );
            $.extend( true, dialogProp, {
                title : '권한-메뉴 등록',
                width : dialog2W,
                height: dialog2H,
                open  : function() {
                    doQueryDialog2();
                }
            } );
            $( "#dialogAthrMenu" ).dialog( dialogProp );
        }

        // 권한-메뉴 다이얼로그 선택 저장
        function doSave3() {
            var selectedIds = $( "#grid3" ).getGridParam( 'selarrrow' );
            if( selectedIds.length == "0" ) {
                svc.ui.alert( '저장할 데이타를 먼저 추가해주세요.' );
                return;
            }
            //에디트 0,0으로 grid를 속인다.
            $( "#grid3" ).editCell( 0, 0, true );
            //validateRow 체크
            if( !grid2.validateRow() ) {
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
            svc.ui.confirm( '해당 메뉴를 저장하시겠습니까?', function() {
                svc.net.ajaxList( "/system/athr/updAthrMenuList", athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        doSearch3();
                    }
                } );
            } );
        }

        function doDelete3() {
            var selectedIds = $( "#grid3" ).getGridParam( "selarrrow" );
            if( selectedIds.length == 0 ) {
                svc.ui.alert( '선택한 메뉴가 없습니다. 권한에 삭제할 메뉴를 선택하세요' );
                return;
            }
            var athrMenuList = [];
            for( var i = 0; i < selectedIds.length; i++ ) {
                var selectedData = $( "#grid3" ).getRowData( selectedIds[ i ] );
                var paramMap     = {};
                paramMap.athrCd  = crud.grid.obj.clickedRowData.athrCd;
                paramMap.menuId  = selectedData.menuId;
                athrMenuList.push( paramMap );
            }
            svc.ui.confirm( '선택하신 메뉴를 권한[{0}]에서 삭제하시겠습니까?'.replaceAll( "{0}", crud.grid.obj.clickedRowData.athrNm ), function() {
                svc.net.ajaxList( "/system/athr/delAthrMenuList", athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        doSearch3();
                        doQueryDialog2();
                    }
                } );
            } );
        }

        function doQueryDialog2() {

            var params    = {};
            params.athrCd = crud.grid.obj.clickedRowData.athrCd;

            svc.net.ajaxJqGrid( grid5, "/system/athr/selAthrMenuPopupList", params, function( result ) {

            } );
        }

        /*****************************************************
         * 함수명: 팝업창에서 메뉴 선택 저장
         * 설명   :
         *****************************************************/
        function doSaveDialog2() {

            var selectedIds = $( "#grid5" ).getGridParam( "selarrrow" );

            if( selectedIds.length == 0 ) {

                svc.ui.alert( '선택한 메뉴가 없습니다. 권한에 등록할 메뉴를 선택하세요' );
                return;

            }

            var athrMenuList = [];

            for( var i = 0; i < selectedIds.length; i++ ) {

                var selectedData = $( "#grid5" ).getRowData( selectedIds[ i ] );

                var paramMap = {};

                paramMap.athrCd = crud.grid.obj.clickedRowData.athrCd;
                paramMap.menuId = selectedData.menuId;

                athrMenuList.push( paramMap );

            }

            svc.ui.confirm( '선택하신 메뉴를 권한[{0}]에 등록하시겠습니까?'.replaceAll( "{0}", crud.grid.obj.clickedRowData.athrNm ), function() {
                svc.net.ajaxList( "/system/athr/insAthrMenuList", athrMenuList, function( result ) {
                    if( result.resultCd == "00" ) {
                        doSearch3();
                        doQueryDialog2();
                        $( '#dialogAthrMenu' ).dialog( 'close' );
                    }
                } );
            } );

        }

    </script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div class="wrap-21-tp02">

        <div class="title-panel">
            <h3 class="style-title">권한 정보</h3>
            <div class="button-bar">
                <button type="button" class="small button" data-auth="R" onclick="doSearch()">조회</button>
                <button type="button" class="small button green" data-auth="W" onclick="doNew()">신규</button>
                <button type="button" class="small button blue" data-auth="W" onclick="doSave()">저장</button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete()">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I" />
            <div>
                <dl>
                    <dt>권한코드</dt>
                    <dd><input type="text" name="athrCd" data-title='권한코드' class="form-input-text width120" data-mode-style="enable" data-command="doSave()" data-required /></dd>
                    <dt>권한명</dt>
                    <dd><input type="text" name="athrNm" data-title='권한명' class="form-input-text width120" data-command="doSave()" data-required /></dd>
                </dl>
                <dl>
                    <dt>정렬순번</dt>
                    <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="doSave()" data-required /></dd>
                    <dt>사용여부</dt>
                    <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                </dl>
                <dl>
                    <dt>비고</dt>
                    <dd>
                        <div data-colspan="2-4">
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="doSave()" />
                        </div>
                    </dd>
                </dl>
            </div>
        </div>
        <%--  // edit-panel  --%>

        <div class="title-panel">
            <h3 class="style-title"><span name="title">권한 목록</span></h3>
        </div>
        <%--  // grpCd grid title-panel  --%>

        <div class="wrap-grid">
            <table id="grid1"></table>
            <div id="pager1"></div>
        </div>
        <%-- // 권한 그리드 --%>

    </div>
    <div class="wrap-22-tp02">

        <div class="title-panel">
            <h3 class="style-title">권한-관리자 목록</h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" onclick="doNew2()">등록</button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete2()">삭제</button>
            </div>
        </div>
        <!-- //title-panel -->

        <div class="wrap-grid mgb10">
            <table id="grid2"></table>
            <div id="pager2"></div>
        </div>
        <%-- // 권한-관리자 그리드 --%>

        <div class="title-panel">
            <h3 class="style-title">권한-메뉴 목록</h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" onclick="doNew3()">등록</button>
                <button type="button" class="small button blue" onclick="doSave3()">선택항목저장</button>
                <button type="button" class="small button red" onclick="doDelete3()">삭제</button>
            </div>
        </div>
        <!-- //title-panel -->

        <div class="wrap-grid">
            <table id="grid3"></table>
            <div id="pager3"></div>
        </div>
        <!-- 권한-메뉴 그리드 -->

    </div>

</div>

<div id="dialogAthrMngr" class="dialog none">

    <!-- 버튼 시작 -->
    <div class="button-bar">
        <button type="button" class="small button" onclick="doQueryDialog1()">조회</button>
        <button type="button" class="small button blue" onclick="doSaveDialog1()">저장</button>
        <button type="button" class="small button red" onclick="$('#dialogAthrMngr').dialog('close')">닫기</button>
    </div>
    <!-- 버튼 끝 -->

    <!-- grid -->
    <div class="wrap-grid">
        <table id="grid4"></table>
        <div id="pager4"></div>
    </div>

</div>

<div id="dialogAthrMenu" class="dialog none">

    <!-- 버튼 시작 -->
    <div class="button-bar">
        <button type="button" class="small button" onclick="doQueryDialog2()">조회</button>
        <button type="button" class="small button blue" onclick="doSaveDialog2()">저장</button>
        <button type="button" class="small button red" onclick="$('#dialogAthrMenu').dialog('close')">닫기</button>
    </div>
    <!-- 버튼 끝 -->

    <!-- grid -->
    <div class="wrap-grid">
        <table id="grid5"></table>
        <div id="pager5"></div>
    </div>

</div>

</body>
</html>