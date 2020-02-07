/**
 * 菜单项
 */
export interface MenuItem {
  /** 层级 */
  level?: number;
  /** 是否是公开的 */
  publicFlag: boolean;
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
  /** 子菜单 */
  children?: MenuItem[];
  /** 操作code */
  operators?: string[];
}
