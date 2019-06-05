/*
 * Developed by JAEYOUNG BAE on 19. 4. 10 오전 11:00.
 * Last modified 19. 4. 10 오전 11:00.
 * Copyright (c) 2019. All rights reserved.
 */
// $.support.cors = true;  // 크로스도메인 사용시

var svc = {};

svc.contextPath = "";

svc.dialog = null;      // 공통팝업 dialog
svc.dialogGrid = null;  // 공통팝업 grid

svc.pageParam = {};     // 페이지 request parameter - 페이지간에 파라미터를 연계하여 처리할 때 사용된다.
svc.file = {};          // 파일업로드시 사용
svc.panelLoaded = false;

svc.dateFormat = {};

if(!console) console = {log:function(){}};