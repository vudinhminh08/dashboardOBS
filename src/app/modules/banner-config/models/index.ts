



export interface GetListNewsRequest{
  page: number,
  size: number,
  globalListDetailId?: number,
  startTime?: string,
  endTime?: string,
  title?: string,
  status?: number,
}




export interface SaveBannerItemRequest{
  id?: number,
  globalListDetailId: number,
  typeNews: string,
  bannerCode: string,
  bannerName: string,
  status: number,
  title: string,
  description: string,
  screenRedirect: string,
  content: string,
  link: string,
  source: string,
  startTime: string,
  endTime: string,
  bannerB64: string,
}


