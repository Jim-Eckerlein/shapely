class Mesh {

    constructor() {
        this.vertices = new Float32Array(3 * subdivisions * subdivisions)
        this.colors = new Float32Array(3 * subdivisions * subdivisions)
        let indices = new Uint16Array(6 * subdivisions * subdivisions)
        let indicesHead = 0

        for (let xi = 0; xi < subdivisions - 1; xi++) {
            for (let yi = 0; yi < subdivisions - 1; yi++) {
                indices[indicesHead + 0] = xi * subdivisions + yi
                indices[indicesHead + 1] = (xi + 1) * subdivisions + yi + 1
                indices[indicesHead + 2] = xi * subdivisions + yi + 1
                indices[indicesHead + 3] = xi * subdivisions + yi
                indices[indicesHead + 4] = (xi + 1) * subdivisions + yi
                indices[indicesHead + 5] = (xi + 1) * subdivisions + yi + 1
                indicesHead += 6
            }
        }
        
        this.vertexAttribute = new THREE.BufferAttribute(this.vertices, 3)
        this.colorAttribute = new THREE.BufferAttribute(this.colors, 3)
        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', this.vertexAttribute)
        geometry.setAttribute('normal', this.colorAttribute)
        geometry.setIndex(new THREE.BufferAttribute(indices, 1))
        const clippingPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 1),
            new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1),
            new THREE.Plane(new THREE.Vector3(0, 1, 0), 1),
            new THREE.Plane(new THREE.Vector3(0, -1, 0), 1),
            new THREE.Plane(new THREE.Vector3(0, 0, 1), 1),
            new THREE.Plane(new THREE.Vector3(0, 0, -1), 1),
        ]
        const material = new THREE.MeshLambertMaterial({color: "#fcaf67", clippingPlanes: clippingPlanes})
        material.side = THREE.DoubleSide
        this.mesh = new THREE.Mesh(geometry, material)
    }

    visualize(f) {
        let verticesHead = 0
        let colorsHead = 0

        const call = (x, y) => {
            return f(viewportScale() * x, viewportScale() * y) / viewportScale()
        }

        const mapOrdinate = i => mapRange(i, 0, subdivisions - 1, -1, 1)

        for (let xi = 0; xi < subdivisions; xi++) {
            for (let yi = 0; yi < subdivisions; yi++) {
                const x = mapOrdinate(xi)
                const y = mapOrdinate(yi)
                const z = call(x - viewportOriginX, y - viewportOriginY)
                this.vertices[verticesHead + 0] = x
                this.vertices[verticesHead + 1] = y
                this.vertices[verticesHead + 2] = z
                verticesHead += 3
            }
        }

        for (let xi = 0; xi < subdivisions; xi++) {
            for (let yi = 0; yi < subdivisions; yi++) {
                const x1 = mapOrdinate(xi - 1) - viewportOriginX
                const x2 = mapOrdinate(xi + 1) - viewportOriginX
                const y1 = mapOrdinate(yi - 1) - viewportOriginY
                const y2 = mapOrdinate(yi + 1) - viewportOriginY
                const z11 = call(x1, y1)
                const z12 = call(x1, y2)
                const z21 = call(x2, y1)
                const p11 = new THREE.Vector3(x1, y1, z11)
                const p12 = new THREE.Vector3(x1, y2, z12)
                const p21 = new THREE.Vector3(x2, y1, z21)
                const dx = new THREE.Vector3().subVectors(p21, p11)
                const dy = new THREE.Vector3().subVectors(p12, p11)
                const n = dx.cross(dy).normalize()
                this.colors[colorsHead + 0] = n.x//(n.x + 1) / 2
                this.colors[colorsHead + 1] = n.y//(n.y + 1) / 2
                this.colors[colorsHead + 2] = n.z//(n.z + 1) / 2
                colorsHead += 3
            }
        }

        this.vertexAttribute.needsUpdate = true
        this.colorAttribute.needsUpdate = true
    }

}
