var controller = new $.Controller({
	url: {
        list :'/system/grpCd/list',
        ins  :'/system/grpCd/ins',
        upd  :'/system/grpCd/upd',
        del  :'/system/grpCd/del',
        list2:'/system/cd/list',
        ins2 :'/system/cd/ins',
        upd2 :'/system/cd/upd',
        del2 :'/system/cd/del'
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
			delete : 'button[data-exec=exec-delete]',
			search2: 'button[data-exec=exec-search2]',
			new2   : 'button[data-exec=exec-new2]',
			save2  : 'button[data-exec=exec-save2]',
			delete2: 'button[data-exec=exec-delete2]'
		}
		this.button = {};
		for(var key in this.buttonSelector) {
			this.button[key] = $(this.buttonSelector[key]);
		}
	},
	eventInit: function() {
		
		var _this = this;

		/** 그룹코드 조회 **/
		$(document).on('click', this.buttonSelector.search, function() {
            _this.viewEdit.init();
            _this.viewEdit2.init();
            _this.grid2.initGridData();
            var url = _this.url.list;
            var params = _this.viewSearch.flush();
            // console.log('url, params', url, params);
            $.Net.ajaxJqGrid(_this.grid1, url, params, function() {
                $( '#search-panel input[name=grpCd]' ).focus();
            });
		});

		/** 그룹코드 신규 **/
		$(document).on('click', this.buttonSelector.new, function() {
            _this.viewEdit.init();
            _this.grid1.reload();
            _this.viewEdit2.init({grpCd:'', sortSn:10});
            _this.grid2.initGridData();
            $( '#grp-edit-panel input[name=grpCd]' ).focus();
		});

		/** 그룹코드 저장 **/
		$(document).on('click', this.buttonSelector.save, function() {
            if(_this.viewEdit.elem.validateForm()) {
                $.Utils.confirm('저장하시겠습니까?', function() {
                    var params = _this.viewEdit.flush();
                    var url = (params.mode == 'I') ? _this.url.ins : _this.url.upd;
                    $.Net.ajaxCall(url, params, function() {
                        // $.Utils.alert('저장되었습니다.');
                        _this.button.search.trigger('click');
                        $( '#grp-edit-panel input[name=grpCd]' ).timeFocus( 500 );
                    });
                });
            }
		});

		/** 그룹코드 삭제 **/
		$(document).on('click', this.buttonSelector.delete, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('삭제할 행을 선택하세요');
                return;
            }
            $.Utils.confirm('선택하신 그룹코드를 삭제하시면 소속된 모든 코드가 삭제됩니다.\n정말로 삭제하시겠습니까?', function() {
                var params = _this.viewEdit.flush();
                var url = _this.url.del;
                $.Net.ajaxCall(url, params, function() {
                    // $.Utils.alert('삭제되었습니다.');
                    _this.button.search.trigger('click');
                });
            });
		});

		/** 코드 신규 **/
		$(document).on('click', this.buttonSelector.new2, function() {
			if(_this.grid1.clickedRowData == null) {
				$.Utils.alert('코드정보를 등록하려면 먼저 왼쪽 그룹코드를 선택하세요');
				return;
			}
			var initData = {
            	grpCd: _this.grid1.clickedRowData.grpCd,
            	sortSn: ( $( "#grid2" ).jqGrid( 'getDataIDs' ).length + 1 ) * 10
            };
            _this.viewEdit2.init(initData);
            _this.grid2.reload();
            $( '#cd-edit-panel input[name=cd]' ).timeFocus(500);
		});

		/** 코드 저장 **/
		$(document).on('click', this.buttonSelector.save2, function() {
            if(_this.viewEdit2.elem.validateForm()) {
                $.Utils.confirm('저장하시겠습니까?', function() {
                    var params = _this.viewEdit2.flush();
                    var url = (params.mode == 'I') ? _this.url.ins2 : _this.url.upd2;
                    $.Net.ajaxCall(url, params, function() {
                        // $.Utils.alert('저장되었습니다.');
                        _this.doSearch2();
                    });
                });
            }
		});

		/** 코드 삭제 **/
		$(document).on('click', this.buttonSelector.delete2, function() {
            if(_this.grid2.clickedRowData == null) {
                $.Utils.alert('삭제할 행을 선택하세요');
                return;
            }
            $.Utils.confirm('삭제하시겠습니까?', function() {
                var params = _this.viewEdit2.flush();
                var url = _this.url.del2;
                $.Net.ajaxCall(url, params, function() {
                    // $.Utils.alert('삭제되었습니다.');
                    _this.doSearch2();
                });
            });
		});

	},
	doSearch: function() {
		this.button.search.trigger('click')
	},
	doSave: function() {
		this.button.save.trigger('click');
	},
	doSearch2: function() {
		var url = this.url.list2;
		var params = {grpCd: this.grid1.clickedRowData.grpCd};
		$.Net.ajaxJqGrid(controller.grid2, url, params, function() {
			controller.button.new2.trigger('click');
        });
	},
	doSave2: function() {
		this.button.save2.trigger('click');
	},
	doNew2: function() {
		this.button.new2.trigger('click');
	}
});

$(function() {

	// grid1 - Group Code Grid
    var colModel1 = [];
    colModel1.push({ label: '그룹코드유형' , name: 'grpCdTp'   , hidden: true });
    colModel1.push({ label: '사용여부'     , name: 'useYn'     , hidden: true });
    colModel1.push({ label: '등록자'       , name: 'regId'     , hidden: true });
    colModel1.push({ label: '수정자'       , name: 'chgId'     , hidden: true });
    colModel1.push({ label: '등록일시'     , name: 'regDttm'   , hidden: true });
    colModel1.push({ label: '수정일시'     , name: 'chgDttm'   , hidden: true });
    colModel1.push({ label: '그룹코드'     , name: 'grpCd'     , width: 150 });
    colModel1.push({ label: '그룹코드명'   , name: 'grpCdNm'   , width: 150 });
    colModel1.push({ label: '그룹코드유형' , name: 'grpCdTpNm'  });
    colModel1.push({ label: '사용여부'     , name: 'useYnNm'   , width: 70 });
    colModel1.push({ label: '비고'         , name: 'rm'        , width: 200 });
    var gridProp1 = {};
    gridProp1.colModel = colModel1;
    controller.grid1 = new $.JqGridView('grid1', gridProp1);
    controller.grid1.onSelectRow = function(data) {
        controller.viewEdit.bind(data);
        controller.doSearch2();
    };

    var colModel2 = [];
    colModel2.push({ label: '그룹코드' , name: 'grpCd'   , hidden: true });
    colModel2.push({ label: '코드유형' , name: 'cdTp'    , hidden: true });
    colModel2.push({ label: '사용여부' , name: 'useYn'   , hidden: true });
    colModel2.push({ label: '등록자'   , name: 'regId'   , hidden: true });
    colModel2.push({ label: '수정자'   , name: 'chgId'   , hidden: true });
    colModel2.push({ label: '등록일시' , name: 'regDttm' , hidden: true });
    colModel2.push({ label: '수정일시' , name: 'chgDttm' , hidden: true });
    colModel2.push({ label: '코드'     , name: 'cd'      , width: 150 });
    colModel2.push({ label: '코드명'   , name: 'cdNm'    , width: 150 });
    colModel2.push({ label: '코드유형' , name: 'cdTpNm'   });
    colModel2.push({ label: '정렬순번' , name: 'sortSn'  , format: 'number' });
    colModel2.push({ label: '사용여부' , name: 'useYnNm' , width: 70 });
    colModel2.push({ label: '비고'     , name: 'rm'      , width: 200 });
    var gridProp2 = {};
    gridProp2.colModel = colModel2;
    gridProp2.pager       = "#pager2";
    controller.grid2 = new $.JqGridView('grid2', gridProp2);
    controller.grid2.onSelectRow = function(data) {
        controller.viewEdit2.bind(data);
    };

    controller.viewSearch = new $.View({ id: 'search-panel', name: '그룹코드조회View' });
    controller.viewEdit   = new $.View({ id: 'grp-edit-panel', name: '그룹코드상세정보View' });
    controller.viewEdit2  = new $.View({ id: 'cd-edit-panel', name: '코드상세정보View' });

    controller.addGridView([
        controller.grid1,
        controller.grid2
    ]).addView([
        controller.viewSearch,
        controller.viewEdit,
        controller.viewEdit2
    ]);
    controller.init();

    localResize();

});

function localResize() {
    var height = $( window ).height() - 360;
    $( "#grid1" ).jqGrid( "setGridHeight", height );
    $( "#grid2" ).jqGrid( "setGridHeight", height );
}