function LoadingBar({ isLoading }) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="md-progress-bar md-indeterminate">
      <div className="md-progress-bar-track"></div>
      <div className="md-progress-bar-fill"></div>
      <div className="md-progress-bar-buffer"></div>
    </div>
  )
}

export default LoadingBar
