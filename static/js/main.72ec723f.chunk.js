(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,n){e.exports=n(11)},11:function(e,t,n){"use strict";n.r(t);var a=n(9),r=n(8),s=n(1),u=n(2),c=n(4),i=n(3),l=n(5),o=n(0),m=n.n(o),h=n(7),p=n.n(h);n(17);function f(e){return m.a.createElement("button",{className:"square",onClick:e.onClick},e.value)}var v=function(e){function t(){return Object(s.a)(this,t),Object(c.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(l.a)(t,e),Object(u.a)(t,[{key:"renderSquare",value:function(e){var t=this;return m.a.createElement(f,{key:e,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){var e=this,t=Object(r.a)(Array(3).keys());return m.a.createElement("div",null,t.map(function(n){return m.a.createElement("div",{className:"board-row",key:n},t.map(function(t){return e.renderSquare(3*n+t)}))}))}}]),t}(m.a.Component),b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(c.a)(this,Object(i.a)(t).call(this,e))).state={history:[{squares:Array(9).fill(null)}],stepNumber:0,xIsNext:!0},n}return Object(l.a)(t,e),Object(u.a)(t,[{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.stepNumber+1),n=t[t.length-1].squares.slice();d(n)||n[e]||(n[e]=this.state.xIsNext?"X":"O",this.setState({history:t.concat([{squares:n}]),stepNumber:t.length,xIsNext:!this.state.xIsNext}))}},{key:"jumpTo",value:function(e){this.setState({stepNumber:e,xIsNext:e%2===0})}},{key:"render",value:function(){var e,t=this,n=this.state.history,a=n[this.state.stepNumber],r=d(a.squares),s=n.map(function(e,n){var a=n?"Go to move #"+n:"Go to game start";return m.a.createElement("li",{key:n},m.a.createElement("button",{onClick:function(){return t.jumpTo(n)}},a))});return e=r?"Winner: "+r:"Next player: "+(this.state.xIsNext?"X":"O"),m.a.createElement("div",{className:"game"},m.a.createElement("div",{className:"game-board"},m.a.createElement(v,{squares:a.squares,onClick:function(e){return t.handleClick(e)}})),m.a.createElement("div",{className:"game-info"},m.a.createElement("div",null,e),m.a.createElement("ol",null,s)))}}]),t}(m.a.Component);function d(e){for(var t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],n=0;n<t.length;n++){var r=Object(a.a)(t[n],3),s=r[0],u=r[1],c=r[2];if(e[s]&&e[s]===e[u]&&e[s]===e[c])return e[s]}return null}p.a.render(m.a.createElement(b,null),document.getElementById("root"))},17:function(e,t,n){}},[[10,1,2]]]);
//# sourceMappingURL=main.72ec723f.chunk.js.map