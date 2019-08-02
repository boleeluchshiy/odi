const flashes = document.querySelectorAll('.flash')

for (let flash of flashes) {
   flash.addEventListener('click', removeFlash)
}

function removeFlash(e) {
   e.currentTarget.removeEventListener('click', removeFlash)
   e.currentTarget.remove()
}
