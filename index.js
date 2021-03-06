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
  const [{ renderer, uniforms }, setMount] = useState({});

  useEffect(() => {
    const renderer = new WebGLRenderer({ antialias: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new Scene();
    const geometry = new PlaneBufferGeometry(2, 2);

    // TODO Handle channnels here.
    const uniforms = {
      ...(iChannel0
        ? { iChannel0: new Uniform(new TextureLoader().load(iChannel0)) }
        : {}),
      ...(iChannel1
        ? { iChannel1: new Uniform(new TextureLoader().load(iChannel1)) }
        : {}),
      ...(iChannel2
        ? { iChannel2: new Uniform(new TextureLoader().load(iChannel2)) }
        : {}),
      ...(iChannel3
        ? { iChannel3: new Uniform(new TextureLoader().load(iChannel3)) }
        : {}),
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

    let renderFrame = true;
    const animate = time => {
      renderFrame && requestAnimationFrame(animate);
      uniforms.iTime.value = parseInt(time) / 1000;

      renderer.render(scene, camera);
    };

    setMount({ renderer, uniforms });

    requestAnimationFrame(animate);

    return () => {
      renderFrame = false;
    };
  }, []);

  useMemo(() => {
    if (renderer) {
      renderer.setSize(width, height);
      uniforms.iResolution = {
        value: [parseInt(width), parseInt(height)]
      };
    }
  }, [width, height]);

  return <div ref={webGlRef} />;
};
