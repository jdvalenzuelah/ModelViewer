/*
Universidad del valle de Guatemala
Graficas por computadora
Josue Valenzuela 171001
*/

/* Generamos la escena*/
function getScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    return scene;
}


/* Generamos la camara */
function getCamera() {
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, -20);
    return camera;
 }

/* Genera la luz y agrega referencia de escena y camara*/
function getLight(scene, camera) {

  var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
	scene.add( ambientLight );

	var pointLight = new THREE.PointLight( 0xffffff, 0.6 );
	camera.add( pointLight );
	scene.add( camera );
}

/* Renderer donde se muestra la escena y el canvas que se agrega al html*/
function getRenderer() {
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.querySelector('.canvas-wrapper').appendChild(renderer.domElement);
    return renderer;
}


/*
Agregan los controles a la camara
Se define un maximo y minimo de zoom para que el modelo este visible
*/
function getControls(camera, renderer) {
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableKeys = true;
    controls.zoomSpeed = 0.4;
    controls.panSpeed = 0.4;
    controls.maxDistance = 50;
    controls.minDistance = 10   ;
    controls.maxPolarAngle = 0.9 * Math.PI / 2;
    return controls;
}

/* Carga el archivo .obj*/
function loadOBJ() {
    var loader = new THREE.OBJLoader();
    loader.load( 'LibertStatue.obj', function ( object ) {
      object.position.y = -10;
      scene.add( object );
      document.querySelector('.loader').style.display = 'none';
    } );
  }

/* Render loop */
 function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
    //console.log(camera.position.z);
};

/* Set up de valores para comenzar el render loop */
var scene = getScene();
var camera = getCamera();
var light = getLight(scene, camera);
var renderer = getRenderer();
//console.log(renderer);
var controls = getControls(camera, renderer);

loadOBJ();

render();