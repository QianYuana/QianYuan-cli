class PrefetchLazyComponent {
  // 存储懒加载组件的Map
  private static components = new Map();

  // 添加懒加载组件
  static add(path: any, component: any) {
    this.components.set(path, component);
  }

  // 获取懒加载组件
  static get(path: any) {
    return this.components.get(path);
  }
}
export default PrefetchLazyComponent;