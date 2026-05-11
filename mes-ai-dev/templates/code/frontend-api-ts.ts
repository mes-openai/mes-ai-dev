/**
 * XXX相关API
 * @author AI-Assistant
 * @date YYYY-MM-DD
 */
import request from '@/utils/request';
import type {
  XxxDTO,
  XxxVO,
  XxxQueryDTO,
  PageVO,
  Result
} from '@/types/xxx';

export function createXxx(data: XxxDTO): Promise<Result<number>> {
  return request({
    url: '/api/xxx',
    method: 'post',
    data
  });
}

export function batchCreateXxx(dataList: XxxDTO[]): Promise<Result<number>> {
  return request({
    url: '/api/xxx/batch',
    method: 'post',
    data: dataList
  });
}

export function updateXxx(data: XxxDTO): Promise<Result<boolean>> {
  return request({
    url: '/api/xxx',
    method: 'put',
    data
  });
}

export function deleteXxx(id: number | string): Promise<Result<boolean>> {
  return request({
    url: `/api/xxx/${id}`,
    method: 'delete'
  });
}

export function getXxxById(id: number | string): Promise<Result<XxxVO>> {
  return request({
    url: `/api/xxx/${id}`,
    method: 'get'
  });
}

export function getXxxList(params: XxxQueryDTO): Promise<Result<XxxVO[]>> {
  return request({
    url: '/api/xxx/list',
    method: 'get',
    params
  });
}

export function getXxxPage(params: XxxQueryDTO): Promise<Result<PageVO<XxxVO>>> {
  return request({
    url: '/api/xxx/page',
    method: 'get',
    params
  });
}

export function checkXxxExists(columnName: string): Promise<Result<boolean>> {
  return request({
    url: '/api/xxx/exists',
    method: 'get',
    params: { columnName }
  });
}
