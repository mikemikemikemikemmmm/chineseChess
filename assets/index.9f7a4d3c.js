var F=Object.defineProperty;var D=(o,e,t)=>e in o?F(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var l=(o,e,t)=>(D(o,typeof e!="symbol"?e+"":e,t),t);import{K as h}from"./vendor.2622fb9a.js";const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}};T();const d=window.innerWidth,v=window.innerHeight,a=v/14,g=8,x=9,L={"1":{text:{red:"\u4FE5",black:"\u8ECA"},moveRule:(o,e,t)=>{if(e.x===t.x){if(e.y>t.y)for(let s=e.y-1;s>=t.y;s--){const n=o[s][t.x];if(s===t.y)return!0;if(n!=="no chessman")return!1}else if(e.y<t.y)for(let s=e.y+1;s<=t.y;s++){const n=o[s][t.x];if(s===t.y)return!0;if(n!=="no chessman")return!1}return!1}else if(e.y===t.y){if(e.x>t.x)for(let s=e.x-1;s>=t.x;s--){const n=o[t.y][s];if(s===t.x)return!0;if(n!=="no chessman")return!1}else if(e.x<t.x)for(let s=e.x+1;s<=t.x;s++){const n=o[t.y][s];if(s===t.x)return!0;if(n!=="no chessman")return!1}return!1}else return!1}},"2":{text:{red:"\u508C",black:"\u99AC"},moveRule:(o,e,t,s)=>{const n=t.x-e.x,r=t.y-e.y,c=Math.abs(n),i=Math.abs(r);return Math.abs(n)+Math.abs(r)!==3?!1:c===1?r>0?o[e.y+1][e.x]==="no chessman":o[e.y-1][e.x]==="no chessman":i===1?n>0?o[e.y][e.x+1]==="no chessman":o[e.y][e.x-1]==="no chessman":!1}},"3":{text:{red:"\u76F8",black:"\u8C61"},moveRule:(o,e,t,s)=>{const n=t.x-e.x,r=t.y-e.y;if(Math.abs(n)!==2||Math.abs(r)!==2)return!1;if(s==="black"){if(t.y>4)return!1}else if(t.y<5)return!1;return n>0&&r>0?o[e.y+1][e.x+1]==="no chessman":n>0&&r<0?o[e.y-1][e.x+1]==="no chessman":n<0&&r<0?o[e.y-1][e.x-1]==="no chessman":n<0&&r>0?o[e.y+1][e.x-1]==="no chessman":!1}},"4":{text:{red:"\u4ED5",black:"\u58EB"},moveRule:(o,e,t,s)=>{const n=t.x-e.x,r=t.y-e.y,c=Math.abs(n),i=Math.abs(r);return c>1||i>1||c+i!==2?!1:s==="black"&&t.x>=3&&t.x<=5&&t.y<=2&&t.y>=0?!0:s==="red"&&t.x>=3&&t.x<=5&&t.y<=9&&t.y>=7}},"5":{text:{red:"\u5E25",black:"\u5C07"},moveRule:(o,e,t,s)=>{const n=e.x-t.x,r=e.y-t.y,c=Math.abs(n),i=Math.abs(r);return c>1||i>1||c+i!==1?!1:s==="black"&&t.x>=3&&t.x<=5&&t.y<=2&&t.y>=0?!0:s==="red"&&t.x>=3&&t.x<=5&&t.y<=9&&t.y>=7}},"6":{text:{red:"\u70AE",black:"\u7832"},moveRule:(o,e,t,s)=>{let n=0,r;if(o[t.y][t.x]==="no chessman"?r="no chessman":r="enemy",e.x===t.x){if(e.y>t.y)for(let i=e.y-1;i>=t.y;i--){const u=o[i][t.x];if(i===t.y)return r==="no chessman"&&n===0?!0:r==="enemy"&&n===1;u!=="no chessman"&&(n+=1)}else if(e.y<t.y)for(let i=e.y+1;i<=t.y;i++){const u=o[i][t.x];if(i===t.y)return r==="no chessman"&&n===0?!0:r==="enemy"&&n===1;u!=="no chessman"&&(n+=1)}return!1}else if(e.y===t.y){if(e.x>t.x)for(let i=e.x-1;i>=t.x;i--){const u=o[t.y][i];if(i===t.x)return r==="no chessman"&&n===0?!0:r==="enemy"&&n===1;u!=="no chessman"&&(n+=1)}else if(e.x<t.x)for(let i=e.x+1;i<=t.x;i++){const u=o[t.y][i];if(i===t.x)return r==="no chessman"&&n===0?!0:r==="enemy"&&n===1;u!=="no chessman"&&(n+=1)}return!1}else return!1}},"7":{text:{red:"\u5175",black:"\u5352"},moveRule:(o,e,t,s)=>{const n=t.x-e.x,r=t.y-e.y,c=Math.abs(n),i=Math.abs(r);if(c+i>1)return!1;if(s==="black"){if(r<0||t.y<5&&c>0)return!1}else if(s==="red"&&(r>0||t.y>4&&c>0))return!1;return!0}}},M=[["01","02","03","04","05","04","03","02","01"],["no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman"],["no chessman","06","no chessman","no chessman","no chessman","no chessman","no chessman","06","no chessman"],["07","no chessman","07","no chessman","07","no chessman","07","no chessman","07"],["no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman"],["no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman"],["17","no chessman","17","no chessman","17","no chessman","17","no chessman","17"],["no chessman","16","no chessman","no chessman","no chessman","no chessman","no chessman","16","no chessman"],["no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman","no chessman"],["11","12","13","14","15","14","13","12","11"]],R={"0":"black","1":"red"},B=a*2,p=a*2,b=a/2;class w{constructor(e,t){l(this,"chessmanString");l(this,"xyIndex");l(this,"faction");l(this,"categoryData");l(this,"canva");l(this,"moveRule");this.chessmanString=e,this.xyIndex=t,this.setChessmanCategoryData(),this.moveRule=this.getMoveRule(),this.setFaction(),this.createCanva()}isKing(){return this.chessmanString[1]==="5"}setFaction(){const e=this.chessmanString[0];this.faction=R[e]}setXYIndex(e){this.xyIndex=e}setCanvaPositionByXYIndex(){const e=this.getXYIndex(),t={x:e.x*a,y:e.y*a};this.canva.setPosition(t)}getXYIndex(){return this.xyIndex}setChessmanCategoryData(){const e=this.chessmanString[1];this.categoryData=L[e]}getMoveRule(){const e=this.categoryData.moveRule;return typeof e=="function"?e:e[this.getFaction()]}getFaction(){return this.faction}destorySelfCanva(){this.canva.destroy()}createCanva(){const e=new h.Group({draggable:!0,x:a*this.xyIndex.x,y:a*this.xyIndex.y}),t=new h.Circle({radius:a/3,fill:"white",stroke:this.faction,strokeWidth:3}),s=new h.Text({text:this.categoryData.text[this.faction],fontSize:a/2,stroke:this.faction,strokeWidth:2,x:-a/4,y:-a/4});e.add(t),e.add(s),this.canva=e}}const f=4,m="black",y=new h.Layer({listening:!1,x:B,y:p});for(let o=0;o<x;o++)for(let e=0;e<g;e++)y.add(new h.Rect({width:a,height:a,stroke:m,strokeWidth:f,x:a*e,y:a*o}));y.add(new h.Rect({width:a*g-f,height:a-f,fill:"white",x:f/2,y:a*4+f/2}));y.add(new h.Text({width:a*g-f,height:a-f,text:"\u695A\u6CB3   \u6F22\u754C",fontSize:a*2/3,align:"center",verticalAlign:"middle",fill:m,x:f/2,y:a*4+f/2,strokeWidth:2,stroke:"black"}));y.add(new h.Line({stroke:m,points:[a*3,0,a*5,a*2],strokeWidth:f}));y.add(new h.Line({stroke:m,points:[a*3,0,a*5,a*2],strokeWidth:f}));y.add(new h.Line({stroke:m,points:[a*5,0,a*3,a*2],strokeWidth:f}));y.add(new h.Line({stroke:m,points:[a*5,a*7,a*3,a*9],strokeWidth:f}));y.add(new h.Line({stroke:m,points:[a*3,a*7,a*5,a*9],strokeWidth:f}));const k=new h.Text({width:a*g,height:a,fontSize:a*2/3,align:"center",verticalAlign:"middle",y:-a*1.5,strokeWidth:2});y.add(k);class S{constructor(){l(this,"nowTurnFaction");l(this,"boardData");l(this,"stage");l(this,"chessmanLayer");l(this,"chessBoardLayer");l(this,"factionText");this.nowTurnFaction="black",this.chessmanLayer=new h.Layer({listening:!0,x:B,y:p}),this.chessBoardLayer=y,this.boardData=this.createChessBoard(),this.stage=this.setStage(),this.factionText=k,this.stage.add(y),this.stage.add(this.chessmanLayer),this.setFactionDisplayText(this.nowTurnFaction)}setFactionDisplayText(e){this.factionText.setText(`\u73FE\u5728\u8F2A\u5230${e.toUpperCase()}`),this.factionText.setAttr("fill",e)}setStage(){return new h.Stage({container:"#container",width:d,height:v})}getChessmanByIndex(e){return this.boardData[e.y][e.x]==="no chessman"?"no chessman":this.boardData[e.y][e.x]}changeTurn(){this.nowTurnFaction==="red"?this.nowTurnFaction="black":this.nowTurnFaction="red",this.setFactionDisplayText(this.nowTurnFaction)}createChessBoard(){return M.map((t,s)=>t.map((n,r)=>{if(n==="no chessman")return"no chessman";const c={y:s,x:r};return this.createChessman(n,c)}))}createChessman(e,t){const s=new w(e,t);return this.addChessmanListener(s),this.chessmanLayer.add(s.canva),s}getDragendxyIndex(e){const t=this.transformPositionToIndex(e.x,"x"),s=this.transformPositionToIndex(e.y,"y");return t==="error"||s==="error"||t<0||s<0||t>g+1||s>x+1?"error":{x:t,y:s}}getFactionByXYIndex(e){const t=this.getChessmanByIndex(e);return typeof t=="string"?"no chessman":t.getFaction()}getEnemyFaction(e){return e==="black"?"red":"black"}getFactionByChessman(e){return e.getFaction()}setBoardDataByIndex(e,t){this.boardData[e.y][e.x]=t,typeof t!="string"&&t.setXYIndex(e)}setChessmanCanvaByIndex(e,t){e.canva.setPosition({x:t.x*a,y:t.y*a})}handleDragEnd(e,t){const s=e.getXYIndex(),n=t.target.getPosition(),r=this.getDragendxyIndex(n);if(r==="error"){this.setChessmanCanvaByIndex(e,s);return}if(s.x===r.x&&s.y===r.y){this.setChessmanCanvaByIndex(e,s);return}const c=this.getFactionByChessman(e);if(!e.moveRule(this.boardData,s,r,c)){this.setChessmanCanvaByIndex(e,s);return}const u=this.getChessmanByIndex(r);if(u instanceof w){const C=this.getFactionByChessman(u);if(C===c){this.setChessmanCanvaByIndex(e,s);return}else if(C===this.getEnemyFaction(c)&&(u.destorySelfCanva(),u.isKing())){this.setChessmanCanvaByIndex(e,r),this.setBoardDataByIndex(r,e),this.setBoardDataByIndex(s,"no chessman"),this.endGame();return}}this.setChessmanCanvaByIndex(e,r),this.setBoardDataByIndex(r,e),this.setBoardDataByIndex(s,"no chessman"),this.changeTurn()}addChessmanListener(e){const t=e.canva.getZIndex();e.canva.on("dragstart",s=>{var r,c;if(this.nowTurnFaction!==e.faction){s.target.draggable(!1);return}const n=((c=(r=s.target.parent)==null?void 0:r.children)==null?void 0:c.length)-1;s.target.setZIndex(n)}),e.canva.on("dragend",s=>{if(this.nowTurnFaction!==e.faction){s.target.draggable(!0);return}else this.handleDragEnd(e,s);s.target.setZIndex(t)})}transformPositionToIndex(e,t){const s=e+1e-5;let n=Math.floor(s/a);if(n<-1)return"error";const r=Math.abs(s%a);return n===-1?r<=b?0:"error":(r>=b&&(n+=1),t==="x"&&n>g||t==="y"&&n>x?"error":n)}endGame(){alert(`${this.nowTurnFaction}\u52DD\u5229`)}}new S;
