function init() {
  //scene camera render object mesh
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 9;
  camera.position.x = 2;
  camera.position.y = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let geometry = new THREE.TorusGeometry(2, 0.5, 16, 90);
  
  let material = new THREE.PointsMaterial({ size: 0.005 });
  let materialTwo = new THREE.PointsMaterial({ size: 0.005, color: "blue" });
  material.wireframe = true;
  let mesh = new THREE.Points(geometry, material);
  let renderer = new THREE.WebGLRenderer({ alpha: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".webgl").appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1;

  //buffer
  let planeBuffer = new THREE.BufferGeometry();
  let particleCount = 5000;
  let positionArray = new Float32Array(particleCount * 3); // 3= x y z
  for (let i = 0; i < particleCount * 3; i++) {

    positionArray[i] = (Math.random() - 0.5) * 10; //increase the sixe
  }
  planeBuffer.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  let planeparticle = new THREE.Points(planeBuffer, materialTwo);
  scene.add(planeparticle);

  scene.add(mesh);
  renderer.render(scene, camera);
  //update function to work with orbit controlls
  let clock = new THREE.Clock();
  update(controls, renderer, scene, camera, planeparticle, clock);
}
//mousemove
let mouseY = 0,
  mouseX = 0;
document.addEventListener("mousemove", function (e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log(mouseY);
});
init();
function update(controls, renderer, scene, camera, planeparticle, clock) {
  let elapseTime = clock.getElapsedTime();
  //planeparticle.rotation.y -= 0.002;
  planeparticle.rotation.x = mouseY * (elapseTime * 0.0008);
  planeparticle.rotation.y = mouseX * (elapseTime * 0.0008);

  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(function () {
    update(controls, renderer, scene, camera, planeparticle, clock);
  });
}
