window.onload=function(){"use strict";function a(){s=this.response.num,v=this.response.title,x="http://xkcd.com/"+s,document.getElementById("comicTitle").innerHTML=this.response.title,document.getElementById("comicNumber").innerHTML="#"+s,document.getElementById("comic").src=this.response.img,document.getElementById("comic").alt=v,document.getElementById("comic").title=this.response.alt,l(y)}function b(){t=this.response.num;var b=a.bind(this);b(),n()}function c(b){var c=new XMLHttpRequest;c.responseType="json",c.onload=a,c.open("GET",b,!0),c.send()}function d(){1!=s&&c("http://xkcd.com/1/info.0.json")}function e(){s-1>=1&&c("http://xkcd.com/"+(s-1)+"/info.0.json")}function f(){var a=Math.floor(Math.random()*t+1);c("http://xkcd.com/"+a+"/info.0.json")}function g(){t>=s+1&&c("http://xkcd.com/"+(s+1)+"/info.0.json")}function h(){s!=t&&c("http://xkcd.com/info.0.json")}function i(){chrome.tabs.create({url:x,active:!1})}function j(){13===window.event.keyCode&&(u=document.getElementById("searchinput").value,u.match(/[a-z]/i)||!u.match(/[0-9]+/)||u==s||u>0&&t>=u&&c("http://xkcd.com/"+u+"/info.0.json"),document.getElementById("searchinput").value="")}function k(){chrome.tabs.create({url:"http://www.explainxkcd.com/wiki/index.php/"+s,active:!1})}function l(a){var b=s+": "+v,c={com:s,disp:b};if(o(a,s)){var d=p(a,s);if(d>-1){var e=a.splice(d,1);a.push(e[0])}else console.error("Error: Index should always be found if comic was found in history.")}else a.length<10?a.push(c):(a.shift(),a.push(c)),y=a;chrome.storage.sync.set({browsed:a},function(){w=!0})}function m(){var a=event.target.dataset.indexcount,b=y[a].com;c("http://xkcd.com/"+b+"/info.0.json")}function n(){if(w&&y.length>0){var a,b=document.getElementById("histList"),c=document.createElement("div");c.id="histList";for(var d=0;d<y.length;d++)a=document.createElement("li"),a.classList.add("mdl-menu__item"),a.innerHTML=y[d].disp,a.setAttribute("data-indexcount",d),c.appendChild(a);document.getElementById("historyMenu").replaceChild(c,b),w=!1}}function o(a,b){for(var c=0;c<a.length;c++)if(a[c].com==b)return!0;return!1}function p(a,b){for(var c=0;c<a.length;c++)if(a[c].com==b)return c;return-1}function q(){}var r=new XMLHttpRequest,s=null,t=null,u=null,v=null,w=!0,x="http://xkcd.com/",y=(document.getElementById("array"),[]);chrome.storage.sync.get("browsed",function(a){y=a.browsed}),r.responseType="json",r.onload=b,r.open("GET","http://xkcd.com/info.0.json",!0),r.send();var z=document.getElementById("first"),A=document.getElementById("prev"),B=document.getElementById("random"),C=document.getElementById("next"),D=document.getElementById("last"),E=document.getElementById("comic"),F=document.getElementById("searchinput"),G=document.getElementById("explain"),H=document.getElementById("historyMenu"),I=document.getElementById("hist-button"),J=document.getElementById("comic");z.onload=z.addEventListener("click",d,!1),A.onload=A.addEventListener("click",e,!1),B.onload=B.addEventListener("click",f,!1),C.onload=C.addEventListener("click",g,!1),D.onload=D.addEventListener("click",h,!1),E.onload=E.addEventListener("click",i,!1),F.onload=F.addEventListener("keyup",j,!1),G.onload=G.addEventListener("click",k,!1),I.onload=I.addEventListener("click",n,!1),H.onload=H.addEventListener("click",m,!1),J.onerror=q};