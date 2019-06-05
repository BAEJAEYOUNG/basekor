<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%--
  ~ Developed by JAEYOUNG BAE on 19. 4. 17 오전 8:16.
  ~ Last modified 19. 4. 17 오전 8:15.
  ~ Copyright (c) 2019. All rights reserved.
  --%>

<script type="text/javascript">

    svc.contextPath = "${contextPath}";

    svc.dateFormat.timeDiv = ":";
    svc.dateFormat.dateDiv = '-';
    svc.dateFormat.picker = 'yy' + svc.dateFormat.dateDiv + 'mm' + svc.dateFormat.dateDiv + 'dd';
    svc.dateFormat.input = 'yyyy' + svc.dateFormat.dateDiv + 'mm' + svc.dateFormat.dateDiv + 'dd';
    svc.dateFormat.pickerMonth = 'yy' + svc.dateFormat.dateDiv + 'mm';
    svc.dateFormat.inputMonth = 'yyyy' + svc.dateFormat.dateDiv + 'mm';

</script>