import * as THREE from "three";

import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import { TWEEN } from 'https://unpkg.com/three@0.139.0/examples/jsm/libs/tween.module.min.js';

var container;
var camera,scene, renderer, controls;
var tiemp,timeFactor = Math.random() * Math.PI * 2;
var cube,cube2;
var model,model1,model2,model3,model4;





init();
animate();
hacerlogo();


function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
  );
  camera.position.z = 30;

  // scene
  scene = new THREE.Scene();

  var pointLight = new THREE.PointLight(0xffffff, 1);
  
  
  camera.add(pointLight);
  scene.add(camera);



  // manager
  function loadModel(gltf) {
    //gltf.scene contiene el modelo
   
    var texture = new THREE.CanvasTexture(canvas);
    gltf.scene.position.y = -10;
    gltf.scene.scale.set(5, 5, 5);
    gltf.scene.name="tele";
    gltf.scene.traverse(function (node) {
      //Cylinder_Screen_0 es el nodo de la pantalla
      if (node.isMesh && node.name == "Cylinder_Screen_0") {  //nodo de la  pantalla de modlo 3d
        node.material.map = texture;
      }
    });
    scene.add(gltf.scene);
  }

  function onProgress(xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log("model " + Math.round(percentComplete, 2) + "% downloaded");
    }
  }

  function onError() {
    console.log("An error happened");
  }

  const loader = new GLTFLoader();


  loader.load("./models/tv.glb", loadModel, onProgress, onError);

/*seta con alas que gira*/
loader.load("./models/paragoomba_super_mario_bros.glb",
  function (gltf) {
    model = gltf.scene;
    model.position.set(-60, 10, 25);
    model.scale.set(0.2, 0.2, 0.2);
    scene.add(model);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(err) {
    console.error(err);
  }
);

/*moneda*/
loader.load("./models/super_mario_bros_coin.glb",
  function (gltf) {
    model1 = gltf.scene;
    model1.position.set(60, 20, 30);
    model1.scale.set(20, 20, 20);
    scene.add(model1);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(err) {
    console.error(err);
  }
);

/*seta roja*/
loader.load("./models/mushroom_mario.glb",
  function (gltf) {


    model2 = gltf.scene;
    model2.position.set(40, 10, 10);
    model2.scale.set(10, 10, 10);
    scene.add(model2);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(err) {
    console.error(err);
  }
);
/*tubería*/
loader.load("./models/mario_pipe.glb",
  function (gltf) {


    model3 = gltf.scene;
    model3.position.set(-50,-10, 20);
    model3.scale.set(0.5, 0.5, 0.5);
    scene.add(model3);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(err) {
    console.error(err);
  }
);

/*mario*/
loader.load("./models/super_mario.glb",

    function (gltf) {
      model4 = gltf.scene;
      model4.position.set(-40,22, 10);
      model4.scale.set(0.15, 0.15, 0.15);
      model4.name="mario";
      scene.add(model4);
  
      // Agrega userData para controlar el clic en el modelo
      model4.userData.onClick = function() {

        if (img.complete) {
          changeTexture();
          dibujaCanvas();
        }

    }
    },
    function(xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function(err) {
      console.error(err);
    }
  
);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  controls = new TrackballControls(camera, renderer.domElement);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.2;

  window.addEventListener("resize", onWindowResize, false);
}

/*movimiento seta que gira con alas*/
function moveModelInCircle(radius, speed, time) {
  const x = radius * Math.cos(time * speed);
  const z = radius * Math.sin(time * speed);

  if (model) {
    model.position.set(x, 10, z);
}
}
/*posicion y movimiento moneda*/
function updateCoinPosition(model1) {
  if (model1) {
    timeFactor += 0.01;
    model1.rotation.y += 0.01;
  tiemp++;
    }

}
function updateCoinPosition1(model1){
if (model1) {

      model1.position.set(60,40,-3.5);
    
}
}
/*seta roja animación*/
function animateModelPosition() {
  if(model2){
  const startPosition = { x: model2.position.x, y: model2.position.y, z: model2.position.z };
  const endPosition = { x: 40, y: 40, z: 10 };
 
  const tween = new TWEEN.Tween(startPosition)
  
    .to(endPosition, 5000) 
    .easing(TWEEN.Easing.Quadratic.Out) 
    .onUpdate(() => {
     
      model2.position.set(startPosition.x, startPosition.y, startPosition.z);
    
    })
    .start();
  }
}
/*mario animación*/
function animateMarioPosition() {

  var mario = scene.getObjectByName("mario");
    const tween = new TWEEN.Tween(mario.position)
      .to({x: -40, y: -60, z: 10}, 4000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onStart(()=>{

      })
        .start();
}




/*crear canvas*/
var canvas = document.createElement('canvas');
canvas.id = 'myCanvas';
var ctx = canvas.getContext('2d'); 

var img = new Image();

img.onload = function() { 
 
  ctx.drawImage(img, 0, 0,img.width / 2.2,img.height / 2.2);
};
img.src = "textures/arcoiris.jpg";

/*cambio imagen canvas al hacer click sobre model4, mario*/
function changeTexture() {
  
  var img = new Image();
  img.onload = function() {
    // Dibuja la nueva imagen en el canvas
    ctx.drawImage(img, 0, 0, img.width / 2.3, img.height / 2.3);

    var texturecanvas = new THREE.Texture(canvas);
    texturecanvas.needsUpdate = true; // poner nueva imagen

    var tele = scene.getObjectByName("tele");
    tele.traverse(function (node) {
     
      if (node.isMesh && node.name == "Cylinder_Screen_0") {
        node.material.map = texturecanvas;
      }
    });


    setTimeout(clearCanvas, 3000);
};
img.src = "textures/peli.jpg";
}
/*limipiar para dibujar animación en canvas*/
  function clearCanvas() {
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  
  var texturecanvas = new THREE.Texture(canvas);
  texturecanvas.needsUpdate = true;


  var tele = scene.getObjectByName("tele");
  tele.traverse(function (node) {
    if (node.isMesh && node.name == "Cylinder_Screen_0") {
      node.material.map = texturecanvas;
    }
  });

  // crear la bola
  var pelota = {
    x: canvas.width/4,
    y: canvas.height/4
  }

  var bola = new TWEEN.Tween(pelota)

    .to({ y: canvas.height/4 + 50 }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .repeat(10)
    .yoyo(true)
    
    .onUpdate(function() {
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();

      ctx.fillStyle = 'green';

      ctx.arc(pelota.x, pelota.y, 50, 0, 2 * Math.PI);
      
      ctx.fill();
     
      var texturecanvas = new THREE.Texture(canvas);
      texturecanvas.needsUpdate = true;

      var tele = scene.getObjectByName("tele");
      tele.traverse(function (node) {
        if (node.isMesh && node.name == "Cylinder_Screen_0") {
          node.material.map = texturecanvas;
        }
      });
    })
    .onComplete(function() {
     
      clearCanvas();
    })
    .start();
}

var mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(mouse, camera);

/*coger posición del ratón*/
function handleClick(event) {

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
 

  // Actualiza el origen del raycaster  la posición del ratón
  raycaster.setFromCamera(mouse, camera);
  
  var mario1 = scene.getObjectByName("mario");
  const intersects = raycaster.intersectObjects(mario1.children);


  // Si se hizo clic en el modelo, cambia la textura
 if(intersects.length > 0 ) {
  animateMarioPosition();
  changeTexture();
  
  };
}
     
window.addEventListener('click', handleClick);

/*cubo con textura*/
const textureLoader1 = new THREE.TextureLoader();
const texture1 = textureLoader1.load('textures/cube.jpg');
const material1 = new THREE.MeshStandardMaterial({ map: texture1 });
const geometry1 = new THREE.BoxGeometry(10, 10, 10);

cube = new THREE.Mesh(geometry1, material1);
cube.position.set(40, 10, 10);
scene.add(cube);

const lightMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  emissive: 0xffff00, // Color amarillo brillante
  // Intensidad del color emitido
});

/*bola amarilla de luz*/
const light = new THREE.AmbientLight(0xffff66, 0.5);
light.add(new THREE.Mesh(new THREE.SphereGeometry(3), lightMaterial));
light.position.set(20, 80, -40);
scene.add(light);


/*cubo tween*/
var geometry2 = new THREE.BoxGeometry(10, 10, 10);
const textureLoader2 = new THREE.TextureLoader();
const texture2 = textureLoader1.load('textures/ladrillo.jpg');
const material2 = new THREE.MeshStandardMaterial({ map: texture2 });
var cube2 = new THREE.Mesh(geometry2, material2);

cube2.position.set(60,20,-3.5);
scene.add(cube2);


/*logo mario super*/
function hacerlogo(){

var textureLoader3 =new THREE.TextureLoader();
const  texture3= textureLoader3.load('textures/logo.png');
 
var geometry3 = new THREE.PlaneGeometry(100, 100, 100);
const material3 = new THREE.MeshStandardMaterial({ map: texture3 , side: THREE.DoubleSide, transparent :true});
var logo = new THREE.Mesh(geometry3, material3);
logo.position.y =40;
logo.position.x= 10;
logo.position.z = -100;
scene.add(logo);

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  const time = Date.now() * 0.001;

  moveModelInCircle(10, 0.5, time);
  
  updateCoinPosition(model1);
  updateCoinPosition1(model1);
  animateModelPosition();
  render();
  TWEEN.update();
  
  
}

animate();


function render() {

 renderer.render(scene, camera)

}

/*skybox*/
const loader = new THREE.CubeTextureLoader();
loader.setPath('textures/');
const texture = loader.load([
  'skybox.jpg',
  'skybox.jpg',
  'skybox.jpg',
  'skybox.jpg',
  'skybox.jpg',
  'skybox.jpg'
]);
texture.generateMipmaps = false; // desactivar la generación de mipmaps
texture.magFilter = THREE.LinearFilter; // establecer el filtro de magnificación de textura
texture.minFilter = THREE.LinearFilter; // establecer el filtro de minificación de textura
const material = new THREE.MeshBasicMaterial({
  envMap: texture,
  side: THREE.DoubleSide // opcional, establece el lado visible de la geometría
});
const geometry = new THREE.BoxGeometry(1000, 1000, 1000);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/*suelo*/
var floorTexture = new THREE.TextureLoader().load( "textures/suelo.jpg");
floorTexture.wrapS = THREE.ClampToEdgeWrapping;
floorTexture.wrapT = THREE.ClampToEdgeWrapping;
floorTexture.repeat.set( 100 );
var floorMaterial = new THREE.MeshStandardMaterial( { map: floorTexture, side: THREE.DoubleSide } );
var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 1000, 1000);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -10;
floor.rotation.x = Math.PI / 2;
scene.add(floor);
