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
