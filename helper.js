function newPos(roomSz, gridSz) {
    var x = -roomSz * Math.floor(gridSz / 2)
    var z = -roomSz * Math.floor(gridSz / 2)
    var i = Math.floor(Math.random() * gridSz)
    var j = Math.floor(Math.random() * gridSz)
    var offX = x + i * roomSz
    var offZ = z + j * roomSz
    var posX = offX + (Math.random() * 160 - 80)
    var posZ = offZ + (Math.random() * 160 - 80)
    return [posX, posZ]
}

export { 
    newPos
}