/*
 * The MIT License (MIT)

Copyright (c) 2015 Matthew Sarsby

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
CanvasRenderingContext2D.prototype.drawIcon = function(text,x,y,w){
	function indexToX(c,n){
		var r = x+Math.round(n%(width+1)*box + 0.5*box)-0.5;
		if (c.lineWidth%2==0){r+=0.5}
		return r;
	}
	function indexToY(c,n){
		r = y+Math.round(Math.floor(n/(width+1))*box + 0.5*box)-0.5;
		if (c.lineWidth%2==0){r+=0.5}
		return r;
	}
	function drawLine(c){
		c.beginPath();
		c.moveTo(indexToX(c,line[0]),indexToY(c,line[0]));
		for (var k = 1;k<line.length;k++){
			c.lineTo(indexToX(c,line[k]),indexToY(c,line[k]));
		}
		if (j-line.length+1>9){
			c.lineTo(indexToX(c,line[0]),indexToY(c,line[0]));
		}
		if(j>36){c.fill();}
		c.stroke();
		line = [];
	}
	//strip whitespace
	text.replace(/\s+/, "") ;
	text.replace(/(\r\n|\n|\r)/gm,"");
	//if eof character is the first character chop it off
	if (text[0] === this.iconEOLSymbol){
		text = text.slice(1,text.length);
	}
	if (text[text.length] === this.iconEOLSymbol){
		text = text.slice(1,text.length-1);
	}
	var rows = text.split(this.iconEOLSymbol);
	var height = rows.length;
	var width = rows[0].length;
	//cleanup any extra or missing characters in each row.
	for (var i =1;i<rows.length;i++){
		while (rows[i].length < rows[0].length){
			rows[i]+='.';
		}
		while (rows[i].length > rows[0].length){
			rows[i] = rows[i].slice(0,rows[0].length);
		}
	}
	text = rows.join(this.iconEOLSymbol);
	var box = (w/width);
	if (w==0){box=1;};
	
	//draw debugg grid.
	if (box>5 && this.iconDebug){
		var old_width = ctx.lineWidth;
		ctx.lineWidth = 1;
		ctx.beginPath();
		for (var i = 0;i<height*box;i+=box){
				ctx.moveTo(x,y+i);
				ctx.lineTo(x+width*box,y+i);
		}
		for (var i = 0;i<width*box;i+=box){
				ctx.moveTo(x+i,y);
				ctx.lineTo(x+i,y+(height)*box);
		}
		ctx.stroke();
		ctx.lineWidth = old_width;
	}
	var oldLineWidth = ctx.lineWidth;
	if (this.iconAutoLineWidth){
		ctx.lineWidth = Math.round(box);
	} else {
		ctx.lineWidth = Math.round(ctx.lineWidth);
	}
	var line = [];
	for (var j = 0;j<this.iconSymbols.length;j++){
		s = this.iconSymbols[j];
		indexs = [];
		i = -1;
		while (text.indexOf(s,i+1)>=0){
			i = text.indexOf(s,i+1);
			indexs.push(i);
		}
		count = indexs.length;
		if (count==0){
			if (line.length ==1){
				//dot
				ctx.beginPath();
				ctx.rect(indexToX(this,line[0])-box/2,indexToY(this,line[0])-box/2,Math.max(box,1),Math.max(box,1));
				ctx.fill();
				line = [];
			} 
			if (line.length > 1){
				//draw line
				drawLine(this);
			}
		}
		if (count==1){
			//add line
			line.push(indexs[0]);
		}
			
		if (count==2){
			//draw the prevous line
			if (line.length > 1){
				//draw line
				drawLine(this);
			}
			//simple line
			
			this.beginPath();
			this.moveTo(indexToX(this,indexs[0]),indexToY(this,indexs[0]));
			this.lineTo(indexToX(this,indexs[1]),indexToY(this,indexs[1]));
			this.stroke();
			line = [];
			
		}
		if (count>=3){
			if (line.length > 1){
				//draw line
				drawLine(this);
			}
			//circle
			//find largest rect
			
			ytop = indexToY(this,indexs[0]);
			ybottom = ytop;
			xleft = indexToX(this,indexs[0]);
			xright = xleft;
			
			for (var k = 1;k<indexs.length;k++){
				ytop = Math.min(indexToY(this,indexs[k]),ytop);
				ybottom = Math.max(indexToY(this,indexs[k]),ybottom);
				xleft = Math.min(indexToX(this,indexs[k]),xleft);
				xright = Math.max(indexToX(this,indexs[k]),xright);
			}
			var py = (ytop+ybottom)/2;
			var px = (xleft+xright)/2;
			var r = Math.max(ytop-ybottom,xright-xleft)/2;
			this.beginPath();
			this.arc(px,py,r,0,2*Math.PI,true);
			
			if(j>34){this.fill();}
			this.stroke();
		}
		
	}
	//return the old line width
	this.lineWidth = oldLineWidth;
}
CanvasRenderingContext2D.prototype.iconSymbols = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
CanvasRenderingContext2D.prototype.iconAutoLineWidth = true;
CanvasRenderingContext2D.prototype.iconDebug = false;
CanvasRenderingContext2D.prototype.iconEOLSymbol = '\n';
