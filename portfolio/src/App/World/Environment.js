import * as THREE from "three";

import App from "../App.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;

    this.loadEnvironment();
    this.addMeshes();
  }

  loadEnvironment() {
    // lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
  }
  addMeshes() {
    // const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshStandardMaterial({ color: "#0073ff" });
    // this.cubeMesh = new THREE.Mesh(geometry, material);
    // this.cubeMesh.position.y = 10;
    // this.cubeMesh.rotation.x = 0.3;
    // this.cubeMesh.rotation.z = 0.3;

    // this.scene.add(this.cubeMesh);
    // this.physics.add(this.cubeMesh);
    this.createMeshes(20);
  }
  createMeshes(meshes){
    for (let i = 0; i < meshes; i++) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshStandardMaterial({ color: "#0073ff" });
      const cubeMesh = new THREE.Mesh(geometry, material);
      cubeMesh.position.x = Math.random() - 10 + 10;
      cubeMesh.position.y = Math.random() - 10 + 10;
      cubeMesh.position.z = Math.random() - 10 + 10;

      cubeMesh.rotation.x = 0.3;
      cubeMesh.rotation.z = 0.3;
      this.scene.add(cubeMesh);
      this.physics.add(cubeMesh);
    }
  }
}
