#include "../../lygia/generative/pnoise.glsl"

varying vec2 vUvs;
uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform vec3 uRayColor;
uniform float uFresnelPower;
uniform float uFireBallInensity;
uniform float uFireBallSpeed;
uniform float uTime;
uniform float uFireBallRay;
uniform float uRayThickness;
uniform sampler2D uTexture;
varying vec3 vNormals;
varying vec3 vPosition;

float saturateFloat(float x) {
    return clamp(x, 0.0, 1.0);
}
float fresnel(float amount, vec3 normal, vec3 view){
	return pow(
		1.0 - clamp(dot(normalize(normal), normalize(view)), 0.0, 1.0),
		amount
	);
}
void main() {  
    vec3 viewDir = normalize(cameraPosition - vPosition);
    vec3 normals = normalize(vNormals);
    float d = pnoise(vec3(vUvs * 10.0, uTime * 0.7),vec3(2.0,2.0,2.0)) * 0.5 + 0.5;
    d = saturateFloat(d);
    //Texture
    vec2 uvs = fract(vec2(vUvs.x * 2.0 + uTime * uFireBallSpeed, vUvs.y * 2.0) + d * 0.1 + vec2(0.0,abs(sin(d) * 0.1)) );
    vec3 texel = texture2D(uTexture,uvs).xyz;

    //Main color
    vec3 color = mix(uPrimaryColor * uFireBallInensity,uSecondaryColor,d);
    float fresnel = fresnel(uFresnelPower,normals,viewDir);
    color = mix(color, uSecondaryColor, smoothstep(0.0,0.3,fresnel));
    
    //Mixing with sunrays
    vec4 sunRays = vec4(uRayColor * texel,smoothstep(0.0,1.0 - uRayThickness,texel.r));
    vec4 colour = vec4(vec3(color),1.0);
    csm_DiffuseColor = mix(colour,sunRays,smoothstep(0.0,uFireBallRay,fresnel));
}