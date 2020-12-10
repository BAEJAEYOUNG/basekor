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
    <script type="text/javascript" src="${contextPath}/js/view/system/cd.js"></script>
</head>
<body>

<div class="contents-wrap">

    <div class="location-wrap"></div>
    <%--  // location-wrap  --%>

    <div id="search-panel" class="search-panel">
        <div>
            <dl>
                <dt>그룹코드ID/명</dt>
                <dd><input type="text" name="grpCd" class="form-input-text width150" autofocus data-command="controller.button.search.trigger('click')"></dd>
            </dl>
        </div>
        <div class="button-bar">
            <button type="button" class="small button" data-auth="R" data-exec="exec-search">조회</button>
        </div>
    </div>
    <%--  // search-panel  --%>

    <div class="wrap-21-tp01">

        <div class="title-panel">
            <h3 class="style-title">그룹코드 정보</h3>
            <div class="button-bar">
                <button type="button" class="small button green" data-auth="W" data-exec="exec-new">신규</button>
                <button type="button" class="small button blue" data-auth="W" data-exec="exec-save">저장</button>
                <button type="button" class="small button red" data-auth="D" data-exec="exec-delete">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="grp-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I" />
            <div>
                <dl>
                    <dt>그룹코드</dt>
                    <dd><input type="text" name="grpCd" data-title='그룹코드' class="form-input-text width120" data-mode-style="enable" data-command="controller.doSave()" data-required /></dd>
                    <dd></dd>
                    <dd></dd>
                </dl>
                <dl>
                    <dt>그룹코드명</dt>
                    <dd><input type="text" name="grpCdNm" data-title='그룹코드명' class="form-input-text width120" data-command="controller.doSave()" data-required /></dd>
                    <dt>그룹코드유형</dt>
                    <dd><select name="grpCdTp" data-title='그룹코드유형' class="width120" data-grpcd="GRP_CD_TP" data-selected-value="N" data-required></select></dd>
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
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="controller.doSave()" />
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
                <button type="button" class="small button green" data-auth="W" data-exec="exec-new2">신규</button>
                <button type="button" class="small button blue" data-auth="W" data-exec="exec-save2">저장</button>
                <button type="button" class="small button red" data-auth="D" data-exec="exec-delete2">삭제</button>
            </div>
        </div>
        <%--  // title-panel  --%>

        <div id="cd-edit-panel" class="edit-panel">
            <input type="hidden" name="mode" value="I" />
            <div>
                <dl>
                    <dt>그룹코드</dt>
                    <dd><input type="text" name="grpCd" data-title='그룹코드' class="form-input-text width120" disabled data-required /></dd>
                    <dt>코드</dt>
                    <dd><input type="text" name="cd" data-title='코드' class="form-input-text width120" data-mode-style="enable" data-command="controller.doSave2()" data-required /></dd>
                </dl>
                <dl>
                    <dt>코드명</dt>
                    <dd><input type="text" name="cdNm" data-title='코드명' class="form-input-text width120" data-command="controller.doSave2()" data-required /></dd>
                    <dt>코드유형</dt>
                    <dd><select name="grpCdTp" data-title='코드유형' class="width120" data-grpcd="CD_TP" data-selected-value="N" data-required></select></dd>
                </dl>
                <dl>
                    <dt>정렬순번</dt>
                    <dd><input type="text" name="sortSn" data-title='정렬순번' class="form-input-text width120" value="10" data-format="number" data-command="controller.doSave2()" data-required /></dd>
                    <dt>사용여부</dt>
                    <dd><select name="useYn" data-title='사용여부' class="width120" data-grpcd="USE_YN" data-required></select></dd>
                </dl>
                <dl>
                    <dt>비고</dt>
                    <dd>
                        <div data-colspan="2-4">
                            <input type="text" name="rm" data-title='비고' class="form-input-text" data-command="controller.doSave2()" />
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