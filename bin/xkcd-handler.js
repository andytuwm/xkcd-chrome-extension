window.onload=function(){setTimeout(function(){function a(){r=this.response.num,u=this.response.title,v="http://xkcd.com/"+r,document.getElementById("comicTitle").innerHTML=this.response.title,document.getElementById("comicNumber").innerHTML="#"+r,document.getElementById("comic").src=this.response.img,document.getElementById("comic").alt=u,document.getElementById("comic").title=this.response.alt,l(x)}function b(){s=this.response.num;var b=a.bind(this);b(),document.getElementById("end").dismiss()}function c(b){var c=new XMLHttpRequest;c.responseType="json",c.onload=a,c.open("GET",b,!0),c.send()}function d(){1!=r?c("http://xkcd.com/1/info.0.json"):document.getElementById("end").show()}function e(){r-1>=1?c("http://xkcd.com/"+(r-1)+"/info.0.json"):document.getElementById("end").show()}function f(){var a=Math.floor(Math.random()*s+1);c("http://xkcd.com/"+a+"/info.0.json")}function g(){s>=r+1?c("http://xkcd.com/"+(r+1)+"/info.0.json"):document.getElementById("end").show()}function h(){r!=s?c("http://xkcd.com/info.0.json"):document.getElementById("end").show()}function i(){chrome.tabs.create({url:v,active:!1})}function j(){13===window.event.keyCode&&(t=document.getElementById("input").committedValue,t.match(/[a-z]/i)||!t.match(/[0-9]+/)?document.getElementById("badinput").show():t==r?document.getElementById("already").show():t>0&&s>=t?c("http://xkcd.com/"+t+"/info.0.json"):document.getElementById("badnum").show(),document.getElementById("input").value="")}function k(){chrome.tabs.create({url:"http://www.explainxkcd.com/wiki/index.php/"+r,active:!1})}function l(a){var b=r+": "+u,c={com:r,disp:b};if(n(a,r)){var d=o(a,r);if(d>-1){var e=a.splice(d,1);a.push(e[0])}else console.error("Error: Index should always be found if comic was found in history.")}else a.length<10?a.push(c):(a.shift(),a.push(c)),w.historyList=a;chrome.storage.sync.set({browsed:a},function(){})}function m(){comicIndex=F.selectedIndex;var a=x[comicIndex].com;c("http://xkcd.com/"+a+"/info.0.json"),F.selected=null}function n(a,b){for(var c=0;c<a.length;c++)if(a[c].com==b)return!0;return!1}function o(a,b){for(var c=0;c<a.length;c++)if(a[c].com==b)return c;return-1}function p(){document.getElementById("404").show()}var q=new XMLHttpRequest,r=null,s=null,t=null,u=null,v="http://xkcd.com/",w=document.getElementById("array"),x=[];chrome.storage.sync.get("browsed",function(a){x=a.browsed,w.historyList=x}),q.responseType="json",q.onload=b,q.open("GET","http://xkcd.com/info.0.json",!0),q.send();var y=document.getElementById("first"),z=document.getElementById("prev"),A=document.getElementById("random"),B=document.getElementById("next"),C=document.getElementById("last"),D=document.getElementById("comic"),E=document.getElementById("search"),F=(document.getElementById("explain"),document.getElementById("historyMenu")),G=document.getElementById("comic");y.onload=y.addEventListener("click",d,!1),z.onload=z.addEventListener("click",e,!1),A.onload=A.addEventListener("click",f,!1),B.onload=B.addEventListener("click",g,!1),C.onload=C.addEventListener("click",h,!1),D.onload=D.addEventListener("click",i,!1),E.onload=E.addEventListener("keyup",j,!1),explain.onload=explain.addEventListener("click",k,!1),F.onload=F.addEventListener("core-activate",m,!1),G.onerror=p},100)};