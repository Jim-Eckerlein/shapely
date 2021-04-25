class Cage {

    constructor() {
        const vertices = new Float32Array(12 * 2 * 3)
        const vs = makePusher(vertices)

        const colors = new Float32Array(12 * 2 * 3)
        const cs = makePusher(colors)

        // x-axis
        vs(-1, -1, -1)
        vs(1, -1, -1)
        repeat(2, cs, 1, 0, 0)

        vs(-1, 1, -1)
        vs(1, 1, -1)
        vs(-1, 1, 1)
        vs(1, 1, 1)
        vs(-1, -1, 1)
        vs(1, -1, 1)
        repeat(6 * 3, cs, 0.6)
        
        // y-axis
        vs(-1, -1, -1)
        vs(-1, 1, -1)
        repeat(2, cs, 0, 1, 0)

        vs(1, -1, -1)
        vs(1, 1, -1)
        vs(1, -1, 1)
        vs(1, 1, 1)
        vs(-1, -1, 1)
        vs(-1, 1, 1)
        repeat(6 * 3, cs, 0.6)
        
        // z-axis
        vs(-1, -1, -1)
        vs(-1, -1, 1)
        repeat(2, cs, 0, 0, 1)

        vs(1, -1, -1)
        vs(1, -1, 1)
        vs(1, 1, -1)
        vs(1, 1, 1)
        vs(-1, 1, -1)
        vs(-1, 1, 1)
        repeat(6 * 3, cs, 0.6)

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        const material = new THREE.LineBasicMaterial({vertexColors: true})
        this.mesh = new THREE.LineSegments(geometry, material)
    }

}
