export default {
    inserted(el, binding) {
        let { format, options } = {
            format: 'jpg',
            options: 'cdn',
            ...binding.value
        }

        el.src = el.getAttribute('src')
        el.style.width = '100%'
        let scale = binding.value.scale
        let image = document.createElement('img')
        let wrapper = document.createElement('div')
        wrapper.className += 'zoom-wrap'
        wrapper.style.position = 'relative'
        wrapper.style.overflow = 'hidden'
        wrapper.style.height = '100%'
        wrapper.style.width = '100%'
        wrapper.style.display = 'flex'
        wrapper.style.transition = '.3s all ease'
        wrapper.style.border = '1px solid'
        wrapper.style.borderColor = 'transparent'

        el.parentNode.insertBefore(wrapper, el)

        image.src = el.src
        image.className += 'object-contain'
        image.style.position = 'absolute'
        image.style.opacity = '0'
        image.style.transformOrigin = '0 0'
        image.style.left = 0 + 'px'
        image.style.top = 0 + 'px'
        image.style.width = '100%'
        image.style.height = '100%'

        wrapper.appendChild(el)
        wrapper.appendChild(image)

        image.onmouseover = function () {
            image.style.zIndex = 10
            image.style.opacity = 1
            image.style.transform = `scale(${scale})`
            image.style.cursor = 'pointer'
            el.style.opacity = 0

        }
        image.onmouseout = function () {
            image.style.zIndex = 0
            image.style.transform = 'scale(1)'
            image.style.opacity = 0
            image.style.left = 0 + 'px'
            image.style.top = 0 + 'px'
            el.style.opacity = 1
        }
        image.onmousemove = function (value) {
            let height = el.clientHeight
            let width = el.clientWidth
            let yx = height / ((height * scale) - height)
            let xy = width / ((width * scale) - width)
            let x = value.offsetX / xy
            let y = value.offsetY / yx
            image.style.left = -x + 'px'
            image.style.top = -y + 'px'              
        }
    }
}