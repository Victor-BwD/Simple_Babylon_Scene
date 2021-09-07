import React from 'react';
import { FreeCamera, Vector3, HemisphericLight, MeshBuilder } from '@babylonjs/core';
import SceneComponent from 'babylonjs-hook';
import './App.css';

let box, ground;

const GROUND_SIZE = 21;
const BOXES_SIZE = 2;

function Movement(camera){
  camera.keysUp.push(87);
  camera.keysLeft.push(65);
  camera.keysDown.push(83);
  camera.keysRight.push(68);
}

function MakeCameraCollision(camera, scene){
  scene.gravity = new Vector3(0, -0.15, 0);
  camera.applyGravity = true;
  camera.ellipsoid = new Vector3(1, 1, 1);
  scene.collisionsEnabled = true;
  camera.checkCollisions = true;
}

const onSceneReady = scene => {
  // This creates and positions a free camera (non-mesh)
  var camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());

  const canvas = scene.getEngine().getRenderingCanvas();

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);
  
  MakeCameraCollision(camera, scene);

  Movement(camera);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'box' shape.
  box = MeshBuilder.CreateBox("box", {size: BOXES_SIZE}, scene);

  // Move the box upward 1/2 its height
  box.position.y = 1;
  box.checkCollisions = true; // Collision box

  // Our built-in 'ground' shape.
  ground = MeshBuilder.CreateGround("ground", {width: GROUND_SIZE, height: GROUND_SIZE}, scene);
  ground.checkCollisions = true; // Collision Ground
  

  
}

/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = scene => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();

    const rpm = 10;
    box.rotation.y += ((rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000));
  }
}

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <SceneComponent antialias onSceneReady={onSceneReady} onRender={onRender} id='my-canvas' />
      </header>
    </div>
  );
}

export default App;
