const body = document.querySelector('body')
const darkSwitcher = body.querySelector('.theme-switcher')

darkSwitcher.onclick = function() {
   body.classList.toggle('dark-theme')
   if (body.classList.contains('dark-theme')) {
      darkSwitcher.innerText = 'Light'
   } else {
      darkSwitcher.innerText = 'Dark'
   }
}
