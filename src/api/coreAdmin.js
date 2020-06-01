import request from '@/utils/request'

/**
 * 新增
 * @param {Object} data 管理员
 */
export function create(data) {
  return request({
    url: '/core/admin/create',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {Number} coreAdminId 管理员 ID
 */
export function remove(coreAdminId) {
  return request({
    url: '/core/admin/remove/' + coreAdminId,
    method: 'delete'
  })
}

/**
 * 编辑
 * @param {Object} data 管理员
 */
export function update(data) {
  return request({
    url: '/core/admin/update',
    method: 'put',
    data
  })
}

/**
 * 获取
 * @param {Number} adminId 管理员 ID
 */
export function fetchData(coreAdminId) {
  return request({
    url: '/core/admin/get/' + coreAdminId,
    method: 'get'
  })
}

/**
 * 分页
 * @param {Object} query 页码 + 笔数 + 条件
 */
export function fetchList(query) {
  return request({
    url: '/core/admin/page',
    method: 'get',
    params: query
  })
}
