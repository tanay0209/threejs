import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const starTexture = textureLoader.load("/textures/particles/2.png")

/**
 * Particles
 */

// Geometry
// const particleGeomtry = new THREE.SphereGeometry(1, 32, 32)
const particleGeomtry = new THREE.BufferGeometry()

// Material
const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    sizeAttenuation: true
})
particleMaterial.transparent = true
particleMaterial.alphaMap = starTexture
// particleMaterial.alphaTest = 0.001
// particleMaterial.depthTest = false
particleMaterial.depthWrite = false
particleMaterial.blending = THREE.AdditiveBlending

//Points
const particles = new THREE.Points(particleGeomtry, particleMaterial)
scene.add(particles)

const count = 5000
const positions = new Float32Array(count * 3)

for (let i = 0; i < count; i++) {
    positions[i] = (Math.random() - 0.5) * 10
}

particleGeomtry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
camera.position.z = 3
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

    // particles.rotation.y = elapsedTime * 0.2

    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particleGeomtry.attributes.position.array[i3]
        particleGeomtry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particleGeomtry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()