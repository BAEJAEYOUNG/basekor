<%--
  ~ Developed by JAEYOUNG BAE on 19. 4. 17 오전 10:22.
  ~ Last modified 19. 4. 17 오전 10:22.
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

        var crud = new svc.crud();

        function init() {

            var args = crud.getInitProp();
            args.name = 'crud';
            args.keys = ['menuId'];
            args.cmd.key.url = '/system/menu/selKey';
            args.cmd.search.url = '/system/menu/list';
            args.cmd.save.insert.url = '/system/menu/ins';
            args.cmd.save.update.url = '/system/menu/upd';
            args.cmd.delete.url = '/system/menu/del';

            var colModel = [];
            colModel.push({ label: '소속메뉴아이디' , name: 'psMenuId' , hidden: true });
            colModel.push({ label: '메뉴유형'       , name: 'menuTp'   , hidden: true });
            colModel.push({ label: '사용여부'       , name: 'useYn'    , hidden: true });
            colModel.push({ label: '등록자'         , name: 'regId'    , hidden: true });
            colModel.push({ label: '수정자'         , name: 'chgId'    , hidden: true });
            colModel.push({ label: '메뉴아이디'     , name: 'menuId'    });
            colModel.push({ label: '소속메뉴명'     , name: 'psMenuNm'  });
            colModel.push({ label: '메뉴명'         , name: 'menuNm'    });
            colModel.push({ label: '메뉴유형'       , name: 'menuTpNm'  });
            colModel.push({ label: '실행명령'       , name: 'execCmd'   });
            colModel.push({ label: '메뉴레벨'       , name: 'menuLv'   , format: 'number' });
            colModel.push({ label: '정렬순번'       , name: 'sortSn'   , format: 'number' });
            colModel.push({ label: '사용여부'       , name: 'useYnNm'   });
            colModel.push({ label: '등록일시'       , name: 'regDttm'  , format: 'dttm' });
            colModel.push({ label: '등록자'         , name: 'regNm'     });
            colModel.push({ label: '수정일시'       , name: 'chgDttm'  , format: 'dttm' });
            colModel.push({ label: '수정자'         , name: 'chgNm'     });
            args.grid.prop.colModel = svc.util.clone( colModel );

            crud.init( args );

        }

        function localResize() {
            var height = $( window ).height() - 330;
            $( "#grid1" ).jqGrid( "setGridHeight", height );
        }

        function editpanelBindComboAfterFunc() {
            crud.panel.edit.setData();  // 초기화용 데이터 등록
            doSearch();                 // 조회하기
        }

        function doSearch() {
            crud.panel.edit.init(); // edit-panel 초기화
            crud.search();          // 조회
            crud.cmd.key.exec( function( result ) {
                if( result.resultCd == '00' ) {
                    $( '#edit-panel input[name=menuId]' ).val( result.resultData );
                }
            } );
            $( '#search-panel input[name=menuId]' ).focus();
        }

        function doNew() {
            crud.new();
            crud.cmd.key.exec( function( result ) {
                // console.log('fnSearch > crud.cmd.key.exec > result', result);
                if( result.resultCd == '00' ) {
                    $( '#edit-panel input[name=menuId]' ).val( result.resultData );
                }
            } );
            $( '#edit-panel input[name=menuNm]' ).focus();
        }

        function doSave() {
            var params = $('#edit-panel').flushPanel();
            crud.save( function() {
                if(params.mode == 'I') {
                    crud.panel.edit.init( {
                        menuTp  : params.menuTp,
                        menuLv  : params.menuLv,
                        sortSn  : Number( params.sortSn ) + 10,
                        psMenuId: params.psMenuId
                    } ); // edit-panel 초기화
                } else {
                    crud.panel.edit.init();
                }
                crud.search();          // 조회
                crud.cmd.key.exec( function( result ) {
                    if( result.resultCd == '00' ) {
                        $( '#edit-panel input[name=menuId]' ).val( result.resultData );
                        $( '#edit-panel input[name=menuNm]' ).timeFocus( 500 );
                    }
                } );
            } );
        }

        function doDelete() {
            crud.delete( function() {
                crud.panel.edit.init(); // edit-panel 초기화
                crud.search();          // 조회
                $( '#edit-panel input[name=menuNm]' ).timeFocus( 500 );
            } );
        }

    </script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap">
        <p class="location"><span class="btn_home"></span>&nbsp;> <span name="menu">시스템</span> > <span name="menu">메뉴</span></p>
    </div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>메뉴아이디/명</dt>
                <dd><input type="text" name="menuId" class="form-input-text width150" autofocus></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title">메뉴 정보</h3>
        <div class="button-bar">
            <button type="button" class="small button green" data-auth="W" onclick="doNew()">신규</button>
            <button type="button" class="small button blue" data-auth="W" onclick="doSave()">저장</button>
            <button type="button" class="small button red" data-auth="D" onclick="doDelete()">삭제</button>
        </div>
    </div>
    <%--  // title-panel  --%>

    <div id="edit-panel" class="edit-panel">
        <input type="hidden" name="mode" value="I"/>
        <div>
            <dl>
                <dt>소속메뉴아이디</dt>
                <dd><input type="text" name="psMenuId" data-title='소속메뉴아이디' class="form-input-text width120"/></dd>
                <dt>메뉴아이디</dt>
                <dd><input type="text" name="menuId" data-title='메뉴아이디' class="form-input-text width120" disabled data-required/></dd>
                <dt>메뉴명</dt>
                <dd><input type="text" name="menuNm" data-title='메뉴명' class="form-input-text width120" data-command="doSave()" data-required/></dd>
            </dl>
            <dl>
                <dt>실행명령</dt>
                <dd>
                    <div data-colspan="2-4"><input type="text" name="execCmd" data-title='실행명령' class="form-input-text" style="width: 347px;" data-command="doSave()"/></div>
                </dd>
                <dd></dd>
                <dd></dd>
                <dt>메뉴유형</dt>
                <dd><select name="menuTp" data-title='메뉴유형' class="width120" data-grpcd="MENU_TP" data-required></select></dd>
            </dl>
            <dl>
                <dt>메뉴레벨</dt>
                <dd><input type="text" name="menuLv" data-title='메뉴레벨' class="form-input-text width120" value="1" data-format="number" data-command="doSave()" data-required/></dd>
                <dt>사용여부</dt>
                <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                <dt>정렬순번</dt>
                <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="doSave()" data-required/></dd>
            </dl>
        </div>
    </div>
    <%--  // edit-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><span name="title">메뉴 목록</span></h3>
    </div>
    <%--  // grid title-panel  --%>

    <div class="wrap-grid">
        <table id="grid1"></table>
        <div id="pager1"></div>
    </div>
    <%-- // 메뉴 그리드 --%>

</div>

</body>
</html>
