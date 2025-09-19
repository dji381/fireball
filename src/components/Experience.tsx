import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import FireBall from "./FireBall";

const Experience = () => {
  return (
    <>
      <ambientLight intensity={2}/>
      <OrbitControls />
      <FireBall/>
      <EffectComposer>
        <Bloom
          intensity={1.5}   // puissance du glow
          luminanceThreshold={0.2} // seuil min pour déclencher le bloom
          luminanceSmoothing={0.9} // douceur de la transition
        />
      </EffectComposer>
    </>
  );
};

export default Experience;