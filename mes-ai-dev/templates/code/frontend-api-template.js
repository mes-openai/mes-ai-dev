// 前端API调用层模板 — 由 develop-frontend-api Skill 使用

/* JavaScript版本 */

/**
 * XXX相关API
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import request from '@/utils/request';

/**
 * 创建XXX记录
 * @param {Object} data - 创建参数
 * @returns {Promise}
 */
export function createXxx(data) {
  return request({
    url: '/api/xxx',
    method: 'post',
    data
  });
}

/**
 * 批量创建XXX记录
 * @param {Array} dataList - 创建参数列表
 * @returns {Promise}
 */
export function batchCreateXxx(dataList) {
  return request({
    url: '/api/xxx/batch',
    method: 'post',
    data: dataList
  });
}

/**
 * 更新XXX记录
 * @param {Object} data - 更新参数
 * @returns {Promise}
 */
export function updateXxx(data) {
  return request({
    url: '/api/xxx',
    method: 'put',
    data
  });
}

/**
 * 删除XXX记录
 * @param {Number|String} id - 记录ID
 * @returns {Promise}
 */
export function deleteXxx(id) {
  return request({
    url: `/api/xxx/${id}`,
    method: 'delete'
  });
}

/**
 * 根据ID查询XXX详情
 * @param {Number|String} id - 记录ID
 * @returns {Promise}
 */
export function getXxxById(id) {
  return request({
    url: `/api/xxx/${id}`,
    method: 'get'
  });
}

/**
 * 根据条件查询XXX列表
 * @param {Object} params - 查询条件
 * @returns {Promise}
 */
export function getXxxList(params) {
  return request({
    url: '/api/xxx/list',
    method: 'get',
    params
  });
}

/**
 * 根据条件分页查询XXX列表
 * @param {Object} params - 查询条件（包含分页参数）
 * @returns {Promise}
 */
export function getXxxPage(params) {
  return request({
    url: '/api/xxx/page',
    method: 'get',
    params
  });
}

/**
 * 校验XXX是否存在
 * @param {String} columnName - 字段名
 * @returns {Promise}
 */
export function checkXxxExists(columnName) {
  return request({
    url: '/api/xxx/exists',
    method: 'get',
    params: { columnName }
  });
}

/*
TypeScript版本

/**
 * XXX相关API
 * @author AI-Assistant
 * @date YYYY-MM-DD
 *\/ 
import request from '@/utils/request';
import type {
  XxxDTO,
  XxxVO,
  XxxQueryDTO,
  PageVO,
  Result
} from '@/types/xxx';

/**
 * 创建XXX记录
 * @param data - 创建参数
 * @returns 创建结果ID
 *\/ 
export function createXxx(data: XxxDTO): Promise<Result<number>> {
  return request({
    url: '/api/xxx',
    method: 'post',
    data
  });
}

/**
 * 批量创建XXX记录
 * @param dataList - 创建参数列表
 * @returns 创建成功数量
 *\/ 
export function batchCreateXxx(dataList: XxxDTO[]): Promise<Result<number>> {
  return request({
    url: '/api/xxx/batch',
    method: 'post',
    data: dataList
  });
}

/**
 * 更新XXX记录
 * @param data - 更新参数
 * @returns 更新结果
 *\/ 
export function updateXxx(data: XxxDTO): Promise<Result<boolean>> {
  return request({
    url: '/api/xxx',
    method: 'put',
    data
  });
}

/**
 * 删除XXX记录
 * @param id - 记录ID
 * @returns 删除结果
 *\/ 
export function deleteXxx(id: number | string): Promise<Result<boolean>> {
  return request({
    url: `/api/xxx/${id}`,
    method: 'delete'
  });
}

/**
 * 根据ID查询XXX详情
 * @param id - 记录ID
 * @returns 详情信息
 *\/ 
export function getXxxById(id: number | string): Promise<Result<XxxVO>> {
  return request({
    url: `/api/xxx/${id}`,
    method: 'get'
  });
}

/**
 * 根据条件查询XXX列表
 * @param params - 查询条件
 * @returns 列表信息
 *\/ 
export function getXxxList(params: XxxQueryDTO): Promise<Result<XxxVO[]>> {
  return request({
    url: '/api/xxx/list',
    method: 'get',
    params
  });
}

/**
 * 根据条件分页查询XXX列表
 * @param params - 查询条件（包含分页参数）
 * @returns 分页结果
 *\/ 
export function getXxxPage(params: XxxQueryDTO): Promise<Result<PageVO<XxxVO>>> {
  return request({
    url: '/api/xxx/page',
    method: 'get',
    params
  });
}

/**
 * 校验XXX是否存在
 * @param columnName - 字段名
 * @returns 是否存在
 *\/ 
export function checkXxxExists(columnName: string): Promise<Result<boolean>> {
  return request({
    url: '/api/xxx/exists',
    method: 'get',
    params: { columnName }
  });
}
*/
