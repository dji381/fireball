varying vec2 vUvs;
uniform vec3 uPrimaryColor;
uniform vec3 uSecondaryColor;
uniform float uFresnelPower;
uniform float uFireBallInensity;
uniform float uFireBallSpeed;
uniform float uTime;
varying vec3 vNormals;
varying vec3 vPosition;

float randomValue(vec2 uv) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
}

float interpolate(float a, float b, float t) {
    return mix(a, b, t); // mix() = (1-t)*a + t*b
}

float valueNoise(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    f = f * f * (3.0 - 2.0 * f); // easing

    vec2 c0 = i + vec2(0.0, 0.0);
    vec2 c1 = i + vec2(1.0, 0.0);
    vec2 c2 = i + vec2(0.0, 1.0);
    vec2 c3 = i + vec2(1.0, 1.0);

    float r0 = randomValue(c0);
    float r1 = randomValue(c1);
    float r2 = randomValue(c2);
    float r3 = randomValue(c3);

    float bottom = interpolate(r0, r1, f.x);
    float top = interpolate(r2, r3, f.x);
    return interpolate(bottom, top, f.y);
}

// --- SimpleNoise 2D avec UV et Scale ---
float simpleNoise(vec2 uv, float scale) {
    float t = 0.0;

    float freq = pow(2.0, 0.0);
    float amp = pow(0.5, 3.0 - 0.0);
    t += valueNoise(uv * scale / freq) * amp;

    freq = pow(2.0, 1.0);
    amp = pow(0.5, 3.0 - 1.0);
    t += valueNoise(uv * scale / freq) * amp;

    freq = pow(2.0, 2.0);
    amp = pow(0.5, 3.0 - 2.0);
    t += valueNoise(uv * scale / freq) * amp;

    return t;
}
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
    float n = simpleNoise(vUvs + uTime * uFireBallSpeed,50.0);
    vec3 color = mix(uPrimaryColor * uFireBallInensity,uSecondaryColor,n);
    float fresnel = fresnel(uFresnelPower,normals,viewDir);
    vec3 fresnelColor = mix(uPrimaryColor, uSecondaryColor, smoothstep(0.0,0.3,fresnel));
    color = mix(color,fresnelColor,smoothstep(0.0,0.3,fresnel));
    vec4 sunRays = vec4(uSecondaryColor,saturateFloat(n));
    vec4 colour = vec4(color,1.0);
    csm_DiffuseColor = mix(colour,sunRays,smoothstep(0.0,0.8,fresnel));
}