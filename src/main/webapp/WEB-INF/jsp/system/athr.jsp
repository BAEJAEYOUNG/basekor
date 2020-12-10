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
    <script type="text/javascript" src="${contextPath}/js/view/system/athr.js"></script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div class="wrap-21-tp02">

        <div class="title-panel">
            <h3 class="style-title">권한 정보</h3>
            <div class="button-bar">
                <button type="button" class="small button" data-auth="R" data-exec="exec-search1">조회</button>
                <button type="button" class="small button green" data-auth="W" data-exec="exec-new1">신규</button>
                <button type="button" class="small button blue" data-auth="W" data-exec="exec-save1">저장</button>
                <button type="button" class="small button red" data-auth="D" data-exec="exec-delete1">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I" />
            <div>
                <dl>
                    <dt>권한코드</dt>
                    <dd><input type="text" name="athrCd" data-title='권한코드' class="form-input-text width120" data-mode-style="enable" data-command="controller.doSave1()" data-required /></dd>
                    <dt>권한명</dt>
                    <dd><input type="text" name="athrNm" data-title='권한명' class="form-input-text width120" data-command="controller.doSave1()" data-required /></dd>
                </dl>
                <dl>
                    <dt>정렬순번</dt>
                    <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="controller.doSave1()" data-required /></dd>
                    <dt>사용여부</dt>
                    <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                </dl>
                <dl>
                    <dt>비고</dt>
                    <dd>
                        <div data-colspan="2-4">
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="controller.doSave1()" />
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
                <button type="button" class="small button green" data-auth="W" data-exec="exec-new2">등록</button>
                <button type="button" class="small button red" data-auth="D" data-exec="exec-delete2">삭제</button>
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
                <button type="button" class="small button green" data-auth="W" data-exec="exec-new3">등록</button>
                <button type="button" class="small button blue" data-auth="W" data-exec="exec-save3">선택항목저장</button>
                <button type="button" class="small button red" data-auth="D" data-exec="exec-delete3">삭제</button>
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
        <button type="button" class="small button" data-exec="exec-search-dialog1">조회</button>
        <button type="button" class="small button blue" data-exec="exec-save-dialog1">저장</button>
        <button type="button" class="small button red" data-exec="exec-close-dialog1">닫기</button>
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
        <button type="button" class="small button" data-exec="exec-search-dialog2">조회</button>
        <button type="button" class="small button blue" data-exec="exec-save-dialog2">저장</button>
        <button type="button" class="small button red" data-exec="exec-close-dialog2">닫기</button>
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