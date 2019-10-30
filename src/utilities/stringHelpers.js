export function validateEmail(email) {
  if (typeof (email) === 'string' && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  return (false)
}

export function stringToHSLColor(str, s = 50, l = 60) {
  if (typeof str !== 'string') {
    return '#ffffff'
  }
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
}