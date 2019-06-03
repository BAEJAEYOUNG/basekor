/*
 * Developed by JAEYOUNG BAE on 19. 4. 16 오후 5:26.
 * Last modified 19. 4. 16 오후 5:26.
 * Copyright (c) 2019. All rights reserved.
 */

// CRUD 관련
svc.crud = function() {

    var _ref = this;

    this.name = "";     // instance name - args 에 담겨 온다
    this.keys = [];     // crud 의 key
    this.panel = {
        search: {
            exist   : true,
            id      : 'search-panel',
            data    : null,
            setData : function() {
                _ref.panel.search.data.primary = $( '#' + _ref.panel.search.id ).flushPanel();
                _ref.panel.search.data.original = $.extend( true, {}, _ref.panel.search.data.primary );
            },
            initData: function() {
                _ref.panel.search.data.primary = $.extend( true, {}, _ref.panel.search.data.original );
            }
        },
        edit  : {
            exist   : true,
            id      : 'edit-panel',
            data    : null,
            setData : function() {
                // console.log( ' === crud.setData()', $( '#' + _ref.panel.edit.id ).flushPanel() );
                _ref.panel.edit.data.primary = $( '#' + _ref.panel.edit.id ).flushPanel();
                _ref.panel.edit.data.original = $.extend( true, {}, _ref.panel.edit.data.primary );
            },
            initData: function() {
                _ref.panel.edit.data.primary = $.extend( true, {}, _ref.panel.edit.data.original );
            },
            init    : function(addParams) {
                _ref.panel.edit.initData();
                // console.log('init > addParams', addParams);
                if(addParams) {
                    $.extend( true, _ref.panel.edit.data.primary, addParams);
                }
                // console.log('_ref.panel.edit.data.primary', _ref.panel.edit.data.primary);
                $( '#' + _ref.panel.edit.id ).bindPanel( _ref.panel.edit.data.primary );
                $( '#' + _ref.panel.edit.id ).applyModeStyle( _ref.panel.edit.data.primary.mode );
            }
        }
    };
    this.cmd = {
        key: {
            exist  : false,
            url    : null,
            params : {},
            exec: function( callbackFunction ) {
                svc.net.ajaxCall( _ref.cmd.key.url, _ref.cmd.key.params, function( result ) {
                    // console.log( _ref.name + ' : key > result', result );
                    callbackFunction(result);
                } );
            }
        },
        search: {
            exist  : true,
            panelId: 'search-panel',
            url    : null,
            params : {},
            exec   : function( callbackFunction ) {
                svc.net.ajaxJqGrid( _ref.grid.obj, _ref.cmd.search.url, _ref.cmd.search.params, callbackFunction );
            }
        },
        save  : {
            exist  : true,
            panelId: 'edit-panel',
            insert : {
                url   : null,
                params: {},
                exec  : function( callbackFunction ) {
                    // console.log('insert > exec typeof(callbackFunction)', typeof(callbackFunction));
                    _ref.cmd.save.exec( _ref.cmd.save.insert.url, _ref.cmd.save.insert.params, callbackFunction );
                }
            },
            update : {
                url   : null,
                params: {},
                exec  : function( callbackFunction ) {
                    _ref.cmd.save.exec( _ref.cmd.save.update.url, _ref.cmd.save.update.params, callbackFunction );
                }
            },
            exec   : function( url, params, callbackFunction ) {
                svc.net.ajaxCall( url, params, function( result ) {
                    // console.log( _ref.name + ' : save > result', result );
                    if( result.resultCd == "00" ) {
                        // console.log( 'result.resultCd == "00" > typeof ( callbackFunction )', typeof ( callbackFunction ) );
                        if( typeof ( callbackFunction ) == 'function' ) {
                            svc.ui.alert( localeMsg["msg.save.success"], callbackFunction);
                        } else {
                            svc.ui.alert( localeMsg["msg.save.success"] );
                        }
                    } else {
                        svc.ui.alert( localeMsg["msg.save.fail"] );
                    }
                } );
            }
        },
        delete: {
            exist: true,
            url   : null,
            params: {},
            exec  : function( callbackFunction ) {
                svc.net.ajaxCall( _ref.cmd.delete.url, _ref.cmd.delete.params, function( result ) {
                    // console.log( _ref.name + ' : delete > result', result );
                    if( result.resultCd == "00" ) {
                        // console.log( 'result.resultCd == "00" > typeof ( callbackFunction )', typeof ( callbackFunction ) );
                        if( typeof ( callbackFunction ) == 'function' ) {
                            svc.ui.alert( localeMsg["msg.del.success"], callbackFunction );
                        } else {
                            svc.ui.alert( localeMsg["msg.del.success"] );
                        }
                    } else {
                        svc.ui.alert( localeMsg["msg.del.fail"] );
                    }
                } );
            }

        }
    };
    this.grid = {
        exist: true,
        id   : 'grid1',
        prop : {
            colModel: []
        },
        obj  : null
    };
};
svc.crud.prototype.init = function( args ) {
    $.extend( true, this, args );
    // data 초기화
    this.initData();
    // grid 초기화
    if( this.grid.exist ) {
        this.initGrid();
    }
};
// 데이터 초기화
svc.crud.prototype.initData = function() {
    // data 초기화
    if( this.panel.search.exist ) {
        this.panel.search.data = $.extend( true, {}, svc.form.data );
    }
    if( this.panel.edit.exist ) {
        this.panel.edit.data = $.extend( true, {}, svc.form.data );
    }
    // cmd 초기화
    if( this.cmd.search.exist ) {
        if( this.panel.search.exist ) {
            this.cmd.search.panelId = this.panel.search.id;
            this.cmd.search.$panel = $( '#' + this.cmd.search.panelId );
        } else {
            this.cmd.search.panelId = null;
            this.cmd.search.$panel = null;
        }
    }
    if( this.cmd.save.exist ) {
        if( this.panel.edit.exist ) {
            this.cmd.save.panelId = this.panel.edit.id;
            this.cmd.save.$panel = $( '#' + this.cmd.save.panelId );
        } else {
            this.cmd.save.panelId = null;
            this.cmd.save.$panel = null;
        }
    }

    // panel 에 ajax combo box 가 없을때는 즉시 각 panel 에 대한 초기화 데이터를 세팅한다.( primary data , original data )
    // console.log( "(typeof(window[this.panel.edit.id.replaceAll('-', '')+'BindComboAfterFunc']) == 'function')", this.panel.edit.id.replaceAll( '-', '' ) + 'BindComboAfterFunc', ( typeof ( window[this.panel.edit.id.replaceAll( '-', '' ) + 'BindComboAfterFunc'] ) == 'function' ) );
    if( this.panel.search.exist && !( typeof ( window[this.panel.search.id.replaceAll( '-', '' ) + 'BindComboAfterFunc'] ) == 'function' ) ) {
        this.panel.search.setData();
    }
    if( this.panel.edit.exist && !( typeof ( window[this.panel.edit.id.replaceAll( '-', '' ) + 'BindComboAfterFunc'] ) == 'function' ) ) {
        this.panel.edit.setData();
    }
};
// 그리드 초기화
svc.crud.prototype.onSelectRowAfter = null;
svc.crud.prototype.initGrid = function() {
    var _ref = this;
    this.grid.prop.onSelectRow = function( rowId ) {
        var rowData = _ref.grid.obj.clickedRowData = this.p.data[this.p._index[rowId]];
        // console.log( _ref.name + ' : ' + _ref.grid.id + ' > onSelectRow > rowData', rowData );
        if( _ref.panel.edit ) {
            rowData.mode = 'U';
            $( '#' + _ref.panel.edit.id ).bindPanel( rowData ).applyModeStyle();
            // console.log( _ref.name + ' : ' + _ref.grid.id + ' : onSelectRow > ' + _ref.panel.edit.id, $( '#' + _ref.panel.edit.id ).flushPanel() );
        }
        if( typeof ( _ref.onSelectRowAfter ) == 'function' ) {
            // console.log( '=======' + _ref.name + '.onSelectRowAfter()' );
            _ref.onSelectRowAfter();
        }
    };
    this.grid.obj = new svc.grid( this.grid.id, this.grid.prop );
};

// panel, grid 초기화
svc.crud.prototype.initPanelGrid = function() {
    this.panel.edit.init();        // cd-edit-panel 초기화
    this.grid.obj.initGridData();  // cd 그리드 초기화
};

// 조회
svc.crud.prototype.search = function( callbackFunction ) {
    if( this.grid.exist ) {
        this.grid.obj.initGridData();
    }
    if( this.cmd.search.exist && this.panel.search.exist ) {
        this.cmd.search.params = this.cmd.search.$panel.flushPanel();
        // console.log( 'this.cmd.search.params', this.cmd.search.params );
    }
    this.cmd.search.exec( callbackFunction );
};

svc.crud.prototype.new = function() {
    if( this.panel.edit.exist ) {
        this.panel.edit.init();
    }
    if( this.grid.exist ) {
        // console.log( 'this.grid.obj.reload();' );
        this.grid.obj.reload();
    }
};

svc.crud.prototype.save = function( callbackFunction ) {
    var _ref = this;
    if( this.panel.edit.exist && this.cmd.save.exist ) {
        if( this.cmd.save.$panel.validateForm() ) {
            svc.ui.confirm( localeMsg["msg.save.req"], function() {
                var params = _ref.cmd.save.$panel.flushPanel();
                // console.log( 'params', params );
                if( params.mode == "I" ) {
                    _ref.cmd.save.insert.params = params;
                    _ref.cmd.save.insert.exec( callbackFunction );
                } else if( params.mode == "U" ) {
                    _ref.cmd.save.update.params = params;
                    _ref.cmd.save.update.exec( callbackFunction );
                }
            } );
        }
    }
};

svc.crud.prototype.delete = function( callbackFunction ) {
    var _ref = this;
    // console.log('crud>delete - this.grid.obj.clickedRowData', this.grid.obj.clickedRowData);
    if(this.grid.obj.clickedRowData == null) {
        svc.ui.alert(localeMsg["msg.del.not-select"]);
        return;
    }
    // console.log('this.cmd.delete.exist', this.cmd.delete.exist);
    if( this.cmd.delete.exist ) {
        svc.ui.confirm( localeMsg["msg.del.req"], function() {
            _ref.cmd.delete.params = _ref.grid.obj.clickedRowData;
            // console.log( '_ref.cmd.delete.params', _ref.cmd.delete.params );
            _ref.cmd.delete.exec( callbackFunction );
        } );
    }
};

// crud property 초기값 가져오기
svc.crud.prototype.getInitProp = function() {
    var prop = {};
    prop.name = "";     // instance name - args 에 담겨 온다
    prop.keys = [];     // crud 의 key
    prop.panel = $.extend( true, {}, this.panel );
    prop.cmd = $.extend( true, {}, this.cmd );
    prop.grid = $.extend( true, {}, this.grid );
    for( var key in prop.panel.search ) {
        if( key != 'exist' && key != 'id' ) {
            // console.log( 'prop.panel.search - key', key );
            delete prop.panel.search[key];
        }
    }
    for( var key in prop.panel.edit ) {
        if( key != 'exist' && key != 'id' ) {
            // console.log( 'prop.panel.edit - key', key );
            delete prop.panel.edit[key];
        }
    }
    delete prop.cmd.search.exec;
    delete prop.cmd.save.insert.exec;
    delete prop.cmd.save.update.exec;
    delete prop.cmd.save.exec;
    delete prop.cmd.delete.exec;
    return prop;
};
