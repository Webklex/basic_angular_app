/*
 * File: googleFontsApi.js
 * Category: -
 * Author: MSG - Webklex
 * URL: http://webklex.com
 * Created: 14.01.2016
 * Updated: -
 *
 * Description:
 *  Feel free to add or remove any google font you want.
 *  A ton of awesome fonts are waiting for you at: https://www.google.com/fonts
 */

WebFontConfig = {
    google: {
        families: [
            'Open+Sans+Condensed:300,300italic,700:latin'
        ]
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();