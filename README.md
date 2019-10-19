## Shadertoy React Component

NOTE: This is still a work in progress and oes not fully support all functions of Shadertoy format.

This component using WebGL and Three.js to create a React component that uses the Shadertoy format.

Only works with `Image` script at the moment. Other scripts coming see TODO.

### Usage

#### Installing

Can install directly from Github repo. NPM package coming. `React` is also required to be installed.

```bash
npm install git@github.com:warrengoble/react-shadertoy.git
```

#### Code Example

```javascript
import ReactShadertoy from "react-shadertoy";

export default ({ width, height, textureUrl }) => {
  <ReactShadertoy
    width={width}
    height={height}
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
