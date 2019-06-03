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

            var colModel1 = [];
            colModel1.push( { label: '<spring:message code="menu.content.menuTp"/>', name: 'menuTp', hidden: true } );
            colModel1.push( { label: '<spring:message code="common.useYn"/>', name: 'useYn', hidden: true } );
            colModel1.push( { label: '<spring:message code="menu.content.psMenuId"/>', name: 'psMenuId', hidden: true } );
            colModel1.push( { label: '<spring:message code="menu.content.menuId"/>', name: 'menuId' } );
            colModel1.push( { label: '<spring:message code="menu.content.psMenuNm"/>', name: 'psMenuNm' } );
            colModel1.push( { label: '<spring:message code="menu.content.menuNm"/>', name: 'menuNm' } );
            colModel1.push( { label: '<spring:message code="menu.content.menuTp"/>', name: 'menuTpNm' } );
            colModel1.push( { label: '<spring:message code="menu.content.execCmd"/>', name: 'execCmd' } );
            colModel1.push( { label: '<spring:message code="menu.content.menuLv"/>', name: 'menuLv', format: 'number' } );
            colModel1.push( { label: '<spring:message code="common.sortSn"/>', name: 'sortSn', format: 'number' } );
            colModel1.push( { label: '<spring:message code="common.useYn"/>', name: 'useYnNm' } );
            colModel1.push( { label: '<spring:message code="common.regId"/>', name: 'regId' } );
            colModel1.push( { label: '<spring:message code="common.regDttm"/>', name: 'regDttm', format: 'dttm' } );
            colModel1.push( { label: '<spring:message code="common.chgId"/>', name: 'chgId' } );
            colModel1.push( { label: '<spring:message code="common.chgDttm"/>', name: 'chgDttm', format: 'dttm' } );
            args.grid.prop.colModel = svc.util.clone( colModel1 );

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
        <p class="location"><span class="btn_home"></span>&nbsp;> <span name="menu"><spring:message code="menu.nav.top"/></span> > <span name="menu"><spring:message code="menu.nav.title"/></span></p>
    </div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <table>
            <colgroup>
                <col width="100"/>
                <col width="150"/>
            </colgroup>
            <tbody>
            <tr>
                <th><spring:message code="menu.search-panel.menuId"/></th>
                <td><input type="text" name="menuId" class="form-input-text width150" autofocus></td>
            </tr>
            </tbody>
        </table>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()"><spring:message code="button.search"/></button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><spring:message code="menu.content.edit-panel-title"/></h3>
        <div class="button-bar">
            <button type="button" class="small button green" data-auth="W" onclick="doNew()"><spring:message code="button.new"/></button>
            <button type="button" class="small button blue" data-auth="W" onclick="doSave()"><spring:message code="button.save"/></button>
            <button type="button" class="small button red" data-auth="D" onclick="doDelete()"><spring:message code="button.delete"/></button>
        </div>
    </div>
    <%--  // title-panel  --%>

    <div id="edit-panel" class="edit-panel">
        <input type="hidden" name="mode" value="I"/>
        <table>
            <colgroup>
                <col width="100"/>
                <col width="150"/>
                <col width="100"/>
                <col width="150"/>
                <col width="100"/>
                <col width="150"/>
            </colgroup>
            <tbody>
            <tr>
                <th><spring:message code="menu.content.psMenuId"/></th>
                <td><input type="text" name="psMenuId" data-title='<spring:message code="menu.content.psMenuId"/>' class="form-input-text width120"/></td>
                <th><spring:message code="menu.content.menuId"/></th>
                <td><input type="text" name="menuId" data-title='<spring:message code="menu.content.menuId"/>' class="form-input-text width120" disabled data-required/></td>
                <th><spring:message code="menu.content.menuNm"/></th>
                <td><input type="text" name="menuNm" data-title='<spring:message code="menu.content.menuNm"/>' class="form-input-text width120" data-command="doSave()" data-required/></td>
            </tr>
            <tr>
                <th><spring:message code="menu.content.execCmd"/></th>
                <td colspan="3"><input type="text" name="execCmd" data-title='<spring:message code="menu.content.execCmd"/>' class="form-input-text width370" data-command="doSave()"/></td>
                <th><spring:message code="menu.content.menuTp"/></th>
                <td><select name="menuTp" data-title='<spring:message code="menu.content.menuTp"/>' class="width120" data-grpcd="MENU_TP" data-required></select></td>
            </tr>
            <tr>
                <th><spring:message code="menu.content.menuLv"/></th>
                <td><input type="text" name="menuLv" data-title='<spring:message code="menu.content.menuLv"/>' class="form-input-text width120" value="1" data-format="number" data-command="doSave()" data-required/></td>
                <th><spring:message code="common.useYn"/></th>
                <td><select name="useYn" data-title='<spring:message code="common.useYn"/>' class="width120" data-grpcd="USE_YN" data-required></select></td>
                <th><spring:message code="common.sortSn"/></th>
                <td><input type="text" name="sortSn" data-title='<spring:message code="common.sortSn"/>' class="form-input-text width120" value="10" data-format="number" data-command="doSave()" data-required/></td>
            </tr>
            </tbody>
        </table>
    </div>
    <%--  // edit-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><span name="title"><spring:message code="menu.content.grid-title"/></span></h3>
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
