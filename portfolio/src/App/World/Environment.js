import * as THREE from "three";

import App from "../App.js";
import {getRandomHexColor} from "../Utils/Utils.js";
import { getRandomArbitrary } from "../Utils/Utils.js";
import { brightenColor } from "../Utils/Utils.js";

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
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 3);
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
    this.createMeshes(10,'box')
    this.createMeshes(50,'ball')

  }
  createMeshes(meshes, type){
    if(type === "box"){
        for (let i = 0; i < meshes; i++) {
            const geometry = new THREE.BoxGeometry(getRandomArbitrary(1, 2), getRandomArbitrary(1, 2), getRandomArbitrary(1, 2));
            const material = new THREE.MeshPhysicalMaterial({
                 color: getRandomHexColor(),
                 roughness: 0.2, 
            });
            this.cubeMesh = new THREE.Mesh(geometry, material);
            this.cubeMesh.position.x = getRandomArbitrary(-8, 8);
            this.cubeMesh.position.y = getRandomArbitrary(10, 20);
            this.cubeMesh.position.z = getRandomArbitrary(-8, 8);
            this.cubeMesh.userData.type="box"
            this.cubeMesh.scale.setScalar(getRandomArbitrary(0.1, 4));  
      
            this.cubeMesh.rotation.x = getRandomArbitrary(-Math.PI, Math.PI);
            this.cubeMesh.rotation.y = getRandomArbitrary(-Math.PI, Math.PI);
            this.cubeMesh.rotation.z = getRandomArbitrary(-Math.PI, Math.PI);
            this.scene.add(this.cubeMesh);
            this.physics.add(this.cubeMesh);
          }
    }
    if(type === "ball"){
        for (let i = 0; i < meshes; i++) {
            const geometry = new THREE.SphereGeometry(1);
            const material = new THREE.MeshPhysicalMaterial({
                color: brightenColor(getRandomHexColor()),
                // color: 0xffffff,
                roughness: 0.1,
                transparent: true,
                transmission: 1,
                opacity: 1,
                thickness: 0.9,
                ior: 1.5,
                // side: THREE.DoubleSide 
            });
            this.cubeMesh = new THREE.Mesh(geometry, material);
            this.cubeMesh.position.x = getRandomArbitrary(-5, 5);
            this.cubeMesh.position.y = getRandomArbitrary(20, 35);
            this.cubeMesh.position.z = getRandomArbitrary(-5, 5);
            this.cubeMesh.scale.setScalar(getRandomArbitrary(0.5, 2));  
            this.cubeMesh.userData.type="ball"

            this.cubeMesh.rotation.x = getRandomArbitrary(-Math.PI, Math.PI);
            this.cubeMesh.rotation.y = getRandomArbitrary(-Math.PI, Math.PI);
            this.cubeMesh.rotation.z = getRandomArbitrary(-Math.PI, Math.PI);
            this.scene.add(this.cubeMesh);
            this.physics.add(this.cubeMesh);
          }
    }
  }
}
