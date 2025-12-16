	var Turtle3D, camera, controls, deg2rad, getPerpVec, init, parameters, root, run, scene, turtleGeometry;
	  helper = null;
	root = typeof exports !== "undefined" && exports !== null ? exports : this;
  	sceneObjects = [];
	history = [];

  
	deg2rad = function(degrees) {
	  return degrees / 360 * 2 * Math.PI;
	};
  
	getPerpVec = function(vec) {
	  if (vec.z === 0) {
		return new THREE.Vector3(0, 0, 1);
	  } else if (vec.y === 0) {
		return new THREE.Vector3(0, 1, 0);
	  } else {
		return new THREE.Vector3(0, 1, -(vec.y / vec.z));
	  }
	};
  
	turtleGeometry = void 0;
  
	camera = void 0;
  
	controls = void 0;
  
	scene = void 0;
	
	turtleImage = void 0;
   
			function object3D (id, fName, argsNames , argsVal, fId, mesh) {
				this.mesh = mesh;
				this.id = id;
				this.fName = fName;
				this.argsNames = argsNames;
				this.argsValues = argsVal;
				this.fId = fId;
				}	  
  
		function Turtle3D(position, direction, up, mat, width, headDirection, headup) {  
		
		this.start = true;
		this.helper = null;
		this.head = null;
		this.headDirection =headDirection;
		this.headup = headup;
		this.position = position;
		this.direction = direction;
		this.up = up;
		this.material = mat;
		this.width = width;
		this.color= parameters.TURTLE_START_COLOR;
		this.direction.normalize();
		this.up.normalize();
		this.objects = [];
		this.droppings = [];
		this.drawing = true;
		this.visible = true;
	  }
	  
	  
	  
  Turtle3D.prototype.updateHead = function() {
	  
	
	 this.head.lookAt (this.head.position.clone().addSelf( this.direction ) );
				 
		if (this.visible)
			scene.add (this.head);

	  }

		  Turtle3D.prototype.stop = function() {
		this.start = false;
	  };
  
	  /////////////////KINHSEIS TIS XELONAS (GRAPHICS) ///////////////
	  Turtle3D.prototype.go = function(distance) {

		  if (logo.userFunct) {
			  //console.log ("userFunct "  );
			  this.functId = logo.usedFunctions.length-1;
			  var myFunct = logo.usedFunctions [this.functId];
//			  console.log (myFunct);
			
			//console.log (this.startpoint);
			  this.fName = myFunct.name ;
			  this.argsNames = myFunct.funct.args;
			  this.argsValues = myFunct.argsVal;
			  }
			  else {
				  this.fName = "";}
		var newPosition;
		newPosition = new THREE.Vector3();
		newPosition.add(this.position, this.direction.clone().multiplyScalar(distance));
		
		if (this.drawing) {
		  this.droppings.push({
			from: this.position,
			to: newPosition,
			color: this.color,
			material : this.material,
			functId: this.functId,
			functionName: this.fName,
			argsNames: this.argsNames,
			argsValues: this.argsValues,
			width: this.width
		  });
		}
		return this.position = newPosition;
	  };
  
	  Turtle3D.prototype.yaw = function(angle) {
		var rot;

		 
		rot = new THREE.Matrix4().makeRotationAxis( this.up,deg2rad(-angle));
		
		rot.multiplyVector3(this.direction);

		 this.direction.normalize();
		 //console.log (this.direction)
		 rotateOnAxis(this.head,yAxis,deg2rad(-angle));
	
	  };
  
	  Turtle3D.prototype.pitch = function(angle) {
		var right, rot;
		right = new THREE.Vector3().cross(this.direction, this.up).normalize();
		
		rot = new THREE.Matrix4().makeRotationAxis(right, deg2rad(angle));
		rot.multiplyVector3(this.direction);
		this.direction.normalize();

		rot.multiplyVector3(this.up);
		 this.up.normalize();

			 if(!showAxis){
				scene.add(this.helper);
				showAxis = true;
			 }
			  rotateOnAxis(this.head,xAxis,deg2rad(-angle));
			//rotateOnAxis(this.head,rot,deg2rad(angle));
		 
		 
	  };
  
	  Turtle3D.prototype.roll = function(angle) {
		var rot;
		rot = new THREE.Matrix4().makeRotationAxis(this.direction, deg2rad(angle));
		rot.multiplyVector3(this.up);
		 this.up.normalize();

			  if(!showAxis){
				scene.add(this.helper);
				showAxis = true;
			  }
			 rotateOnAxis(this.head,zAxis,deg2rad(angle));
			 
		 
	  };
	
	  Turtle3D.prototype.setx = function (x) {
		   var newPosition;
		newPosition = new THREE.Vector3(x,this.position.y, this.position.z);
		   this.position = newPosition;
		   	this.head.position = this.position;
	  this.helper.position = this.position;
			 // console.log("new pos");
		 // console.log (newPosition);
		  return this.position;
		  }
		  
		  Turtle3D.prototype.sety = function (y) {
		   var newPosition;
		   newPosition = new THREE.Vector3(this.position.x,y, this.position.z);
		   this.position = newPosition;
		   	this.head.position = this.position;
	  this.helper.position = this.position;
		   return this.position;
		  }
		  
		  Turtle3D.prototype.setxy = function (x, y) {
			  var newPosition;
			  newPosition = new THREE.Vector3(x,y, this.position.z);
			  this.position = newPosition;
			  	   	this.head.position = this.position;
	  this.helper.position = this.position;
			  return this.position;			
			  } 
			  
			  
		  Turtle3D.prototype.setz = function (z) {
		   var newPosition;
		newPosition = new THREE.Vector3(this.position.x,this.position.y, z);
		   this.position = newPosition;
		   	   	this.head.position = this.position;
	  this.helper.position = this.position;
		  return this.position;
		  }
  
	  Turtle3D.prototype.setpos = function (x, y, z) {
			  var newPosition;
			  newPosition = new THREE.Vector3(x,y,z);
			  this.position = newPosition;
			  	   	this.head.position = this.position;
	  this.helper.position = this.position;
			  return this.position;			
			  } 
  
    Turtle3D.prototype.getPos = function () {
			  return this.position;			
			  } 
  
  
	  Turtle3D.prototype.gohome = function () {
		 // console.log ("going home")
			  var newPosition;
			  newPosition = new THREE.Vector3(0,0,0);
			  this.position = newPosition;
			  this.head.position = this.position;
	 		 this.helper.position = this.position;
			
			  this.up = parameters.TURTLE_START_UP.clone()
			  this.direction =  parameters.TURTLE_START_DIR.clone()
			    newZ = this.up;
			  newY = this.direction;
			 this.head.quaternion.set (0,0,0,0);
			 
			  this.head.quaternion.copy (startQuat);
		 
			  //this.head.lookAt (this.position.clone().addSelf( this.direction ) );
			
			  } 
			  
			 var _q1 = new THREE.Quaternion();

		function rotateOnAxis( object, axis, angle ) {
					//object.useQuaternion = true;
   				 _q1.setFromAxisAngle( axis, angle );
  				  object.quaternion.multiplySelf( _q1 );

					}   
			  
	  Turtle3D.prototype.penUp = function() {
		return this.drawing = false;
	  };
  
	  Turtle3D.prototype.penDown = function() {
		return this.drawing = true;
	  };
	  
	   Turtle3D.prototype.setVisible = function(visible) {
		return this.visible = visible;
	  };
  
	  Turtle3D.prototype.setWidth = function(width) {
		this.width = width;
	  };
  
	  Turtle3D.prototype.setMaterial = function(material) {
		this.material = material;
	  };
	  
	    Turtle3D.prototype.setDirection = function(newDir) {
		this.direction.copy (newDir);
	  };
	  Turtle3D.prototype.setUp = function(newUp) {
		this.up.copy (newUp);
	  };
  
  
	  Turtle3D.prototype.setColor = function(r, g, b) {
		this.color =  new THREE.Color( rgbToHex (r,g,b) );
		defaultColor = this.color;
	  };
	  
	  
	  	
	  ////// KANEI RETRIEVE TOUS KYLINDROUS POU THA ZWGRAFISOUN TI DIADROMI (dropings) ////

	  
	  Turtle3D.prototype.retrieveMeshes = function() {
		var bottomRadius, distance, from, height, color, mesh, shearFactor, to, topRadius, turtleTransform, width, fName, _i, _len, _ref, _ref1, _results;
		_ref = this.droppings;
		_results = [];
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			
		  _ref1 = _ref[_i], from = _ref1.from, to = _ref1.to, drawCol = _ref1.color, width = _ref1.width, fName = _ref1.functionName, myMat = _ref1.material;
		// console.log (_ref1);
		 distance = from.distanceTo(to);
		  mesh = new THREE.Mesh(turtleGeometry,new THREE.MeshLambertMaterial({
        color: drawCol, ambient: drawCol 
      }));
	
		  bottomRadius = width;
		  topRadius = width;
		  height = distance;
		  shearFactor = (topRadius - bottomRadius) / height;
		  turtleTransform = new THREE.Matrix4();
		  turtleTransform.translate(from);
		  turtleTransform.lookAt(from, to, getPerpVec(to.clone().subSelf(from)));
		
		  turtleTransform.multiplySelf(new THREE.Matrix4(1, shearFactor, 0, 0, 0, 1, 0, 0, 0, shearFactor, 1, 0, 0, 0, 0, 1));
		  turtleTransform.scale(new THREE.Vector3(bottomRadius, bottomRadius, height));
		  mesh.applyMatrix(turtleTransform);
		  myTurtle.objects.push(mesh);
			
			var newObj = new object3D (mesh.id, fName, _ref1.argsNames, _ref1.argsValues, _ref1.functId, mesh);
			sceneObjects.push(newObj);
		  _results.push(mesh);
		}
		return _results;
	  };
	  //////

	
  
	init_turtle = function () {
 		 turtleMaterial = new THREE.MeshLambertMaterial({
   		   color: parameters.TURTLE_START_COLOR,
			  ambient : parameters.TURTLE_START_COLOR
  		  });
		  	defaultColor = parameters.TURTLE_START_COLOR;
		myTurtle = new Turtle3D(parameters.TURTLE_START_POS.clone(), parameters.TURTLE_START_DIR.clone(), parameters.TURTLE_START_UP.clone(), turtleMaterial, parameters.TURTLE_START_WIDTH,  new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 1, 0));    //NEA XELWNA
	//	turtleImage = new THREE.CylinderGeometry(0, 10, 40, 50, 50, false);
	//	turtleImage = new THREE.SphereGeometry(15, 15, 15);
	/*turtleImage.materials = [new THREE.MeshBasicMaterial( { map: THREE.ImageUtils.loadTexture( 'turtle/yellow2.jpg' ), overdraw: true, map: THREE.ImageUtils.loadTexture( 'turtle/red3.jpg' ), overdraw: true} )];
	 for(var z = 0; z< turtleImage.faces.length; z++)
                    if(turtleImage.faces[z] instanceof THREE.Face3)
                        turtleImage.faces[z].materialIndex = 1;
                    else
                        turtleImage.faces[z].materialIndex = 0;


                mesh = new THREE.Mesh( turtleImage, new THREE.MeshFaceMaterial() );*/
 
//mesh = new THREE.Mesh( turtleImage, material ) ;
	/*var turtlematerial = new THREE.MeshBasicMaterial( {map: THREE.ImageUtils.loadTexture('turtle/red3.jpg'), overdraw: true  });
		mesh = new THREE.Mesh(turtleImage, turtlematerial); 
		mesh.flipSided = true;
		mesh.position = myTurtle.position;	
			mesh.rotation = new THREE.Vector3(0, 1, 0);
		
		myTurtle.head = mesh;
		myTurtle.head.rotationAutoUpdate;
					scene.add( myTurtle.head  ); */
			
		///////////////////////// 	OBJECT LOADER ////////////////////////

		//var texture = THREE.ImageUtils.loadTexture( "turtle/yellowColor.jpg" );
		
/* dirLight = new THREE.DirectionalLight(parameters.DIR_LIGHT_COLOR);
    dirLight.position = parameters.DIR_LIGHT_POS.clone();
    dirLight.target.position = parameters.DIR_LIGHT_TARGET.clone();
    scene.add(dirLight);
	pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.y = 150;
    pointLight.position.z = 200;
	scene.add (pointLight);*/
   ambLight = new THREE.AmbientLight(parameters.AMB_LIGHT_COLOR);
  scene.add(ambLight);	
var texture = THREE.ImageUtils.loadTexture( 'turtle/Feather-Free-Texture.jpg' );
				var loader = new THREE.OBJLoader();
			//var loader = new THREE.ObjectLoader();
	/*	var loader = new THREE.ColladaLoader();
		loader.options.convertUpAxis = true;
			loader.load( 'untitled-scene.dae', function colladaReady( collada ) {

				dae = collada.scene;
				skin = collada.skins[ 0 ];

				dae.scale.x = dae.scale.y = dae.scale.z = 50;
				dae.updateMatrix();

				//init();
				

			} );*/
				loader.load( "turtle/bird.obj", function ( object) {
					
					var material2 = new THREE.MeshLambertMaterial({ color: 0x996600, ambient:  0x996600,});
						
					for ( var i = 0, l = object.children.length; i < l; i ++ ) {

						//object.children[ i ].material= material2;
						object.children[ i ].material.map = texture;
						//object.children[ i ].castShadow = true;
						object.children[ i ].receiveShadow = true;


					}
					
					object.position = myTurtle.position;		
					object.scale.x = 0.7;
                  object.scale.y = 0.7;
                object.scale.z = 0.7;
	
					xAxis = new THREE.Vector3 (1,0,0);
					yAxis = new THREE.Vector3 (0,1,0);
					zAxis = new THREE.Vector3 (0,0,1);
					myTurtle.head = object;
					scene.add( myTurtle.head );
					myTurtle.head.useQuaternion = true;
					rotateOnAxis (myTurtle.head , xAxis, deg2rad(-90));
					 rotateOnAxis (myTurtle.head , zAxis, deg2rad(-180));
					  startQuat = myTurtle.head.quaternion.clone();
	
				} );
				
		
		myTurtle.helper = new THREE.AxisHelper();
		newZ = myTurtle.up;
	 	newX = myTurtle.direction;
	 	newY = new THREE.Vector3().cross(newX, newZ);
	 // 	rotationMatrix = new THREE.Matrix4(newX.x, newY.x, newZ.x, 0, newX.y, newY.y, newZ.y, 0, newX.z, newY.z, newZ.z, 0, 0, 0, 0, 1);
	//  myTurtle.helper.applyMatrix(rotationMatrix);
	  myTurtle.helper.position = myTurtle.position;
	  
		return myTurtle;
		}
	
	reset_turtle = function (myTurtle) {
		myTurtle.gohome();
		myTurtle.objects = [];

		}
		
  draw_graphics = function (myTurtle) {
	  if(myTurtle.start){
		var ambLight, centroid, dirLight, helper, material, mesh, meshes,  newX, newY, newZ, rotationMatrix, _i, _j, _len, _len1;
		  meshes = myTurtle.retrieveMeshes(); ///RETRIEVE MESHES///
	  	for (_i = 0, _len = meshes.length; _i < _len; _i++) {
	  
				mesh = meshes[_i];
				
				scene.add(mesh);
	  }  
	  projector = new THREE.Projector();
		
	
	// 
	if (_len > 0 )
		//myTurtle.updateHead();
		//alert ("la");
	myTurtle.head.position = myTurtle.position;
	//myTurtle.head.rotation.normalize();
		 //scene.add(myTurtle.head);
		 //myTurtle.updateHead();
	  myTurtle.helper.position = myTurtle.position;
	  
	 /// scene.add(myTurtle.helper);
	  
	  centroid = new THREE.Vector3();
	  for (_j = 0, _len1 = meshes.length; _j < _len1; _j++) {
		mesh = meshes[_j];
		centroid.addSelf(mesh.position);
	  }
	  
	  centroid.divideScalar(meshes.length);
	 // camera.position = new THREE.Vector3(0, 0, parameters.CAMERA_DISTANCE).addSelf(centroid);
	  controls.center = centroid;
  
	  //console.log ("here is:");
	// // console.log (myTurtle.position);
	 
	  
	  }
		 myTurtle.droppings = [];
		// myTurtle.head.rotation.normalize();
			}
			
	  
			
			function componentToHex(c) {
	  var hex = c.toString(16);
	  return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
	  return "0x" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  
 
