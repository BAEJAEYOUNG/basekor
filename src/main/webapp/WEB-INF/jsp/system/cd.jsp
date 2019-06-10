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
            colModel1.push({ label: '그룹코드유형' , name: 'grpCdTp'   , hidden: true });
            colModel1.push({ label: '사용여부'     , name: 'useYn'     , hidden: true });
            colModel1.push({ label: '등록자'       , name: 'regId'     , hidden: true });
            colModel1.push({ label: '수정자'       , name: 'chgId'     , hidden: true });
            colModel1.push({ label: '등록일시'     , name: 'regDttm'   , hidden: true });
            colModel1.push({ label: '수정일시'     , name: 'chgDttm'   , hidden: true });
            colModel1.push({ label: '그룹코드'     , name: 'grpCd'     , width: 150 });
            colModel1.push({ label: '그룹코드명'   , name: 'grpCdNm'   , width: 150 });
            colModel1.push({ label: '그룹코드유형' , name: 'grpCdTpNm'  });
            colModel1.push({ label: '사용여부'     , name: 'useYnNm'   , width: 70 });
            colModel1.push({ label: '비고'         , name: 'rm'        , width: 200 });

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
            colModel2.push({ label: '그룹코드' , name: 'grpCd'   , hidden: true });
            colModel2.push({ label: '코드유형' , name: 'cdTp'    , hidden: true });
            colModel2.push({ label: '사용여부' , name: 'useYn'   , hidden: true });
            colModel2.push({ label: '등록자'   , name: 'regId'   , hidden: true });
            colModel2.push({ label: '수정자'   , name: 'chgId'   , hidden: true });
            colModel2.push({ label: '등록일시' , name: 'regDttm' , hidden: true });
            colModel2.push({ label: '수정일시' , name: 'chgDttm' , hidden: true });
            colModel2.push({ label: '코드'     , name: 'cd'      , width: 150 });
            colModel2.push({ label: '코드명'   , name: 'cdNm'    , width: 150 });
            colModel2.push({ label: '코드유형' , name: 'cdTpNm'   });
            colModel2.push({ label: '정렬순번' , name: 'sortSn'  , format: 'number' });
            colModel2.push({ label: '사용여부' , name: 'useYnNm' , width: 70 });
            colModel2.push({ label: '비고'     , name: 'rm'      , width: 200 });
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
            var height = $( window ).height() - 360;
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
            if(crud.grid.obj.clickedRowData == null) {
                svc.ui.alert("코드정보를 등록하려면 먼저 왼쪽 그룹코드를 선택하세요");
                return;
            }
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

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>그룹코드ID/명</dt>
                <dd><input type="text" name="grpCd" class="form-input-text width150" autofocus data-command="doSearch()"></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" onclick="doSearch()">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="wrap-21-tp01">

        <div class="title-panel">
            <h3 class="style-title">그룹코드 정보</h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" onclick="doNew()">신규</button>
                <button type="button" class="small button blue" data-auth="W" onclick="doSave()">저장</button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete()">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="grp-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I"/>
            <div>
                <dl>
                    <dt>그룹코드</dt>
                    <dd><input type="text" name="grpCd" data-title='그룹코드' class="form-input-text width120" data-mode-style="enable" data-command="doSave()" data-required/></dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>그룹코드명</dt>
                    <dd><input type="text" name="grpCdNm" data-title='그룹코드명' class="form-input-text width120" data-command="doSave()" data-required/></dd>
                    <dt>그룹코드유형</dt>
                    <dd><select name="grpCdTp" data-title='그룹코드유형' class="width120" data-grpcd="GRP_CD_TP"  data-selected-value="N"  data-required></select></dd>
                </dl>
                <dl>
                    <dt>사용여부</dt>
                    <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>비고</dt>
                    <dd>
                        <div data-colspan="2-4">
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="doSave()"/>
                        </div>
                    </dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
            </div>
        </div>
        <%--  // edit-panel  --%>

        <div class="title-panel">
            <h3 class="style-title"><span name="title">그룹코드 목록</span></h3>
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
            <h3 class="style-title">코드 정보</h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" data-auth onclick="doNew2()">신규</button>
                <button type="button" class="small button blue" data-auth="W" onclick="doSave2()">저장</button>
                <button type="button" class="small button red" data-auth="D" onclick="doDelete2()">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="cd-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I"/>
            <div>
                <dl>
                    <dt>그룹코드</dt>
                    <dd><input type="text" name="grpCd" data-title='그룹코드' class="form-input-text width120" disabled data-required/></dd>
                    <dt>코드</dt>
                    <dd><input type="text" name="cd" data-title='코드' class="form-input-text width120" data-mode-style="enable" data-command="doSave2()" data-required/></dd>
                </dl>
                <dl>
                    <dt>코드명</dt>
                    <dd><input type="text" name="cdNm" data-title='코드명' class="form-input-text width120" data-command="doSave2()" data-required/></dd>
                    <dt>코드유형</dt>
                    <dd><select name="grpCdTp" data-title='코드유형' class="width120" data-grpcd="CD_TP" data-selected-value="N" data-required></select></dd>
                </dl>
                <dl>
                    <dt>정렬순번</dt>
                    <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="doSave2()" data-required/></dd>
                    <dt>사용여부</dt>
                    <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                </dl>
                <dl>
                    <dt>비고</dt>
                    <dd>
                        <div data-colspan="2-4">
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="doSave2()"/>
                        </div>
                    </dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
            </div>
        </div>
        <%--  // edit-panel  --%>

        <div class="title-panel">
            <h3 class="style-title"><span name="title">코드 목록</span></h3>
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