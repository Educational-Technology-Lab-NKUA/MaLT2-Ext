
// $Id$

var getName = false;
var mathrxs=[];
var moreCalc = 0;
var mathcounter = 0;
var definition = false;
var command = false;
function Parser () {
    this.tk = null;
    this.grab = new Array();
    this.infix = new Array();

}


Parser.prototype.load = function(tk) {
    this.tk = tk;
}

Parser.prototype.addCommand = function (wrd,n) {

    this.grab[wrd] = n;

}

Parser.prototype.addInfix = function (wrd,p) {
    this.infix[wrd] = p;
}

Parser.prototype.next = function (precedent) {
    if (precedent == null) precedent = 100;
  // console.log (precedent);
  	if (this.tk == null)
		return  new Token('eof','');;
    var token = this.tk.next();
	//console.log ("parser.next:");
	//console.log (token);

    if (token == null) return new Token('error','I don\'t know how to tokenize this.');

    if (token.type == "error") return token;

    if (token.type == "eof") {
        this.tk = null;
        return token;
    }
	else if (token.type == "ops") {
       // //alert("ops");
		//console.log ("ops");
		if (token.data == "-") {

			 var look = this.tk.peek();
			// console.log (look);
			// console.log (look.type);
			 if ((look.data=="για")||(look.data=="to")){
			 		return new Token('error','There is a - before your definition');

			 }
       if((look.type== 'ops') && (look.data != "("))
       		return new Token('error','This is not correct :- ' + look.data);

      var num_token = this.next();

			  minus_token = new Token ("wrd","minus");
			  minus_token.args = new Array ( num_token);
			 // console.log (minus_token);
			 //  console.log (num_token);
			   token = minus_token;

			 }
        else if (token.data == '(') {
			//console.log ("token = (");
			if(mathrx)
       		mathrxs[mathcounter-1]++;
			//console.log (mathcounter);
			//console.log(mathrxs);
            var args = new Array();

            var look = this.tk.peek();
		//	console.log ("look:")
			//console.log(look);
            var name = null;
			var mathname = null;
            if (look && look.type == "math") {
				//console.log (look);
				//console.log ("math in the paren");
              //mathname = this.tk.next();
            }
            if (look && look.type == "wrd") {
                name = this.tk.next();
            }
            do {
                var i = this.next();
				/*if(mathname){
					 mathname.args=new Array (i);
					i = mathname;
					mathname = null;
				}*/
            	//console.log ("mesa sti parenthesi ");
				 ///console.log(i);
                if (i == null) return new Token('error','I don\'t know how to tokenize this');
                if (i.type == "error") return i;
                if (i.type == "eof") return new Token('error','You\'re missing a )');
           ///  console.log (mathcounter);
                if (i.type == "ops" && i.data == ')') {
				//	console.log ("end of arenthesis");
				//	console.log ("parenthesis" + " " +mathcounter);
				//	console.log (mathrxs)
					if(mathrx){
					mathrxs[mathcounter-1]--;
					//console.log (mathrxs);
					}

					if ((mathrx == true) &&(mathrxs[mathcounter-1]==0)){
						break;
						}
					var look= this.tk.peek();
				//	console.log (look);
				//	console.log ( (look && this.infix[look.data] && this.infix[look.data]));
				//	console.log (precedent);
				//console.log (args);

					if ((mathcounter == 0 )) {
						if (args.length === 0) {
							return new Token('error','You didnt give an arguement');
						}
						else{
						if(args[0].type == "num")
						break;	
						}
							
					}
					if (look && this.infix[look.data] && this.infix[look.data] <= precedent) {
        		//		console.log ("whee, an infix op after ) and mathrx is" + mathrx);
					//	console.log("from the left: " +args);  //left args
							   var op_token = this.tk.next();
							 //  console.log ("op:");
     							//console.log (op_token);

          					  var right = this.next(this.infix[look.data]);
      						// console.log ("right:");
     						//	console.log (right);
           					 op_token.args = new Array(args[args.length-1], right);
							//console.log (op_token);
            				args.pop();
							args.push(op_token);
							  }

					else if(look && this.infix[look.data] && this.infix[look.data] > precedent) {
					//	console.log ("whee, an infix op after ) vol 2" + mathrx);

						moreCalc ++;

						}


					 break;}
				//	 console.log (moreCalc);
					// console.log (mathrxs[mathcounter-1]);
				if (moreCalc == mathrxs[mathcounter-1]){
						//console.log("from the left2: ");
						 //console.log(i);
						var look= this.tk.peek();
						var op_token_2 =this.next(this.infix[look.data]);
						//console.log (op_token_2);
						var right_2 = this.next(this.infix[look.data]);
      					//console.log ("right2:");
     			//	console.log (right_2);
           				op_token_2.args = new Array(i, right_2);
					//	console.log (op_token_2);
            				//args.pop();
							i = op_token_2;
							moreCalc --;

						}
              // console.log (args);
                args.push(i);
				///console.log (i);
				//console.log (args);
            } while (1);
      // console.log("end of parenthesis" )
		//console.log(args);
            if (name) {
				//console.log ("math in the paren");
                token = name;
                token.args = args;

            } else if (args.length == 1) {

			//	console.log("2");
                token = args[0];
				//console.log (token);
            } else{
			//	console.log("3");
				//console.log (args);
                token.type = "lst";
                token.data
                token.args = args;
				//console.log (token);
            }
			//console.log(token);
		if(mathrx){
			//alert(token);
			return (token);
		}

        } else if (token.data == '[') {

            var args = new Array();
            do {

                var i = this.next();

                if (i == null) return new Token('error','I don\'t know how to tokenize this');
                if (i.type == "error") return i;
                if (i.type == "eof") return new Token('error','You\'re missing a ]');

                if (i.type == "ops" && i.data == ']') break;

                args.push(i);
            } while (1);
            ////alert("end of list");

            token.type = "lst";
            token.data
            token.args = args;
            ////alert(token);
        } else if ((token.data == "to ") || (token.data == "για")) {

			definition = true;
           getName = true;
            var name = this.tk.next();
			//console.log (name);
			getName = false;

            if (name == null) return new Token('error','I don\'t know how to tokenize this');
            if (name.type == "error") return i;
            if (name.type == "eof") return new Token('error','You need to say what the name os for to.');

            if (name.type == "wrd") {
                name = name.data;
            } else {
				if (language == "Gr")
				return new Token('error',name.data + " δεν είναι αποδεκτό όνομα για νέα εντολή.");
				else
                return new Token('error',name.data + " is not a good name for a function");
            }

            var args = new Array();

            var i = null;
            do {
                i = this.tk.peek();

                if (i == null) return new Token('error','I don\'t know how to tokenize this');
                if (i.type == "error") return i;
                if (i.type == "eof") {
					if (language=="Gr")
					return new Token('error','για να ορίσεις το '+name+' χρειάζεται τη λέξη τέλος');
					else
					return new Token('error','to '+name+' needs an end');
				}
                if (i.type !="var") break;

                args.push(this.tk.next());
                this.addCommand(name, args.length);

            } while (1);
           if (args.length == 0)
             this.addCommand(name, args.length);

            var code = new Array();

            do {

                i = this.tk.next();
				//console.log (i);
                if (i == null) return new Token('error','I don\'t know how to tokenize this');
                if (i.type == "error") return i;
                if (i.type == "eof") {
					//console.log (i);

					if (language=="Gr")
					return new Token('error','για να ορίσεις το '+name+' χρειάζεται τη λέξη τέλος');
					else
					return new Token('error','to '+name+' needs an end');}

                if (i.type == "ops" && i.data == 'to ') return new Token('error','I\'m sorry, you can\'t have nested to\'s');
                if (i.type == "ops" && ((i.data == 'end') || (i.data == 'τελος') || (i.data == 'τέλος')|| (i.data == 'τελοσ')||(i.data == 'τέλοσ'))){  definition = false;break;}

                code.push(i);

            } while (1);

            ////alert("end of list");

            token.type = "def";
            token.data = name;

            token.args = new Command(args,code);

            ////alert(token);



        }
    }
	else if ((token.type == "wrd") || (token.type == "math")) {
	//console.log ("grab " + this.grab[token.data])
         var g = this.grab[token.data];
    //console.log("grabbing "+g+" for "+token.data);
	command = true;
         if (g != null) {
             var args = new Array();
             var t = g;
			 if (token.type =="math"){
			 	mathrx = true;
				//console.log (mathrx);
				mathrxs.push(0);
				mathcounter++;
				}
				else{mathrxs = new Array ();mathcounter=0;
				fromLook = false; mathrx = false}
				//console.log (g)
             while (g > 0) {
			// console.log ("g is" + g +"for "+token.data);
			  var look = this.tk.peek()
			//  console.log (look);
			  if ((look.type == "ops")&&((look.data=="για")||(look.data=="to"))){
				  command = false
			   	return new Token('error','Η εντολή '+ token.data+" χρειάζεται ακόμα "+g+" ορίσματα. Έδωσες μόνο "+(t-g)+".");}
                var i = this.next();
				//console.log ("Γυρισααααα");
      //       console.log(i);
		   		if(token.type == "math"){
				//	console.log ("time to pop");
					//console.log( mathrxs);
					mathrxs.pop();
					mathcounter--;
					//console.log( mathrxs);
					}
			   mathrx = false;
			   fromLook = false;
                if (i == null) {command = false;return new Token('error','I don\'t know how to tokenize this');}
                if (i.type == "error") {command = false;return i;}
                if (i.type == "eof") {
					command = false;
					if(language=="Gr")
					return new Token('error','Η εντολή '+ token.data+" χρειάζεται ακόμα "+g+" ορίσματα. Έδωσες μόνο "+(t-g)+".");
					else
					return new Token('error','I can\'t '+ token.data+", it needs "+g+" more arguments, I got "+(t-g)+".");
				}
                args.push(i);
                g--;
              // console.log("token.type");

            }
            token.args = args;
         }
		command = false;
    }

    if ((token.type != 'ops' ) && (token.type != 'obj')) while (1) {
      if(this.tk != null){
        var look = this.tk.peek()
      }
   //  //alert("lookahead = "+look+" " +this.infix[look.data] ) ;
	// console.log ("lookahead for " )
	// console.log (token);
	// console.log (look);
        if (look && this.infix[look.data] && this.infix[look.data] < precedent) {
     //    console.log("whee, an infix op");
            var op_token = this.tk.next();
       //   //alert(op_token);
	   // fromLook = true;

            var right = this.next(this.infix[look.data]);
            if(right.type== 'error')
            break;
       //alert("right" + right);
            op_token.args = new Array(token, right);

            token = op_token;

        }
      

		 else {
            break;
        }
    }
 // console.log("returning token ");
//  console.log (token);
    return token;
}


function Command (args,code) {
    this.args = args;
    this.raw = code;
    this.code = null;
}



function Token(type,data) {
    this.type = type;
    this.data = data;
    this.args = null;
    this.code = null;

}

Token.prototype.toString = function () {
        return "(" + this.type + ")" + this.data ;
}




function ListTokenizer (list) {

    this.list = list;
    this.current = 0;
 }

ListTokenizer.prototype.peek = function () {
    if (this.current >= this.list.length) {
        return new Token('eof','');
    } else {
        var peek=this.list[this.current];

        return peek;
    }
}


ListTokenizer.prototype.next = function () {
    if (this.current >= this.list.length) {
        return new Token('eof','');
    } else {
        var next = this.list[this.current];
      // alert("next is "+next);
        this.current++;
        return next;

    }
}



function Tokenizer () {

    this.text = null;
    this.cache = new Array();
 }

Tokenizer.prototype.load = function (text) {
    this.text = text;
}


Tokenizer.prototype.ops_rx = /^\s*(!=|<>|<=|>=|\+|\-|\*|\/|\%|<|>|=|\[|\]|\(|\)|to |end|για|τελος|τέλος|τελοσ|τέλοσ)\s*/i;
Tokenizer.prototype.wrd_rx = /^\s*([a-zA-Zά-ωΑ-ώ\.][a-zA-Zά-ωΑ-ώ0-9-_']*\??)\s*/i;
Tokenizer.prototype.var_rx = /^\s*:([a-zA-Zά-ωΑ-ώ][a-zA-Zά-ωΑ-ώ0-9_']*)\s*/i;
Tokenizer.prototype.obj_rx = /^\s*#([a-zA-Zά-ωΑ-ώ][a-zA-Zά-ωΑ-ώ0-9_']*)\s*/i;
Tokenizer.prototype.num_rx = /^\s*(\d+(?:\.\d+)?)/i;
Tokenizer.prototype.sym_rx = /^\s*"([a-zA-Zά-ωΑ-ώ][a-zA-Zά-ωΑ-ώ0-9_']*)\s*/i;
Tokenizer.prototype.math_rx = /^\s*(cos|sin|tan|arcsin|arccos|arctan|radsin|radcos|radarctan|sqrt|power|int|integer|round|pi|ημ|συνημ|εφ|δυν|ριζα|ρίζα|ακεραιος|πι)( |\()\s*/i;
Tokenizer.prototype.text_rx =  /^\s*\'(.*?)\'\s*/i
Tokenizer.prototype.miuns_rx = /^\s*( -)/i;
Tokenizer.prototype.empty = /^\s*$/;
Tokenizer.prototype.comment = /^\s*;.*(\r?\n|$)/;


Tokenizer.prototype.peek = function () {
    if (this.cache.length > 0) {
        return this.cache[0];
    } else {
        var token = this.next();
        this.cache.push(token);
        return token;
    }

}
Tokenizer.prototype.next = function () {
    if (this.cache.length > 0) {
        return this.cache.shift();
    }
    while ((result = this.comment.exec(this.text)) != null) {
        this.text = this.text.substring(result[0].length)

    }
	//console.log (this.text);
	if (this.empty.exec(this.text)) {
        this.text = null;
        return new Token('eof',''); }

		 if ((result = this.miuns_rx.exec(this.text)) != null) {
		//console.log (result);
        this.text = this.text.substring(result[0].length)
			//console.log (this.text);

			var tk = new Token ("wrd","minus");
        return tk;

    }

	 if ((result = this.text_rx.exec(this.text)) != null) {
	//console.log (result);
        this.text = this.text.substring(result[0].length)
        return new Token('text',result[1]);
    }

	 if ((result = this.math_rx.exec(this.text)) != null) {
		//console.log (result);
		if(result[2]=="("){this.text = this.text.substring(result[1].length)}
        else this.text = this.text.substring(result[0].length)
			//console.log (this.text);
			var tk = new Token('math',result[1].toLowerCase());
        return tk;

    }

    if ((result = this.ops_rx.exec(this.text)) != null) {
		//console.log (result);
        this.text = this.text.substring(result[0].length)
			//alert(result[1]);
			var tk = new Token('ops',result[1].toLowerCase());
        return tk;

    }

	else if ((result = this.wrd_rx.exec(this.text)) != null) {

		//console.log (result);
        this.text = this.text.substring(result[0].length)
        return new Token('wrd',result[1].toLowerCase());}
	else if ((result = this.var_rx.exec(this.text)) != null) {

        this.text = this.text.substring(result[0].length)
        return new Token('var',result[1].toLowerCase());

    }
	else if ((result = this.obj_rx.exec(this.text)) != null) {

        this.text = this.text.substring(result[0].length)
        return new Token('obj',result[1].toLowerCase());

    }
	else if ((result = this.num_rx.exec(this.text)) != null) {
	//console.log (result);
        this.text = this.text.substring(result[0].length)
        return new Token('num',parseFloat(result[1]));

    } else if ((result = this.sym_rx.exec(this.text)) != null) {
		//console.log (result);
        this.text = this.text.substring(result[0].length)
        return new Token('sym',result[1].toLowerCase());

    } else {
		if (language == "Gr")
		return new Token('error', 'Δεν μπορώ να καταλαβώ το: '+this.text);
		else
        return new Token('error', 'I can\'t understand this:'+this.text);
    }
}

// JavaScript Document
