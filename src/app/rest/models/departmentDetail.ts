/**
 * 
 * 组织机构
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


/**
 * 部门详情
 */
export interface DepartmentDetail { 
    /**
     * 创建时间
     */
    readonly createdDateTime?: Date;
    /**
     * 创建者
     */
    readonly createdUserId?: string;
    readonly deletedDateTime?: Date;
    /**
     * 删除标志
     */
    readonly deletedFlag?: boolean;
    /**
     * 删除者
     */
    readonly deletedUserId?: string;
    id?: string;
    name?: string;
    /**
     * 更新者
     */
    readonly updatedDateTime?: Date;
    /**
     * 更新者
     */
    readonly updatedUserId?: string;
}
