
export default (callback) => {
  let timeoutHandle
  return {
    cancelPolling() {
      clearTimeout(timeoutHandle)
    },
    startPolling(interval, cb = callback) {
      clearTimeout(timeoutHandle)
      setTimeout(cb, interval)
    },
  }
}
