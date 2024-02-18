// history/hash.js
import { History } from "./base";

function ensureSlash() {
  // location.hash 存在兼容性问题，可根据完整 URL 判断是否包含'/'
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/'; // 如果当前路径没有hash，默认为 /
}
class HashHistory extends History {
  constructor(router) {
    super(router); // 调用父类构造方法，并将 router 实例传给父类
    this.router = router; // 存储 router 实例，共内部使用
    // Hash 模式下，对URL路径进行处理，确保包含'/'
    ensureSlash();
  }
  getCurrentLocation() {
    // 获取路径的 hash 值
    return getHash();
  }
  setupListener() {
    // 当 hash 值变化时，获取新的 hash 值，并进行匹配跳转
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
    });
  }
  // 实现 HashHistory 子类中的 push 方法：
  push(location) {
    // 跳转路径，并在跳转完成后更新 hash 值；
    // transitionTo内部会查重：hash 值变化虽会再次跳转，但不会更新current属性;
    this.transitionTo(location, () => {
      window.location.hash = location; // 更新hash值
    });
  }
}

export default HashHistory;

export function getHash() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href;
  const index = href.indexOf("#");
  // empty path
  if (index < 0) return "";

  href = href.slice(index + 1);

  return href;
}