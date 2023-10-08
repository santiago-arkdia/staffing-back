/**
 * Helper to check if an array is valid
 *
 * @param {*} array Array to be checked
 * @returns {boolean} true if array is valid
 */
export function isValidArray(array: any): boolean {
  return Array.isArray(array) && array?.length > 0;
}
