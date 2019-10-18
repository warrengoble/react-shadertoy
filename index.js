import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  WebGLRenderer,
  OrthographicCamera,
  Scene,
  ShaderMaterial,
  Mesh,
  PlaneBufferGeometry,
  Uniform,
  Vector2,
  TextureLoader
} from "three";

const vertexShader = `
varying vec2 vUv;
void main()	{
	vUv = uv;
	gl_Position = vec4( position, 1.0 );
}
`;

const fragmentPrefix = `
// precision highp float;

uniform float iTime;
uniform float iTimeDelta;
uniform int iFrame;
uniform float iChannelTime[4];
uniform vec3 iChannelResolution[4];
uniform vec4 iMouse;
uniform sampler2D iChannel0;
uniform sampler2D iChannel1;
uniform sampler2D iChannel2;
uniform sampler2D iChannel3;

uniform vec4 iDate;
uniform float iSampleRate;
uniform vec2 iResolution;

varying vec2 vUv;

vec4 texture(sampler2D sampler, vec2 coord) {
  return texture2D(sampler, coord);
}

vec4 texture(sampler2D sampler, vec3 coord) {
  return texture2D(sampler, coord.xy);
}

vec4 texture(sampler2D sampler, vec4 coord) {
  return texture2D(sampler, coord.xy);
}

void mainImage( out vec4, vec2 fragCoord );

void main () {
  vec4 fragOutput;
  mainImage(fragOutput, iResolution * vUv);

  gl_FragColor = fragOutput;
}
`;

export default ({
  width = 500,
  height = 500,
  shader,
  iChannel0,
  iChannel1,
  iChannel2,
  iChannel3
}) => {
  const webGlRef = useRef();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("Mounting");

    const renderer = new WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new Scene();
    const geometry = new PlaneBufferGeometry(2, 2);

    // TODO Handle channnels here.

    // Clean up loader to load from network might do that already?
    const texture = new TextureLoader().load("/static/sky.jpg");

    const uniforms = {
      ...(iChannel0 ? { iChannel0: new Uniform(texture) } : {}),
      iResolution: new Uniform(new Vector2(width, height)),
      iTime: { value: 0 }
    };

    const fragmentShader = `${fragmentPrefix}
      ${shader}`;

    const material = new ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    webGlRef.current.appendChild(renderer.domElement);

    let time = 0;
    const animate = () => {
      uniforms.iTime.value = parseInt(time) / 1000;

      renderer.render(scene, camera);

      time = time + 33; // FIXME Use animationFrame
    };

    // FIXME Handle using animationFrame
    const interval = setInterval(animate, 33); // 30 frames a sec

    return () => {
      // FIXME Use animationFrame
      clearInterval(interval);
    };
  }, []);

  useMemo(() => {
    const { renderer, uniforms } = state;

    if (renderer) {
      renderer.setSize(width, height);

      uniforms.iResolution = {
        value: [parseInt(width), parseInt(height)]
      };
    }
  }, [width, height]);

  return <div ref={webGlRef} />;
};
