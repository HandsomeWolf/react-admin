let count = 0
let loadingTimeoutId: NodeJS.Timeout | number

export const showLoading = () => {
  clearTimeout(loadingTimeoutId)
  if (count === 0) {
    const loading = document.getElementById('loading')
    loading?.style.setProperty('display', 'flex')
  }
  count++
}

export const hideLoading = () => {
  count--
  if (count === 0) {
    // Set a delay before actually hiding the loading screen (500ms in this case)
    loadingTimeoutId = setTimeout(() => {
      const loading = document.getElementById('loading')
      loading?.style.setProperty('display', 'none')
    }, 500)
  }
}
