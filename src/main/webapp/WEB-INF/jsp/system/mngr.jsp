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

            var args                 = crud.getInitProp();
            args.name                = 'crud';
            args.keys                = [ 'mngrId' ];
            args.cmd.search.url      = '/system/mngr/list';
            args.cmd.save.insert.url = '/system/mngr/ins';
            args.cmd.save.update.url = '/system/mngr/upd';
            args.cmd.delete.url      = '/system/mngr/del';

            var colModel = [];
            colModel.push({ label: '비밀번호초기화여부' , name: 'pwdInitYn'   , hidden: true });
            colModel.push({ label: '등록자'             , name: 'regId'       , hidden: true });
            colModel.push({ label: '수정자'             , name: 'chgId'       , hidden: true });
            colModel.push({ label: '관리자아이디'       , name: 'mngrId'       });
            colModel.push({ label: '관리자명'           , name: 'mngrNm'       });
            colModel.push({ label: '관리자비밀번호'     , name: 'mngrPwd'      });
            colModel.push({ label: '휴대폰번호'         , name: 'hpNo'        , format: 'tel_no' });
            colModel.push({ label: '이메일'             , name: 'email'        });
            colModel.push({ label: '비밀번호초기화여부' , name: 'pwdInitYnNm'  });
            colModel.push({ label: '비밀번호초기화일시' , name: 'pwdInitDttm' , format: 'dttm' });
            colModel.push({ label: '비밀번호변경일시'   , name: 'pwdChgDttm'  , format: 'dttm' });
            colModel.push({ label: '비고'               , name: 'rm'           });
            colModel.push({ label: '등록일시'           , name: 'regDttm'     , format: 'dttm' });
            colModel.push({ label: '등록자'             , name: 'regNm'        });
            colModel.push({ label: '수정일시'           , name: 'chgDttm'     , format: 'dttm' });
            colModel.push({ label: '수정자'             , name: 'chgNm'        });

            args.grid.prop.colModel = svc.util.clone( colModel );

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
            var height = $( window ).height() - 330;
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

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>관리자아이디/명</dt>
                <dd><input type="text" id="spMngrId" name="mngrId" class="form-input-text width150" autofocus data-command="crud.search()"></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title">관리자 정보</h3>
        <div class="button-bar">
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
                <dt>관리자아이디</dt>
                <dd><input type="text" id="epMngrId" name="mngrId" data-title='관리자아이디' class="width120" data-mode-style="enable" data-required /></dd>
                <dt>관리자비밀번호</dt>
                <dd><input type="text" id="epMngrPwd" name="mngrPwd" data-title='관리자비밀번호' class="width120" data-required /></dd>
                <dt>관리자명</dt>
                <dd><input type="text" id="epMngrNm" name="mngrNm" data-title='관리자명' class="width120" data-command="doSave()" data-required /></dd>
            </dl>
            <dl>
                <dt>휴대폰번호</dt>
                <dd><input type="text" id="epHpNo" name="hpNo" data-title='휴대폰번호' class="width120" data-format="tel_no" data-command="doSave()" /></dd>
                <dt>이메일</dt>
                <dd><input type="text" id="epEmail" name="email" data-title='이메일' class="width160" data-command="doSave()" /></dd>
            </dl>
            <dl>
                <dt>비밀번호초기화여부</dt>
                <dd><select id="epPwdInitYn" name="pwdInitYn" data-title='비밀번호초기화여부' class="width120" data-grpcd="PWD_INIT_YN" data-selected-value="N" data-required></select></dd>
                <dt>비밀번호초기화일시</dt>
                <dd><span name="pwdInitDttm" data-title='비밀번호초기화일시' class="width120" data-format="dttm"></span></dd>
                <dt>비밀번호변경일시</dt>
                <dd><span name="pwdChgDttm" data-title='비밀번호변경일시' class="width120" data-format="dttm"></span></dd>
            </dl>
        </div>
    </div>
    <%--  // edit-panel  --%>

    <div class="title-panel">
        <h3 class="style-title"><span name="title">관리자 목록</span></h3>
    </div>

    <div class="wrap-grid">
        <table id="grid1"></table>
        <div id="pager1"></div>
    </div>
    <%-- // 메뉴 그리드 --%>

</div>

</body>
</html>
