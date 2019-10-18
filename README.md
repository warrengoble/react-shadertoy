## Shadertoy React Component

This component using WebGL and Three.js to create a React component that uses the Shadertoy format.

### Usage

#### Installing

Can install directly from Github repo. NPM package coming. `React` is also required to be installed.

```bash
npm install git@github.com:warrengoble/react-shadertoy.git
```

#### Code Example

```javascript
import ReactShadertoy from "react-shadertoy";

export default ({ width, height }) => {
  <ReactShadertoy width={width} height={height} />;
};
```

### TODO

- Create npm package
- Get other types working such as Buffer, Video, and Cubemap
-
