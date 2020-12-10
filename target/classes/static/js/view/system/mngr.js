var oEditors = [];
var controller = new $.Controller({
    url: {
        list:'/system/mngr/list',
        ins :'/system/mngr/ins',
        upd :'/system/mngr/upd',
        del :'/system/mngr/del'
    },
    start: function() {
        this.buttonInfo();
        this.eventInit();
        this.doSearch();
        this.editorInit();
    },
    editorInit: function() {
        nhn.husky.EZCreator.createInIFrame({
            oAppRef: oEditors,
            elPlaceHolder: "ir1",
            sSkinURI: "/html/SmartEditor2Skin.html",
            htParams : {
                bUseToolbar : true,             // 툴바 사용 여부 (true:사용/ false:사용하지 않음)
                bUseVerticalResizer : true,     // 입력창 크기 조절바 사용 여부 (true:사용/ false:사용하지 않음)
                bUseModeChanger : true,         // 모드 탭(Editor | HTML | TEXT) 사용 여부 (true:사용/ false:사용하지 않음)
                bSkipXssFilter : true,          // client-side xss filter 무시 여부 (true:사용하지 않음 / 그외:사용)
                //aAdditionalFontList : aAdditionalFontSet,     // 추가 글꼴 목록
                fOnBeforeUnload : function(){
                    //alert("완료!");
                }
            }, //boolean
            fOnAppLoad : function(){
                //예제 코드
                //oEditors.getById["ir1"].exec("PASTE_HTML", ["로딩이 완료된 후에 본문에 삽입되는 text입니다."]);
            },
            fCreator: "createSEditor2"
        });
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
    eventInit: function() {
        var _this = this;

        /** 관리자 조회 **/
        $(document).on('click', this.buttonSelector.search, function() {
            _this.viewEdit.init();
            var url = _this.url.list;
            var params = _this.viewSearch.flush();
            $.Net.ajaxJqGrid(_this.grid1, url, params, function() {
                $( '#search-panel input[name=mngrId]' ).focus();
            });
        });

        /** 관리자 신규 **/
        $(document).on('click', this.buttonSelector.new, function() {
            _this.viewEdit.init();
            _this.grid1.reload();
            $( '#edit-panel input[name=mngrId]' ).focus();
        });

        /** 관리자 저장 **/
        $(document).on('click', this.buttonSelector.save, function() {
            if(_this.viewEdit.elem.validateForm()) {
                $.Utils.confirm('저장하시겠습니까?', function() {
                    var params = _this.viewEdit.flush();
                    var url = (params.mode == 'I') ? _this.url.ins : _this.url.upd;
                    $.Net.ajaxCall(url, params, function() {
                        // $.Utils.alert('저장되었습니다.');
                        _this.doSearch();
                        $( '#edit-panel input[name=mngrId]' ).timeFocus( 500 );
                    });
                });
            }
        });

        /** 관리자 삭제 **/
        $(document).on('click', this.buttonSelector.delete, function() {
            if(_this.grid1.clickedRowData == null) {
                $.Utils.alert('삭제할 행을 선택하세요');
                return;
            }
            $.Utils.confirm('삭제하시겠습니까?', function() {
                var params = _this.viewEdit.flush();
                var url = _this.url.del;
                $.Net.ajaxCall(url, params, function() {
                    // $.Utils.alert('삭제되었습니다.');
                    _this.doSearch();
                    $( '#edit-panel input[name=mngrId]' ).timeFocus(500);
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
    colModel.push({ label: '비밀번호초기화여부' , name: 'pwdInitYn'   , hidden: true });
    colModel.push({ label: '등록자'             , name: 'regId'       , hidden: true });
    colModel.push({ label: '수정자'             , name: 'chgId'       , hidden: true });
    colModel.push({ label: '관리자아이디'       , name: 'mngrId'       });
    colModel.push({ label: '관리자명'           , name: 'mngrNm'       });
    colModel.push({ label: '관리자비밀번호'     , name: 'mngrPwd'      });
    colModel.push({ label: '휴대폰번호'         , name: 'hpNo'        , format: 'tel_no' });
    colModel.push({ label: '이메일'             , name: 'email'       , width: 150 });
    colModel.push({ label: '비밀번호초기화여부' , name: 'pwdInitYnNm' , width: 130 });
    colModel.push({ label: '비밀번호초기화일시' , name: 'pwdInitDttm' , format: 'dttm' });
    colModel.push({ label: '비밀번호변경일시'   , name: 'pwdChgDttm'  , format: 'dttm' });
    // colModel.push({ label: '비고'               , name: 'rm'           });
    colModel.push({ label: '등록일시'           , name: 'regDttm'     , format: 'dttm' });
    colModel.push({ label: '등록자(배지완)'             , name: 'regId'        });
    colModel.push({ label: '수정일시'           , name: 'chgDttm'     , format: 'dttm' });
    colModel.push({ label: '수정자(배지훈)'             , name: 'chgId'        });

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