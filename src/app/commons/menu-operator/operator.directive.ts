import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {OperatorItem} from './menu-operator-item';
import {MenuOperatorProvider} from './menu-operator-provider';


const OPERATORS = new Map<string, OperatorItem>();

@Directive({
  selector: '[appOperator]'
})
export class OperatorDirective {
  @Input('appOperator')
  set condition(data: OperatorData) {
    this.viewContainer.clear();
    if (this.provider.confirmOperator(data.code) && OPERATORS.has(data.code)) {
      const item = OPERATORS.get(data.code);
      if (!item.show || item.show(data.data)) {
        // 创建模板对应的内嵌视图
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private provider: MenuOperatorProvider,
  ) {
  }
}


/**
 * 按钮权限配置
 * @param btns 配置
 */
export function MenuOperators(items: OperatorItem[]) {
  for (const item of items) {
    OPERATORS.set(item.code, item);
  }
  return (target) => {
  };
}

export interface OperatorData {
  code: string;
  data?: any;
}
