import {getFromOpen} from './saveLoadFile.js';
import {resetCanvas} from './init.js'
import * as THREE from 'three';

function Logo () {
	this.usedFunctions = [];
    this.turtle = null;
    this.textOutput = null;
   	this.userFunct = false;
    this.setTurtle = function(turtle) {
    this.turtle = turtle;
	this.activeObject;
    }
	this.sceneShapesNames = [];
	this.getShapeName = function (shapeName) {
		var s = this.sceneShapesNames
		for (var i=0; i<s.length; i++) {
			if (s[i]==shapeName) return s[i];
		}
		return null;}
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
	this.runedFunct =  function (f, name, argVal, textCode) {
        this.textCode = textCode
	this.funct = f;
	this.name = name;
	this.argsVal = argVal;
	this.penColor = defaultColor;
	this.turtlePosition = turtle.position;
	this.turtleDirection = new THREE.Vector3();
	this.turtleUp = new THREE.Vector3();
	this.turtleDirection.copy (turtle.direction);
	this.turtleUp.copy( turtle.up);
	this.functId = 0;
	};
}

export {Logo, Tokenizer};
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
var msg = "";
    this.addCommand('forward',1,['forward','fd', 'μ', 'μπροστά', 'μπροστα' ], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			var	msg = new Token ('error', '\n Για να προχωρήσω μπροστά χρειάζομαι έναν αριθμό, όχι' + a[0]);
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
        if (parseFloat(a[0]) != a[0]){
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else  msg = new Token('error','Can only set x to a whole number, not '+a[0])
		 return msg;
		}
        this.turtle.setx(a[0]);  ////NEW ////
    });

    this.addCommand('sety',1,['θεσεy','θέσεy','θεσεψ','θέσεψ'], function (a) {
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','Can only set y to a whole number, not '+a[0])
		 return msg;
		}
        this.turtle.sety(a[0]); ////NEW ////
    });

   this.addCommand('setz',1,['θεσεz','θέσεz','θέσεζ'], function (a) {  ////NEW ////
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','Can only set z to a whole number, not '+a[0])
		 return msg;
		}
        this.turtle.setz(a[0]);   ////NEW ////
    });

    this.addCommand('setheading',1,['seth'], function (a) {
        if (parseFloat(a[0]) != a[0]) return new Token('error','Can only set heading to a number, not '+a[0])
        this.turtle.setheading(a[0]);
    });

    this.addCommand('setxy',2,['θεσεxy','θέσεxy','θέσεχψ','θεσεχψ'], function (a) {  ///OK///
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg =  new Token('error','When using setxy, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
        if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg =  new Token('error','When using setxy, you can only set y to a whole number, not'+a[1])
		 return msg;
		}
        this.turtle.setxy(a[0],a[1]); ////NEW ////
    });
	 this.addCommand('setxz',2,['θεσεxz','θέσεxz','θέσεχζ','θεσεχζ'], function (a) {  ///OK///
        if (parseFloat(a[0]) != a[0]){
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setxz, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
        if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','When using setxz, you can only set z to a whole number, not'+a[1])
		 return msg;
		}
        this.turtle.setxz(a[0],a[1]); ////NEW ////
    });
	this.addCommand('setyz',2,['θεσεyz','θέσεyz','θέσεψζ','θεσεψζ'], function (a) {  ///OK///
        if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setyz, you can only set y to a whole number, not'+a[0])
		 return msg;
		}
        if (parseFloat(a[1]) != a[1]) {
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
            if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','When using setpos, you can only set x to a whole number, not'+a[0])
		 return msg;
		}
            if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','When using setpos, you can only set y to a whole number, not'+a[1])
		 return msg;
		}
			if (parseFloat(a[2]) != a[2]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[2]);
			else msg = new Token('error','When using setpos, you can only set z to a whole number, not'+a[2])
		 return msg;
		}
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
	   var oldcode = document.getElementById('oldcode');
		 var roundX = Math.round((pos.x + Number.EPSILON) * 100) / 100
		 var roundY = Math.round((pos.y + Number.EPSILON) * 100) / 100
		 var roundZ = Math.round((pos.z + Number.EPSILON) * 100) / 100
       oldcode.innerHTML +="\n Position: x: "+ roundX+ " y: " + roundY + " z: " + roundZ;
		var roundPos =  new THREE.Vector3(roundX,roundY, roundZ);
	   return roundPos;
    });

	 this.addCommand('xcor',0,['θεσηx','θέσηx','θεσηχ','θέσηχ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
			 var roundX = Math.round((pos.x + Number.EPSILON) * 100) / 100
	   return roundX;
    });
	this.addCommand('ycor',0,['θεσηy','θέσηy','θέσηψ','θεσηψ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
			 var roundY = Math.round((pos.y + Number.EPSILON) * 100) / 100
		 return roundY;
    });
	this.addCommand('zcor',0,['θεσηz','θέσηz','θέσηζ','θεσηζ'], function (a) {  ///OK///
       var pos = this.turtle.getPos();
			 var roundZ = Math.round((pos.z + Number.EPSILON) * 100) / 100
		 return roundZ;
    });
	this.addCommand('ysize',0,[], function (a) {  ///OK///
       var vFOV = camera.fov * Math.PI / 180;
	   var sceneheight = 2 * Math.tan( vFOV / 2 ) * camera.position.z;
	 //  oldcode = document.getElementById('oldcode');
     //  oldcode.innerHTML +="\n zCor: "+pos.z;
	    return sceneheight;
    });
		this.addCommand('xsize',0,[], function (a) {  ///OK///
       var vFOV = camera.fov * Math.PI / 180;
	   var sceneheight = 2 * Math.tan( vFOV / 2 ) * camera.position.z;
	   var aspect = canvas.width / canvas.height;
	   var scenewidth = sceneheight * aspect;
	 //  oldcode = document.getElementById('oldcode');
     //  oldcode.innerHTML +="\n zCor: "+pos.z;
	    return scenewidth;
    });
	this.addCommand('distanceto',1,['αποστασηαπο','απόστασηαπο','απόστασηαπό'], function (b) {  ///OK///
      if (b && b.length == 1 && b[0].length == 3 ) {
		    var a = b[0];
            if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ πρέπει να είναι αριθμός, όχι '+a[0]);
			else msg = new Token('error','x must be a number, not '+a[0]);
		 return msg;
		}
            if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y πρέπει να είναι αριθμός, όχι '+a[1]);
			else msg = new Token('error','y must be a number, not '+a[1]);
		 return msg;
		}
			if (parseFloat(a[2]) != a[2]){
			if (language == "Gr")
			msg = new Token('error','Το z πρέπει να είναι αριθμός, όχι '+a[2]);
			else msg = new Token('error','z must be a number, not '+a[2]);
		 return msg;
		}
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
					  var oldcode = document.getElementById('oldcode');
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
     	 resetCommand(2);
    });


	 this.addCommand('home',0,['στηναρχη','στηναρχή'], function () {    //OK//

        this.turtle.stinarxi();
    });

 this.addCommand('clearscreen',0,['cs', 'cg', 'σβγ','σβησεγραφικα', 'καθαρισεοθονη'], function () {    //OK//

       resetCanvas(1);
    });

 this.addCommand('cleartrace',0,['ct', 'σβησειχνος', 'σβιχ' ], function () {    //OK//

        resetCanvas(2);

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
            turtle.setColor(a[0],a[1],a[2]);

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


		    this.addCommand('timeNow',0,['timenow'], function (a) {
					var d=new Date();
		       var time = [d.getHours(), d.getMinutes(), d.getSeconds()];
					 return time;
		    });
 // OBJECT COMMANDS //
  this.addCommand('addcube',1,null, function (b) {
		if (b.length > 0){
										 var a = b[0];


		generateCube (a)
 //	this.sceneShapesNames.push(a)
		 } else {
				 if (language == "Gr")
	 return new Token('error',"Give cube size");
	 else
				return new Token('error',"Give cube size");
		 }
    });
this.addCommand('addcylinder',1,null, function (b) {
         if (b.length > 0){
             var a = b[0];
			 if (getSceneObject(a)!=null){
				 if (language == "Gr")
				return newToken('error','Έχεις ήδη ένα αντικείμενο με το όνομα'+b[0] +'. Προσπάθησε ένα άλλο όνομα');
				else
				 return new Token('error','There is another object with the name'+b[0] +'.Try a different name');
			 }
			generateCylinder (a)
			this.sceneShapesNames.push(a)
        } else {
			if (language == "Gr")
			return new Token('error',"Πρέπει να δώσεις ένα όνομα στον κύλινδρό σου π.χ. addcylinder 'cyl'");
			else
           return new Token('error',"You must give a name to your cylinder. i.e. addcylinder 'cyl'");
        }
    });
		this.addCommand('addTorus',1,null, function (b) {
	         if (b.length > 0){
	                        var a = b[0];

				 if (getSceneObject(a)!=null){
					 if (language == "Gr")
					return newToken('error','Έχεις ήδη ένα αντικείμενο με το όνομα '+b[0] +'. Προσπάθησε ένα άλλο όνομα');
					else
					 return new Token('error','There is another object with the name '+b[0] +'.Try a different name');
				 }
				 generateTorus (a)
				this.sceneShapesNames.push(a)
	        } else {
	            if (language == "Gr")
				return new Token('error',"Πρέπει να δώσεις ένα όνομα στον κύβο σου π.χ. addcube 'mycube'");
				else
	           return new Token('error',"You must give a name to your cube. i.e. addcube 'mycube'");
	        }
	    });
this.addCommand('addSphere',1,null, function (b) {
		         if (b.length > 0){
		                        var a = b[0];

					 if (getSceneObject(a)!=null){
						 if (language == "Gr")
						return newToken('error','Έχεις ήδη ένα αντικείμενο με το όνομα '+b[0] +'. Προσπάθησε ένα άλλο όνομα');
						else
						 return new Token('error','There is another object with the name '+b[0] +'.Try a different name');
					 }
					 generateSphere (a)
					this.sceneShapesNames.push(a)
		        } else {
		            if (language == "Gr")
					return new Token('error',"Πρέπει να δώσεις ένα όνομα στον κύβο σου π.χ. addcube 'mycube'");
					else
		           return new Token('error',"You must give a name to your cube. i.e. addcube 'mycube'");
		        }
		    });
this.addCommand('.delete',0,null, function (a) {
            var s = getSceneObject (this.activeObject)
			deleteObject (s)
    });

this.addCommand('.setposition', 1, null, function (b){
	   if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','You can only set x to a whole number, not'+a[0])
		 return msg;
		}
            if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','You can only set y to a whole number, not'+a[1])
		 return msg;
		}
			if (parseFloat(a[2]) != a[2]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[2]);
			else msg = new Token('error','You can only set z to a whole number, not'+a[2])
		 return msg;
		}
			 var s = getSceneObject (this.activeObject)
            setObjectPosition(s, a);
        } else {
			{
			if (language == "Gr")
			msg = new Token('error','Η εντολή setPosition πρέπει να ακολουθείται από μια λίστα τριών ορισμάτων [χ y z], όχι '+b[0]);
			else msg = new Token('error','You need to give a LIST of three arguments [ x y z ], not '+b[0]);
		 return msg;
		}

        }

});
this.addCommand('.setscale', 1, null, function (b){
	   if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','You can only set x to a whole number, not'+a[0])
		 return msg;
		}
            if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','You can only set y to a whole number, not'+a[1])
		 return msg;
		}
			if (parseFloat(a[2]) != a[2]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[2]);
			else msg = new Token('error','You can only set z to a whole number, not'+a[2])
		 return msg;
		}
			 var s = getSceneObject (this.activeObject)
            setObjectScale(s, a);
        } else {
			{
			if (language == "Gr")
			msg = new Token('error','Η εντολή setscale πρέπει να ακολουθείται από μια λίστα τριών ορισμάτων [χ y z], όχι '+b[0]);
			else msg = new Token('error','You need to give a LIST of three arguments [ x y z ], not '+b[0]);
		 return msg;
		}

        }

});

this.addCommand('.setrotation', 1, null, function (b){
	   if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseFloat(a[0]) != a[0]) {
			if (language == "Gr")
			msg = new Token('error','Το χ μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[0]);
			else msg = new Token('error','You can only set x to a whole number, not'+a[0])
		 return msg;
		}
            if (parseFloat(a[1]) != a[1]) {
			if (language == "Gr")
			msg = new Token('error','Το y μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[1]);
			else msg = new Token('error','You can only set y to a whole number, not'+a[1])
		 return msg;
		}
			if (parseFloat(a[2]) != a[2]) {
			if (language == "Gr")
			msg = new Token('error','Το z μπορεί να πάρει μόνο αριθμητική τιμή, όχι '+a[2]);
			else msg = new Token('error','You can only set z to a whole number, not'+a[2])
		 return msg;
		}
			 var s = getSceneObject (this.activeObject)
            setObjectRotation(s, a);
        } else {
			{
			if (language == "Gr")
			msg = new Token('error','Η εντολή setrotation πρέπει να ακολουθείται από μια λίστα τριών ορισμάτων [χ y z], όχι '+b[0]);
			else msg = new Token('error','You need to give a LIST of three arguments [ x y z ], not '+b[0]);
		 return msg;
		}

        }

});

this.addCommand('.setcolor',1,null, function (b) {
         if (b && b.length == 1 && b[0].length == 3 ) {
                        var a = b[0];
            if (parseInt(a[0]) != a[0]) return new Token('error','r must be a number, not '+a[0])
            if (parseInt(a[1]) != a[1]) return new Token('error','g must be a number, not '+a[1])
			if (parseInt(a[2]) != a[2]) return new Token('error','b must be a number, not '+a[2])
			 var s = getSceneObject (this.activeObject)
            setObjectColor(s, a);

        } else {
            return new Token('error','You need to pass color a LIST of three arguments [ r g b], not '+b[0]);
        }
    });
 this.addCommand('.position',0,null, function (b) {
        var s = getSceneObject (this.activeObject)
		if (s!=null) {
			var pos = s.position
			   oldcode = document.getElementById('oldcode');
				oldcode.innerHTML +="\n Position of " +this.activeObject+": x: "+pos.x + " y: " +pos.y + " z: " + pos.z;

			return pos;
		}
    });
	this.addCommand('.rotation',0,null, function (b) {
        var s = getSceneObject (this.activeObject)
		if (s!=null) {
			var rot = s.rotation
			   oldcode = document.getElementById('oldcode');
				oldcode.innerHTML +="\n Rotation of " +this.activeObject+": x: "+rot.x + " y: " +rot.y + " z: " + rot.z;

			return rot;
		}
    });




// OTHER LOGO COMMANDS //

    this.addCommand('first',1,['head'],function (a) {return a[0][0];});
    this.addCommand('last',1,null,function (a) {var b = a[0]; return b[b.length-1];});
		this.addCommand ('ismember', 2, null, function (a) {var b = a[1]; var item1 = a[0]
										for (var i = 0; i < b.length; i ++){
											if (b[i] === item1)
												return true;
										} return false;});
    this.addCommand('butfirst',1,['tail','bf'],function (a) {return a[0].slice(1);});
    this.addCommand('butlast',1,['bl'],function (a) {var b = a[0]; return b.slice(0,b.length-2);});
    this.addCommand('item',2,null,function (a) {
			var b = a[1];
			return b[a[0]-1];});
	 this.addCommand('leng',1,null,function (a) {return a[0].length;});
    this.addCommand('setitem',3,null,function (a) {var b = a[1]; b[a[0]]= a[2];});

    this.addCommand('empty?',1,['emptyp'],function (a) {return a[0].length == 0});
this.addCommand('fput',2,null,function (a) {var b = a[1]; return [a[0]].concat(b.slice(0));});
    this.addCommand('fput',2,null,function (a) {var b = a[1]; return [a[0]].concat(b.slice(0));});
    this.addCommand('lput',2,null,function (a) {var b = a[1]; return b.slice(0).concat(a[0]);});

    this.addCommand('int',1,['ακεραιος','integer'],function (a) {return Math.floor(a[0])});
    this.addCommand('round',1,['στρογγυλοποιηση', 'στρογγυλοποίηση'],function (a) {return Math.round(a[0])});
    this.addCommand('sqrt',1,['ριζα','ρίζα'],function (a) {return Math.sqrt(a[0])});
    this.addCommand('power',2,['pow','δυν'],function (a) {return Math.pow(a[0],a[1])});
    this.addCommand('exp',1,null,function (a) {return Math.exp(a[0])});
	 this.addCommand('abs',1,['απολ'],function (a) {return Math.abs(a[0])});
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

    this.addCommand('random',2,['rand','τυχαίο','τυχαιο'],function (a) {var min = a[0]; var max=a[1]; var b= Math.random()*(max - min)+min; return Math.floor(b);});
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

    this.addCommand('output',1,['op', 'επεστρεψε', 'επέστρεψε'],function (a) {return new Token('stop',a[0])});

    this.addInfix('+','sum',40);
    this.addInfix('-','difference',40);
    this.addInfix('*','product',20);
    this.addInfix('/','divide',20);
    this.addInfix('%','modulo',10);


    this.addCommand('or',2,['η', 'ή'],function (a) {return a[0] || a[1]});
    this.addCommand('and',2,['και'],function (a) {return a[0] && a[1]});
    this.addCommand('not',1,['οχι', 'όχι'],function (a) {return !a[0]});

    this.addCommand('equal?',2,['equalp'],function (a) {return a[0] == a[1]});
    this.addCommand('notequal?',2,['notequalp'],function (a) {return a[0] != a[1]});
    this.addCommand('less?',2,['lessp'],function (a) {return a[0] < a[1]});
    this.addCommand('greater?',2,['greaterp'],function (a) {return a[0] > a[1]});

    this.addCommand('greaterequal?',2,['greaterequalp'],function (a) {return a[0] >= a[1]});
    this.addCommand('lessequal?',2,['lessequalp'],function (a) {return a[0] <= a[1]});


    this.addInfix('=','equal?',60);
    this.addInfix('!=','notequal?',60);
    this.addInfix('<>','notequal?',60);
    this.addInfix('<','less?',60);
    this.addInfix('>','greater?',60);
    this.addInfix('<=','lessequal?',60);
    this.addInfix('>=','greaterequal?',60);

    this.addConstant('stop',new Token('stop',null));
		 this.addCommand('send',1,['στειλε','στείλε'], function (b) {  ////NEW ////
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
                   for (var i=0; (i < a.length); i++){
						txt += a[i] + sep;}
			if(!fromLauch)
			 maltWid.sendFunction (txt);   ////NEW ////
        }

    });

this.addCommand('repcount',0,[],function () {
            if (this.repcount > 0) {
              return this.repcount;
            } else {
                return new Token ('error','There is no active repetition.');
            }

        }
    );
    this.addCommand('array',1,null,function (a) {
        var list = new Array(a[0]);
        //for (var i in list) {
          //  list[i] = 0;
       // }
        return list;
    });

    this.addCommand('make',2,['φτιαξε','φτιάξε', 'localmake'],function (args) {
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

    this.addPrimitive('dountil',2,null,function (args) {
            if (args && args.length == 2) {
                var cmd = args[1];
                while (true) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error") return res;
                    if (res && res.type == "stop") return res;

                    var limit = this.eval(args[0]);
                    if (limit == null) {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω ποια είναι η συνθήκη του μέχρι.. ');
			else msg = new Token('error','\n\r Don\'t know what the dountil condition is.');
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


    this.addPrimitive('dowhile',2,null,function (args) {
            if (args && args.length == 2) {
                var cmd = args[0];
                while (true) {
                    var res = this.eval(cmd);
                    if (res && res.type == "error")
										return res;
                    if (res && res.type == "stop")
										return res;
                    var limit = this.eval(args[1]);
                    if (limit == null) {if (language == "Gr")
			msg = new Token('error','\n\r Δεν ξέρω ποια είναι η συνθήκη του όσο ');
			else msg = new Token('error','\n\r Don\'t know what the dowhile condition is.');
		 return msg;
          }
                    if (limit[0] && limit.type == "error") return limit;
                    if (!limit[0])
										return;
                }
            } else {
                return new Token ('error','I can\'t repeat.');
            }

        }
    );

    this.addPrimitive('until',2,['μέχρι','μεχρι'],function (args) {
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
									this.repcount = c+1;
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
        if (i.type == "error") {if (!getFromOpen()) {ret = i; break;}

		}
        if (i.type == "eof") {
            if(multyExecut){
            maltWid.multipleExcution(code, this.FuncExec, this.FuncDef);}break;
        }
		this.userFunct = false;
		this.masterFunct = null ;
		if(!getFromOpen()){

			if (this.functions.get(i.data) == null){  //new function
     	  			this.userFunct = false;
					}
			var out = this.eval(i);
		}

		else{ //console.log(i);
		if (i.type== "def") {var out = this.eval(i) ;}}
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
var msg;
	if((getFromOpen()) && (code.type!="def") && (!definition)){
		return null;
		}
    if (code == null) {
        return null;
    } else if (code.type == "def")
	{
        // a definition: to ....
        var allreadyDefined = false;
		if (this.functions.get(code.data) != null)
			 allreadyDefined = true;
			// console.log (code);
		this.functions.set(code.data,code.args);
		if (allreadyDefined){
            maltWid.addFunction (code);
			if (language == "Gr")
			oldcode.innerHTML +="<br /> " + code.data + " ξαναορίστηκε.";
			else
			oldcode.innerHTML +="<br /> " + code.data + " redefined.";
		}
		else {
            maltWid.addFunction (code);
			if (language == "Gr")
			oldcode.innerHTML +="<br /> " + code.data + " ορίστηκε.";
			else
			oldcode.innerHTML +="<br /> " + code.data + " defined.";
		}

    } else if (code.type == "lst") {        // a list of items
        //alert('evaling list');
        return this.eval_list(code.args);
    } else if (code.type == "wrd" || code.type=="ops" ||code.type=="math" )
	{        // a command
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

			 const  rf = new this.runedFunct (f, code.data, code.args, code.type);

			   //console.log (rf)
				if (!fromSliders){
					this.argsData = [];
						/*for (var a =0 ; a<rf.argsVal.length; a++)
							this.argsData.push (rf.argsVal[a].data);*/
						this.hf = {name: rf.name,args: this.argsData}
						traceCode.push (this.hf);
                        maltWid.commandExecution (rf.name, code)
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

        } else if (this.functions.get(code.data) != null)
		{
			// a user defined function
				this.userFunct = true;

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
                    if (i == null) { var ret =new Token('error','I can\'t parse this function '+code.data); break;}
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
				this.userFunct = false;
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

			if (this.masterFunct == null){
					this.masterFunct = code.data;
			}
			if (this.masterFunct ==  code.data){
				if((code.args != null)&& (code.args.length>0)){
				if ((code.args[0].type == "num")||(code.args[0].data == "minus")){
					if (!this.userFunct)
							this.userFunct = true;
				const	rFunct = new this.runedFunct (f, code.data, code.args);
					//console.log (rFunct);
					if (!fromSliders){
                        maltWid.functionExecuted(rFunct.name, code);
						this.argsData = [];
						
						this.hf = {name: rFunct.name,args: rFunct.argsVal}
						traceCode.push (this.hf);
					}
					//console.log (rFunct);

					this.usedFunctions.push (rFunct);
				 }
				}
				else {
					if (!this.userFunct)
						this.userFunct = true;
				const	rFunct = new this.runedFunct (f, code.data, code.args);

					//console.log (rFunct);

					if (!fromSliders){
					var hf = {name: rFunct.name, args: rFunct.argsVal}
						//console.log (hf);
                        maltWid.functionExecuted(rFunct.name, code);
						traceCode.push (hf);

					}

					this.usedFunctions.push (rFunct);

				}
			}
            // ru	nning function
			//console.log ("variables? : " + code.args );


            if (this.depth > this.maxdepth) {
                return new Token('error', 'too much recursion');
            }


            if ((last.type == "wrd"||last.type == "math") && (last.data == code.data)) {

                var par = this.values;

                var tail = f.code.pop();
                var rec_depth = this.depth;
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


        }

		else { if (language == "Gr")
				var	msg =  new Token('error','Δεν ξέρω πως να ' + code.data);
					else
					 msg = new Token('error','I don\'t know how to ' + code.data);
            return msg;
        }
    }
	else if (code.type == "var") {        // a variable
        var r = this.values.get(code.data);
        //alert("getting:" + code.data + ":"+ r);
        return r;

    }
	else if (code.type == "obj") {        // an object

	this.activeObject = code.data;
	if(!this.userFunct){
       var l = this.p.next();
	   var f = this.command[l.data];
	   var ar = this.eval_list(l.args);
	   var  result = f.call(this,ar);

		return result;
	}
	   }



	else if (code.type == "num" || code.type == "sym" ||code.type == "text") { // a number / symbol
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

// $Id$

// $Id$

var getName = false;
globalThis.mathrxs=[];
globalThis.mathrx = null;
globalThis.moreCalc = 0;
globalThis.mathcounter = 0;
globalThis.definition = false;
globalThis.result = "";
globalThis.fromLook = null;
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
    token.code= this.tk.text;
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
       if((look.type== 'ops'))
       		return new Token('error','This is not correct :-' + look.data);

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

					if ((mathcounter == 0 )&&(args[0].type == "num")) break;
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

                if (i == null) return new Token('error','I don\'t know how to tokenize this');
                if (i.type == "error") return i;
                if (i.type == "eof") {


					if (language=="Gr")
					return new Token('error','για να ορίσεις το '+name+' χρειάζεται τη λέξη τέλος');
					else
					return new Token('error','to '+name+' needs an end');}

                if (i.type == "ops" && i.data == 'to ') return new Token('error','I\'m sorry, you can\'t have nested to\'s');
                if (i.type == "ops" && ((i.data == 'end') || (i.data == 'τελος') || (i.data == 'τέλος')|| (i.data == 'τελοσ')||(i.data == 'τέλοσ'))){  definition = false;
                  break;}

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
