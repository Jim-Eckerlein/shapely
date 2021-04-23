const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const root = new THREE.Object3D()
root.matrix.makeBasis(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 1, 0))
root.matrixAutoUpdate = false
scene.add(root)

scene.add(new THREE.AmbientLight(0xffffff, 0.5))
const light = new THREE.DirectionalLight(0xffffff, 0.5)
scene.add(light)


let cameraRadius = 4
let cameraRighwards = 1.0
let cameraUpwards = 0.6

const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(new THREE.Color("#fff"))
renderer.localClippingEnabled = true

const html = renderer.domElement
let dragging = false
let orbiting = false
let pastX = 0, pastY = 0
html.onmousedown = e => {
    dragging = true
    pastX = e.clientX
    pastY = e.clientY
}
html.onmouseup = () => dragging = false
html.onmouseout = () => dragging = false
html.onmousemove = e => {
    if (!dragging) return
    const dx = e.clientX - pastX
    const dy = e.clientY - pastY
    if (dx == 0 && dy == 0) return
    pastX += dx
    pastY += dy
    if (orbiting) {
        cameraRighwards += dx * 0.01
        cameraUpwards += dy * 0.01
        cameraUpwards = Math.max(Math.min(cameraUpwards, 0.5 * Math.PI), -0.5 * Math.PI)
    }
    else {
        viewportOriginX += dx * 0.005
        viewportOriginY += dy * 0.005
    }
}
html.onmousewheel = e => {
    scaleExponent += e.deltaY * 0.0002
    e.preventDefault()
}
document.body.onkeydown = e => {
    if (e.key == "Meta") {
        orbiting = false
    }
}
document.body.onkeyup = e => {
    if (e.key == "Meta") {
        orbiting = true
    }
}
document.body.appendChild(html)


const mesh = new Mesh()
root.add(mesh.mesh)

const cage = new Cage()
root.add(cage.mesh)

const grid = new Grid()
root.add(grid.mesh)


function animate() {
	requestAnimationFrame(animate)

    camera.position.x = cameraRadius * Math.cos(cameraUpwards) * Math.cos(cameraRighwards)
    camera.position.z = cameraRadius * Math.cos(cameraUpwards) * Math.sin(cameraRighwards)
    camera.position.y = cameraRadius * Math.sin(cameraUpwards)
    light.position.x = camera.position.x
    light.position.y = camera.position.y
    light.position.z = camera.position.z
    camera.lookAt(new THREE.Vector3())

    mesh.visualize((x, y) => 0.2 * Math.sin(10 * x) * Math.exp(y))
    grid.update()
    
    // renderer.clippingPlanes = [
    //     new THREE.Plane(new THREE.Vector3(1, 0, 0), 1),
    //     new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1),
    //     new THREE.Plane(new THREE.Vector3(0, 1, 0), 1),
    //     new THREE.Plane(new THREE.Vector3(0, -1, 0), 1),
    //     new THREE.Plane(new THREE.Vector3(0, 0, 1), 1),
    //     new THREE.Plane(new THREE.Vector3(0, 0, -1), 1),
    // ]

	renderer.render(scene, camera)
}
animate()
