<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--
  ~ Developed by JAEYOUNG BAE on 19. 4. 10 오후 1:20.
  ~ Last modified 19. 4. 10 오후 1:20.
  ~ Copyright (c) 2019. All rights reserved. 
  --%>
<script type="text/javascript">

    var localeMsg = {};

    localeMsg["msgbox.title.alert"] = '<spring:message code="msgbox.title.alert" javaScriptEscape="true"/>';        // 경고
    localeMsg["msgbox.title.confirm"] = '<spring:message code="msgbox.title.confirm" javaScriptEscape="true"/>';      // 확인
    localeMsg["msgbox.button.ok"] = '<spring:message code="msgbox.button.ok" javaScriptEscape="true"/>';          // 확인
    localeMsg["msgbox.button.cancel"] = '<spring:message code="msgbox.button.cancel" javaScriptEscape="true"/>';      // 취소

    localeMsg["select.overall.total"] = '<spring:message code="select.overall.total" javaScriptEscape="true"/>';      // 전체
    localeMsg["select.overall.unknown"] = '<spring:message code="select.overall.unknown" javaScriptEscape="true"/>';    // 없음
    localeMsg["select.overall.choice"] = '<spring:message code="select.overall.choice" javaScriptEscape="true"/>';     // ==== 선택하세요 ===

    localeMsg["error.msg.search-error"] = '<spring:message code="error.msg.search-error" javaScriptEscape="true"/>';    // 조회 중 오류가 발생했습니다.
    localeMsg["error.validation.form"] = '<spring:message code="error.validation.form" javaScriptEscape="true"/>';    // 위 항목은 필수항목 입니다. <br />확인해 주시기 바랍니다.

    localeMsg["msg.save.req"] = '<spring:message code="msg.save.req" javaScriptEscape="true"/>';      // 저장하시겠습니까?
    localeMsg["msg.save.success"] = '<spring:message code="msg.save.success" javaScriptEscape="true"/>';      // 저장되었습니다
    localeMsg["msg.save.fail"] = '<spring:message code="msg.save.fail" javaScriptEscape="true"/>';      // 저장에 실패하였습니다
    localeMsg["msg.insert.req"] = '<spring:message code="msg.insert.req" javaScriptEscape="true"/>';      // 등록하시겠습니까?
    localeMsg["msg.insert.success"] = '<spring:message code="msg.insert.success" javaScriptEscape="true"/>';      // 등록되었습니다
    localeMsg["msg.insert.fail"] = '<spring:message code="msg.insert.fail" javaScriptEscape="true"/>';      // 등록에 실패하였습니다
    localeMsg["msg.del.req"] = '<spring:message code="msg.del.req" javaScriptEscape="true"/>';      // 삭제하시겠습니까?
    localeMsg["msg.del.success"] = '<spring:message code="msg.del.success" javaScriptEscape="true"/>';      // 삭제되었습니다
    localeMsg["msg.del.fail"] = '<spring:message code="msg.del.fail" javaScriptEscape="true"/>';      // 삭제에 실패하였습니다
    localeMsg["msg.del.not-select"] = '<spring:message code="msg.del.not-select" javaScriptEscape="true"/>';      // 삭제할 행을 선택하세요

    localeMsg["main.menu.error"] = '<spring:message code="main.menu.error" javaScriptEscape="true"/>';      // 삭제할 행을 선택하세요


</script>

