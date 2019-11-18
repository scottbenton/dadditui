export function validateEmail(email) {
  if (
    typeof email === "string" &&
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
  ) {
    return true;
  }
  return false;
}
