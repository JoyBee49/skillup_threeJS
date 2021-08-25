function init() {
  //scene camera render object mesh
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 4;
  camera.position.x = 2;
  camera.position.y = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: "Red" });
  let mesh = new THREE.Mesh(geometry, material);
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".webgl").appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = false;
  //dom
  console.log(THREEx);
  let domEvent = new THREEx.DomEvents(camera, renderer.domElement);
  domEvent.addEventListener(
    mesh,
    "mouseover",
    function (event) {
      // alert("clicked");
      material.wireframe = true;
      mesh.scale.set(2.1, 2.1, 2.1);
    },
    false
  );

  scene.add(mesh);
  renderer.render(scene, camera);
  //update function to work with orbit controlls
  update(controls, renderer, scene, camera);
}
init();
function update(controls, renderer, scene, camera) {
  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    update(controls, renderer, scene, camera);
  });
}
