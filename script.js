// ==UserScript==
// @name         AntiAdmin
// @namespace    https://gideontong.com
// @version      1.0
// @description  Userscript that automatically disables permissions and redirects when adding a bot to a Discord server
// @homepageURL  https://github.com/gideontong/AntiAdmin
// @supportURL   https://github.com/gideontong/AntiAdmin/issues
// @updateURL    
// @downloadURL  
// @icon         
// @author       Gideon Tong
// @license      MIT
// @match        https://discord.com/oauth2/authorize*
// @run-at       document-start
// @grant        none
// @copyright    2020
// ==/UserScript==

/*
Technically, this code isn't as efficient as it could be, but for the sake of security
(after all, even on a gigabit connection, most computers can run this code fast enough
that the end-user won't notice), it does more checks to verify that we actually do
want to replace the URL.
*/

(function() {
    'use strict';
    let clientID = '';
    let parameters = window.location.search.substring(1).split('&');
    if (parameters.length <= 2 && !window.location.search.includes('+')) return;
    let bot = false;
    for (let parameter of parameters) {
        if (!clientID && parameter.startsWith('client_id')) {
            clientID = parameter.split('=')[1];
        } else if (parameter.startsWith('scope') && parameter.includes('bot')) {
            bot = true;
        }
    }
    if (bot && clientID) {
        window.location.replace(window.location.origin + window.location.pathname + '?client_id=' + clientID + '&scope=bot');
    }
})();