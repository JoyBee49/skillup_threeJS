function init() {
  //scene camera render object mesh
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 60;
  camera.position.x = 2;
  camera.position.y = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({ color: "Red" });
  let mesh = new THREE.Mesh(geometry, material);
  let renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.querySelector(".webgl").appendChild(renderer.domElement);
  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  let fontLoader = new THREE.FontLoader();
  fontLoader.load("font.json", function (font) {
    let geometrySetting = {
      font: font,
      size: 40,
      height: 5,
      curveSegments: 20,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 0.5,
      bevelSegments: 20,
    };
    let textGeoGame = new THREE.TextGeometry("GAME", geometrySetting);
    let textGeoStop = new THREE.TextGeometry("STOP", geometrySetting);

    let textMatGame = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    let textMatStop = new THREE.MeshBasicMaterial({ color: 0xce2121 });

    let textGame = new THREE.Mesh(textGeoGame, textMatGame);
    let textStop = new THREE.Mesh(textGeoStop, textMatStop);

    textGame.position.set(-100, 0, 20);
    textStop.position.set(30, 0, 20);

    scene.add(textGame);
    scene.add(textStop);
  });

  //scene.add(mesh);
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
