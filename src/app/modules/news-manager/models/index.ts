



export interface GetListNewsRequest{
  page: number,
  size: number,
  globalListDetailId?: number,
  startTime?: string,
  endTime?: string,
  title?: string,
  status?: number,
}


export interface SaveNewsItemRequest{
  id?: number,
  globalListDetailId: number,
  typeNews: string,
  status: number,
  title: string,
  description: string,
  content: string,
  link: string,
  source: string,
  startTime: string,
  endTime: string,
  bannerB64: string,
}





export interface ItemNewsResponsed{
  id: number,
  createDate: string,
  title: string,
  link: string,
  priority: number,
  content: string,
  source: string,
  description: string, // nội dung rút gọn
  typeNews: string,
  startTime: string,
  endTime: string,
  bannerLink: string,
  createBy: string,
  isHot: number,
  status: number,
  reason: string, // lý do từ chối duyệt
}



export interface ApproveArticlePostRequest{
  id: string,
  status: 1 | 3, // 1 = hiệu lực, 3 = từ chối
  reason?: string
}


export interface UpdateArticleStatusRequest{
  id: number,
  status: -1 | 0 | 1 | 2, // -1 = xóa, 0 = hết hiệu lực, 1 = hiệu lực, 2 = chờ duyệt
}


export interface UpdatePositionPostRequest{
  globalListDetailId: number,
  priorityDTOS: {id: number, priority: number}[]
}