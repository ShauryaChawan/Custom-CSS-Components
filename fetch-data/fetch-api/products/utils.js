export function showLoading(containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
        <div class="text-center my-5">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      `;
  }
}

export function showError(message, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = `
        <div class="alert alert-danger" role="alert">
          ${message}
        </div>
      `;
  }
}
