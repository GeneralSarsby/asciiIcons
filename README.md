# asciiIcons
Convert Ascii art images to SVG

#Ascii to Icon
Based on a post 
[Replacing Photoshop With NSString](http://cocoamine.net/blog/2015/03/20/replacing-photoshop-with-nsstring/)
seen on [HN](https://news.ycombinator.com/item?id=9240644).
I reccomend you read that post first.
This takes the idea and extends it in javascript to provide the `ctx.drawIcon(text,x,y,w)` method.

I have extended the initial ruleset so that at
larger sizes simpler ascii arts can be used.
The rules are:

 1. Symbols are 0--9 a--b A--Z 
 2. Single symbol for dot
 3. Two of symbol for line
 4. Many of symbol of circle
 5. Run of symbols for shape:
  1. Lowercase are stroked closed paths
  2. Uppercase are stroked and filled closed paths
  3. Runs starting with a number are stroked open paths

Here is an [interactive space](http://xqt2.com/asciiIcons.html) you can tryout.
