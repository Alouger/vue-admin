/**
 * 通过url判断是否为外部资源，此功能常用，所以我们把它写在了utils里
 */
export function isExternal(path) {
  // 只要是https或mailto或tel开头的我们都认为是外部资源
  return /^(https?:|mailto:|tel:)/.test(path)
}
