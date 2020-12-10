var BizGnb = function(aLevel, gnbId) {
    this.level = aLevel;
    this.list = [];
    this["dbList"] = null;
    this.id = "gnb";
    if (gnbId) this.id = gnbId;
};
BizGnb.prototype.addMenu = function(menuObj) {
    this.list.push(menuObj);
};
BizGnb.prototype.selMenu = function(menuId) {
    var rtnObj = null;
    for (var i = 0; i < this.dbList.length; i++) {
        if (this.dbList[i].menuId == menuId) {
            rtnObj = $.extend(true, {}, this.dbList[i]);
            break;
        }
    }
    return rtnObj;
};
BizGnb.prototype.selMenuLocation = function(loc) {
    var rtnObj = null;
    for (var i = 0; i < this.dbList.length; i++) {
        if (this.dbList[i].execCmd == loc) {
            rtnObj = $.extend(true, {}, this.dbList[i]);
            break;
        }
    }
    return rtnObj;
};
BizGnb.prototype.selMenuList = function() {
    return this.list;
};
BizGnb.prototype.load = function(loadUrl) {
    // console.log('loadUrl', loadUrl);
    var _ref = this;
    $.Net.sjaxCall(loadUrl, {}, function(result) {
        // console.log('result', result);
        if (result.resultCd == "00") { // 성공
            _ref.dbList = $.merge([], result.resultData);
            for (var i = 0; i < _ref.dbList.length; i++) {
                // if(page.menuArray[i].menuTp == 'M' || page.menuArray[i].menuTp == 'S') {    // 메뉴이거나 구번순이라면 처리를 한다.
                if (_ref.dbList[i].menuTp == "M") { // 메뉴라면 처리를 하자
                    var menuData = _ref.dbList[i];
                    switch (menuData.menuLv) {
                        case 1: // 대메뉴 - 1차메뉴
                            _ref.addMenu(menuData);
                            break;
                        default: // 2차메뉴 이상은 상위 메뉴의 childMenu 으로 들어간다.
                            var nthMenu = _ref;
                            for (var j = 2; j <= menuData.menuLv; j++) {
                                // console.log('nthMenu', nthMenu);
                                if (!nthMenu.list[nthMenu.list.length - 1].hasOwnProperty("childMenu")) {
                                    nthMenu.list[nthMenu.list.length - 1]["childMenu"] = new BizGnb(j);
                                }
                                nthMenu = nthMenu.list[nthMenu.list.length - 1]["childMenu"];
                            }
                            nthMenu.addMenu(menuData);
                            break;
                    }
                }
            }
            setTimeout(function() {
                _ref.makeMainNenu();
            }, 1000);
        } else { // 실패
            $.Utils.alert("메뉴를 가져오는중 오류가 발생했습니다.");
        }
    });
};
BizGnb.prototype.makeMainNenu = function() {
    var _ref = this;
    $("#" + this.id).children().remove();
    $("#" + this.id).append("<ul id=\"main-menu\" class=\"sm sm-mint\"></ul>");
    var menuList = _ref.selMenuList();
    for (var i = 0; i < menuList.length; i++) {
        var gnbLiId = "gnbLi_" + menuList[i].menuId;
        $("#" + this.id + " > ul").append("<li data-id=\"" + gnbLiId + "\"><a href=\"javascript:fnGnbClick('" + menuList[i].menuId + "');\">" + menuList[i].menuNm + "</a></li>");
        if (menuList[i].hasOwnProperty("childMenu")) {
            if (menuList[i]["childMenu"].list.length > 0) {
                _ref.makeSubMenu(menuList[i]["childMenu"], gnbLiId);
            }
        }
    }
    _ref.showMenu();
};
BizGnb.prototype.makeSubMenu = function(childMenu, refGnbId) {
    // console.log("makeSubMenu > sessionId", $.Page.sessionId);
    var _ref = this;
    $("#" + this.id + " li[data-id=" + refGnbId + "]").append("<ul></ul>");
    var childMenuList = childMenu.list;
    for (var i = 0; i < childMenuList.length; i++) {
        var gnbLiId = "gnbLi_" + childMenuList[i].menuId;
        $("#" + this.id + " li[data-id=" + refGnbId + "] > ul").append("<li data-id=\"" + gnbLiId + "\"><a href=\"javascript:fnGnbClick('" + childMenuList[i].menuId + "');\" " +
            (($.Page.sessionId == "admin") ? "title=\"" + childMenuList[i].execCmd + "\" class=\"easyui-tooltip\"" : "") +
            ">" + childMenuList[i].menuNm + "</a></li>");
        if (childMenuList[i].hasOwnProperty("childMenu")) {
            if (childMenuList[i]["childMenu"].length > 0) {
                _ref.makeSubMenu(childMenuList[i]["childMenu"], gnbLiId);
            }
        }
    }
};
BizGnb.prototype.showMenu = function() {
    $("#main-menu").smartmenus({
        subMenusSubOffsetX: 10,
        subMenusSubOffsetY: -8,
        hideTimeout: 100,
        showTimeout: 100
    });
};


$.extend({ Gnb: BizGnb });