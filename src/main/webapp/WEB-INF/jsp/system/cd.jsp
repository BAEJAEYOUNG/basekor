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
        var crud2 = new svc.crud();

        function init() {

            var args = crud.getInitProp();
            args.name = 'grp-crud';
            args.keys = ['grpCd'];
            args.panel.edit.id = 'grp-edit-panel';
            args.cmd.search.url = '/system/grpCd/list';
            args.cmd.save.insert.url = '/system/grpCd/ins';
            args.cmd.save.update.url = '/system/grpCd/upd';
            args.cmd.delete.url = '/system/grpCd/del';
            args.onSelectRowAfter = doSearch2;

            // grid1 - Group Code Grid
            var colModel1 = [];
            colModel1.push( { label: '<spring:message code="common.regId"/>', name: 'regId', hidden: true } );
            colModel1.push( { label: '<spring:message code="common.regDttm"/>', name: 'regDttm', hidden: true } );
            colModel1.push( { label: '<spring:message code="common.chgId"/>', name: 'chgId', hidden: true } );
            colModel1.push( { label: '<spring:message code="common.chgDttm"/>', name: 'chgDttm', hidden: true } );
            colModel1.push( { label: '<spring:message code="cd.content.grpCdTp"/>', name: 'grpCdTp', hidden: true } );
            colModel1.push( { label: '<spring:message code="common.useYn"/>', name: 'useYn', hidden: true } );
            colModel1.push( { label: '<spring:message code="cd.content.grpCd"/>', name: 'grpCd', width: 150 } );
            colModel1.push( { label: '<spring:message code="cd.content.grpCdNm"/>', name: 'grpCdNm', width: 150 } );
            colModel1.push( { label: '<spring:message code="cd.content.grpCdTp"/>', name: 'grpCdTpNm' } );
            colModel1.push( { label: '<spring:message code="common.useYn"/>', name: 'useYnNm', width: 70 } );
            colModel1.push( { label: '<spring:message code="common.rm"/>', name: 'rm', width: 200 } );
            args.grid.prop.colModel = svc.util.clone( colModel1 );

            crud.init( args );

            var args2 = crud.getInitProp();
            args2.name = 'cd-crud';
            args2.keys = ['cd'];
            args2.panel.search.exist = false;
            args2.panel.edit.id = 'cd-edit-panel';
            args2.cmd.search.url = '/system/cd/list';
            args2.cmd.save.insert.url = '/system/cd/ins';
            args2.cmd.save.update.url = '/system/cd/upd';
            args2.cmd.delete.url = '/system/cd/del';
            args2.grid.id = 'grid2';
            args2.grid.prop.pager = '#pager2';

            var colModel2 = [];
            colModel2.push( { label: '<spring:message code="cd.content.grpCd"/>', name: 'grpCd', hidden: true } );
            colModel2.push( { label: '<spring:message code="common.regId"/>', name: 'regId', hidden: true } );
            colModel2.push( { label: '<spring:message code="common.regDttm"/>', name: 'regDttm', hidden: true } );
            colModel2.push( { label: '<spring:message code="common.chgId"/>', name: 'chgId', hidden: true } );
            colModel2.push( { label: '<spring:message code="common.chgDttm"/>', name: 'chgDttm', hidden: true } );
            colModel2.push( { label: '<spring:message code="cd.content.cdTp"/>', name: 'cdTp', hidden: true } );
            colModel2.push( { label: '<spring:message code="common.useYn"/>', name: 'useYn', hidden: true } );
            colModel2.push( { label: '<spring:message code="cd.content.cd"/>', name: 'cd', width: 150 } );
            colModel2.push( { label: '<spring:message code="cd.content.cdNm"/>', name: 'cdNm', width: 150 } );
            colModel2.push( { label: '<spring:message code="cd.content.cdTp"/>', name: 'cdTpNm' } );
            colModel2.push( { label: '<spring:message code="common.sortSn"/>', name: 'sortSn', format: 'number' } );
            colModel2.push( { label: '<spring:message code="common.useYn"/>', name: 'useYnNm', width: 70 } );
            colModel2.push( { label: '<spring:message code="common.rm"/>', name: 'rm', width: 200 } );
            args2.grid.prop.colModel = svc.util.clone( colModel2 );

            crud2.init( args2 );

        }

        function grpeditpanelBindComboAfterFunc() {
            crud.panel.edit.setData();
            ( svc.panelLoaded ) ? doSearch() : svc.panelLoaded = true;
        }

        function cdeditpanelBindComboAfterFunc() {
            crud2.panel.edit.setData();
            ( svc.panelLoaded ) ? doSearch() : svc.panelLoaded = true;
        }

        function localResize() {
            var height = $( window ).height() - 370;
            $( "#grid1" ).jqGrid( "setGridHeight", height );
            $( "#grid2" ).jqGrid( "setGridHeight", height );
        }

        function doSearch() {
            crud.panel.edit.init();         // grp-edit-panel 초기화
            crud.search();                  // 그룹코드 조회
            crud2.initPanelGrid();          // 코드 panel , grid 초기화
            $( '#search-panel input[name=grpCd]' ).focus();
        }

        function doNew() {
            crud.panel.edit.init();         // grp-edit-panel 초기화
            crud.grid.obj.reload();         // grp 그리드 reload()
            $( '#grp-edit-panel input[name=grpCd]' ).focus();
            crud2.initPanelGrid();          // 코드 panel , grid 초기화
        }

        function doSave() {
            crud.save( function() {
                doSearch();
                $( '#grp-edit-panel input[name=grpCd]' ).timeFocus( 300 );
            } );
        }

        function doDelete() {
            crud.delete( function() {
                doSearch();
                $( '#grp-edit-panel input[name=grpCd]' ).timeFocus( 300 );
            } );
        }

        function doSearch2() {
            crud2.cmd.search.params = {
                grpCd : crud.grid.obj.clickedRowData.grpCd
            };
            crud2.search(function() {
                doNew2();
            });
        }

        function doNew2() {
            crud2.grid.obj.reload();
            var params = {
                grpCd : crud.grid.obj.clickedRowData.grpCd,
                sortSn : ( $("#grid2").jqGrid('getDataIDs').length + 1 ) * 10
            };
            crud2.panel.edit.init( params );
            $('#cd-edit-panel input[name=cd]').timeFocus(300);
        }

        function doSave2() {
            crud2.save(function() {
                doSearch2();
            });
        }

        function doDelete2() {
            crud2.delete(function() {
                doSearch2();
            });
        }

    </script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap">
        <p class="location"><span class="btn_home"></span>&nbsp;> <span name="menu"><spring:message code="cd.nav.top"/></span> > <span name="menu"><spring:message code="cd.nav.title"/></span></p>
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
                <th><spring:message code="cd.search-panel.grpCd"/></th>
                <td><input type="text" name="grpCd" class="form-input-text width150" autofocus data-command="doSearch()"></td>
            </tr>
            </tbody>
        </table>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()"><spring:message code="button.search"/></button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="wrap-21-tp01">

        <div class="title-panel">
            <h3 class="style-title"><spring:message code="cd.content.grp-edit-panel-title"/></h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" onclick="doNew()"><spring:message code="button.new"/></button>
                <button type="button" class="small button blue" data-auth="W" onclick="doSave()"><spring:message code="button.save"/></button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete()"><spring:message code="button.delete"/></button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="grp-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I"/>
            <table>
                <colgroup>
                    <col width="100"/>
                    <col width="150"/>
                    <col width="100"/>
                    <col width="150"/>
                </colgroup>
                <tbody>
                <tr>
                    <th><spring:message code="cd.content.grpCd"/></th>
                    <td colspan="3"><input type="text" name="grpCd" data-title='<spring:message code="cd.content.grpCd"/>' class="form-input-text width120" data-mode-style="enable" data-command="doSave()" data-required/></td>
                </tr>
                <tr>
                    <th><spring:message code="cd.content.grpCdNm"/></th>
                    <td><input type="text" name="grpCdNm" data-title='<spring:message code="cd.content.grpCdNm"/>' class="form-input-text width120" data-command="doSave()" data-required/></td>
                    <th><spring:message code="cd.content.grpCdTp"/></th>
                    <td><select name="grpCdTp" data-title='<spring:message code="cd.content.grpCdTp"/>' class="width120" data-grpcd="GRP_CD_TP"  data-selected-value="N"  data-required></select></td>
                </tr>
                <tr>
                    <th><spring:message code="common.useYn"/></th>
                    <td colspan="3"><select name="useYn" data-title='<spring:message code="common.useYn"/>' class="width120" data-grpcd="USE_YN" data-required></select></td>
                </tr>
                <tr>
                    <th><spring:message code="common.rm"/></th>
                    <td colspan="3"><input type="text" name="rm" data-title='<spring:message code="common.rm"/>' class="form-input-text width380" data-command="doSave()"/></td>
                </tr>
                </tbody>
            </table>
        </div>
        <%--  // edit-panel  --%>

        <div class="title-panel">
            <h3 class="style-title"><span name="title"><spring:message code="cd.content.grp-grid-title"/></span></h3>
        </div>
        <%--  // grpCd grid title-panel  --%>

        <div class="wrap-grid">
            <table id="grid1"></table>
            <div id="pager1"></div>
        </div>
        <%-- // 메뉴 그리드 --%>

    </div>
    <div class="wrap-22-tp01">

        <div class="title-panel">
            <h3 class="style-title"><spring:message code="cd.content.cd-edit-panel-title"/></h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" data-auth onclick="doNew2()"><spring:message code="button.new"/></button>
                <button type="button" class="small button blue" data-auth="W" onclick="doSave2()"><spring:message code="button.save"/></button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete2()"><spring:message code="button.delete"/></button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="cd-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I"/>
            <table>
                <colgroup>
                    <col width="100"/>
                    <col width="150"/>
                    <col width="100"/>
                    <col width="150"/>
                </colgroup>
                <tbody>
                <tr>
                    <th><spring:message code="cd.content.grpCd"/></th>
                    <td><input type="text" name="grpCd" data-title='<spring:message code="cd.content.grpCd"/>' class="form-input-text width120" disabled data-required/></td>
                    <th><spring:message code="cd.content.cd"/></th>
                    <td><input type="text" name="cd" data-title='<spring:message code="cd.content.cd"/>' class="form-input-text width120" data-mode-style="enable" data-command="doSave2()" data-required/></td>
                </tr>
                <tr>
                    <th><spring:message code="cd.content.cdNm"/></th>
                    <td><input type="text" name="cdNm" data-title='<spring:message code="cd.content.cdNm"/>' class="form-input-text width120" data-command="doSave2()" data-required/></td>
                    <th><spring:message code="cd.content.cdTp"/></th>
                    <td><select name="grpCdTp" data-title='<spring:message code="cd.content.cdTp"/>' class="width120" data-grpcd="CD_TP" data-selected-value="N" data-required></select></td>
                </tr>
                <tr>
                    <th><spring:message code="common.sortSn"/></th>
                    <td><input type="text" name="sortSn" data-title='<spring:message code="common.sortSn"/>' class="form-input-text width120" value="10" data-format="number" data-command="doSave2()" data-required/></td>
                    <th><spring:message code="common.useYn"/></th>
                    <td><select name="useYn" data-title='<spring:message code="common.useYn"/>' class="width120" data-grpcd="USE_YN" data-required></select></td>
                </tr>
                <tr>
                    <th><spring:message code="common.rm"/></th>
                    <td colspan="3"><input type="text" name="rm" data-title='<spring:message code="common.rm"/>' class="form-input-text width380" data-command="doSave2()"/></td>
                </tr>
                </tbody>
            </table>
        </div>
        <%--  // edit-panel  --%>

        <div class="title-panel">
            <h3 class="style-title"><span name="title"><spring:message code="cd.content.cd-grid-title"/></span></h3>
        </div>
        <%--  // cd grid title-panel  --%>

        <div class="wrap-grid">
            <table id="grid2"></table>
            <div id="pager2"></div>
        </div>
        <%-- // 메뉴 그리드 --%>

    </div>

</div>

</body>
</html>