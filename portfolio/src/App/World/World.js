import * as THREE from "three";

import App from "../App.js";
import Physics from "./Physics.js";
import Environment from "./Environment.js";

import { appStateStore } from "../Utils/Store.js";

export default class World {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;

    this.physics = new Physics();
    console.log(this.physics.add);

    // create world classes
    appStateStore.subscribe((state) => {
      if (state.physicsReady) {
        console.log("physics ready");
        this.environment = new Environment();
      }
    });

    this.loop();
  }

  loop(deltaTime, elapsedTime) {
    this.physics.loop();
  }
}
