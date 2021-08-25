console.log(gsap);
//scene camera render object mesh
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.z = 2;
camera.position.x = 0.5;
camera.position.y = 0;
camera.lookAt(new THREE.Vector3(0, 0, 0));
 
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".webgl").appendChild(renderer.domElement);
let controls = false; // new THREE.OrbitControls(camera, renderer.domElement);
//controls.enableZoom = true;
//wheel
let posY = 0;
let position = 0;

//images
let textureLoader = new THREE.TextureLoader();
let geometry = new THREE.PlaneGeometry(0.6, 1);
[1, 2, 3, 4].forEach(function (el, ind) {
  let material = new THREE.MeshBasicMaterial({
    map: textureLoader.load(`./img/${el}.png`),
  });

  let img = new THREE.Mesh(geometry, material);
  // img.position.set(1, ind * 1.5);
  img.position.set(Math.random(), ind * -1.9);
  scene.add(img);
});
let objects = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
scene.traverse(function (object) {
  if (object.isMesh) {
    objects.push(object);
  }
});
 
renderer.render(scene, camera);
 

document.addEventListener("mousemove", onMouseMove);
function onMouseMove(e) {
 
  mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}
update(controls, renderer, scene, camera, posY, position, mouse);

function update(controls, renderer, scene, camera, posY, position, mouse) {
  document.addEventListener("wheel", function (e) {
    posY = e.deltaY;
  });

 
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(objects);
 

  for (let interset of intersects) {
    //gsap.to(interset.object.rotation, { x: 1.7, y: 1.7 });
    // gsap.to(interset.object.position, { x: 1.7 });
    gsap.to(interset.object.scale, { x: 1.7, y: 1.7 });
    // interset.object.scale.set(1.1, 1.1);
  }
  for (let object of objects) {
    if (
      !intersects.find(function (inter) {
        return inter.object == object;
      })
    ) {
      gsap.to(object.scale, { x: 1, y: 1 });
      //object.scale.set(1, 1);
    }
  }
  window.addEventListener("mousemove", onMouseMove, false);
  //scroll effect
  posY *= -0.006;
  position += posY;
  camera.position.y = position;

  renderer.render(scene, camera);
  requestAnimationFrame(function () {
    update(controls, renderer, scene, camera, posY, position, mouse);
  });
}
