export class WebResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  statusCode: number;
  page?: number;
  totalPage?: number;
}
