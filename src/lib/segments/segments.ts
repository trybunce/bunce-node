import type { AxiosResponse } from 'axios'
import { Http } from '../bunce.interface'
import type {
  AddSegmentCustomersRequestPayload,
  CreateSegmentRequestPayload,
  ISegments,
  RemoveSegmentCustomersRequestPayload,
  SegmentMutationResponsePayload,
  SegmentQueryOptions,
  SegmentResponsePayload,
  SegmentsResponsePayload,
  UpdateSegmentRequestPayload,
} from './segments.interface'

export class Segments extends Http implements ISegments {
  async create(
    segment: CreateSegmentRequestPayload,
  ): Promise<AxiosResponse<SegmentResponsePayload>> {
    return await this.http.post('/segments', segment)
  }

  async list(query?: SegmentQueryOptions): Promise<AxiosResponse<SegmentsResponsePayload>> {
    return await this.http.get('/segments', { params: query })
  }

  async get(segmentId: string): Promise<AxiosResponse<SegmentResponsePayload>> {
    return await this.http.get(`/segments/${segmentId}`)
  }

  async update(
    segmentId: string,
    segment: UpdateSegmentRequestPayload,
  ): Promise<AxiosResponse<SegmentResponsePayload>> {
    return await this.http.patch(`/segments/${segmentId}`, segment)
  }

  async addCustomers(
    segmentId: string,
    payload: AddSegmentCustomersRequestPayload,
  ): Promise<AxiosResponse<SegmentMutationResponsePayload>> {
    return await this.http.post(`/segments/${segmentId}/customers`, payload)
  }

  async addAllCustomers(segmentId: string): Promise<AxiosResponse<SegmentMutationResponsePayload>> {
    return await this.http.post(`/segments/${segmentId}/all-customers`, {})
  }

  async removeCustomers(
    segmentId: string,
    payload: RemoveSegmentCustomersRequestPayload,
  ): Promise<AxiosResponse<SegmentMutationResponsePayload>> {
    return await this.http.delete(`/segments/${segmentId}/customers`, { data: payload })
  }
}
