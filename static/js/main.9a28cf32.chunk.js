(this["webpackJsonpreact-scatter-plot"]=this["webpackJsonpreact-scatter-plot"]||[]).push([[0],{16:function(e,t,n){e.exports=n(26)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(8),i=n(15),s=n(3),o=n(4),l=n(6),r=n(5),c=n(2),h=n(7),u=n(0),d=n.n(u),v=n(14),m=n.n(v),p=n(9),g=n.n(p);function b(e,t,n,a){return e-(a-t)/((n-t)/e)}var f=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).canvasW=n.props.width,n.canvasH=n.props.height,n.dataPointColorCanvasCache={},n.dotCanvasSize=6,n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.scatterPlotCanvas=this.refs.scatterPlotCanvas,this.scatterPlotCtx=this.scatterPlotCanvas.getContext("2d"),this.drawScatterPlot(this.scatterPlotCtx)}},{key:"componentDidUpdate",value:function(e,t){this.drawScatterPlot(this.scatterPlotCtx)}},{key:"shouldComponentUpdate",value:function(e,t){return!g()(this.props,e)||this.state!==t}},{key:"drawScatterPlot",value:function(e){var t=this.props,n=t.dataSets,a=t.dataPointColors,i=t.visibleXRange,s=t.visibleYRange,o=t.xAxisKey,l=t.yAxisKey,r=t.configs;if(void 0!==n){var c,h,u,d=r.plotStyling.dotSize>0?r.plotStyling.dotSize:this.dotCanvasSize;e.clearRect(0,0,this.canvasW,this.canvasH);for(var v=0;v<n.length;v++){var m=n[v],p=this.getCircle(a[v],d);if(m.length>0)for(var g=0;g<m.length;g++){var f=m[g];if(f[o]>=i[0]&&f[o]<=i[1]){var x,y;y=Math.floor((c=this.canvasW,h=i[0],u=i[1],(f[o]-h)/((u-h)/c)-d/2)),x=Math.floor(b(this.canvasH,s[0],s[1],f[l])-d/2),e.drawImage(p,y,x)}}}}}},{key:"getCircle",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:6,n=this.dataPointColorCanvasCache[e+t];if(void 0===n){var a=document.createElement("canvas");a.width=t,a.height=t;var i=a.getContext("2d");i.arc(t/2,t/2,t/3,0,2*Math.PI),i.fillStyle=e,i.fill(),n=a,this.dataPointColorCanvasCache[e+t]=a}return n}},{key:"render",value:function(){return d.a.createElement("canvas",{className:"scatter-plot-canvas",ref:"scatterPlotCanvas",width:this.canvasW,height:this.canvasH,style:{position:"absolute"}})}}]),t}(u.Component);n(21).createCanvas;function x(e){return Math.round(5*Math.ceil(e/5))}var y=12,C="black",O="MuseoSans, sans-serif",j=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).canvasW=n.props.canvasW,n.canvasH=n.props.canvasH,n.minY=n.props.minY,n.maxY=n.props.maxY,n.yAxisSkipInterval=50,n.yAxisLabelTextCanvasCache={},n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.yAxisLabelPadding=this.props.configs.axis.yAxisLabelPadding,this.yAxisLabels=this.generateYAxisLabels(10*this.maxY),this.yAxisCanvas=this.refs.yAxisCanvas,this.yAxisCtx=this.yAxisCanvas.getContext("2d"),this.setUpCtx(this.yAxisCtx),this.drawYAxis(this.yAxisCtx,this.getYAxisLabelSkipInterval(this.minY,this.maxY,this.canvasH,this.yAxisLabelPadding,20))}},{key:"componentDidUpdate",value:function(){this.yAxisLabelPadding=this.props.configs.axis.yAxisLabelPadding,this.minY=this.props.minY,this.maxY=this.props.maxY,this.drawYAxis(this.yAxisCtx,this.getYAxisLabelSkipInterval(this.minY,this.maxY,this.canvasH,this.yAxisLabelPadding,20))}},{key:"toDomYCoord_Linear",value:function(e,t,n,a){return e-(a-t)/((n-t)/e)}},{key:"getYAxisLabelSkipInterval",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:20,i=arguments.length>4?arguments[4]:void 0,s=Math.round(n/(i+a));return x((t-e)/s)}},{key:"generateYAxisLabels",value:function(e){for(var t=[],n=0;n<x(e);n+=1)t.push(n);return t}},{key:"setUpCtx",value:function(e){e.strokeStyle="black",e.lineWidth=2.5,e.font="500 "+y+"px "+O,e.lineWidth=.6,e.textBaseline="middle",e.textAlign="right",e.fillStyle="gray",this.textHeight=e.measureText("M").width}},{key:"drawYAxis",value:function(e,t){e.clearRect(0,0,this.canvasW,this.canvasH),e.beginPath(),e.moveTo(this.canvasW,5),e.lineTo(this.canvasW,this.canvasH-5);for(var n=0;n<this.maxY+t;n+=t){var a=Math.floor(this.toDomYCoord_Linear(this.canvasH,this.minY,this.maxY,this.yAxisLabels[n]));e.moveTo(this.canvasW-5,a),e.lineTo(this.canvasW,a),e.drawImage(this.getTextCanvas(e,this.yAxisLabels[n]),0,a-this.textHeight/2)}if(this.minY<0)for(var i=t;i<this.maxY+t;i+=t){var s=Math.floor(this.toDomYCoord_Linear(this.canvasH,this.minY,this.maxY,-this.yAxisLabels[i]));e.moveTo(this.canvasW-5,s),e.lineTo(this.canvasW,s),e.drawImage(this.getTextCanvas(e,-this.yAxisLabels[i]),0,s-this.textHeight/2)}e.stroke()}},{key:"getTextCanvas",value:function(e,t){var n=this.yAxisLabelTextCanvasCache[t];if(void 0===n){var a=document.createElement("canvas"),i=a.getContext("2d");a.width=this.canvasW,a.height=2*this.textHeight,i.font=y+"px "+O,i.textBaseline="top",i.textAlign="right",i.fillStyle=C,i.fillText(t,30,0),n=a,this.yAxisLabelTextCanvasCache[t]=a}return n}},{key:"render",value:function(){return d.a.createElement("canvas",{className:"plot-y-axis",ref:"yAxisCanvas",width:this.canvasW,height:this.canvasH})}}]),t}(u.PureComponent);function P(e){return Math.round(5*Math.ceil(e/5))}var M=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).canvasW=n.props.canvasW,n.canvasH=n.props.canvasH,n.minY=n.props.minY,n.maxY=n.props.maxY,n.horiGridLineCache=void 0,n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.plotAxisGridCanvas=this.refs.plotAxisGridCanvas,this.plotAxisGridCtx=this.plotAxisGridCanvas.getContext("2d"),this.plotAxisGridCtx.strokeStyle="rgba(211,211,211, 0.6)",this.plotAxisGridCtx.lineWidth=1,this.yAxisIntervals=this.generateYAxisLabels(10*this.maxY),this.horiGridLineCache=this.getHoriLineCanvas(),this.drawYAxisGrid(this.plotAxisGridCtx,this.getYAxisLabelSkipInterval(this.minY,this.maxY,this.canvasH,this.yAxisLabelPadding,20))}},{key:"componentDidUpdate",value:function(){this.minY=this.props.minY,this.maxY=this.props.maxY,this.drawYAxisGrid(this.plotAxisGridCtx,this.getYAxisLabelSkipInterval(this.minY,this.maxY,this.canvasH,this.yAxisLabelPadding,20))}},{key:"generateYAxisLabels",value:function(e){for(var t=[],n=0;n<P(e);n+=1)t.push(n);return t}},{key:"getYAxisLabelSkipInterval",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:20,i=arguments.length>4?arguments[4]:void 0,s=Math.round(n/(i+a));return P((t-e)/s)}},{key:"drawYAxisGrid",value:function(e,t){e.clearRect(0,0,this.canvasW,this.canvasH),e.beginPath();for(var n=0;n<this.maxY;n+=t){var a=Math.floor(b(this.canvasH,this.minY,this.maxY,this.yAxisIntervals[n]));e.drawImage(this.horiGridLineCache,0,a-.5)}if(this.minY<0)for(var i=t;i<this.maxY;i+=t){var s=Math.floor(b(this.canvasH,this.minY,this.maxY,-this.yAxisIntervals[i]));e.drawImage(this.horiGridLineCache,0,s-.5)}e.stroke()}},{key:"getHoriLineCanvas",value:function(){var e=this.cachedHoriLineCanvas;if(void 0===e){var t=document.createElement("canvas"),n=t.getContext("2d");t.width=this.canvasW,t.height=1,n.strokeStyle="gray",n.lineWidth=1,n.moveTo(0,0),n.lineTo(Math.floor(t.width),0),n.stroke(),e=t}return e}},{key:"render",value:function(){return d.a.createElement("canvas",{className:"plot-axis-grid",ref:"plotAxisGridCanvas",width:this.canvasW,height:this.canvasH})}}]),t}(u.Component);var k,Y,A,H,S,E,w,L,D=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return!g()(this.props,e)||this.state!==t}},{key:"render",value:function(){var e=this.props,t=e.dataSets,n=e.dataPointColors,a=e.width,i=e.height,s=e.minY,o=e.maxY,l=e.xAxisKey,r=e.yAxisKey,c=e.configs,h=e.isRenderPlotOnly;if(t.length<1||void 0===t)return null;var u,v=c.axis,m=v.isDynamicXAxis,p=(v.isDynamicYAxis,v.yAxisPadding),g=[Number.MAX_VALUE,Number.MIN_VALUE],b=m?this.props.visibleXRange:[Number.MAX_VALUE,Number.MIN_VALUE],x=0,y=a-40;return u=g[1]-g[0],x=5*Math.ceil(u/5),g[0]-=p>0?p:.1*x,g[1]+=p>0?p:.1*x,h?d.a.createElement(f,{dataSets:t,dataPointColors:n,visibleXRange:b,visibleYRange:null!==o?[s,o]:g,width:y,height:i,xAxisKey:l,yAxisKey:r,configs:c}):(g=null!==o?[s,o]:g,d.a.createElement("table",{className:"chart-table",style:{borderCollapse:"collapse"}},d.a.createElement("tbody",null,d.a.createElement("tr",{className:"chart-table-row"},d.a.createElement("td",{className:"chart-table-col",style:{width:40}}," ",d.a.createElement(j,{canvasW:40,canvasH:i,minY:g[0],maxY:g[1],configs:c})),d.a.createElement("td",{className:"chart-table-col",style:{width:y}}," ",d.a.createElement("div",{style:{position:"absolute"}},d.a.createElement(M,{canvasW:y,canvasH:i,minY:g[0],maxY:g[1],configs:c})),d.a.createElement("div",{style:{position:"absolute"}},d.a.createElement(f,{dataSets:t,dataPointColors:n,visibleXRange:b,visibleYRange:g,width:y,height:i,xAxisKey:l,yAxisKey:r,configs:c})))))))}}]),t}(u.Component),U=n(1),_=(n(23),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).handleMouseMove=n.handleMouseMove.bind(Object(c.a)(n)),n.handleMouseUp=n.handleMouseUp.bind(Object(c.a)(n)),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.cursor;return d.a.createElement("div",{className:"fullscreen",style:{cursor:e}})}},{key:"componentDidMount",value:function(){document.addEventListener("mousemove",this.handleMouseMove,!0),document.addEventListener("mouseup",this.handleMouseUp,!0)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("mousemove",this.handleMouseMove,!0),document.removeEventListener("mouseup",this.handleMouseUp,!0)}},{key:"handleMouseMove",value:function(e){e.stopPropagation(),(0,this.props.mouseMoveHandler)(e)}},{key:"handleMouseUp",value:function(e){e.stopPropagation(),(0,this.props.mouseUpHandler)(e)}}]),t}(u.PureComponent)),T=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(r.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return null}},{key:"componentDidMount",value:function(){var e=this.props,t=e.timeout,n=e.callback;this.timeout=setTimeout(n,t)}},{key:"componentDidUpdate",value:function(){clearTimeout(this.timeout);var e=this.props,t=e.timeout,n=e.callback;this.timeout=setTimeout(n,t)}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeout)}}]),t}(u.PureComponent),W=(n(24),"hovering"),X="mouseDown",I="mouseMove",G="mouseUp",R="timeout",N=(A={},Object(U.a)(A,W,Object(U.a)({},X,"clicking")),Object(U.a)(A,"clicking",(k={},Object(U.a)(k,R,"autoSelecting"),Object(U.a)(k,I,"selecting"),Object(U.a)(k,G,W),k)),Object(U.a)(A,"autoSelecting",(Y={},Object(U.a)(Y,R,"panning"),Object(U.a)(Y,I,"selecting"),Y)),Object(U.a)(A,"selecting",Object(U.a)({},G,W)),Object(U.a)(A,"panning",Object(U.a)({},G,W)),S={},Object(U.a)(S,W,Object(U.a)({},X,"clicking")),Object(U.a)(S,"clicking",(H={},Object(U.a)(H,R,"selecting"),Object(U.a)(H,I,"selecting"),Object(U.a)(H,G,W),H)),Object(U.a)(S,"selecting",Object(U.a)({},G,W)),w={},Object(U.a)(w,W,Object(U.a)({},X,"clicking")),Object(U.a)(w,"clicking",(E={},Object(U.a)(E,R,"panning"),Object(U.a)(E,I,"panning"),Object(U.a)(E,G,W),E)),Object(U.a)(w,"panning",Object(U.a)({},G,W)),w),K=(L={},Object(U.a)(L,W,Object(U.a)({},X,"clicking")),Object(U.a)(L,"clicking",Object(U.a)({},G,W)),function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).handleMouseMove_Hovering=function(e){(0,n.props.hoveringHandler)(n.getCustomEventObject(e))},n.handleMouseOut_Hovering=function(e){(0,n.props.hoverEndHandler)()},n.handleMouseDown_Hovering=function(e){var t=n.props.hoverEndHandler;e.preventDefault();var a=n.getCustomEventObject(e);n.initialMouseDownPosition=a,t(),n.transition(X)},n.clickTimeout=function(){n.transition(R)},n.autoSelectingTimeout=function(){n.transition(R)},n.handleMouseMove_Clicking=function(e){n.props.selectingHandler;var t=Object(c.a)(n).initialMouseDownPosition,a=n.getCustomEventObject(e);Math.abs(a.domX-t.domX)<10||Math.abs(a.domY-t.domX)<10||n.transition(I)},n.handleMouseUp_Clicking=function(e){var t=n.props,a=t.clickHandler,i=t.doubleClickHandler,s=Object(c.a)(n).prevClickTimeStamp,o=n.getCustomEventObject(e);null===s||s+200<e.timeStamp?(n.prevClickTimeStamp=e.timeStamp,a(o)):(n.prevClickTimeStamp=null,i(o)),n.transition(G)},n.handleMouseMove_AutoSelecting=function(e){var t=n.props.selectingHandler,a=Object(c.a)(n).initialMouseDownPosition,i=n.getCustomEventObject(e);Math.abs(i.domX-a.domX)<10||Math.abs(i.domY-a.domX)<10||(t({start:a,end:i}),n.transition(I))},n.handleMouseUp_AutoSelecting=function(e){n.transition(G)},n.handleMouseMove_Selecting=function(e){(0,n.props.selectingHandler)({start:Object(c.a)(n).initialMouseDownPosition,end:n.getCustomEventObject(e)})},n.handleMouseUp_Selecting=function(e){(0,n.props.selectedHandler)({start:Object(c.a)(n).initialMouseDownPosition,end:n.getCustomEventObject(e)}),n.transition(G)},n.state={mode:W},n.ref=d.a.createRef(),n.initialMouseDownPosition=null,n.prevClickTimeStamp=null,n.handleMouseMove_Panning=n.handleMouseMove_Panning.bind(Object(c.a)(n)),n.handleMouseUp_Panning=n.handleMouseUp_Panning.bind(Object(c.a)(n)),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.width,n=e.height,a=e.children,i={width:t,height:n};switch(this.state.mode){case W:return d.a.createElement("div",null,d.a.createElement("div",{ref:this.ref,style:i,onMouseMove:this.handleMouseMove_Hovering,onMouseOut:this.handleMouseOut_Hovering,onMouseDown:this.handleMouseDown_Hovering},a));case"clicking":return d.a.createElement("div",null,d.a.createElement("div",{ref:this.ref,style:i},a),d.a.createElement(_,{mouseMoveHandler:this.handleMouseMove_Clicking,mouseUpHandler:this.handleMouseUp_Clicking,cursor:"point"}),d.a.createElement(T,{timeout:200,callback:this.clickTimeout}));case"autoSelecting":return d.a.createElement("div",null,d.a.createElement("div",{ref:this.ref,style:i},a),d.a.createElement(_,{mouseMoveHandler:this.handleMouseMove_AutoSelecting,mouseUpHandler:this.handleMouseUp_AutoSelecting,cursor:"nesw-resize"}),d.a.createElement(T,{timeout:500,callback:this.autoSelectingTimeout}));case"selecting":return d.a.createElement("div",null,d.a.createElement("div",{ref:this.ref,style:i},a),d.a.createElement(_,{mouseMoveHandler:this.handleMouseMove_Selecting,mouseUpHandler:this.handleMouseUp_Selecting,cursor:"nesw-resize"}));case"panning":return d.a.createElement("div",null,d.a.createElement("div",{ref:this.ref,style:i},a),d.a.createElement(_,{mouseMoveHandler:this.handleMouseMove_Panning,mouseUpHandler:this.handleMouseUp_Panning,cursor:"grabbing"}));default:return d.a.createElement("p",null,this.state.mode)}}},{key:"transition",value:function(e){var t=this.props.transitionGraph[this.state.mode][e];t&&this.setState({mode:t})}},{key:"getCustomEventObject",value:function(e){var t=this.ref.current.getBoundingClientRect(),n=t.left,a=t.top,i=e.clientX,s=e.clientY;return{domX:i-n,domY:s-a,clientX:i,clientY:s}}},{key:"handleMouseMove_Panning",value:function(e){(0,this.props.panningHandler)({start:this.initialMouseDownPosition,end:this.getCustomEventObject(e)})}},{key:"handleMouseUp_Panning",value:function(e){(0,this.props.pannedHandler)({start:this.initialMouseDownPosition,end:this.getCustomEventObject(e)}),this.transition(G)}}]),t}(u.PureComponent)),z=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).handleHovering=function(e){n.setState(Object(a.a)({},n.state,{hoveringPosition:e})),n.props.handleHoverPosChange&&n.props.handleHoverPosChange(e)},n.handleHoverEnd=function(){n.setState(Object(a.a)({},n.state,{hoveringPosition:null})),n.props.handleHoverPosChange&&n.props.handleHoverPosChange(null)},n.handleClick=function(e){n.setState(Object(a.a)({},n.state,{clickPosition:e})),n.props.handleClick&&n.props.handleClick()},n.handleDoubleClick=function(e){n.setState(Object(a.a)({},n.state,{doubleClickPosition:e}))},n.handleSelecting=function(e){n.setState(Object(a.a)({},n.state,{selectingPositions:e}))},n.handleSelected=function(e){n.setState(Object(a.a)({},n.state,{selectedPositions:e,selectingPositions:null}))},n.state={hoveringPosition:null,clickPosition:null,doubleClickPosition:null,selectingPositions:null,selectedPositions:null,panningPositions:null,pannedPositions:null},n.handlePanning=n.handlePanning.bind(Object(c.a)(n)),n.handlePanned=n.handlePanned.bind(Object(c.a)(n)),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.render,n=e.width,a=e.height;return d.a.createElement(K,{width:n,height:a,transitionGraph:N,hoveringHandler:this.handleHovering,hoverEndHandler:this.handleHoverEnd,clickHandler:this.handleClick,doubleClickHandler:this.handleDoubleClick,selectingHandler:this.handleSelecting,selectedHandler:this.handleSelected,panningHandler:this.handlePanning,pannedHandler:this.handlePanned},t(this.state))}},{key:"handlePanning",value:function(e){this.setState(Object(a.a)({},this.state,{panningPositions:e})),this.props.handlePan&&this.props.handlePan(e)}},{key:"handlePanned",value:function(e){this.setState(Object(a.a)({},this.state,{pannedPositions:e,panningPositions:null})),this.props.handlePanned&&this.props.handlePanned(e)}}]),t}(u.Component),B=n(10),V=n.n(B);n(25);function F(){for(var e="#",t=0;t<6;t++)e+="0123456789ABCDEF"[Math.floor(16*Math.random())];return e}var J=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(l.a)(this,Object(r.a)(t).call(this,e))).state={visibleXRange:[1513058e6,15136956e5],currentOverlay:null,dataSets:[],dataPointColors:["#d50000","#ff6d00","#546e7a"],minY:-200,maxY:200,height:600},n.prevMaxY=200,n.prevPanDist=0,n.dataSetCount=4,n.handlePan=n.handlePan.bind(Object(c.a)(n)),n.handlePanned=n.handlePanned.bind(Object(c.a)(n)),n}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){for(var e=[],t=[],n=(V()(1482858e6),V()(15136956e5),0);n<this.dataSetCount;n++)e[n]=Object(i.a)(this.generateDummyData([1182858e6,15136956e5],[-this.state.maxY,this.state.maxY],1e8)),t[n]=F();this.setState(Object(a.a)({},this.state,{dataSets:e,dataPointColors:t})),console.log(e)}},{key:"generateDummyData",value:function(e,t,n){for(var a,i,s=[],o=e[0];o<e[1];o+=n)s.push({time:o,value:(a=t[0],i=t[1],Math.floor(Math.random()*(i-a+1))+a)});return s}},{key:"handlePan",value:function(e){this.state.maxY+(e.end.domY-e.start.domY-this.prevPanDist)>150&&(this.setState(Object(a.a)({},this.state,{maxY:this.state.maxY+(e.end.domY-e.start.domY-this.prevPanDist)})),this.prevPanDist=e.end.domY-e.start.domY)}},{key:"handlePanned",value:function(){this.prevPanDist=0}},{key:"render",value:function(){var e=this.state,t=e.dataSets,n=e.visibleXRange,a=e.dataPointColors,i=e.minY,s=e.maxY,o=e.height;return d.a.createElement(d.a.Fragment,null,d.a.createElement("div",{style:{position:"absolute",cursor:"ns-resize"}},d.a.createElement(z,{width:40,height:o,handlePan:this.handlePan,handlePanned:this.handlePanned,render:function(){}})),d.a.createElement(D,{dataSets:t,visibleXRange:n,minY:i,maxY:s,width:1500,height:o,xAxisKey:"time",yAxisKey:"value",dataPointColors:a,isRenderPlotOnly:!1,configs:{axis:{isDynamicYAxis:!0,isDynamicXAxis:!0,yAxisLabelPadding:20,xAxisPadding:0},plotStyling:{dotSize:10}}}))}}]),t}(u.PureComponent);m.a.render(d.a.createElement(J,null),document.getElementById("root"))}},[[16,1,2]]]);
//# sourceMappingURL=main.9a28cf32.chunk.js.map