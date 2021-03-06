/**
 * @description: 防抖
 * @param {any} fn
 * @param {number}  delay
 * @return {*}
 */
function debounce(fn: any, delay: number) {
  let timer: any
  return function res() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

/**
 * 节流
 * @param fn
 * @param delay
 * @returns
 */
function throttle(fn: any, delay: number) {
  const isThrottle = ref(true)
  return () => {
    if (!isThrottle.value) return
    isThrottle.value = false
    setTimeout(() => {
      fn()
      isThrottle.value = true
    }, delay)
  }
}

export { debounce, throttle }
