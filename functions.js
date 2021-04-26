function log(base, x) {
    return Math.log(x) / Math.log(base)
}


function sq(x) {
    return x * x
}


function min(x, y) {
    return Math.min(x, y)
}


function max(x, y) {
    return Math.max(x, y)
}


function clamp(a, x, y) {
    return max(x, min(y, a))
}


/// True modulo operator. Result will be in `[0, y)`.
function mod(x, y) {
    const remainder = x % y
    return remainder >= 0 ? remainder : remainder + y;
}


function mapRange(x, lowerFrom, upperFrom, lowerTo, upperTo) {
    const ratio = (x - lowerFrom) / (upperFrom - lowerFrom)
    return lowerTo + ratio * (upperTo - lowerTo)
}


function repeat(n, f, ...args) {
    for (let i = 0; i < n; i++) {
        f(...args)
    }
}


function makePusher(array) {
    let head = 0
    return function(...value) {
        for (let v of value) {
            array[head] = v
            head += 1
        }
    }
}
