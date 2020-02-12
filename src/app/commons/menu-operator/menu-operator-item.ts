/**
 * 菜单项
 */
export interface MenuOperatorItem {
  /** 层级 */
  level?: number;
  /** 菜单名 */
  title: string;
  /** 菜单编码 */
  code?: string;
  /** 图标 */
  icon?: string;
  /** 路劲 */
  path?: string;
  /** 是否展开 */
  open?: boolean;
  /** 选中 */
  selected?: boolean;
  /** 是否在菜单中展示 */
  disabled?: boolean;
  /**
   * 是否可配置
   * 叶子节点有效
   */
  configurable: boolean;
  /** 子菜单 */
  children?: MenuOperatorItem[];
  /** 操作code */
  operators?: string[];
  /** 权限 */
  permissions?: PermissionItem[];
}

/**
 * 操作项
 */
export interface OperatorItem {
  /** 操作code */
  code: string;
  /** 操作名 */
  name?: string;
  /** 是否展示回调 */
  show?: (data: any) => boolean;
  /** 权限 */
  permissions?: PermissionItem[];
}

/**
 * 权限项
 */
export interface PermissionItem {
  /** 方法： GET,POST,PUT,DELETE,HEAD */
  method: string;
  /** 访问路径 */
  path: string;
}

