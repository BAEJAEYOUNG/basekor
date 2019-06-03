<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--
  ~ Developed by JAEYOUNG BAE on 19. 4. 17 오전 10:24.
  ~ Last modified 19. 4. 17 오전 10:24.
  ~ Copyright (c) 2019. All rights reserved.
  --%>
<meta charset="UTF-8">
<title>Title</title>

<link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:100,300,400,500,700,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${contextPath}/webjars/jquery-ui/jquery-ui.min.css">
<link rel="stylesheet" href="${contextPath}/css/jquery/jquery-confirm.min.css">
<link rel="stylesheet" href="${contextPath}/css/custom/default.css">
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
<script type="text/javascript" src="${contextPath}/js/lib/jquery-confirm.min.js"></script>

<script type="text/javascript" src="${contextPath}/js/custom/svc.js"></script>
<%@ include file="/WEB-INF/jsp/inc/inc_svc_setting_jsp.jsp" %>
<script type="text/javascript" src="${contextPath}/js/custom/svc-core.js"></script>

<%@ include file="/WEB-INF/jsp/inc/inc_header_main_js.jsp" %>


