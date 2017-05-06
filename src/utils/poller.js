
export default (callback) => {
  let timeoutHandle
  return {
    cancelPolling() {
      clearInterval(timeoutHandle)
    },
    startPolling(interval, cb = callback) {
      clearInterval(timeoutHandle)
      timeoutHandle = setInterval(cb, interval)
    },
  }
}
