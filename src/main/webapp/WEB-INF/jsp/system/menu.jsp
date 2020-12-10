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
    <script type="text/javascript" src="${contextPath}/js/view/system/menu.js"></script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>메뉴아이디/명</dt>
                <dd><input type="text" name="menuId" class="form-input-text width150" data-command="controller.doSearch()" autofocus></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" data-exec="exec-search">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title">메뉴 정보</h3>
        <div class="button-bar">
            <button type="button" class="small button green" data-auth="W" data-exec="exec-new">신규</button>
            <button type="button" class="small button blue" data-auth="W" data-exec="exec-save">저장</button>
            <button type="button" class="small button red" data-auth="D" data-exec="exec-delete">삭제</button>
        </div>
    </div>
    <%--  // title-panel  --%>

    <div id="edit-panel" class="edit-panel">
        <input type="hidden" name="mode" value="I" />
        <div>
            <dl>
                <dt>소속메뉴아이디</dt>
                <dd><input type="text" name="psMenuId" data-title='소속메뉴아이디' class="form-input-text width120" /></dd>
                <dt>메뉴아이디</dt>
                <dd><input type="text" name="menuId" data-title='메뉴아이디' class="form-input-text width120" disabled data-required /></dd>
                <dt>메뉴명</dt>
                <dd><input type="text" name="menuNm" data-title='메뉴명' class="form-input-text width120" data-command="controller.doSave()" data-required /></dd>
            </dl>
            <dl>
                <dt>실행명령</dt>
                <dd>
                    <div data-colspan="2-4"><input type="text" name="execCmd" data-title='실행명령' class="form-input-text" data-command="controller.doSave()" /></div>
                </dd>
                <dd></dd>
                <dd></dd>
                <dt>메뉴유형</dt>
                <dd><select name="menuTp" data-title='메뉴유형' class="width120" data-grpcd="MENU_TP" data-required></select></dd>
            </dl>
            <dl>
                <dt>메뉴레벨</dt>
                <dd><input type="text" name="menuLv" data-title='메뉴레벨' class="form-input-text width120" value="1" data-format="number" data-command="controller.doSave()" data-required /></dd>
                <dt>사용여부</dt>
                <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                <dt>정렬순번</dt>
                <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="controller.doSave()" data-required /></dd>
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
