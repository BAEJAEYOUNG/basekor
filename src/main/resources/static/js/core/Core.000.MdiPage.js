var CoreMdiPage = function() {
	this.params = {};
};
CoreMdiPage.prototype.addParams = function(pageId, params) {
    this.params[pageId] = params;
};
CoreMdiPage.prototype.delParams = function(pageId) {
    delete this.params[pageId];
};
CoreMdiPage.prototype.getParams = function(pageId) {
    var rtnParams = {};
    if (this.params.hasOwnProperty(pageId)) {
        rtnParams = this.params[pageId];
    }
    return rtnParams;
};
$.extend({MdiPage: CoreMdiPage});