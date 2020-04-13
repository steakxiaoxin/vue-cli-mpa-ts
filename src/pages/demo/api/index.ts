import request from '@/utils/request'
import { IDemoData } from './types'
import { prefix } from './prefix'

export const defaultDemoData: IDemoData = {
  id: 0,
  status: 'draft',
  timestamp: '',
  platforms: ['a-platform'],
  disableComment: false,
}

export const apiGet = (params: any = {}) => request.get(`${prefix}/get`, params)

export const apiPost = (data: any = {}) => request.post(`${prefix}/post`, data)
