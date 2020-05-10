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
 * 用户
 */
export interface UserListDetail { 
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
    /**
     * 用户id
     */
    id?: string;
    /**
     * 用户名称
     */
    name?: string;
    /**
     * 系统管理员
     */
    system?: boolean;
    /**
     * 更新者
     */
    readonly updatedDateTime?: Date;
    /**
     * 更新者
     */
    readonly updatedUserId?: string;
    /**
     * 用户名
     */
    username?: string;
}
