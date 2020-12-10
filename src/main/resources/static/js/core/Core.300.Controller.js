/** 공통으로 관리자 외에는 수정하지 않는다. - Biz 에서 확장하여 사용한다. **/

var CoreController = function(args) {

    this.bShowWatch = false; // 갑시모드여부
    
    this.views      = {};
    this.gridViews  = {};

    $.extend(true, this, args);

    // console.log('typeof(this.start)', typeof(this.start)); // start 함수 포함여부

    return this;
};
CoreController.prototype.addView = function(aView) {
    var _this = this;
    var viewType = $.type(aView);
    // console.log('viewType', viewType);
    if (viewType == 'object' && !$.isEmptyObject(aView)) {
        this.views[aView.id] = aView;
    } else if (viewType == 'array') {
        aView.forEach(function(view) {
            if( !$.isEmptyObject(view)) {
                _this.views[view.id] = view;
            }
        });
    } else {
        $.Utils.alert('addView view is undefined.\naddView argument must be object of array type');
    }
    return this;
};
CoreController.prototype.addGridView = function(aGridView) {
    var _this = this;
    var viewType = $.type(aGridView);
    // console.log('addGridView > viewType', viewType);
    if (viewType == 'object' && !$.isEmptyObject(aGridView)) {
        this.gridViews[aGridView.id] = aGridView;
    } else if (viewType == 'array') {
        aGridView.forEach(function(view) {
            if( !$.isEmptyObject(view)) {
                _this.gridViews[aGridView.id] = view;
            }
        });
    } else {
        $.Utils.alert('addGridView gridView is undefined.\naddGridView argument must be object of array type');
    }
    return this;
};
CoreController.prototype.init = function() {
    if(!$.isEmptyObject(this.views)) {
        this.initViews();    
    }
    // console.log('this.gridViews', this.gridViews);
    // console.log('!$.isEmptyObject(this.gridViews)', !$.isEmptyObject(this.gridViews));
    if(!$.isEmptyObject(this.gridViews)) {
        this.initGridViews();
    }
    return this;
};
CoreController.prototype.initViews = function() {
    var _this = this;
    var bViewsLoaded = false;  
    var cntViews = 0;
    var cntLoadedViews = 0;
    for (var key in this.views) {
        cntViews++;
    }
    // console.log('cntViews', cntViews);
    var intervalStartAfterViewLoaded = setInterval(function() {
        // console.log('cntViews, cntLoadedViews', cntViews, cntLoadedViews);
        if (cntViews == cntLoadedViews) {
            if (typeof(_this.start) != 'function') {
                console.log('controller must be start function exist !!!');
            } else {
                if (_this.bShowWatch) {
                    for (var key in _this.views) {
                        _this.watchPanel(_this.views[key]);
                    }
                }
                _this.start();
            }
            clearInterval(intervalStartAfterViewLoaded);
        }
    }, 500);
    for (var key in this.views) {
        var view = this.views[key];
        if (view.elem.find('select[data-grpcd]').length > 0) {
            view.elem.applyFieldOption(function() {
                view.model.data.init = view.elem.flushPanel();
                cntLoadedViews++;
            });
        } else {
            view.elem.applyFieldOption();
            view.model.data.init = view.elem.flushPanel();
            cntLoadedViews++;
        }
    }
    return this;
};
CoreController.prototype.initGridViews = function() {
    
};
CoreController.prototype.watchPanel = function(view) {
    var _this = this;
    $('#' + view.id).find('input,select,textarea').on('change keyup paste', function() {
        view.model.data.flush = view.elem.flushPanel();
        var idDivWatch = view.id + 'Watch';
        if (view.elem.next().attr('id') != idDivWatch && $('#' + idDivWatch).length == 0) {
            view.elem.after('<div id="' + idDivWatch + '"></div>');
        }
        if (view.elem.next().attr('id') == idDivWatch) {
            $('#' + idDivWatch).text(JSON.stringify(view.model.data.flush));
        }
    });
    return this;
};

$.extend({ Controller: CoreController });