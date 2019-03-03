export function getToken() {
  return window.sessionStorage.getItem('token');
}

export function login(token) {
  return window.sessionStorage.setItem('token', token);
}

export function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
