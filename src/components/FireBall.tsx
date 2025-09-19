import { useRef } from "react";
import * as THREE from "three";
import CustomShaderMaterial from 'three-custom-shader-material'
import vertexShader from "@/shaders/vertex.glsl";
import fragmentShader from "@/shaders/fragment.glsl";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
const FireBall = () => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderRef = useRef<any>(null!)
  const {uPrimaryColor,uSecondaryColor,uFresnelPower,uFireBallInensity,uFireBallSpeed} = useControls({
    uPrimaryColor: '#ff7300',
    uSecondaryColor: '#ff3000',
    uFresnelPower: {
        value: 2.0,
        min: 1.0,
        max:10,
        step:1.0
    },
    uFireBallInensity:{
        value: 5.0,
        min:1.0,
        max:10,
        step: 1
    },
    uFireBallSpeed:{
        value: 0.1,
        min: 0.1,
        max:1.0,
        step:0.1
    }
  })
  useFrame((state) => {
    if (shaderRef.current?.uniforms) {
      shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime
    }
  })
    return (
        <mesh position={[0,0,0]}>
            <sphereGeometry args={[1,50,50]}/>
            <CustomShaderMaterial<typeof THREE.MeshStandardMaterial>
                 baseMaterial={THREE.MeshStandardMaterial}
                 ref={shaderRef}
                 vertexShader={vertexShader}
                 fragmentShader={fragmentShader}
                 transparent={true}
                 alphaTest={0.7}
                 uniforms={
                    {
                        uPrimaryColor:{value: new THREE.Color(uPrimaryColor)},
                        uSecondaryColor:{value: new THREE.Color(uSecondaryColor)},
                        uFresnelPower:{value: uFresnelPower},
                        uFireBallInensity:{value: uFireBallInensity},
                        uTime:{value: 0.0},
                        uFireBallSpeed:{value:uFireBallSpeed}
                    }
                 }
                />
        </mesh>
    );
};

export default FireBall;