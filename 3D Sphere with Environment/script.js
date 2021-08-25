function init() {
  //scene camera render object mesh
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  //renderer
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".webgl").appendChild(renderer.domElement);
  camera.position.z = 4;
  camera.position.x = 2;
  camera.position.y = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  //REFLECTION SET UP
  const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128, {
    format: THREE.RGBFormat,
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter,
  });
  let cubeCamera = new THREE.CubeCamera(1, 1000, cubeRenderTarget);
  scene.add(cubeCamera);
  //object
  let geometry = new THREE.SphereGeometry(1, 32, 32);
  let material = new THREE.MeshBasicMaterial({ color: "white" });
  material.envMap = cubeCamera.renderTarget;
  let mesh = new THREE.Mesh(geometry, material);
  //environment setup
  let loader = new THREE.CubeTextureLoader();
  let url = [
    "img/posx.jpg",
    "img/negx.jpg",
    "img/posy.jpg",
    "img/negy.jpg",
    "img/posz.jpg",
    "img/negz.jpg",
  ];
  scene.background = loader.load(url);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  scene.add(mesh);
  renderer.render(scene, camera);
  //update function to work with orbit controlls
  update(controls, renderer, scene, camera, cubeCamera);
}
init();
function update(controls, renderer, scene, camera, cubeCamera) {
  renderer.render(scene, camera);
  cubeCamera.updateCubeMap(renderer, scene);
  requestAnimationFrame(function () {
    update(controls, renderer, scene, camera, cubeCamera);
  });
}
