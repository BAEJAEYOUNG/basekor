<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--
  ~ Developed by JAEYOUNG BAE on 19. 4. 17 오전 10:24.
  ~ Last modified 19. 4. 17 오전 10:24.
  ~ Copyright (c) 2019. All rights reserved.
  --%>
<meta charset="UTF-8">
<title>Title</title>

<link rel="stylesheet" href="${contextPath}/webjars/jquery-ui/jquery-ui.min.css">
<link rel="stylesheet" href="${contextPath}/webjars/select2/4.0.5/css/select2.min.css">
<link rel="stylesheet" href="${contextPath}/webjars/jqgrid/css/ui.jqgrid.css">
<%--<link rel="stylesheet" href="${contextPath}/css/jquery/ui.jqgrid.css">--%>
<link rel="stylesheet" href="${contextPath}/css/jquery/jquery-confirm.min.css">
<link rel="stylesheet" href="${contextPath}/css/jquery/MonthPicker.css">

<link rel="stylesheet" href="${contextPath}/css/custom/default.css">
<link rel="stylesheet" href="${contextPath}/css/custom/content.css">
<link rel="stylesheet" href="${contextPath}/css/custom/button.css">
<link rel="stylesheet" href="${contextPath}/css/custom/bugfix.css">
<link rel="stylesheet" href="${contextPath}/css/custom/font.css">

<%@ include file="/WEB-INF/jsp/inc/inc_locale_js_msg.jsp" %>

<c:set var="lang" value="${pageContext.response.locale.language}"/>
<c:set var="lang2" value="${pageContext.response.locale.language}"/>
<c:if test="${lang2 eq 'ko'}">
    <c:set var="lang2" value="kr"/>
</c:if>

<script type="text/javascript" src="${contextPath}/webjars/jquery/jquery.min.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/jquery.browser/dist/jquery.browser.min.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/jquery-blockui/jquery.blockUI.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/jquery-form/jquery.form.min.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/select2/4.0.5/js/select2.full.min.js"></script>
<script type="text/javascript" src="${contextPath}/js/lib/jquery-confirm.min.js"></script>
<script type="text/javascript" src="${contextPath}/js/lib/MonthPicker.js"></script>
<script type="text/javascript" src="${contextPath}/js/lib/jquery-easy-number-animate.min.js"></script>
<script type="text/javascript" src="${contextPath}/webjars/jqgrid/js/i18n/grid.locale-${lang2}.js"></script>
<%--<script type="text/javascript" src="${contextPath}/webjars/jqgrid/js/minified/jquery.jqGrid.min.js"></script>--%>
<script type="text/javascript" src="${contextPath}/js/lib/jquery.jqGrid.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/custom/svc.js"></script>
<%@ include file="/WEB-INF/jsp/inc/inc_svc_setting_jsp.jsp" %>
<script type="text/javascript" src="${contextPath}/js/custom/svc-core.js"></script>
<script type="text/javascript" src="${contextPath}/js/custom/svc-grid.js"></script>
<script type="text/javascript" src="${contextPath}/js/custom/svc-popup.js"></script>
<%@ include file="/WEB-INF/jsp/inc/inc_header_page_js.jsp" %>
