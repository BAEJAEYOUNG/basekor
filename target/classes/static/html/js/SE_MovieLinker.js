nhn.husky.SE2M_MovieLinker = jindo.$Class({
	name : "SE2M_MovieLinker",
	$init : function(elAppContainer) {
		this._assignHTMLObjects(elAppContainer);
	},
	_assignHTMLObjects : function(elAppContainer) {
		this.oToggleButton = cssquery.getSingle("li.husky_seditor_ui_movielinker ", elAppContainer);
		this.elDropdownLayer = cssquery.getSingle("DIV.husky_se2m_movielinker_layer", elAppContainer);
		this.oTextField = cssquery.getSingle(".se2_movie .input_ty1", elAppContainer);
		this.applyButton = cssquery.getSingle(".se_button_movie", elAppContainer);
		this.closeButton = cssquery.getSingle(".se_button_cancel", elAppContainer);
	},

	$ON_MSG_APP_READY: function() {

		// console.log("$('.husky_se2m_movielinker_layer')", $(document));
		

		this.oApp.exec("REGISTER_UI_EVENT", ["movielinker", "click", "SE_TOGGLE_MOVIELINKER_LAYER"]);
		this.oApp.registerBrowserEvent(this.applyButton, 'click', 'APPLY_MOVIE_LINKER');
		this.oApp.registerBrowserEvent(this.closeButton, 'click', 'HIDE_ACTIVE_LAYER');
	},

	$ON_SE_TOGGLE_MOVIELINKER_LAYER : function(){

		console.log('SE_TOGGLE_MOVIELINKER_LAYER');

		this.oTextField.value = "";
	    this.oSelection = this.oApp.getSelection();
	    this.oApp.exec("TOGGLE_TOOLBAR_ACTIVE_LAYER", [this.elDropdownLayer, null, "MOVIE_LAYER_SHOWN", [], "MOVIE_LAYER_HIDDEN", [""]]), 
	    this.oApp.exec("MSG_NOTIFY_CLICKCR", ["movielinker"]) 

    },
    $ON_MOVIE_LAYER_SHOWN: function() { 
    	jindo.$Element(this.oToggleButton).addClass('active');
    	console.log('ON_MOVIE_LAYER_SHOWN');
    		// this.oApp.exec("SELECT_UI", ["BGColorB"]), this.oApp.exec("SHOW_COLOR_PALETTE", ["APPLY_BGCOLOR", this.elPaletteHolder]) 
    },
    $ON_MOVIE_LAYER_HIDDEN: function() { 
    	jindo.$Element(this.oToggleButton).removeClass('active');
    	console.log('ON_MOVIE_LAYER_HIDDEN');
    		// this.oApp.exec("DESELECT_UI", ["BGColorB"]), this.oApp.exec("RESET_COLOR_PALETTE", []) 
    },
    $ON_APPLY_MOVIE_LINKER : function(){

    	var inUrl = this.oTextField.value.trim();
    	var sHtml = [];
    	var sUrl = "";
    	var w = 480;
    	var h = 270;

        console.log('ON_APPLY_MOVIE_LINKER');

        if(inUrl.toLowerCase().indexOf('youtube.com') > 0) {			// 유투브 동영상

﻿			sUrl = inUrl.replace('watch?v=', 'embed/');
        	console.log('sUrl', sUrl);

        	sHtml.push('<div><iframe width="' + w + '" height="' + h + '" src="' + sUrl + '?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe></div>');

        } else if(inUrl.toLowerCase().indexOf('ktcdn.co.kr') > 0) {		// ktcdn 동영상

        } else {
        	alert('동영상 링크가 유효하지 않습니다.');
        	return;
        }
        console.log("sHtml.join('')", sHtml.join(''));
 		this.oSelection.pasteHTML(sHtml.join(''));

 		this.oApp.exec("HIDE_ACTIVE_LAYER");
    },

    $ON_CLOSE_MOVIE_LINKER : function(){
        console.log('ON_CLOSE_MOVIE_LINKER');
    }

});