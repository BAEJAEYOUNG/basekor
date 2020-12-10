var controller = new $.Controller({
    url: {
        selKey:'/system/menu/selKey',
        list:'/system/menu/list',
        ins:'/system/menu/ins',
        upd:'/system/menu/upd',
        del:'/system/menu/del'
    },
    start: function() {
        this.buttonInfo();
        this.eventInit();
        this.doSearch();
    },
    buttonInfo: function() {
        this.buttonSelector = {
            search : 'button[data-exec=exec-search]',
            new    : 'button[data-exec=exec-new]',
            save   : 'button[data-exec=exec-save]',
            delete : 'button[data-exec=exec-delete]'
        }
        this.button = {};
        for(var key in this.buttonSelector) {
            this.button[key] = $(this.buttonSelector[key]);
        }
    },
    selKey: function() {
        var url = this.url.selKey;
        $.Net.ajaxCall(url, {}, function(result) {
            if( result.resultCd == '00' ) {
                $( '#edit-panel input[name=menuId]' ).val( result.resultData );
                $( '#edit-panel input[name=psMenuId]' ).timeFocus( 500 );
            } else {
                $.Utils.alert('메뉴 키정보를 받아오지 못했습니다.');
            }
        });
    },
    eventInit: function() {
        var _this = this;

        /** 메뉴 조회 **/
        $(document).on('click', this.buttonSelector.search, function() {
            _this.viewEdit.init();
            var url = _this.url.list;
            var params = _this.viewSearch.flush();
            $.Net.ajaxJqGrid(_this.grid1, url, params, function() {
                _this.selKey();
            });
        });

        /** 메뉴 신규 **/
        $(document).on('click', this.buttonSelector.new, function() {
            _this.viewEdit.init();
            _this.grid1.reload();
            _this.selKey();
        });

        /** 메뉴 저장 **/
        $(document).on('click', this.buttonSelector.save, function() {
            if(_this.viewEdit.elem.validateForm()) {
                $.Utils.confirm('저장하시겠습니까?', function() {
                    var params = _this.viewEdit.flush();
                    var url = (params.mode == 'I') ? _this.url.ins : _this.url.upd;
                    $.Net.ajaxCall(url, params, function() {
                        // $.Utils.alert('저장되었습니다.');
                        _this.selKey();
                    });
                });
            }
        });

        /** 메뉴 삭제 **/
        $(document).on('click', this.buttonSelector.delete, function() {
            if(controller.grid1.clickedRowData == null) {
                $.Utils.alert('삭제할 행을 선택하세요');
                return;
            }
            $.Utils.confirm('삭제하시겠습니까?', function() {
                var params = _this.viewEdit.flush();
                var url = _this.url.del;
                $.Net.ajaxCall(url, params, function() {
                    // $.Utils.alert('삭제되었습니다.');
                    _this.doSearch();
                });
            });
        });

    },
    doSearch: function() {
        this.button.search.trigger('click');
    },
    doSave: function() {
        this.button.save.trigger('click');
    }
});

$(function() {

    var colModel = [];
    colModel.push({ label: '소속메뉴아이디' , name: 'psMenuId' , hidden: true });
    colModel.push({ label: '메뉴유형'       , name: 'menuTp'   , hidden: true });
    colModel.push({ label: '사용여부'       , name: 'useYn'    , hidden: true });
    colModel.push({ label: '등록자'         , name: 'regId'    , hidden: true });
    colModel.push({ label: '수정자'         , name: 'chgId'    , hidden: true });
    colModel.push({ label: '메뉴아이디'     , name: 'menuId'    });
    colModel.push({ label: '소속메뉴명'     , name: 'psMenuNm'  });
    colModel.push({ label: '메뉴명'         , name: 'menuNm'    });
    colModel.push({ label: '메뉴유형'       , name: 'menuTpNm'  });
    colModel.push({ label: '실행명령'       , name: 'execCmd'   });
    colModel.push({ label: '메뉴레벨'       , name: 'menuLv'   , format: 'number' });
    colModel.push({ label: '정렬순번'       , name: 'sortSn'   , format: 'number' });
    colModel.push({ label: '사용여부'       , name: 'useYnNm'   });
    colModel.push({ label: '등록일시'       , name: 'regDttm'  , format: 'dttm' });
    colModel.push({ label: '등록자'         , name: 'regId'     });
    colModel.push({ label: '수정일시'       , name: 'chgDttm'  , format: 'dttm' });
    colModel.push({ label: '수정자'         , name: 'chgId'     });

    var gridProp = {};
    gridProp.colModel = colModel;

    controller.grid1 = new $.JqGridView('grid1', gridProp);
    controller.grid1.onSelectRow = function(data) {
        controller.viewEdit.bind(data);
    };

    controller.viewSearch = new $.View({ id: 'search-panel', name: 'search-panel' });
    controller.viewEdit = new $.View({ id: 'edit-panel', name: 'edit-panel' });

    controller.addGridView([
        controller.grid1
    ]).addView([
        controller.viewSearch,
        controller.viewEdit
    ]);
    controller.init();

    localResize();

});

function localResize() {
    var height = $( window ).height() - 330;
    $( "#grid1" ).jqGrid( "setGridHeight", height );
}