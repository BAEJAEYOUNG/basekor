<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

</body>
</html>
<%--<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>--%>
<%--<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>--%>
<%--<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>--%>
<%--<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>--%>

<%--<jsp:include page="${includePath}/header.jsp"/>--%>
<%--<jsp:include page="${includePath}/js.jsp"/>--%>


<%--<style type="text/css">--%>
<%--    input:-webkit-autofill,--%>
<%--    input:-webkit-autofill:hover,--%>
<%--    input:-webkit-autofill:focus,--%>
<%--    input:-webkit-autofill:active {--%>
<%--        background:transparent;--%>
<%--        -webkit-box-shadow: 0 0 0px 1000px #2f3547 inset !important;--%>
<%--           -webkit-text-fill-color: white !important;--%>
<%--   }--%>

<%--   * {margin:0;padding:0;font-size:12px;}--%>

<%--    .reset_area{border:5px solid #586c93;width:500px;padding-bottom:30px;}--%>
<%--    .reset_area dl{padding:20px;background:#ebebeb;}--%>
<%--    .reset_area dl dt{margin-bottom:10px;font-weight:bold;font-size:14px;}--%>
<%--    .reset_area dl dd{line-height:22px;}--%>

<%--    .reset_enty{width:300px;margin:0 auto;background:#fff;padding:20px; margin-top:20px;}--%>
<%--    .reset_enty table{width:100%;}--%>
<%--    .reset_enty table tr {height:30px;}--%>
<%--    .reset_enty table th{vertical-align:middle;}--%>
<%--    .reset_enty table td input{height:24px;line-height:24px;}--%>

<%--    .btn_area{width:100%;text-align:center; margin-top:20px;}--%>
<%--    .btn_area a{padding:5px 10px;font-size:14px;text-decoration:none;display:inline-block;}--%>
<%--    .btn_area .btn_ok{border:1px solid #586c93;background: #6e81a5;background-image: linear-gradient(#6e81a5, #576a92);color: #fff;}--%>
<%--    .btn_area .btn_cancle{border:1px solid #bdbdbd;background: #fafafa;background-image: linear-gradient(#fafafa, #efefef);color: #4d4d4d;}--%>
<%--</style>--%>

<%--<script type="text/javascript">--%>

<%--function openDgInitPwd(aParams) {--%>

<%--    var dialogProp = $.extend(true, {}, $.ksid.ui.dialogProp);--%>

<%--    //console.log("${contextPath}/login/initPwd");--%>
<%--    //$.extend(true, dialogProp, {title:'<spring:message code="initPwd.dialog.title"/>', width:dialog1W, height:dialog1H});--%>

<%--    $.extend(true, dialogProp, {--%>
<%--           closed: false--%>
<%--          //, title: 'Reset temporary password'--%>
<%--          , title: '<spring:message code="initPwd.dialog.title"/>'--%>
<%--          , width: 524--%>
<%--          , height: 372--%>
<%--          , cache: false--%>
<%--          , modal: true--%>
<%--          , onClose: function () {--%>
<%--              closeDgInitPwd();--%>
<%--          }--%>
<%--    });--%>
<%--    $("input[name=mngrId]").val("");--%>
<%--    $("input[name=email]").val("");--%>
<%--    $("#dgInitPwd").dialog(dialogProp);--%>
<%--}--%>


<%--function closeDgInitPwd() {--%>
<%--    try{--%>
<%--        $('#dgInitPwd').dialog('close');--%>
<%--    }catch(e){}--%>
<%--}--%>

<%--function fnInitPwdSend() {--%>

<%--    var params = $("#initPwd-panel").flushPanel();--%>
<%--    if( params.mngrId == '' || params.email == '' ) {--%>
<%--        $.ksid.ui.alert('<spring:message code="initPwd.msg.userid"/>');--%>
<%--        return;--%>
<%--    }--%>

<%--    //console.log("${contextPath}/login/initPwdProc");--%>
<%--    var url = "${contextPath}/login/initPwdProc";--%>
<%--    $.ksid.net.ajaxCall(url, params, function(result) {--%>
<%--        //console.log(result);--%>
<%--        if(result.resultCd == "00") {--%>
<%--            $.ksid.ui.alert('<spring:message code="initPwd.msg.success"/>');--%>
<%--            fnInitClose();--%>
<%--        } else if(result.resultCd == "91") {--%>
<%--            $.ksid.ui.alert('<spring:message code="initPwd.msg.userid"/>');--%>
<%--        } else if(result.resultCd == "98") {--%>
<%--            $.ksid.ui.alert('<spring:message code="initPwd.msg.noturl"/>');--%>
<%--        } else {--%>
<%--            $.ksid.ui.alert(result.resultData);--%>
<%--        }--%>
<%--    });--%>
<%--}--%>

<%--</script>--%>


<%--<div id="dgInitPwd" class="dialog" style="display:none;">--%>

<%--    <div class="reset_area">--%>
<%--        <dl>--%>
<%--        <dt><spring:message code="initPwd.reset_area.title"/></dt>--%>
<%--        <dd><spring:message code="initPwd.reset_area.msg"/></dd>--%>
<%--    </dl>--%>

<%--    <div class="reset_enty" id="initPwd-panel">--%>
<%--        <table>--%>
<%--            <colgroup>--%>
<%--            <col style="width:*">--%>
<%--            <col style="width:">--%>
<%--            </colgroup>--%>
<%--            <tbody>--%>
<%--                <tr>--%>
<%--                    <th ><spring:message code="login.userid.title"/></th>--%>
<%--                    <td ><input type="text" name="mngrId" required></td>--%>
<%--                </tr>--%>
<%--                <tr>--%>
<%--                    <th ><spring:message code="initPwd.email.title"/></th>--%>
<%--                    <td><input type="text" name="email" required></td>--%>
<%--                </tr>--%>
<%--            </tbody>--%>
<%--        </table>--%>
<%--    </div>--%>

<%--    <div class="btn_area">--%>
<%--        <a href="#" class="btn_ok" onclick="fnInitPwdSend()"><spring:message code="initPwd.reset.value"/></a>--%>
<%--        <a href="#" class="btn_cancle" onclick="closeDgInitPwd()"><spring:message code="initPwd.cancel.value"/></a>--%>
<%--    </div>--%>

<%--</div>--%>
