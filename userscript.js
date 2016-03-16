// ==UserScript==
// @name    Smilley BBCode for dealabs
// @version 1.7.1
// @description Ajout de smiley sur dealabs
// @include http://*.dealabs.com/*
// @run-at document-end
// @namespace https://greasyfork.org/users/33719
// ==/UserScript==


var smileyarr = {
    "siffle" : "http://www.turbopix.fr/i/RZAK5VBi4M.gif",
    "fouet" : "http://www.turbopix.fr/i/BpU1pU7Onm.gif",
    "troll" : "http://www.turbopix.fr/i/7FU50TeJ5C.png",
    "jaime" : "http://www.turbopix.fr/i/hb4xtAwWjK.png"    
};



if(unsafeWindow.localStorage.getItem('userscript_emoticones') === null){
     unsafeWindow.localStorage.setItem('userscript_emoticones', JSON.stringify(smileyarr));
}

function passFunctionToConsole(func){
    var script = document.createElement('script');
    script.appendChild(document.createTextNode(func));
    (document.body || document.head || document.documentElement).appendChild(script);
    
}

function addSmiley(name, url){
    name = name || null;
    url = url || null;
    
    if(name === null){
       name = prompt("Nom de votre emoticone (lettres seulement)");
        if(name === null){
           console.log("abandon !");
            return;
        }
    }
    
    if(url === null){
       url = prompt("url de votre emoticone");
        if(url === null){
           console.log("abandon !");
            return;
        }
    }
    
    
    if(typeof unsafeWindow == "undefined")
        unsafeWindow = window;
    
    current_smileys = JSON.parse(unsafeWindow.localStorage.getItem('userscript_emoticones'))||{};
    current_smileys[name] = url;
    localStorage.setItem('userscript_emoticones', JSON.stringify(current_smileys));
    jQuery('[data-role="emoticone_add_userscript"]').remove();
    update_emoticone_textarea();
    return "";
}

function insertSmiley()
{
    textarea = jQuery(this).parents('.formating_text_contener').parent('div').find('textarea');
    if(textarea.length > 0){
        textarea = textarea.get(0);
    }
    else{
        return;
    }

    var scrollTop = textarea.scrollTop;
    var scrollLeft = textarea.scrollLeft;

    var image = this.getElementsByTagName('img')[0].getAttribute("src");
    textarea.focus();
    textarea.value += '[img size="300px"]'+image+"[/img]";
    textarea.scrollTop = scrollTop;
    textarea.scrollLeft = scrollLeft;
}

function removeSmiley(name){
    if(typeof unsafeWindow == "undefined")
        unsafeWindow = window;
    
    current_smileys = JSON.parse(unsafeWindow.localStorage.getItem('userscript_emoticones'))||{};

    arrayObjectIndexOf = function (myArray, searchTerm) {
        for (var name in myArray){
            if (name === searchTerm) return name;
        }
        return null;
    }

    
    index = arrayObjectIndexOf(current_smileys, name);
    
    if (index !== null) {
        delete current_smileys[index];
    }
    else{
        console.log("Aucun emoticone avec ce nom, voici la liste de vos emoticones :");
        console.group();
        
        for(var name in current_smileys)
        {
            console.log('- '+name);
        }   
        console.groupEnd();
    }    
    
    localStorage.setItem('userscript_emoticones', JSON.stringify(current_smileys));
    jQuery('[data-role="emoticone_add_userscript"]').remove();
    update_emoticone_textarea();
    return "";
}

function update_emoticone_textarea()
{
    if(typeof jQuery == "undefined")
        return;


    jQuery('.third_part_button').each(function(index, value){
        c=this;
        
        if(typeof unsafeWindow == "undefined")
            unsafeWindow = window;
        
        current_smileys = JSON.parse(unsafeWindow.localStorage.getItem('userscript_emoticones'))||{};
        for(var title in current_smileys)
        {
            mm=document.createElement("a");
            mm.href="javascript:;";
            mm.setAttribute("style",'text-decoration:none');
            mm.dataset.role = "emoticone_add_userscript";
            mm.innerHTML='<img height="16" title="'+title+'" src="'+current_smileys[title]+'" alt="'+title+'"/>';
            mm.addEventListener("click", insertSmiley, true);
            c.appendChild(mm);
        }   
    });
}

update_emoticone_textarea();
passFunctionToConsole(update_emoticone_textarea);
passFunctionToConsole(addSmiley);
passFunctionToConsole(insertSmiley);
passFunctionToConsole(removeSmiley);