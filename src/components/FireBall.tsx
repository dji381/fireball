import { useRef } from "react";
import * as THREE from "three";
import CustomShaderMaterial from "three-custom-shader-material";
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
const FireBall = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderRef = useRef<any>(null!);
  const texture = useTexture('/texture/vfx2.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.minFilter = THREE.NearestFilter
  const {
    uPrimaryColor,
    uSecondaryColor,
    uRayColor,
    uFresnelPower,
    uFireBallInensity,
    uFireBallSpeed,
    uFireBallRay,
    uRayThickness
   
  } = useControls({
    uPrimaryColor: "#ff7300",
    uSecondaryColor: "#ff3000",
    uRayColor: "#ba1d01",
    uFresnelPower: {
      value: 2.0,
      min: 1.0,
      max: 10,
      step: 1.0,
    },
    uFireBallInensity: {
      value: 5.0,
      min: 1.0,
      max: 10,
      step: 1,
    },
    uFireBallSpeed: {
      value: 0.6,
      min: 0.1,
      max: 1.0,
      step: 0.1,
    },
    uFireBallRay: {
      value: 0.7,
      min: 0.1,
      max: 1.0,
      step: 0.1,
    },
    uRayThickness: {
      value: 0.7,
      min: 0.1,
      max: 1.0,
      step: 0.1,
    },
  });
  useFrame((state) => {
    if (shaderRef.current?.uniforms) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1, 50, 50]} />
      <CustomShaderMaterial<typeof THREE.MeshStandardMaterial>
        baseMaterial={THREE.MeshStandardMaterial}
        ref={shaderRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={true}
        alphaTest={0.3}
        uniforms={{
          uPrimaryColor: { value: new THREE.Color(uPrimaryColor) },
          uSecondaryColor: { value: new THREE.Color(uSecondaryColor) },
          uRayColor:{value: new THREE.Color(uRayColor) },
          uFresnelPower: { value: uFresnelPower },
          uFireBallInensity: { value: uFireBallInensity },
          uTime: { value: 0.0 },
          uFireBallSpeed: { value: uFireBallSpeed },
          uFireBallRay:{value:uFireBallRay},
          uRayThickness:{value: uRayThickness},
          uTexture:{value:texture}
        }}
      />
    </mesh>
  );
};

export default FireBall;
