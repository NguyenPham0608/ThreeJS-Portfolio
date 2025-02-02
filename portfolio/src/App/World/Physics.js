import * as THREE from "three";
import App from "../App.js";
import RAPIER from "@dimforge/rapier3d";
import { appStateStore } from "../Utils/Store.js";

export default class Physics {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.meshMap = new Map();


    import("@dimforge/rapier3d").then((RAPIER) => {
      const gravity = { x: 0, y: -19, z: 0 };
      this.world = new RAPIER.World(gravity);
      this.rapier=RAPIER

      // THREE

      const groundGeometry = new THREE.BoxGeometry(100, 1, 100);
      const groundMaterial = new THREE.MeshPhongMaterial({
        color: "#ffffff",
        shininess: 100,
      });
      this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      this.scene.add(this.groundMesh);
      const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
      this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);
      const groundColliderType = RAPIER.ColliderDesc.cuboid(50, 0.5, 50);
      this.world.createCollider(groundColliderType, this.groundRigidBody);

      this.rapierLoaded = true;
      appStateStore.setState({ physicsReady: true });
    });
  }

  add(mesh) {
    const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
    this.rigidBody = this.world.createRigidBody(rigidBodyType);
    this.rigidBody.setTranslation(mesh.position);
    this.rigidBody.setRotation(mesh.quaternion);

    const dimensions=this.computeCuboidDimensions(mesh)
    let colliderType
    if(mesh.userData.type =='box'){
        colliderType = this.rapier.ColliderDesc.cuboid(
            dimensions.x/2,
            dimensions.y/2,
            dimensions.z/2
        );
    } else if(mesh.userData.type=='ball'){
        colliderType = this.rapier.ColliderDesc.ball(
            dimensions.x/2
        );
    }
    colliderType.setRestitution(0.9);
    this.world.createCollider(colliderType, this.rigidBody);
    this.meshMap.set(mesh, this.rigidBody);
  }

  computeCuboidDimensions(mesh) {
    mesh.geometry.computeBoundingBox();
    const size=mesh.geometry.boundingBox.getSize(new THREE.Vector3());
    const worldScale=mesh.getWorldScale(new THREE.Vector3());
    size.multiply(worldScale);
    return size;
  }

  loop() {
    if (!this.rapierLoaded) return;
    this.world.step();
    this.meshMap.forEach((rigidBody, mesh) => {
        const position = rigidBody.translation()
        const rotation = rigidBody.rotation()

        mesh.quaternion.copy(rotation)
        mesh.position.copy(position)
    })

  }
}
