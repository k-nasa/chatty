export function getToken() {
  return window.sessionStorage.getItem('token');
}

export function login(token) {
  return window.sessionStorage.setItem('token', token);
}
