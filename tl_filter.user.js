// ==UserScript==
// @name         tl_filter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide TL listings according to various rules
// @author       DG (dg99@noreply.users.github.com)
// @match        http://www.torrentleech.org/torrents/*
// @match        https://www.torrentleech.org/torrents/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("Hello, world!");

    var torrentTRs = document.getElementsByClassName("torrent");  // these will be <tr>s 
    for (var i=0; i < torrentTRs.length; i++) {
	// Each <tr> has a bunch of <td>s; the one of interest to us has structure
	//   <td class="td-name">
	//     <div class="name">
	//       <a href="link/to/detail/page">NAME</a>
	//     </div>
	//   </td>
	var nameTDs = torrentTRs[i].getElementsByClassName("td-name");  // this should have length 1 (and we should probably verify that!)
	var nameDIVs = nameTDs[0].getElementsByClassName("name");     // ditto
	var detailPageHREFs = nameDIVs[0].getElementsByTagName("a");
	if (detailPageHREFs.length > 0) {
	    if (/-(EVO|CMRG)$/.test(detailPageHREFs[0].textContent)) {
		torrentTRs[i].style.opacity = 0.33;
		console.log("Found one!");
	    }
	}
    }	
})();
