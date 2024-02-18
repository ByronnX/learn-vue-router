// history/hash.js
import { History } from "./base";

class BrowserHistory extends History {
  constructor(router) {
    super(router); // 调用父类构造方法，并将 router 实例传给父类
    this.router = router; // 存储 router 实例，共内部使用
    }
    setupListener(){
        // 当路径变化时，拿到新的 hash 值，并进行匹配跳转
        window.addEventListener('popState',()=>{
            this.transitionTo(getHash());
        })
    }
}

export default BrowserHistory;
