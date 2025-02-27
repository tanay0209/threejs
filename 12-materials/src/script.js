import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from "lil-gui"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js"


const gui = new GUI()
/**
 * Base
*/
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Texture
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/8.png')
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')

// doorColorTexture.colorSpace = THREE.SRGBColorSpace
// matcapTexture.colorSpace = THREE.SRGBColorSpace



// Scene
const scene = new THREE.Scene()

//MESHBASICMATERIAL
// const material = new THREE.MeshBasicMaterial()
// ADDING TEXTURE AND COLOR WILL TINT(MAKE THE TEXTURE) THE TEXTURE WITH THE COLOR
// material.color = new THREE.Color("blue")
// material.wireframe = true
// material.map = doorColorTexture
// TO CHANGE OPACITY NEED TO SET TRANSPARENT TO TRUE
// material.transparent = true
// material.opacity = 0.5
// MAKES THE BACKSIDE OF THE OBJECT VISIBLE, BY DEFAULT YOU CANT SEE THE BACK SIDE OF AM OBJECT
// material.side = THREE.DoubleSide

//MESHNORMALMATERIAL
// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

//MESHMATCAPMATERIAL
// const material = new THREE.MeshMatcapMaterial()
// material.matcap  = matcapTexture

//MeshDepthMaterial: colors white if close to camera else black
// const material = new THREE.MeshDepthMaterial()


// //MeshLambertMaterial: requires light
// const material = new THREE.MeshLambertMaterial()

//MeshPhongMaterial: requires light
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 10
// material.specular = new THREE.Color(0x1188ff)

//MeshToonMaterial: requires light
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// material.gradientMap = gradientTexture

//MeshStandardMaterial: requires light
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 1
// material.roughness = 1

// material.map = doorColorTexture
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.02
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// // material.transparent = true
// // material.alphaMap = doorAlphaTexture

// gui.add(material, "metalness").max(1).min(0).step(0.001)
// gui.add(material, "roughness").max(1).min(0).step(0.001)


//MeshPhysicalMaterial: requires light
const material = new THREE.MeshPhysicalMaterial()
material.metalness = 1
material.roughness = 1

material.map = doorColorTexture
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
material.displacementMap = doorHeightTexture
material.displacementScale = 0.02
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

gui.add(material, "metalness").max(1).min(0).step(0.001)
gui.add(material, "roughness").max(1).min(0).step(0.001)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)
const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5
scene.add(sphere, plane, torus)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
* Lights
*/

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/* Environment Map
*/

// const rgbeLoader = new RGBELoader()
// rgbeLoader.load("./textures/environmentMaps/2k.hdr", (environmentMaps) => {
//     environmentMaps.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = environmentMaps
//     scene.environment = environmentMaps
// })

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = -0.15 * elapsedTime
    plane.rotation.x = -0.15 * elapsedTime
    torus.rotation.x = -0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()