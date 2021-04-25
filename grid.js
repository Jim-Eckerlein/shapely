class Grid {

    constructor() {
        let sections = 10
        let majorSections = 5

        let colorMajor = 0.3
        let colorMinor = 0.8

        const vertices = new Float32Array(3 * 6 + 24 * sq(sections * 2 + 1))
        const vs = makePusher(vertices)

        const colors = new Float32Array(3 * 6 + 24 * sq(sections * 2 + 1))
        const cs = makePusher(colors)

        for (let xi = 0; xi <= 2 * sections; xi++) {
            for (let yi = 0; yi <= 2 * sections; yi++) {
                const x = xi / sections
                const y = yi / sections
                
                let color = null
                if ((yi % majorSections) == 0) {
                    color = colorMajor
                }
                else {
                    color = colorMinor
                }

                vs(x, y, 0)
                vs(-x, y, 0)
                vs(x, -y, 0)
                vs(-x, -y, 0)
                vs(y, x, 0)
                vs(y, -x, 0)
                vs(-y, x, 0)
                vs(-y, -x, 0)

                repeat(8 * 3, cs, color)
            }
        }

        const vertexAttribute = new THREE.Float32BufferAttribute(vertices, 3)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', vertexAttribute)
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
        const clippingOffset = 0.9999
        const clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), clippingOffset),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), clippingOffset),
            new THREE.Plane(new THREE.Vector3(0, 1, 0), clippingOffset),
            new THREE.Plane(new THREE.Vector3(0, -1, 0), clippingOffset),
            new THREE.Plane(new THREE.Vector3(0, 0, 1), clippingOffset),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), clippingOffset),
        ]
        const material = new THREE.LineBasicMaterial({vertexColors: true, clippingPlanes: clippingPlanes})
        this.mesh = new THREE.LineSegments(geometry, material)
    }

    update() {
        let exponent = mod(-scaleExponent, 1)

        const scale = scaleBase ** exponent
        this.mesh.scale.x = scale
        this.mesh.scale.y = scale
        this.mesh.scale.z = scale

        const maximalOffset = scaleBase ** (exponent * scaleBase / 2)
        this.mesh.position.x = viewportOriginX % maximalOffset
        this.mesh.position.y = viewportOriginY % maximalOffset
    }

}
