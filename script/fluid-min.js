let inputs=document.querySelectorAll("input");const canvas=document.getElementsByTagName("canvas")[0];resizeCanvas();let config={SIM_RESOLUTION:300,DYE_RESOLUTION:1024,CAPTURE_RESOLUTION:512,DENSITY_DISSIPATION:1,VELOCITY_DISSIPATION:.5,PRESSURE:.5,PRESSURE_ITERATIONS:20,CURL:30,SPLAT_RADIUS:.3,SPLAT_FORCE:6e3,SHADING:!1,COLORFUL:!0,COLOR_UPDATE_SPEED:1,PAUSED:!1,BACK_COLOR:{r:0,g:0,b:0},TRANSPARENT:!0,BLOOM:!1,SUNRAYS:!1,SUNRAYS_RESOLUTION:196,SUNRAYS_WEIGHT:1,SOUND_SENSITIVITY:1.25,FREQ_RANGE:1118};function isMobile(){return/Mobi|Android/i.test(navigator.userAgent)}Array.from(inputs).forEach((e=>{e.oninput=()=>{config.SPLAT_RADIUS=.1,splatStack.push(parseInt(10*Math.random())+2)}})),isMobile()&&(config.DYE_RESOLUTION=512,config.SIM_RESOLUTION=200);var timer=setInterval(randomSplat,3500),_runRandom=!0,_isSleep=!1;function randomSplat(){1==_runRandom&&0==_isSleep&&_randomSplats&&splatStack.push(parseInt(20*Math.random())+5)}let timeout;document.addEventListener("visibilitychange",(function(){_isSleep=document.hidden}),!1);let timeoutBool=!0;function multipleSplats(e){for(let r=0;r<e;r++){const e=config.COLORFUL?generateColor():Object.assign({},config.POINTER_COLOR.getRandom());e.r*=10,e.g*=10,e.b*=10;splat(canvas.width*Math.random(),canvas.height*Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),e)}}function generateColor(){let e=HSVtoRGB(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}var _randomSplats=!1,_audioReact=!1,_bgImageChk=!1,_bgImagePath="";function hexToRgb(e){var r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null}function pointerPrototype(){this.id=-1,this.texcoordX=0,this.texcoordY=0,this.prevTexcoordX=0,this.prevTexcoordY=0,this.deltaX=0,this.deltaY=0,this.down=!1,this.moved=!1,this.color=[30,0,300]}let pointers=[],splatStack=[];pointers.push(new pointerPrototype);const{gl:gl,ext:ext}=getWebGLContext(canvas);function getWebGLContext(e){const r={alpha:!0,depth:!1,stencil:!1,antialias:!1,preserveDrawingBuffer:!1};let t=e.getContext("webgl2",r);const n=!!t;let i,o;n||(t=e.getContext("webgl",r)||e.getContext("experimental-webgl",r)),n?(t.getExtension("EXT_color_buffer_float"),o=t.getExtension("OES_texture_float_linear")):(i=t.getExtension("OES_texture_half_float"),o=t.getExtension("OES_texture_half_float_linear")),t.clearColor(0,0,0,1);const a=n?t.HALF_FLOAT:i.HALF_FLOAT_OES;let l,u,c;return n?(l=getSupportedFormat(t,t.RGBA16F,t.RGBA,a),u=getSupportedFormat(t,t.RG16F,t.RG,a),c=getSupportedFormat(t,t.R16F,t.RED,a)):(l=getSupportedFormat(t,t.RGBA,t.RGBA,a),u=getSupportedFormat(t,t.RGBA,t.RGBA,a),c=getSupportedFormat(t,t.RGBA,t.RGBA,a)),{gl:t,ext:{formatRGBA:l,formatRG:u,formatR:c,halfFloatTexType:a,supportLinearFiltering:o}}}function getSupportedFormat(e,r,t,n){if(!supportRenderTextureFormat(e,r,t,n))switch(r){case e.R16F:return getSupportedFormat(e,e.RG16F,e.RG,n);case e.RG16F:return getSupportedFormat(e,e.RGBA16F,e.RGBA,n);default:return null}return{internalFormat:r,format:t}}function supportRenderTextureFormat(e,r,t,n){let i=e.createTexture();e.bindTexture(e.TEXTURE_2D,i),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texImage2D(e.TEXTURE_2D,0,r,4,4,0,t,n,null);let o=e.createFramebuffer();e.bindFramebuffer(e.FRAMEBUFFER,o),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,i,0);return e.checkFramebufferStatus(e.FRAMEBUFFER)==e.FRAMEBUFFER_COMPLETE}function framebufferToTexture(e){gl.bindFramebuffer(gl.FRAMEBUFFER,e.fbo);let r=e.width*e.height*4,t=new Float32Array(r);return gl.readPixels(0,0,e.width,e.height,gl.RGBA,gl.FLOAT,t),t}function normalizeTexture(e,r,t){let n=new Uint8Array(e.length),i=0;for(let o=t-1;o>=0;o--)for(let t=0;t<r;t++){let a=o*r*4+4*t;n[a+0]=255*clamp01(e[i+0]),n[a+1]=255*clamp01(e[i+1]),n[a+2]=255*clamp01(e[i+2]),n[a+3]=255*clamp01(e[i+3]),i+=4}return n}function clamp01(e){return Math.min(Math.max(e,0),1)}function textureToCanvas(e,r,t){let n=document.createElement("canvas"),i=n.getContext("2d");n.width=r,n.height=t;let o=i.createImageData(r,t);return o.data.set(e),i.putImageData(o,0,0),n}function downloadURI(e,r){let t=document.createElement("a");t.download=e,t.href=r,document.body.appendChild(t),t.click(),document.body.removeChild(t)}ext.supportLinearFiltering||(config.DYE_RESOLUTION=512,config.SHADING=!1,config.BLOOM=!1,config.SUNRAYS=!1);class Material{constructor(e,r){this.vertexShader=e,this.fragmentShaderSource=r,this.programs=[],this.activeProgram=null,this.uniforms=[]}setKeywords(e){let r=0;for(let t=0;t<e.length;t++)r+=hashCode(e[t]);let t=this.programs[r];if(null==t){let n=compileShader(gl.FRAGMENT_SHADER,this.fragmentShaderSource,e);t=createProgram(this.vertexShader,n),this.programs[r]=t}t!=this.activeProgram&&(this.uniforms=getUniforms(t),this.activeProgram=t)}bind(){gl.useProgram(this.activeProgram)}}class Program{constructor(e,r){this.uniforms={},this.program=createProgram(e,r),this.uniforms=getUniforms(this.program)}bind(){gl.useProgram(this.program)}}function createProgram(e,r){let t=gl.createProgram();if(gl.attachShader(t,e),gl.attachShader(t,r),gl.linkProgram(t),!gl.getProgramParameter(t,gl.LINK_STATUS))throw gl.getProgramInfoLog(t);return t}function getUniforms(e){let r=[],t=gl.getProgramParameter(e,gl.ACTIVE_UNIFORMS);for(let n=0;n<t;n++){let t=gl.getActiveUniform(e,n).name;r[t]=gl.getUniformLocation(e,t)}return r}function compileShader(e,r,t){r=addKeywords(r,t);const n=gl.createShader(e);if(gl.shaderSource(n,r),gl.compileShader(n),!gl.getShaderParameter(n,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(n);return n}function addKeywords(e,r){if(null==r)return e;let t="";return r.forEach((e=>{t+="#define "+e+"\n"})),t+e}const baseVertexShader=compileShader(gl.VERTEX_SHADER,"\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        vL = vUv - vec2(texelSize.x, 0.0);\n        vR = vUv + vec2(texelSize.x, 0.0);\n        vT = vUv + vec2(0.0, texelSize.y);\n        vB = vUv - vec2(0.0, texelSize.y);\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),blurVertexShader=compileShader(gl.VERTEX_SHADER,"\n    precision highp float;\n\n    attribute vec2 aPosition;\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform vec2 texelSize;\n\n    void main () {\n        vUv = aPosition * 0.5 + 0.5;\n        float offset = 1.33333333;\n        vL = vUv - texelSize * offset;\n        vR = vUv + texelSize * offset;\n        gl_Position = vec4(aPosition, 0.0, 1.0);\n    }\n"),blurShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = texture2D(uTexture, vUv) * 0.29411764;\n        sum += texture2D(uTexture, vL) * 0.35294117;\n        sum += texture2D(uTexture, vR) * 0.35294117;\n        gl_FragColor = sum;\n    }\n"),copyShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        gl_FragColor = texture2D(uTexture, vUv);\n    }\n"),clearShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float value;\n\n    void main () {\n        gl_FragColor = value * texture2D(uTexture, vUv);\n    }\n"),colorShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n\n    uniform vec4 color;\n\n    void main () {\n        gl_FragColor = color;\n    }\n"),checkerboardShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float aspectRatio;\n\n    #define SCALE 25.0\n\n    void main () {\n        vec2 uv = floor(vUv * SCALE * vec2(aspectRatio, 1.0));\n        float v = mod(uv.x + uv.y, 2.0);\n        v = v * 0.1 + 0.8;\n        gl_FragColor = vec4(vec3(v), 1.0);\n    }\n"),displayShaderSource="\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform sampler2D uBloom;\n    uniform sampler2D uSunrays;\n    uniform sampler2D uDithering;\n    uniform vec2 ditherScale;\n    uniform vec2 texelSize;\n\n    vec3 linearToGamma (vec3 color) {\n        color = max(color, vec3(0));\n        return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));\n    }\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n\n    #ifdef SHADING\n        vec3 lc = texture2D(uTexture, vL).rgb;\n        vec3 rc = texture2D(uTexture, vR).rgb;\n        vec3 tc = texture2D(uTexture, vT).rgb;\n        vec3 bc = texture2D(uTexture, vB).rgb;\n\n        float dx = length(rc) - length(lc);\n        float dy = length(tc) - length(bc);\n\n        vec3 n = normalize(vec3(dx, dy, length(texelSize)));\n        vec3 l = vec3(0.0, 0.0, 1.0);\n\n        float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);\n        c *= diffuse;\n    #endif\n\n    #ifdef BLOOM\n        vec3 bloom = texture2D(uBloom, vUv).rgb;\n    #endif\n\n    #ifdef SUNRAYS\n        float sunrays = texture2D(uSunrays, vUv).r;\n        c *= sunrays;\n    #ifdef BLOOM\n        bloom *= sunrays;\n    #endif\n    #endif\n\n    #ifdef BLOOM\n        float noise = texture2D(uDithering, vUv * ditherScale).r;\n        noise = noise * 2.0 - 1.0;\n        bloom += noise / 255.0;\n        bloom = linearToGamma(bloom);\n        c += bloom;\n    #endif\n\n        float a = max(c.r, max(c.g, c.b));\n        gl_FragColor = vec4(c, a);\n    }\n",bloomPrefilterShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform vec3 curve;\n    uniform float threshold;\n\n    void main () {\n        vec3 c = texture2D(uTexture, vUv).rgb;\n        float br = max(c.r, max(c.g, c.b));\n        float rq = clamp(br - curve.x, 0.0, curve.y);\n        rq = curve.z * rq * rq;\n        c *= max(rq, br - threshold) / max(br, 0.0001);\n        gl_FragColor = vec4(c, 0.0);\n    }\n"),bloomBlurShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum;\n    }\n"),bloomFinalShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uTexture;\n    uniform float intensity;\n\n    void main () {\n        vec4 sum = vec4(0.0);\n        sum += texture2D(uTexture, vL);\n        sum += texture2D(uTexture, vR);\n        sum += texture2D(uTexture, vT);\n        sum += texture2D(uTexture, vB);\n        sum *= 0.25;\n        gl_FragColor = sum * intensity;\n    }\n"),sunraysMaskShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n\n    void main () {\n        vec4 c = texture2D(uTexture, vUv);\n        float br = max(c.r, max(c.g, c.b));\n        c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);\n        gl_FragColor = c;\n    }\n"),sunraysShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTexture;\n    uniform float weight;\n\n    #define ITERATIONS 16\n\n    void main () {\n        float Density = 0.3;\n        float Decay = 0.95;\n        float Exposure = 0.7;\n\n        vec2 coord = vUv;\n        vec2 dir = vUv - 0.5;\n\n        dir *= 1.0 / float(ITERATIONS) * Density;\n        float illuminationDecay = 1.0;\n\n        float color = texture2D(uTexture, vUv).a;\n\n        for (int i = 0; i < ITERATIONS; i++)\n        {\n            coord -= dir;\n            float col = texture2D(uTexture, coord).a;\n            color += col * illuminationDecay * weight;\n            illuminationDecay *= Decay;\n        }\n\n        gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);\n    }\n"),splatShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uTarget;\n    uniform float aspectRatio;\n    uniform vec3 color;\n    uniform vec2 point;\n    uniform float radius;\n\n    void main () {\n        vec2 p = vUv - point.xy;\n        p.x *= aspectRatio;\n        vec3 splat = exp(-dot(p, p) / radius) * color;\n        vec3 base = texture2D(uTarget, vUv).xyz;\n        gl_FragColor = vec4(base + splat, 1.0);\n    }\n"),advectionShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uSource;\n    uniform vec2 texelSize;\n    uniform vec2 dyeTexelSize;\n    uniform float dt;\n    uniform float dissipation;\n\n    vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {\n        vec2 st = uv / tsize - 0.5;\n\n        vec2 iuv = floor(st);\n        vec2 fuv = fract(st);\n\n        vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);\n        vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);\n        vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);\n        vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);\n\n        return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);\n    }\n\n    void main () {\n    #ifdef MANUAL_FILTERING\n        vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;\n        vec4 result = bilerp(uSource, coord, dyeTexelSize);\n    #else\n        vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;\n        vec4 result = texture2D(uSource, coord);\n    #endif\n        float decay = 1.0 + dissipation * dt;\n        gl_FragColor = result / decay;\n    }",ext.supportLinearFiltering?null:["MANUAL_FILTERING"]),divergenceShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).x;\n        float R = texture2D(uVelocity, vR).x;\n        float T = texture2D(uVelocity, vT).y;\n        float B = texture2D(uVelocity, vB).y;\n\n        vec2 C = texture2D(uVelocity, vUv).xy;\n        if (vL.x < 0.0) { L = -C.x; }\n        if (vR.x > 1.0) { R = -C.x; }\n        if (vT.y > 1.0) { T = -C.y; }\n        if (vB.y < 0.0) { B = -C.y; }\n\n        float div = 0.5 * (R - L + T - B);\n        gl_FragColor = vec4(div, 0.0, 0.0, 1.0);\n    }\n"),curlShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uVelocity, vL).y;\n        float R = texture2D(uVelocity, vR).y;\n        float T = texture2D(uVelocity, vT).x;\n        float B = texture2D(uVelocity, vB).x;\n        float vorticity = R - L - T + B;\n        gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);\n    }\n"),vorticityShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision highp float;\n    precision highp sampler2D;\n\n    varying vec2 vUv;\n    varying vec2 vL;\n    varying vec2 vR;\n    varying vec2 vT;\n    varying vec2 vB;\n    uniform sampler2D uVelocity;\n    uniform sampler2D uCurl;\n    uniform float curl;\n    uniform float dt;\n\n    void main () {\n        float L = texture2D(uCurl, vL).x;\n        float R = texture2D(uCurl, vR).x;\n        float T = texture2D(uCurl, vT).x;\n        float B = texture2D(uCurl, vB).x;\n        float C = texture2D(uCurl, vUv).x;\n\n        vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));\n        force /= length(force) + 0.0001;\n        force *= curl * C;\n        force.y *= -1.0;\n\n        vec2 vel = texture2D(uVelocity, vUv).xy;\n        gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);\n    }\n"),pressureShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uDivergence;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        float C = texture2D(uPressure, vUv).x;\n        float divergence = texture2D(uDivergence, vUv).x;\n        float pressure = (L + R + B + T - divergence) * 0.25;\n        gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);\n    }\n"),gradientSubtractShader=compileShader(gl.FRAGMENT_SHADER,"\n    precision mediump float;\n    precision mediump sampler2D;\n\n    varying highp vec2 vUv;\n    varying highp vec2 vL;\n    varying highp vec2 vR;\n    varying highp vec2 vT;\n    varying highp vec2 vB;\n    uniform sampler2D uPressure;\n    uniform sampler2D uVelocity;\n\n    void main () {\n        float L = texture2D(uPressure, vL).x;\n        float R = texture2D(uPressure, vR).x;\n        float T = texture2D(uPressure, vT).x;\n        float B = texture2D(uPressure, vB).x;\n        vec2 velocity = texture2D(uVelocity, vUv).xy;\n        velocity.xy -= vec2(R - L, T - B);\n        gl_FragColor = vec4(velocity, 0.0, 1.0);\n    }\n"),blit=(gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),gl.STATIC_DRAW),gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer()),gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array([0,1,2,0,2,3]),gl.STATIC_DRAW),gl.vertexAttribPointer(0,2,gl.FLOAT,!1,0,0),gl.enableVertexAttribArray(0),e=>{gl.bindFramebuffer(gl.FRAMEBUFFER,e),gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)});let dye,velocity,divergence,curl,pressure,bloom,sunrays,sunraysTemp,bloomFramebuffers=[],ditheringTexture=createTextureAsync("LDR_LLL1_0.png");const blurProgram=new Program(blurVertexShader,blurShader),copyProgram=new Program(baseVertexShader,copyShader),clearProgram=new Program(baseVertexShader,clearShader),colorProgram=new Program(baseVertexShader,colorShader),checkerboardProgram=new Program(baseVertexShader,checkerboardShader),bloomPrefilterProgram=new Program(baseVertexShader,bloomPrefilterShader),bloomBlurProgram=new Program(baseVertexShader,bloomBlurShader),bloomFinalProgram=new Program(baseVertexShader,bloomFinalShader),sunraysMaskProgram=new Program(baseVertexShader,sunraysMaskShader),sunraysProgram=new Program(baseVertexShader,sunraysShader),splatProgram=new Program(baseVertexShader,splatShader),advectionProgram=new Program(baseVertexShader,advectionShader),divergenceProgram=new Program(baseVertexShader,divergenceShader),curlProgram=new Program(baseVertexShader,curlShader),vorticityProgram=new Program(baseVertexShader,vorticityShader),pressureProgram=new Program(baseVertexShader,pressureShader),gradienSubtractProgram=new Program(baseVertexShader,gradientSubtractShader),displayMaterial=new Material(baseVertexShader,displayShaderSource);function initFramebuffers(){let e=getResolution(config.SIM_RESOLUTION),r=getResolution(config.DYE_RESOLUTION);const t=ext.halfFloatTexType,n=ext.formatRGBA,i=ext.formatRG,o=ext.formatR,a=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;dye=null==dye?createDoubleFBO(r.width,r.height,n.internalFormat,n.format,t,a):resizeDoubleFBO(dye,r.width,r.height,n.internalFormat,n.format,t,a),velocity=null==velocity?createDoubleFBO(e.width,e.height,i.internalFormat,i.format,t,a):resizeDoubleFBO(velocity,e.width,e.height,i.internalFormat,i.format,t,a),divergence=createFBO(e.width,e.height,o.internalFormat,o.format,t,gl.NEAREST),curl=createFBO(e.width,e.height,o.internalFormat,o.format,t,gl.NEAREST),pressure=createDoubleFBO(e.width,e.height,o.internalFormat,o.format,t,gl.NEAREST),initBloomFramebuffers(),initSunraysFramebuffers()}function initBloomFramebuffers(){let e=getResolution(config.BLOOM_RESOLUTION);const r=ext.halfFloatTexType,t=ext.formatRGBA,n=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;bloom=createFBO(e.width,e.height,t.internalFormat,t.format,r,n),bloomFramebuffers.length=0;for(let i=0;i<config.BLOOM_ITERATIONS;i++){let o=e.width>>i+1,a=e.height>>i+1;if(o<2||a<2)break;let l=createFBO(o,a,t.internalFormat,t.format,r,n);bloomFramebuffers.push(l)}}function initSunraysFramebuffers(){let e=getResolution(config.SUNRAYS_RESOLUTION);const r=ext.halfFloatTexType,t=ext.formatR,n=ext.supportLinearFiltering?gl.LINEAR:gl.NEAREST;sunrays=createFBO(e.width,e.height,t.internalFormat,t.format,r,n),sunraysTemp=createFBO(e.width,e.height,t.internalFormat,t.format,r,n)}function createFBO(e,r,t,n,i,o){gl.activeTexture(gl.TEXTURE0);let a=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,a),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,o),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,o),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE),gl.texImage2D(gl.TEXTURE_2D,0,t,e,r,0,n,i,null);let l=gl.createFramebuffer();return gl.bindFramebuffer(gl.FRAMEBUFFER,l),gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,a,0),gl.viewport(0,0,e,r),gl.clear(gl.COLOR_BUFFER_BIT),{texture:a,fbo:l,width:e,height:r,texelSizeX:1/e,texelSizeY:1/r,attach:e=>(gl.activeTexture(gl.TEXTURE0+e),gl.bindTexture(gl.TEXTURE_2D,a),e)}}function createDoubleFBO(e,r,t,n,i,o){let a=createFBO(e,r,t,n,i,o),l=createFBO(e,r,t,n,i,o);return{width:e,height:r,texelSizeX:a.texelSizeX,texelSizeY:a.texelSizeY,get read(){return a},set read(e){a=e},get write(){return l},set write(e){l=e},swap(){let e=a;a=l,l=e}}}function resizeFBO(e,r,t,n,i,o,a){let l=createFBO(r,t,n,i,o,a);return copyProgram.bind(),gl.uniform1i(copyProgram.uniforms.uTexture,e.attach(0)),blit(l.fbo),l}function resizeDoubleFBO(e,r,t,n,i,o,a){return e.width==r&&e.height==t||(e.read=resizeFBO(e.read,r,t,n,i,o,a),e.write=createFBO(r,t,n,i,o,a),e.width=r,e.height=t,e.texelSizeX=1/r,e.texelSizeY=1/t),e}function createTextureAsync(e){let r=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,r),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT),gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,1,1,0,gl.RGB,gl.UNSIGNED_BYTE,new Uint8Array([255,255,255]));let t={texture:r,width:1,height:1,attach:e=>(gl.activeTexture(gl.TEXTURE0+e),gl.bindTexture(gl.TEXTURE_2D,r),e)},n=new Image;return n.onload=()=>{t.width=n.width,t.height=n.height,gl.bindTexture(gl.TEXTURE_2D,r),gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,n)},n.src=e,t}function updateKeywords(){let e=[];config.SHADING&&e.push("SHADING"),config.BLOOM&&e.push("BLOOM"),config.SUNRAYS&&e.push("SUNRAYS"),displayMaterial.setKeywords(e)}updateKeywords(),initFramebuffers(),multipleSplats(parseInt(20*Math.random())+5);let lastUpdateTime=Date.now(),colorUpdateTimer=0;function update(){const e=calcDeltaTime();resizeCanvas()&&initFramebuffers(),updateColors(e),applyInputs(),config.PAUSED||step(e),render(null),requestAnimationFrame(update)}function calcDeltaTime(){let e=Date.now(),r=(e-lastUpdateTime)/1e3;return r=Math.min(r,.016666),lastUpdateTime=e,r}function resizeCanvas(){let e=scaleByPixelRatio(canvas.clientWidth),r=scaleByPixelRatio(canvas.clientHeight);return(canvas.width!=e||canvas.height!=r)&&(canvas.width=e,canvas.height=r,!0)}function updateColors(e){config.COLORFUL&&(colorUpdateTimer+=e*config.COLOR_UPDATE_SPEED,colorUpdateTimer>=1&&(colorUpdateTimer=wrap(colorUpdateTimer,0,1),pointers.forEach((e=>{e.color=generateColor()}))))}function applyInputs(){splatStack.length>0&&multipleSplats(splatStack.pop()),pointers.forEach((e=>{e.moved&&(e.moved=!1,splatPointer(e))}))}function step(e){gl.disable(gl.BLEND),gl.viewport(0,0,velocity.width,velocity.height),curlProgram.bind(),gl.uniform2f(curlProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(curlProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(curl.fbo),vorticityProgram.bind(),gl.uniform2f(vorticityProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(vorticityProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(vorticityProgram.uniforms.uCurl,curl.attach(1)),gl.uniform1f(vorticityProgram.uniforms.curl,config.CURL),gl.uniform1f(vorticityProgram.uniforms.dt,e),blit(velocity.write.fbo),velocity.swap(),divergenceProgram.bind(),gl.uniform2f(divergenceProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(divergenceProgram.uniforms.uVelocity,velocity.read.attach(0)),blit(divergence.fbo),clearProgram.bind(),gl.uniform1i(clearProgram.uniforms.uTexture,pressure.read.attach(0)),gl.uniform1f(clearProgram.uniforms.value,config.PRESSURE),blit(pressure.write.fbo),pressure.swap(),pressureProgram.bind(),gl.uniform2f(pressureProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(pressureProgram.uniforms.uDivergence,divergence.attach(0));for(let e=0;e<config.PRESSURE_ITERATIONS;e++)gl.uniform1i(pressureProgram.uniforms.uPressure,pressure.read.attach(1)),blit(pressure.write.fbo),pressure.swap();gradienSubtractProgram.bind(),gl.uniform2f(gradienSubtractProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),gl.uniform1i(gradienSubtractProgram.uniforms.uPressure,pressure.read.attach(0)),gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity,velocity.read.attach(1)),blit(velocity.write.fbo),velocity.swap(),advectionProgram.bind(),gl.uniform2f(advectionProgram.uniforms.texelSize,velocity.texelSizeX,velocity.texelSizeY),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,velocity.texelSizeX,velocity.texelSizeY);let r=velocity.read.attach(0);gl.uniform1i(advectionProgram.uniforms.uVelocity,r),gl.uniform1i(advectionProgram.uniforms.uSource,r),gl.uniform1f(advectionProgram.uniforms.dt,e),gl.uniform1f(advectionProgram.uniforms.dissipation,config.VELOCITY_DISSIPATION),blit(velocity.write.fbo),velocity.swap(),gl.viewport(0,0,dye.width,dye.height),ext.supportLinearFiltering||gl.uniform2f(advectionProgram.uniforms.dyeTexelSize,dye.texelSizeX,dye.texelSizeY),gl.uniform1i(advectionProgram.uniforms.uVelocity,velocity.read.attach(0)),gl.uniform1i(advectionProgram.uniforms.uSource,dye.read.attach(1)),gl.uniform1f(advectionProgram.uniforms.dissipation,config.DENSITY_DISSIPATION),blit(dye.write.fbo),dye.swap()}function render(e){config.BLOOM&&applyBloom(dye.read,bloom),config.SUNRAYS&&(applySunrays(dye.read,dye.write,sunrays),blur(sunrays,sunraysTemp,1)),null!=e&&config.TRANSPARENT?gl.disable(gl.BLEND):(gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA),gl.enable(gl.BLEND));let r=null==e?gl.drawingBufferWidth:e.width,t=null==e?gl.drawingBufferHeight:e.height;gl.viewport(0,0,r,t);let n=null==e?null:e.fbo;config.TRANSPARENT||drawColor(n,normalizeColor(config.BACK_COLOR)),drawDisplay(n,r,t)}function drawColor(e,r){colorProgram.bind(),gl.uniform4f(colorProgram.uniforms.color,r.r,r.g,r.b,1),blit(e)}function drawCheckerboard(e){checkerboardProgram.bind(),gl.uniform1f(checkerboardProgram.uniforms.aspectRatio,canvas.width/canvas.height),blit(e)}function drawDisplay(e,r,t){if(displayMaterial.bind(),config.SHADING&&gl.uniform2f(displayMaterial.uniforms.texelSize,1/r,1/t),gl.uniform1i(displayMaterial.uniforms.uTexture,dye.read.attach(0)),config.BLOOM){gl.uniform1i(displayMaterial.uniforms.uBloom,bloom.attach(1)),gl.uniform1i(displayMaterial.uniforms.uDithering,ditheringTexture.attach(2));let e=getTextureScale(ditheringTexture,r,t);gl.uniform2f(displayMaterial.uniforms.ditherScale,e.x,e.y)}config.SUNRAYS&&gl.uniform1i(displayMaterial.uniforms.uSunrays,sunrays.attach(3)),blit(e)}function applyBloom(e,r){if(bloomFramebuffers.length<2)return;let t=r;gl.disable(gl.BLEND),bloomPrefilterProgram.bind();let n=config.BLOOM_THRESHOLD*config.BLOOM_SOFT_KNEE+1e-4,i=config.BLOOM_THRESHOLD-n,o=2*n,a=.25/n;gl.uniform3f(bloomPrefilterProgram.uniforms.curve,i,o,a),gl.uniform1f(bloomPrefilterProgram.uniforms.threshold,config.BLOOM_THRESHOLD),gl.uniform1i(bloomPrefilterProgram.uniforms.uTexture,e.attach(0)),gl.viewport(0,0,t.width,t.height),blit(t.fbo),bloomBlurProgram.bind();for(let e=0;e<bloomFramebuffers.length;e++){let r=bloomFramebuffers[e];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),gl.viewport(0,0,r.width,r.height),blit(r.fbo),t=r}gl.blendFunc(gl.ONE,gl.ONE),gl.enable(gl.BLEND);for(let e=bloomFramebuffers.length-2;e>=0;e--){let r=bloomFramebuffers[e];gl.uniform2f(bloomBlurProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomBlurProgram.uniforms.uTexture,t.attach(0)),gl.viewport(0,0,r.width,r.height),blit(r.fbo),t=r}gl.disable(gl.BLEND),bloomFinalProgram.bind(),gl.uniform2f(bloomFinalProgram.uniforms.texelSize,t.texelSizeX,t.texelSizeY),gl.uniform1i(bloomFinalProgram.uniforms.uTexture,t.attach(0)),gl.uniform1f(bloomFinalProgram.uniforms.intensity,config.BLOOM_INTENSITY),gl.viewport(0,0,r.width,r.height),blit(r.fbo)}function applySunrays(e,r,t){gl.disable(gl.BLEND),sunraysMaskProgram.bind(),gl.uniform1i(sunraysMaskProgram.uniforms.uTexture,e.attach(0)),gl.viewport(0,0,r.width,r.height),blit(r.fbo),sunraysProgram.bind(),gl.uniform1f(sunraysProgram.uniforms.weight,config.SUNRAYS_WEIGHT),gl.uniform1i(sunraysProgram.uniforms.uTexture,r.attach(0)),gl.viewport(0,0,t.width,t.height),blit(t.fbo)}function blur(e,r,t){blurProgram.bind();for(let n=0;n<t;n++)gl.uniform2f(blurProgram.uniforms.texelSize,e.texelSizeX,0),gl.uniform1i(blurProgram.uniforms.uTexture,e.attach(0)),blit(r.fbo),gl.uniform2f(blurProgram.uniforms.texelSize,0,e.texelSizeY),gl.uniform1i(blurProgram.uniforms.uTexture,r.attach(0)),blit(e.fbo)}function splatPointer(e){let r=e.deltaX*config.SPLAT_FORCE,t=e.deltaY*config.SPLAT_FORCE;splat(e.texcoordX,e.texcoordY,r,t,e.color)}function multipleSplats(e){for(let r=0;r<e;r++){const e=generateColor();e.r*=10,e.g*=10,e.b*=10;splat(Math.random(),Math.random(),1e3*(Math.random()-.5),1e3*(Math.random()-.5),e)}}function splat(e,r,t,n,i){gl.viewport(0,0,velocity.width,velocity.height),splatProgram.bind(),gl.uniform1i(splatProgram.uniforms.uTarget,velocity.read.attach(0)),gl.uniform1f(splatProgram.uniforms.aspectRatio,canvas.width/canvas.height),gl.uniform2f(splatProgram.uniforms.point,e,r),gl.uniform3f(splatProgram.uniforms.color,t,n,0),gl.uniform1f(splatProgram.uniforms.radius,correctRadius(config.SPLAT_RADIUS/100)),blit(velocity.write.fbo),velocity.swap(),gl.viewport(0,0,dye.width,dye.height),gl.uniform1i(splatProgram.uniforms.uTarget,dye.read.attach(0)),gl.uniform3f(splatProgram.uniforms.color,i.r,i.g,i.b),blit(dye.write.fbo),dye.swap()}function correctRadius(e){let r=canvas.width/canvas.height;return r>1&&(e*=r),e}update();let lastMove=-1;function checkLastMove(){const e=window.performance.now();return e-lastMove>1e3&&(lastMove=e,!0)}function updatePointerDownData(e,r,t,n){e.id=r,e.down=!0,e.moved=!1,e.texcoordX=t/canvas.width,e.texcoordY=1-n/canvas.height,e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.deltaX=0,e.deltaY=0,e.color=generateColor()}function updatePointerMoveData(e,r,t){e.prevTexcoordX=e.texcoordX,e.prevTexcoordY=e.texcoordY,e.texcoordX=r/canvas.width,e.texcoordY=1-t/canvas.height,e.deltaX=correctDeltaX(e.texcoordX-e.prevTexcoordX),e.deltaY=correctDeltaY(e.texcoordY-e.prevTexcoordY),e.moved=Math.abs(e.deltaX)>0||Math.abs(e.deltaY)>0}function updatePointerUpData(e){e.down=!1}function correctDeltaX(e){let r=canvas.width/canvas.height;return r<1&&(e*=r),e}function correctDeltaY(e){let r=canvas.width/canvas.height;return r>1&&(e/=r),e}function generateColor(){let e=HSVtoRGB(Math.random(),1,1);return e.r*=.15,e.g*=.15,e.b*=.15,e}function HSVtoRGB(e,r,t){let n,i,o,a,l,u,c,g;switch(a=Math.floor(6*e),l=6*e-a,u=t*(1-r),c=t*(1-l*r),g=t*(1-(1-l)*r),a%6){case 0:n=t,i=g,o=u;break;case 1:n=c,i=t,o=u;break;case 2:n=u,i=t,o=g;break;case 3:n=u,i=c,o=t;break;case 4:n=g,i=u,o=t;break;case 5:n=t,i=u,o=c;break}return{r:n,g:i,b:o}}function normalizeColor(e){return{r:e.r/255,g:e.g/255,b:e.b/255}}function wrap(e,r,t){let n=t-r;return 0==n?r:(e-r)%n+r}function getResolution(e){let r=gl.drawingBufferWidth/gl.drawingBufferHeight;r<1&&(r=1/r);let t=Math.round(e),n=Math.round(e*r);return gl.drawingBufferWidth>gl.drawingBufferHeight?{width:n,height:t}:{width:t,height:n}}function getTextureScale(e,r,t){return{x:r/e.width,y:t/e.height}}function scaleByPixelRatio(e){let r=window.devicePixelRatio||1;return Math.floor(e*r)}function hashCode(e){if(0==e.length)return 0;let r=0;for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0;return r}window.addEventListener("mousemove",(e=>{if(checkLastMove()){let r=scaleByPixelRatio(e.clientX),t=scaleByPixelRatio(e.clientY),n=pointers.find((e=>-1==e.id));null==n&&(n=new pointerPrototype),updatePointerDownData(n,-1,r,t)}let r=pointers[0];r.down&&updatePointerMoveData(r,scaleByPixelRatio(e.clientX),scaleByPixelRatio(e.clientY))})),window.addEventListener("mouseup",(()=>{updatePointerUpData(pointers[0])})),window.addEventListener("keydown",(e=>{" "===e.key&&(splatStack.push(parseInt(12*Math.random())+3),config.SPLAT_RADIUS=.1)}));