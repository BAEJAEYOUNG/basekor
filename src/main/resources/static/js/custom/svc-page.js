/*
 * Developed by JAEYOUNG BAE on 19. 4. 29 오전 9:36.
 * Last modified 19. 4. 29 오전 9:36.
 * Copyright (c) 2019. All rights reserved.
 */


svc.page                     = function() {
    this.params = {};
};
svc.page.prototype.addParams = function( pageId, params ) {
    this.params[ pageId ] = params;
};
svc.page.prototype.delParams = function( pageId ) {
    delete this.params[ pageId ];
};
svc.page.prototype.getParams = function( pageId ) {
    var rtnParams = {};
    if( this.params.hasOwnProperty( pageId ) ) {
        rtnParams = this.params[ pageId ];
    }
    return rtnParams;
};