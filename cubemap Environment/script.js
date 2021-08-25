function init() {
  let geometry = new THREE.BoxGeometry(8, 8, 8);
  //Materials
  //loading the map images
  let loader = new THREE.TextureLoader();
  let texture_1 = loader.load("img/posx.jpg");
  let texture_2 = loader.load("img/negx.jpg");
  let texture_3 = loader.load("img/posy.jpg");
  let texture_4 = loader.load("img/negy.jpg");
  let texture_5 = loader.load("img/posz.jpg");
  let texture_6 = loader.load("img/negz.jpg");

//creating materials from the images 
  let material_1 = new THREE.MeshBasicMaterial({ map: texture_1 });
  let material_2 = new THREE.MeshBasicMaterial({ map: texture_2 });
  let material_3 = new THREE.MeshBasicMaterial({ map: texture_3 });
  let material_4 = new THREE.MeshBasicMaterial({ map: texture_4 });
  let material_5 = new THREE.MeshBasicMaterial({ map: texture_5 });
  let material_6 = new THREE.MeshBasicMaterial({ map: texture_6 });
  material_1.side = THREE.BackSide;
  
  let materials = [
    material_1,
    material_2,
    material_3,
    material_4,
    material_5,
    material_6,
  ];

  materials.forEach(function (ele) {
    ele.side = THREE.BackSide;
  });

  let mesh = new THREE.Mesh(geometry, materials);
  let renderer = new THREE.WebGLRenderer();
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  //camera position
  camera.position.z = 4;
  camera.position.x = 2;
  camera.position.y = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  //initializing orbit controlls
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  let ambient = new THREE.AmbientLight(0x555555, 2);
  let directionlight = new THREE.DirectionalLight(0xffeedd, 2);
  directionlight.position.z = 1;

 
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".webgl").appendChild(renderer.domElement);
  controls.enableZoom = true;
  controls.maxDistance = 8.3;
  controls.minDistance = 6;

  //adding to scene
  scene.add(mesh);
  scene.add(ambient);
  scene.add(directionlight);

  //initializing the renderer
  renderer.render(scene, camera);
  update(controls, renderer, scene, camera);
}
//initializing the code
init();

function update(controls, renderer, scene, camera) {
  renderer.render(scene, camera);

  requestAnimationFrame(function () {
    update(controls, renderer, scene, camera);
  });
}
