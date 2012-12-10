// default torus dimensions
var torus = {};
torus.y=20; // height
torus.innerThickness = 4; // thickness
torus.circumference = 90; // Circumfrance
torus.displayHeight = 620; // The Height the torus is displayed on the screen
torus.displayWidth = 620; // The Width the torus is displayed on the screen
torus.container = "torus";

if ( ! Detector.webgl ){ // if no webGL then I pity the fool
  Detector.addGetWebGLMessage();
}

// standard global variables
var container, scene, camera, renderer, controls, stats;
var keyboard = new THREEx.KeyboardState();

// custom global variables
init(torus);
animate();

function init() 
{
  // SCENE
  scene = new THREE.Scene();

  // CAMERA
  var VIEW_ANGLE = 28, ASPECT = torus.displayHeight / torus.displayWidth, NEAR = 0.2, FAR = 20000;
  camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(-120,-140,400);
  camera.lookAt(scene.position);	

  // RENDERER
  renderer = new THREE.WebGLRenderer( {antialias:true} );
  renderer.setSize(torus.displayHeight,torus.displayWidth);
  var torusElement = document.getElementById(torus.container);
  torusContainer = document.createElement( 'div' );
  torusElement.appendChild(torusContainer);
  torusContainer.appendChild(renderer.domElement);
	
  // CONTROLS
  controls = new THREE.TrackballControls( camera );

  // LIGHT #1
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,-250,0);
  scene.add(light);

  // LIGHT #2
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0,-150,0);
  scene.add(light);
	
  // LIGHT #3
  var light = new THREE.PointLight(0xffffff);
  light.position.set(50,100,350);
  scene.add(light);
	
  ////////////
  // CUSTOM //
  ////////////

  var pts = [
   new THREE.Vector3(torus.circumference-torus.innerThickness,0,torus.y), //top left
   new THREE.Vector3(torus.circumference,0,torus.y), //top right
   new THREE.Vector3(torus.circumference,0,-torus.y), //bottom right
   new THREE.Vector3(torus.circumference-torus.innerThickness,0,-torus.y), //bottom left
   new THREE.Vector3(torus.circumference-torus.innerThickness,0,torus.y) //back to top left - close square path
    ];
	
  var mesh = new THREE.Mesh( 
    new THREE.LatheGeometry( pts, 400 ), 
    new THREE.MeshLambertMaterial( { 
      color: 0x5555555,
      wireframe: false, 
      shading: THREE.FlatShading 
    } 
  ));

  mesh.position.y = 0;
  mesh.overdraw = true;
  mesh.doubleSided = true;

  scene.add( mesh );
}

function animate() 
{
    requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
}
