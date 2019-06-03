<%--
  ~ Developed by JAEYOUNG BAE on 19. 5. 7 오후 3:32.
  ~ Last modified 19. 5. 7 오후 3:23.
  ~ Copyright (c) 2019. All rights reserved.
  --%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <title></title>
    <%@ include file="/WEB-INF/jsp/inc/inc_header_page.jsp" %>
    <script type="text/javascript" src="${contextPath}/js/custom/svc-crud.js"></script>
    <script type="text/javascript">

        var crud = new svc.crud();

        function init() {

            // console.log( "init !!!" );

            var args = crud.getInitProp();
            args.name = 'crud';
            args.keys = ['mngrId'];
            args.cmd.search.url = '/system/mngr/list';
            args.cmd.save.insert.url = '/system/mngr/ins';
            args.cmd.save.update.url = '/system/mngr/upd';
            args.cmd.delete.url = '/system/mngr/del';

            var colModel1 = [];
            colModel1.push( { label: '<spring:message code="mngr.content.pwdInitYn"/>', name: 'pwdInitYn', hidden: true } );
            colModel1.push( { label: '<spring:message code="mngr.content.mngrId"/>', name: 'mngrId' } );
            colModel1.push( { label: '<spring:message code="mngr.content.mngrNm"/>', name: 'mngrNm' } );
            colModel1.push( { label: '<spring:message code="mngr.content.mngrPwd"/>', name: 'mngrPwd', width: 150 } );
            colModel1.push( { label: '<spring:message code="common.hpNo"/>', name: 'hpNo', format: 'tel_no' } );
            colModel1.push( { label: '<spring:message code="common.email"/>', name: 'email', width: 150 } );
            colModel1.push( { label: '<spring:message code="common.langCd"/>', name: 'langCd' } );
            colModel1.push( { label: '<spring:message code="common.countryCd"/>', name: 'countryCd' } );
            colModel1.push( { label: '<spring:message code="common.locale"/>', name: 'locale' } );
            colModel1.push( { label: '<spring:message code="mngr.content.pwdInitYn"/>', name: 'pwdInitYnNm', width: 140 } );
            colModel1.push( { label: '<spring:message code="mngr.content.pwdInitDttm"/>', name: 'pwdInitDttm', format: 'dttm' } );
            colModel1.push( { label: '<spring:message code="mngr.content.pwdChgDttm"/>', name: 'pwdChgDttm', format: 'dttm' } );
            colModel1.push( { label: '<spring:message code="common.rm"/>', name: 'rm', width: 200 } );
            colModel1.push( { label: '<spring:message code="common.regId"/>', name: 'regId' } );
            colModel1.push( { label: '<spring:message code="common.regDttm"/>', name: 'regDttm', format: 'dttm' } );
            colModel1.push( { label: '<spring:message code="common.chgId"/>', name: 'chgId' } );
            colModel1.push( { label: '<spring:message code="common.chgDttm"/>', name: 'chgDttm', format: 'dttm' } );
            args.grid.prop.colModel = svc.util.clone( colModel1 );

            // console.log( 'args', args );

            crud.init( args );

            $( '#edit-panel select[name=langCd]' ).change( function() {
                fnLangCountryChange();
            } );
            $( '#edit-panel select[name=countryCd]' ).change( function() {
                fnLangCountryChange();
            } );
        }

        function localResize() {
            var height = $( window ).height() - 370;
            $( "#grid1" ).jqGrid( "setGridHeight", height );
        }

        function editpanelBindComboAfterFunc() {
            fnLangCountryChange();
            $( '#edit-panel input[name=mngrPwd]' ).val( "{noop}" );
            crud.panel.edit.setData();  // 초기화용 데이터 등록
            doSearch();                 // 조회하기
        }

        function fnLangCountryChange() {
            var params = $( '#edit-panel' ).flushPanel();
            var locale = params.langCd + '_' + params.countryCd;
            $( '#edit-panel input[name=locale]' ).val( locale );
        }

        function doSearch() {
            crud.panel.edit.init(); // edit-panel 초기화
            crud.search();          // 조회
            $( '#search-panel input[name=mngrId]' ).focus();
        }

        function doNew() {
            crud.new();
            $( '#edit-panel input[name=mngrId]' ).focus();
        }

        function doSave() {
            crud.save( function() {
                crud.panel.edit.init(); // edit-panel 초기화
                crud.search();          // 조회
                $( '#edit-panel input[name=mngrId]' ).timeFocus( 500 );
            } );
        }

        function doDelete() {
            // console.log( "doDelete()" );

            crud.delete( function() {
                crud.panel.edit.init(); // edit-panel 초기화
                crud.search();          // 조회
                $( '#edit-panel input[name=mngrId]' ).timeFocus( 500 );
            } );
        }

    </script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap">
        <p class="location"><span class="btn_home"></span>&nbsp;> <span name="mngr"><spring:message code="mngr.nav.top"/></span> > <span name="mngr"><spring:message code="mngr.nav.title"/></span></p>
    </div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <table>
            <colgroup>
                <col class="width100"/>
                <col class="width150"/>
            </colgroup>
            <tbody>
            <tr>
                <th><label for="spMngrId"><spring:message code="mngr.search-panel.mngrId"/></label></th>
                <td><input type="text" id="spMngrId" name="mngrId" class="form-input-text width150" autofocus data-command="crud.search()"></td>
            </tr>
            </tbody>
        </table>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()"><spring:message code="button.search"/></button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><spring:message code="mngr.content.edit-panel-title"/></h3>
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
                <col class="width100"/>
                <col class="width170"/>
                <col class="width130"/>
                <col class="width170"/>
                <col class="width130"/>
                <col class="width170"/>
            </colgroup>
            <tbody>
            <tr>
                <th><label for="epMngrId"><spring:message code="mngr.content.mngrId"/></label></th> <!-- 관리자 아아디 -->
                <td><input type="text" id="epMngrId" name="mngrId" data-title='<spring:message code="mngr.content.mngrId"/>' class="form-input-text width120" data-mode-style="enable" data-required/></td>
                <th><label for="epMngrPwd"><spring:message code="mngr.content.mngrPwd"/></label></th> <!-- 관리자 비밀번호 -->
                <td><input type="text" id="epMngrPwd" name="mngrPwd" data-title='<spring:message code="mngr.content.mngrPwd"/>' class="form-input-text width120" data-required/></td>
                <th><label for="epMngrNm"><spring:message code="mngr.content.mngrNm"/></label></th> <!-- 관리자명 -->
                <td><input type="text" id="epMngrNm" name="mngrNm" data-title='<spring:message code="mngr.content.mngrNm"/>' class="form-input-text width120" data-command="doSave()" data-required/></td>
            </tr>
            <tr>
                <th><label for="epHpNo"><spring:message code="common.hpNo"/></label></th> <!-- 휴대폰번호 -->
                <td><input type="text" id="epHpNo" name="hpNo" data-title='<spring:message code="common.hpNo"/>' class="form-input-text width120" data-format="tel_no" data-command="doSave()"/></td>
                <th><label for="epEmail"><spring:message code="common.email"/></label></th> <!-- 이메일 -->
                <td colspan="3"><input type="text" id="epEmail" name="email" data-title='<spring:message code="common.email"/>' class="form-input-text width160" data-format="email" data-command="doSave()"/></td>
            </tr>
            <tr>
                <th><label for="epLangCd"><spring:message code="common.langCd"/></label></th> <!-- 언어코드 -->
                <td><select id="epLangCd" name="langCd" data-title='<spring:message code="common.langCd"/>' class="width120" data-grpcd="LANG_CD" data-required></select></td>
                <th><label for="epCountryCd"><spring:message code="common.countryCd"/></label></th> <!-- 국가코드 -->
                <td><select id="epCountryCd" name="countryCd" data-title='<spring:message code="common.countryCd"/>' class="width120" data-grpcd="COUNTRY_CD" data-required></select></td>
                <th><label for="epLocale"><spring:message code="common.locale"/></label></th> <!-- 로케일 -->
                <td><input type="text" id="epLocale" name="locale" data-title='<spring:message code="common.locale"/>' class="form-input-text width120"/></td>
            </tr>
            <tr>
                <th><label for="epPwdInitYn"><spring:message code="mngr.content.pwdInitYn"/></label></th> <!-- 비밀번호 초기화 여부 -->
                <td><select id="epPwdInitYn" name="pwdInitYn" data-title='<spring:message code="mngr.content.pwdInitYn"/>' class="width120" data-grpcd="PWD_INIT_YN" data-selected-value="N" data-required></select></td>
                <th><spring:message code="mngr.content.pwdInitDttm"/></th> <!-- 비밀번호 초기화 일시 -->
                <td><span name="pwdInitDttm" data-title='<spring:message code="mngr.content.pwdInitDttm"/>' class="width120" data-format="dttm"></span></td>
                <th><spring:message code="mngr.content.pwdChgDttm"/></th> <!-- 비밀번호 변경 일시 -->
                <td><span name="pwdChgDttm" data-title='<spring:message code="mngr.content.pwdChgDttm"/>' class="width120" data-format="dttm"></span></td>
            </tr>
            </tbody>
        </table>
    </div>
    <%--  // edit-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><span name="title"><spring:message code="mngr.content.grid-title"/></span></h3>
    </div>

    <div class="wrap-grid">
        <table id="grid1"></table>
        <div id="pager1"></div>
    </div>
    <%-- // 메뉴 그리드 --%>

</div>

</body>
</html>
