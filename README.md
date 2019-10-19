## Shadertoy React Component

NOTE: This is still a work in progress and does not fully support all functions of Shadertoy format.

This component is using WebGL and Three.js to create a React component that uses the Shadertoy format.

Only works with Image script at the moment and iChannels work with textures only. Other scripts coming see TODO.

### Usage

#### Installing

NPM package coming. Please install `react` and `react-dom` in main appication because it's not packaged in this library.

Can install directly from Github repo just included the following dependencies in your `package.json` file. Then you can run `npm install`.

```json
"dependencies": {
  "react-shadertoy": "github:warrengoble/react-shadertoy#master",
}
```

#### Code Example

```javascript
import ReactShadertoy from "react-shadertoy";

export default ({ width, height, textureUrl }) => {
  <ReactShadertoy
    width={width}
    height={height}
    shader={imageShaderCode} // This is the Image shader code
    iChannel0={textureUrl0}
    iChannel1={textureUrl1}
    iChannel2={textureUrl2}
    iChannel3={textureUrl3}
  />;
};
```

### TODO

- Create NPM package.
- Other types if iChannels (Input) working such as Buffer, Video, Sound and Cubemap.
- Additional uniforms working such as `iDate`, `iMouse`, `iChannelResolution`, `iChannelTime`, `iTimeDelta` and `iSampleRate`.
- Additional scripts such as `Common`, `Sound`, `Buffer A`, `Buffer B`, `Buffer C`, `Buffer D` and `Cubemap A`.
- GLSL Wrapper should include additional methods such as `textureLOD` etc.
