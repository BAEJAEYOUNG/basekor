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
    <script type="text/javascript" src="${contextPath}/js/view/system/mngr.js"></script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>관리자아이디/명</dt>
                <dd><input type="text" name="mngrId" class="form-input-text width150" autofocus data-command="controller.doSearch()"></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" data-exec="exec-search">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="title-panel">
        <h3 class="style-title">관리자 정보</h3>
        <div class="button-bar">
            <button type="button" class="small button green" data-auth="W" data-exec="exec-new">신규</button>
            <button type="button" class="small button blue" data-auth="W" data-exec="exec-save">저장</button>
            <button type="button" class="small button red" data-auth="D" data-exec="exec-delete">삭제</button>
        </div>
    </div>
    <%--  // title-panel  --%>

    <div>
        <textarea name="ir1" id="ir1" rows="10" cols="100" style="width:766px; height:412px; display:none;"></textarea>
    </div>

    <div id="edit-panel" class="edit-panel">
        <input type="hidden" name="mode" value="I" />
        <div>
            <dl>
                <dt>관리자아이디</dt>
                <dd><input type="text" name="mngrId" data-title='관리자아이디' class="width120" data-mode-style="enable" data-required /></dd>
                <dt>관리자비밀번호</dt>
                <dd><input type="text" name="mngrPwd" data-title='관리자비밀번호' class="width120" data-required /></dd>
                <dt>관리자명</dt>
                <dd><input type="text" name="mngrNm" data-title='관리자명' class="width120" data-command="controller.doSave()" data-required /></dd>
            </dl>
            <dl>
                <dt>휴대폰번호</dt>
                <dd><input type="text" name="hpNo" data-title='휴대폰번호' class="width120" data-format="tel_no" data-command="controller.doSave()" /></dd>
                <dt>이메일</dt>
                <dd><input type="text" name="email" data-title='이메일' class="width160" data-command="doSave()" /></dd>
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
