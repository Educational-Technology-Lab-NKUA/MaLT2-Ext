function Logo () {
	

	this.usedFunctions = [];
    this.turtle = null;
    this.textOutput = null;
   	this.userFunct = false;
    this.setTurtle = function(turtle) {
    this.turtle = turtle;
		
    }
    this.setTextOutput = function(textOutput) {
        this.textOutput = textOutput;
    }
    var d = new Date()
    this.seed = d.getTime()/1000;
   
    this.functions = new SymbolTable();
    this.values = new SymbolTable();
   
    this.t = new Tokenizer();
    this.p = new Parser();
   
    this.primitive = new Array();
    this.command = new Array();
    this.turtle_command = new Array();
    this.constant = new Array();
   
    this.alias = new Array();

    this.repcount = -1;
    this.setup();
    this.depth = 0;
    this.maxdepth = 1000;
	runedFunct =  function (f, name, argVal) {
	this.funct = f;
	this.name = name;
	this.argsVal = argVal;
	this.penColor = turtle.color;
	this.turtlePosition = turtle.position;
	this.turtleDirection = new THREE.Vector3();
	this.turtleUp = new THREE.Vector3();
	this.turtleDirection.copy (turtle.direction); 
	this.turtleUp.copy( turtle.up);
	this.functId = 0;
	};
}

Logo.prototype.rexecute = function (fname) {
	for ( i = 0; i < this.usedFunctions.length ; i ++ ) {
		if ( this.usedFunctions[i].name == fname ) {
			//console.log ("oi metavlites mou einai : " +  this.usedFunctions[i].funct.args.length)
			for (k =0; k < this.usedFunctions[i].funct.args.length; k ++ ) {
				//console.log ( this.usedFunctions[i].funct.args[k].data);
				//console.log ( this.usedFunctions[i].argsVal[k].data);
				
				}
			}
		
		}
	
	
	
	}
Logo.prototype.random = function () {
    this.seed = (this.seed * 214013 + 2531011)%4294967296;
    return ((this.seed >> 16) & 0x7fff) / 32768.0;
}

Logo.prototype.srand = function(seed) {
    this.seed = seed;
}

Logo.prototype.addAlias = function (name, wrd) {
    this.alias[name] = wrd;
}

Logo.prototype.addConstant = function(name, value) {
    this.constant[name] = value;
};

Logo.prototype.addCommand   = function(name, grab, aliases, fun) {
    this.command[name] = fun
    this.addBuiltin(name, grab,aliases);
};

Logo.prototype.addPrimitive = function(name, grab, aliases, fun) {
    this.primitive[name] = fun
    this.addBuiltin(name, grab,aliases);
};

Logo.prototype.addInfix = function(name, fun, p) {
    this.addAlias(name, fun);
    this.p.addInfix(name,p);
}

Logo.prototype.addTurtleCommand = function(name, grab, aliases) {
    this.turtle_command[name] = grab;
    this.addBuiltin(name, grab,aliases);
};

Logo.prototype.addBuiltin = function(name,grab,aliases) {
    this.p.addCommand(name, grab);
    if (aliases != null && aliases.length) {
        for (var a in aliases) {
            this.addAlias(aliases[a],name);
            this.p.addCommand(aliases[a], grab);
        }
    }
}

Logo.prototype.setup = function () {

    this.addCommand('forward',1,['forward','fd', 'μ', 'μπροστά', 'μπροστα' ], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να προχωρήσω μπροστά χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else 
				msg = new Token('error','\n Can only go forward a number, not '+a[0])
			return msg;
		}
        this.turtle.go(parseFloat(a[0]));     ////NEW ////
    });
   
    this.addCommand('backward',1,['bk','back', 'π', 'πισω', 'πίσω'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
		if (language == "Gr")
			var msg = new Token('error','\n Για να προχωρήσω πίσω χριάζομαι έναν αριθμό, όχι '+a[0]);
		else var msg = new Token('error','\n Can only go backward a number, not '+a[0]);
		return msg;}
        this.turtle.go(-parseFloat(a[0]));   ////NEW ////
    });
	
	this.addCommand('up',1,['up', 'u', 'πάνω', 'πανω'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω προς τα πάνω  χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else 
				msg = new Token('error','\n Can only turn up a number, not '+a[0])
			return msg;
		}
        this.turtle.pitch(parseFloat(a[0]));   ////NEW ////
    });
	
	this.addCommand('down',1,['down', 'dn', 'κάτω', 'κατω'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω προς τα κάτω  χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else msg= new Token('error','Can only turn down a number, not '+a[0])
			return msg;
		}
        this.turtle.pitch(-parseFloat(a[0]));   ////NEW ////
    });
	
		this.addCommand('roll_left',1,['roll_left', 'rl','περιστροφηαριστερα', 'περιστροφήαριστερά', 'πα'], function (a) {
        if (parseFloat(a[0]) != a[0]) 
		{if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω περιστραφώ αριστερά χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else msg = new Token('error','Can only roll left a number, not '+a[0])
		return msg;
		}
        this.turtle.roll(parseFloat(a[0]));   ////NEW ////
    });
	
	
		this.addCommand('roll_right',1,['roll_right', 'rr', 'περιστροφηδεξια', 'περιστροφήδεξιά', 'πδ'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω περιστραφώ δεξια χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else msg = new Token('error','Can only roll right a number, not '+a[0])
		return msg;
		}
        this.turtle.roll(-parseFloat(a[0]));   ////NEW ////
    });
	
    this.addCommand('right',1,['rt', 'δεξια', 'δεξιά' ,'δ'], function (a) {
        if (parseFloat(a[0]) != a[0])  {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω στρίψω δεξια χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else msg = new Token('error','Can only turn right a number, not '+a[0])
		return msg;
		}
        this.turtle.yaw(a[0]);////NEW ////
		
    });
    this.addCommand('left',1,['lt', 'α', 'αριστερά', 'αριστερα'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
				msg = new Token ('error', '\n Για να στρίψω στρίψω αριστερά χρειάζομαι έναν αριθμό, όχι' + a[0]);
			else msg = new Token('error','Can only turn left a number, not '+a[0])
		return msg;
		}
        this.turtle.yaw(-a[0]); ////NEW ////
    });

    this.addCommand('setx',1,['θεσεx','θέσεx','θέσεχ','θεσεχ'], function (a) {
       /* if (parseInt(a[0]) != a[0]){
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else  msg = new Token('error','Can only set x to a whole number, not '+a[0])
		 return msg;
		}*/
        this.turtle.setx(a[0]);  ////NEW ////
    });

    this.addCommand('sety',1,['θεσεy','θέσεy','θεσεψ','θέσεψ'], function (a) {
       /* if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','Can only set y to a whole number, not '+a[0])
		 return msg;
		}*/
        this.turtle.sety(a[0]); ////NEW ////
    });
   
   this.addCommand('setz',1,['θεσεz','θέσεz','θέσεζ'], function (a) {  ////NEW ////
       /* if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','Can only set z to a whole number, not '+a[0])
		 return msg;
		}*/
        this.turtle.setz(a[0]);   ////NEW ////
    });
	
    this.addCommand('setheading',1,['seth'], function (a) {
        if (parseFloat(a[0]) != a[0]) return new Token('error','Can only set heading to a number, not '+a[0])
        this.turtle.setheading(a[0]);
    });

    this.addCommand('setxy',2,['θεσεxy','θέσεxy','θέσεχψ','θεσεχψ'], function (a) {  ///OK///
      /*  if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg =  new Token('error','When using setxy, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
        if (parseInt(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg =  new Token('error','When using setxy, you can only set y to a whole number, not'+a[1])
		 return msg;
		}*/
        this.turtle.setxy(a[0],a[1]); ////NEW ////
    });
	 this.addCommand('setxz',2,['θεσεxz','θέσεxz','θέσεχζ','θεσεχζ'], function (a) {  ///OK///
      /*  if (parseInt(a[0]) != a[0]){
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setxz, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
        if (parseInt(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','When using setxz, you can only set z to a whole number, not'+a[1])
		 return msg;
		}*/
        this.turtle.setxz(a[0],a[1]); ////NEW ////
    });
	this.addCommand('setyz',2,['θεσεyz','θέσεyz','θέσεψζ','θεσεψζ'], function (a) {  ///OK///
        if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setyz, you can only set y to a whole number, not'+a[0])
		 return msg;
		}
        if (parseInt(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','When using setyz, you can only set z to a whole number, not'+a[1])
		 return msg;
		}
        this.turtle.setyz(a[0],a[1]); ////NEW ////
    });


    this.addCommand('setpos',1,['θεσεθεση','θέσεθέση','θεσεθέση','θέσεθεση'], function (b) {    ///OK///
        if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
           /* if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setpos, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
            if (parseInt(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','When using setpos, you can only set y to a whole number, not'+a[1])
		 return msg;
		}
			if (parseInt(a[2]) != a[2]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[2]);
			else msg = new Token('error','When using setpos, you can only set z to a whole number, not'+a[2])
		 return msg;
		}*/
            this.turtle.setpos(a[0],a[1],a[2]);
        } else {
			{
			if (language == "Gr")
			msg = new Token('error','Η εντολή setpos πρέπει να ακολουθείται από μια λίστα τριών ορισμάτων [χ y z], όχι '+b[0]);
			else msg = new Token('error','You need to pass setpos a LIST of three arguments [ x y z ], not '+b[0]);
		 return msg;
		}
          
        }
    });
	 this.addCommand('pos',0,['θεση','θέση'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
	   oldcode = document.getElementById('oldcode');
       oldcode.innerHTML +="\n Position: x: "+pos.x + " y: " +pos.y + " z: " + pos.z;
	   return pos;
    });
	
	 this.addCommand('xcor',0,['θεσηx','θέσηx','θεσηχ','θέσηχ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
	 //  oldcode = document.getElementById('oldcode');
     //  oldcode.innerHTML +="\n xCor: "+pos.x;
	   return pos.x;
    });
	this.addCommand('ycor',0,['θεσηy','θέσηy','θέσηψ','θεσηψ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
	 ///  oldcode = document.getElementById('oldcode');
      // oldcode.innerHTML +="\n yCor: "+pos.y;
	    return pos.y;
    });
	this.addCommand('zcor',0,['θεσηz','θέσηz','θέσηζ','θεσηζ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
	 //  oldcode = document.getElementById('oldcode');
     //  oldcode.innerHTML +="\n zCor: "+pos.z;
	    return pos.z;
    });
	this.addCommand('distancetoxyz',1,['αποστασηαποxyz','απόστασηαποxyz','απόστασηαποχψζ','αποστασηαποχψζ','απόστασηαπόχψζ','distanceto'], function (b) {  ///OK///
      if (b && b.length == 1 && b[0].length == 3 ) {
		    var a = b[0];
           /* if (parseInt(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ πρέπει να είναι αριθμός, όχι '+a[0]);
			else msg = new Token('error','x must be a number, not '+a[0]);
		 return msg;
		}
            if (parseInt(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y πρέπει να είναι αριθμός, όχι '+a[1]);
			else msg = new Token('error','y must be a number, not '+a[1]);
		 return msg;
		}
			if (parseInt(a[2]) != a[2]){
			if (language == "Gr")
			msg = new Token('error','Το z πρέπει να είναι αριθμός, όχι '+a[2]);
			else msg = new Token('error','z must be a number, not '+a[2]);
		 return msg;
		}*/
	   var pos = this.turtle.getPos();
	   var dist = pos.distanceTo(new THREE.Vector3(a[0],a[1], a[2]));
	   oldcode = document.getElementById('oldcode');
       oldcode.innerHTML +=" <br></br>Distance to "+ b + " : "+ dist;
	   return dist;
	  }
	  else{
		  
			if (language == "Gr")
			msg = new Token('error','Η εντολή distanceto πρέπει να ακολουθείται από μια λίστα τριών ορισμάτων [x y z], όχι '+b[0]);
			else msg = new Token('error','You need to pass distanceto a LIST of three arguments [ x y z ], not '+b[0]);
		 return msg;
		
        }
    });
        this.addCommand('print',1,['pr', 'τυπωσε', 'τύπωσε'], function (b) {   
        if (b && b.length) {
                   var a, sep;
                   if (b[0].constructor == Array) {
                                a = b[0];
                                sep = " ";
                   } else {
                                a = b;
                                sep = '';
                   }
                   var txt = "";
                   for (var i=0; (i < a.length); i++) txt += a[i] + sep;
				    oldcode = document.getElementById('oldcode');
                    oldcode.innerHTML +="\n\r"+ txt + "\n\r";
        } else {
			if (language == "Gr")
			msg = new Token('error','Μπορείς να εκτυπώεις μια λίστα ορισμάτων ή μια λέξη , όχι '+b[0]);
			else msg = new Token('error','You can pass print a list of arguments or a single word, not '+b[0]);
		 return msg;
		 
        }
    });
       
        this.addCommand('cleartext', 0, ['ct', 'καθαρισεκειμενο'], function () {
       clean_oldcode();        
    });


    this.addCommand('arc',2,null, function (a) {
        if (parseFloat(a[0]) != a[0]){
			if (language == "Gr")
			msg = new Token('error','Στην εντολή arc πρέπει να δώσεις έναν αριθμό , όχι '+a[0]);
			else msg = new Token('error','When using arc, you can only set the radius to a number, not '+a[0]);
		 return msg;}
			
        if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Στην εντολή arc πρέπει να δώσεις έναν αριθμό για την γωνία, όχι '+a[1]);
			else msg = new Token('error','When using arc, you can only set the angle to a number, not '+a[1]);
		 return msg;}
        this.turtle.arc(a[0],a[1]);
    });
   
   
   this.addCommand('penup',0,['pu', 'penup', 'στυλοπανω', 'σπ','στυλόπανω','στυλοπάνω','στυλόπάνω'], function () {  //OK //
     
        this.turtle.penUp();
    });
	
	 this.addCommand('pendown',0,['pd', 'pendown', 'στυλοκατω', 'σκ','στυλόκατω','στυλόκάτω','στυλοκάτω'], function () {    //OK//
     
        this.turtle.penDown();
    });
   
    this.addCommand('hideturtle',0,['ht', 'hideturtle', 'κρυψεχελωνα', 'κχ','κρύψεχελώνα','κρυψεχελώνα','κρύψεχελωνα'], function () {    //OK//
     
        this.turtle.setVisible(false);
    });
   
     this.addCommand('showturtle',0,['st', 'showturtle', 'δειξεχελωνα', 'δχ',
	 'δειξεχελώνα','δείξεχελωνα','δείξεχελώνα'], function () {    //OK//
     
        this.turtle.setVisible(true);
    });
   
   this.addCommand('reset',0,['reset'], function () {    //OK//
     	 resetCanvas();
    });

	
	 this.addCommand('home',0,['στηναρχη','στηναρχή'], function () {    //OK//
     
        this.turtle.stinarxi();
    });

 this.addCommand('clearscreen',0,['cs', 'καθαρισεοθονη', 'καθάρισεοθόνη'], function () {    //OK//
     
       resetCanvas();
    });

 this.addCommand('cleargraphics',0,['cg', 'σβγ', 'σβησεγραφικα'], function () {    //OK//
     
        resetCanvas();
		
    });
	
 this.addCommand('clean',0,['καθαρισε'], function () {    //OK//
     
        clearGraphics();
		
    });
    /*this.addCommand('undo',0,['undo'],function () {    //OK//
     
        undo();
    });*/
    this.addTurtleCommand('redo',0,null);
   
   this.addCommand('stop',0,['σταμάτησε', 'σταματησε'], function () {    //OK//
     
        this.turtle.stop();
    });
   
    this.addCommand('setpencolor',1,['θεσεχρωμαστυλο','θέσεχρωμαστυλο','θεσεχρώμαστυλο','θεσεχρωμαστυλό','θέσεχρώμαστυλο','θέσεχρώμαστυλό','θέσεχρωμαστυλό'], function (b) {
         if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseInt(a[0]) != a[0]) return new Token('error','r must be a number, not '+a[0])
            if (parseInt(a[1]) != a[1]) return new Token('error','g must be a number, not '+a[1])
			if (parseInt(a[2]) != a[2]) return new Token('error','b must be a number, not '+a[2])
            this.turtle.setColor(a[0],a[1],a[2]);
        } else {
            return new Token('error','You need to pass color a LIST of three arguments [ r g b], not '+b[0]);
        }
    });
   
    this.addCommand('penwidth',1,['setpensize', 'θεσεπαχοσστυλο','θέσεπαχοσστυλο','θεσεπάχοσστυλο','θεσεπαχοσστυλό','θέσεπάχοσστυλο','θέσεπάχοσστυλό','θέσεπαχοσστυλό'], function (a) {  //OK//
        if (parseFloat(a[0]) != a[0]) return new Token('error','Pen width can only be a number, not '+a[0])
        this.turtle.setWidth(a[0]);  
    });
	 this.addCommand('getPenWidth',1,['getpensize', 'παχοσστυλο','πάχοσστυλο','παχοσστυλό','πάχοσστυλό'], function (a) {  //OK//
        if (parseFloat(a[0]) != a[0]) return new Token('error','Pen width can only be a number, not '+a[0])
        this.turtle.setWidth(a[0]);  
    });
	
 this.addCommand('setbgcolor',1,['θεσεχρωμαυποβαθρου'], function (b) {
         if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseInt(a[0]) != a[0]) return new Token('error','r must be a number, not '+a[0])
            if (parseInt(a[1]) != a[1]) return new Token('error','g must be a number, not '+a[1])
			if (parseInt(a[2]) != a[2]) return new Token('error','b must be a number, not '+a[2])
			document.getElementById("3Dcanvas");
            canvas.style.backgroundColor= 'rgb(' + a[0] + ',' + a[1] + ',' + a[2] + ')';
        } else {
            return new Token('error','You need to pass color a LIST of three arguments [ r g b], not '+b[0]);
        }
    });
   


    this.addCommand('first',1,['head'],function (a) {return a[0][0];});
    this.addCommand('last',1,null,function (a) {var b = a[0]; return b[b.length];});

    this.addCommand('butfirst',1,['tail','bf'],function (a) {return a[0].slice(1);});
    this.addCommand('butlast',1,['bl'],function (a) {var b = a[0]; return b.slice(0,b.length-1);});
    this.addCommand('item',2,null,function (a) {var b = a[1]; return b[a[0]];});
    this.addCommand('setitem',3,null,function (a) {var b = a[1]; b[a[0]]= a[2];});

    this.addCommand('empty?',1,['emptyp'],function (a) {return a[0].length == 0});

    this.addCommand('fput',2,null,function (a) {var b = a[1]; return [a[0]].concat(b.slice(0));});
    this.addCommand('lput',2,null,function (a) {var b = a[1]; return b.slice(0).concat(a[0]);});

    this.addCommand('int',1,['ακεραιος','integer'],function (a) {return Math.floor(a[0])});
    this.addCommand('round',1,null,function (a) {return Math.round(a[0])});
    this.addCommand('sqrt',1,['ριζα','ρίζα'],function (a) {return Math.sqrt(a[0])});
    this.addCommand('power',2,['pow','δυν'],function (a) {return Math.pow(a[0],a[1])});
    this.addCommand('exp',1,null,function (a) {return Math.exp(a[0])});
	 this.addCommand('abs',1,null,function (a) {return Math.abs(a[0])});
    this.addCommand('ln',1,['λογαριθμος','λογάριθμος'],function (a) {return Math.log(a[0])});
    this.addCommand('log10',1,null,function (a) {return Math.LOG10E * Math.log(a[0])});
    this.addCommand('sin',1,['ημ'],function (a) {return Math.sin(a[0]/180*Math.PI)});
    this.addCommand('cos',1,['συν','συνημ'],function (a) {return Math.cos(a[0]/180*Math.PI)});
	  this.addCommand('tan',1,['εφ'],function (a) {return Math.tan(a[0]/180*Math.PI)});
	this.addCommand('arcsin',1,['τοξημ'],function (a) {return Math.asin(a[0])*180/Math.PI});
	this.addCommand('arccos',1,['τοξσυν'],function (a) {return Math.acos(a[0])*180/Math.PI});
    this.addCommand('arctan',1,['τοξεφ'],function (a) {return Math.atan(a[0])*180/Math.PI});
    this.addCommand('radsin',1,null,function (a) {return Math.sin(a[0])});
    this.addCommand('radcos',1,null,function (a) {return Math.cos(a[0])});
    this.addCommand('radarctan',1,null,function (a) {return Math.atan(a[0])});
	this.addCommand('pi',0,['πι'],function (a) {return Math.PI});

    this.addCommand('random',1,['rand','τυχαίο','τυχαιο'],function (a) {var b= Math.floor(this.random()*a[0]); return b;});
    this.addCommand('rerandom',1,['srand'],function (a) {return this.srand(a[0])});
   
    this.addCommand('bitand',2,null,function (a) {var sum = 1; for (var i in a) {sum=sum&a[i]}; return sum;});
    this.addCommand('bitor',2,null,function (a) {var sum = 0; for (var i in a) {sum=sum|a[i]}; return sum;});
    this.addCommand('bitxor',2,null,function (a) {var sum = 0; for (var i in a) {sum=sum|a[i]}; return sum;});
    this.addCommand('bitnot',1,null,function (a) { return  ~a[0]});
   
    this.addCommand('sum',2,['add', 'αθροισμα'],function (a) {var sum = 0; for (var i in a) {sum+=a[i]}; return sum;});
    this.addCommand('difference',2,['sub', 'διαφορα'],function (a) {return a[0]-a[1]});
    this.addCommand('product',2,['mul', 'γινομενο'],function (a) {var product = 1; for (var i in a) {product*=a[i]}; return product;});
    this.addCommand('divide',2,['div', 'πηλικο'],function (a) {return a[0]/a[1]});
    this.addCommand('modulo',2,['mod','remainder', 'υπολοιπο'],function (a) {return a[0]%a[1]});
    this.addCommand('minus',1,['αρνητικό'],function (a) {return -a[0]});

    this.addCommand('output',1,['op'],function (a) {return new Token('stop',a[0])});

    this.addInfix('+','sum',40);
    this.addInfix('-','difference',40);
    this.addInfix('*','product',20);
    this.addInfix('/','divide',20);
    this.addInfix('%','modulo',10);
   
   
    this.addCommand('or',2,['η'],function (a) {return a[0] || a[1]});
    this.addCommand('and',2,['και'],function (a) {return a[0] && a[1]});
    this.addCommand('not',1,['οχι'],function (a) {return !a[0]});

    this.addCommand('equal?',2,['equalp'],function (a) {return a[0] == a[1]});
    this.addCommand('notequal?',2,['notequalp'],function (a) {return a[0] != a[1]});
    this.addCommand('less?',2,['lessp'],function (a) {return a[0] < a[1]});
    this.addCommand('greater?',2,['greaterp'],function (a) {return a[0] > a[1]});

    this.addCommand('greaterequal?',2,['greaterequalp'],function (a) {return a[0] >= a[1]});
    this.addCommand('lessequal?',2,['greaterequalp'],function (a) {return a[0] <= a[1]});

    this.addInfix('=','equal?',60);
    this.addInfix('!=','notequal?',60);
    this.addInfix('<>','notequal?',60);
    this.addInfix('<','less?',60);
    this.addInfix('>','greater?',60);
    this.addInfix('<=','lessequal?',60);
    this.addInfix('>=','greaterequal?',60);

    this.addConstant('stop',new Token('stop',null));


    this.addCommand('array',1,null,function (a) {
        var list = new Array(a[0]);
        for (var i in list) {
            list[i] = 0;
        }
        return list;
    });
   
    this.addCommand('make',2,['φτιαξε','φτιάξε'],function (args) {
        //alert(args);
        if (args && args.length == 2) {
            if (args[0]) {
                var name = args[0]
                var value = args[1];
                if (value == null) {
			if (language == "Gr")
			msg = new Token('error','Πρέπει να ορίσεις μια τιμή για το '+ name );
			else msg = new Token('error','Can\'t set '+name+' to null');;
		 return msg;}
       
                //alert("make "+name+" "+value);
                this.values.set(name,value);
            } else {
                return new Token('error','I can\'t make - '+args[0]+' is not a symbol');
            }
        } else {
			if (language == "Gr")
			msg = new Token('error','\n\r Για να φτιάξω μια χρειάζομαι 2 ορίσματα. Π.χ. φτιάξε "x 10 ');
			else msg =  new Token('error','\n\r I can\'t make, I need two arguments');
		 return msg;
          
        }
    });
   
  
   
    this.addPrimitive('forever',1,null,function (args) {
            if (args && args.length == 1) {
                var cmd = args[0];
                while(true) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;
                }
            } else {
                return new Token ('error','I can\'t forever.');
            }
       
        }
    );

    this.addPrimitive('do.until',2,null,function (args) {
            if (args && args.length == 2) {
                var cmd = args[1];
                while (true) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;

                    var limit = this.eval(args[0]);
                    if (limit == null) {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω ποια είναι η συνθήκη του μέχρι.. ');
			else msg = new Token('error','\n\r Don\'t know what the do.until condition is.');
		 return msg;
          }
                    if (limit && limit.type == "error") return limit;
                    if (limit) return;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }
       
        }
    );


    this.addPrimitive('do.while',2,null,function (args) {
            if (args && args.length == 2) {
                var cmd = args[1];
                while (true) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;

                    var limit = this.eval(args[0]);
                    if (limit == null) {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω ποια είναι η συνθήκη του όσο ');
			else msg = new Token('error','\n\r Don\'t know what the do.while condition is.');
		 return msg;
          }
                    if (limit && limit.type == "error") return limit;
                    if (!limit) return;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }
       
        }
    );

    this.addPrimitive('until',2,null,function (args) {
            if (args && args.length == 2) {
                var cmd = args[1];
                while (true) {
                    var limit = this.eval(args[0]);
                    if (limit == null) return new Token('error','Don\'t know what the while condition is.');
                    if (limit && limit.type == "error") return limit;
                    if (limit) return;
               
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }
       
        }
    );
    this.addPrimitive('while',2,['οσο'],function (args) {
            if (args && args.length == 2) {
                var cmd = args[1];
                while (true) {
                    var limit = this.eval(args[0]);
                    if (limit == null)  {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω ποια είναι η συνθήκη του όσο.. ');
			else msg = new Token('error','\n\r Don\'t know what the while condition is.');
		 return msg;
          }
                    if (limit && limit.type == "error") return limit;
                    if (!limit) return;
               
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }
       
        }
    );

    this.addPrimitive('repeat',2,['επαναλαβε','επανάλαβε'],function (args) {
            if (args && args.length == 2) {
                var limit = this.eval(args[0]);
                if (limit == null)  {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω πόσες φορές να επαναλάβω ');
			else msg = new Token('error','\n\r Don\'t know how many times to repeat.');
		 return msg;
          }
                if (limit && limit.type == "error") return limit;
                if (limit != parseInt(limit)) {if (language == "Gr")
			msg = new Token('error','\n\r Μπορώ να επαναλάβω μόνο έναν αριθμό φορών, όχι ' +limit);
			else msg = new Token('error','\n\r I can only repeat things a whole number of times, and '+ limit+' is not a whole number');
		 return msg;
          } 
               
                var cmd = args[1];
                for (var c = 0; c< limit; c++) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }
       
        }
    );
   
    this.addPrimitive('if',2,['αν'],function (args) {
            if (args && args.length == 2) {
                var cond = this.eval(args[0]);
                if (cond && cond.type == "error") return cond;
                if (cond == null) 
				 {if (language == "Gr")
			msg = new Token('error','\n\r Χρειάζομαι μια συνθήκη για το ΑΝ που να είναι αληθής ή ψευδής');
			else msg = new Token('error','\n\r if needs a condition, something that is true or false. what is being run is returning null');
		 return msg;
          } 

                if (cond) {
                    return this.eval(args[1]);
                }
            } else {
                return new Token ('error','I can\'t if.');
            }
       
        }
    );
   
   
    this.addPrimitive('ifelse',3,['αναλλιως'],function (args) {
            if (args && args.length == 3) {
                var cond = this.eval(args[0]);
                if (cond && cond.type == "error") return cond;
                if (cond == null)  {if (language == "Gr")
			msg = new Token('error','\n\r Χρειάζομαι μια συνθήκη για το αναλλιως που να είναι αληθής ή ψευδής');
			else msg = new Token('error','\n\r ifelse needs a condition, something that is true or false. what is being run is returning null');
		 return msg;
          } 

                if (cond) {
                    return this.eval(args[1]);
                } else {
                    return this.eval(args[2]);
                }
            } else {
                return new Token ('error','I can\'t if.');
            }
       
        }
    );
       

    this.addConstant('true',true);
    this.addConstant('false',false);
   
}

////////////////RUN/////////

Logo.prototype.run = function (code) {
	this.numberOfFuncExec =0;
	this.numberOfFuncDefn = 0;
	this.FuncExec =[];
	this.FuncDef =[];
	this.userFunct = false;
    var js = new Array();
  // alert (this.userFunct);
    this.t.load(code);
    this.p.load(this.t);
   
    var i = null;
   
    //this.turtle.start();
   
    var ret = null;
    do {
        i = this.p.next();
		//console.log ("logo:" )
		//console.log(i);
		
        if (i == null) { ret =new Token('error','I can\'t parse this.'); break;}
        if (i.type == "error") {if (!fromOpenFile) {ret = i; break;}
			
		}
        if (i.type == "eof") { if(multyExecut){maltWid.multipleExcution(this.numberOfFuncExec,this.numberOfFuncDefn, this.FuncExec, this.FuncDef);}
		break;}
		this.userFunct = false;
		if(!fromOpenFile){
			
			if (this.functions.get(i.data) == null){  //new function
     	  			this.userFunct = false;
					}
			var out = this.eval(i);
		}
		
		else{ //console.log(i);
		if (i.type== "def") {var out = this.eval(i) ; }}
        if (out && out.type == "error") {ret = out; break;}
       
    } while (1);
   
   // this.turtle.finish();
 
    return ret;
	
}

Logo.prototype.eval = function (code) {
   //console.log("eval "+code);
	//console.log (code.type);
//	console.log (fromOpenFile);
	//console.log (code.type);
//	console.log (definition);
	if((fromOpenFile) && (code.type!="def") && (!definition)){
		return null;
		}
    if (code == null) {
        return null;
    } else if (code.type == "def") {        // a definition: to ....
        var allreadyDefined = false;
		if (this.functions.get(code.data) != null)
			 allreadyDefined = true;
			//console.log (code.args.args.length);
		this.functions.set(code.data,code.args);
		if (allreadyDefined){
			if(!multyExecut){
			maltWid.addFunction (code.data,code.args.args);}
			else {this.numberOfFuncDefn ++; this.FuncDef.push(code)}
			if (language == "Gr")
			oldcode.innerHTML +="<br /> " + code.data + " ξαναορίστηκε.";
			else
			oldcode.innerHTML +="<br /> " + code.data + " redefined.";
		}
		else {
			console.log (code)
			if(!multyExecut){
			maltWid.addFunction (code.data,code.args.args);}
			else {this.numberOfFuncDefn ++; this.FuncDef.push(code)}
			if (language == "Gr")
			oldcode.innerHTML +="<br /> " + code.data + " ορίστηκε.";
			else
			oldcode.innerHTML +="<br /> " + code.data + " defined.";
		}

    } else if (code.type == "lst") {        // a list of items
        //alert('evaling list');
        return this.eval_list(code.args);
    } else if (code.type == "wrd" || code.type=="ops" ||code.type=="math" ) {        // a command
        if (this.alias[code.data] != null) {
            code.data = this.alias[code.data];
        }
       
        if (this.constant[code.data] != null) {    // a constant

            return this.constant[code.data];
           
        } else if (this.primitive[code.data] != null) {    // a primitive operation, don't eval args
            var f = this.primitive[code.data];
            var l = code.args;
           
            if (l && l.type == 'error') return l;
           
            var result = f.call(this,l);
           
            return result;
        } else if (this.command[code.data] != null) {    // a command operation, eval args.
			//console.log (code);
            var f = this.command[code.data];
            var l = this.eval_list(code.args);

            if (l && l.type == 'error') return l;
           if (!this.userFunct) {					// a default command fd,bk etc
		  // 	console.log ("Not from userFunct");
		  
			   rf = new runedFunct (f, code.data, code.args);
			  // console.log (rf)
				if (!fromSliders){
					this.argsData = [];
						for (var a =0 ; a<rf.argsVal.length; a++)
							this.argsData.push (rf.argsVal[a].data);
						this.hf = {name: rf.name,args: this.argsData, origin: "primitive"}
						traceCode.push (this.hf);
				}
			  	 this.usedFunctions.push (rf);
			   }
            var result = f.call(this,l);
           
            return result;
       
        } else if (this.turtle_command[code.data] != null) {  // a turtle command, eval and pass to the turtle.

            // it's a builtin
			//console.log (code);
            var f = this.turtle[code.data];
            var l = this.eval_list(code.args);
            if (l && l.type == 'error') return l;
            f.apply(this.turtle,l);
			
            return null;
       
        } else if (this.functions.get(code.data) != null) { // a user defined function
				//console.log("from a user function");
            var f = this.functions.get(code.data);
				//console.log (f);
            if (f.code == null) { // time for some runparsing
              // alert("runparsing "+code.data);
                var t = new ListTokenizer(f.raw);
                this.p.load(t);
               
                var l = new Array();
                do {
                    var i = this.p.next();
                    if (i == null) { ret =new Token('error','I can\'t parse this function '+code.data); break;}
                    if (i.type == "error") {return i}
                    if (i.type == "eof") break;
                    l.push(i);
                   
                } while (1);
               
                this.p.load(this.t);
                f.code = l;
            }
            var last = f.code[f.code.length-1];
            var newvalues = new SymbolTable(this.values);

            if (code.args == null && f.args.length > 0) {
				
			if (language == "Gr")
			msg = new Token('error',code.data+" παίρνει "+f.args.length+" ορίσματα.");
			else msg = new Token('error',code.data+" only takes "+f.args.length+" arguments, you passed none");	
                return msg;
            }
            if (code.args != null && code.args.length != f.args.length) {
               //	console.log(  code.args.length + " " +  f.args.length);
			if (language == "Gr")
			msg = new Token('error',code.data+" παίρνει "+f.args.length+" ορίσματα. Έδωσες "+ code.args.length);
			else msg = new Token('error',code.data+" only takes "+f.args.length+" arguments, you passed" + code.args.length);               return msg;
            }
			
            for (var c  in code.args) {
			
                var name = f.args[c].data;
			
                var value = this.eval(code.args[c]);
                if (value == null) {
               	
			if (language == "Gr")
			msg = new Token('error','Δεν μπορείς να δώσεις null στο ' + code.data);
			else msg = new Token('error','Can\'t pass a null to '+code.data);	
                return msg;
            }
                if (value && value.type == 'error') return value;
				
               // alert("call "+code.data+" setting: "+name +":" +value);
                newvalues.set(name,value);
					

            }

				if((code.args != null)&& (code.args.length>0)){
					//console.log (code)
				if (code.args[0].type == "num"){
					if (!this.userFunct){
					rFunct = new runedFunct (f, code.data, code.args);
					//console.log (rFunct);
				 	this.userFunct = true;
					if (!fromSliders){
						
						maltWid.functionExecuted(rFunct.name, code);
						
						this.numberOfFuncExec ++ ; this.FuncExec.push(rFunct);
						this.argsData = [];
						for (var a =0 ; a<rFunct.argsVal.length; a++)
							this.argsData.push (rFunct.argsVal[a].data);
						this.hf = {name: rFunct.name,args: this.argsData, origin: "user"}
						traceCode.push (this.hf);
					}
					//console.log (rFunct);
					
				 this.usedFunctions.push (rFunct);}}
				}else {	
					if (!this.userFunct){
						
					rFunct = new runedFunct (f, code.data, code.args);					
				 	this.userFunct = true;					
					//console.log (rFunct);
						console.log (code)
					if (!fromSliders){
					var hf = {name: rFunct.name, args: rFunct.argsVal, origin: "user"}
						//console.log (hf);
						traceCode.push (hf);
						if(!multyExecut){
						maltWid.functionExecuted(rFunct.name, code);}
						else{
						this.numberOfFuncExec ++; this.FuncExec.push(rFunct);}
					}
					
				 this.usedFunctions.push (rFunct);}
					
				}
            // ru	nning function
			//console.log ("variables? : " + code.args );

			
            if (this.depth > this.maxdepth) {
                return new Token('error', 'too much recursion');
            }

			
            if ((last.type == "wrd"||last.type == "math") && (last.data == code.data)) {
        
                var par = this.values;
               
                var tail = f.code.pop();
                rec_depth = this.depth;
                while (1) { // revursive
                    if (this.depth > this.maxdepth) {
                        this.values = par; // restore the original stack
                        f.code.push(tail); // restore the original tail.
                        this.depth=rec_depth;
						this.userFunct = false;
                        return new Token('error', 'too much recursion');
                    }

                    this.depth++;
                    this.values = newvalues;
                    var result = this.eval_list(f.code);

                    if (result && (result.type == "stop" || result.type == "error")) {
                        this.values = par; // restore the original stack
                        f.code.push(tail); // restore the original tail.
                        this.depth=rec_depth;
                        return result.data;
                    };
                   
                    newvalues = new SymbolTable(par);
                   
                    for (var c in code.args) {
                        var name = f.args[c].data;
                        var value = this.eval(tail.args[c]);
                        if (value == null) return new Token('error','Can\'t pass a null to '+code.data);
                        if (value && value.type == 'error') return value;
   
                       // alert("rec: "+code.data+" setting: "+name +":" +value);
                        newvalues.set(name,value);
                    }
           
                }
            } else {
                this.values = newvalues;
                this.depth++;
                var result = this.eval_list(f.code);
				
				
              
			
                this.depth--;
                if (result && result.type == "stop") { result = result.data };

                this.values = this.values.par;
				//console.log ("lala");
			
                return result;
				
            }
			
			
        } else { if (language == "Gr") 
					msg =  new Token('error','Δεν ξέρω πως να ' + code.data);
					else
					 msg = new Token('error','I don\'t know how to ' + code.data);
            return msg;
        }
    } else if (code.type == "var") {        // a variable
        var r = this.values.get(code.data);
        //alert("getting:" + code.data + ":"+ r);
        return r;
       
    } else if (code.type == "num" || code.type == "sym" ||code.type == "text") { // a number / symbol
        return code.data;
    } else {
        return new Token ('error', 'I don\'t know how to evaluate '+code.data);
    }
}

Logo.prototype.eval_list = function(args) {
    if (args == null) { return null;}
    var ret = new Array()
    for (var i = 0; i < args.length; i++) {
      
        var res = this.eval(args[i]);
        if (res && res.type == "error") {
            return res;
        } else if (res  && res.type== "stop") {
            return res
        } else {
            ret.push(res);
        }
    }
    return ret;
}
   


function SymbolTable (par) {
    this.par = par;
    this.table = new Array();
    this.globalsyms = new Array();
   
    if (par != null && par.globaltable != null) {
        this.globaltable = par.globaltable;
    } else {
        this.globaltable = par;
    }
}

SymbolTable.prototype.make_global = function (key) {
    this.globalsyms["_"+key] = true
}

SymbolTable.prototype.get = function (key) {
    var mkey = "_"+key;
    var r = null;
    if (this.globalsyms[mkey] != null) {
        r = this.globaltable.get(key);
    } else {
        var r = this.table[mkey];
        if (r == null && this.par != null) {
            r = this.par.get(key);
        }
    }
    //alert("getting "+key+" = "+r);
    return r;
}


SymbolTable.prototype.set = function (key,value) {
    var mkey = "_" + key;
    if (this.globalsyms[mkey] != null) {
     //   console.log("global set");
        this.globaltable.set(key,value);
    } else {
    //   console.log("setting "+key+":"+value);
        this.table[mkey] = value;
    }
}

// JavaScript Document