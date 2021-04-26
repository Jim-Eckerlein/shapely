let viewportOriginX = 0
let viewportOriginY = 0
let viewportOriginZ = 0
let scaleExponent = 0
const scaleBase = 2
let subdivisions = 200


function scaleBy(ds) {
    scaleExponent += ds

    let exponent = -ds % 1
    const scale = scaleBase ** exponent
    viewportOriginX *= scale
    viewportOriginY *= scale
}


function viewportScale() {
    return scaleBase ** scaleExponent
}
