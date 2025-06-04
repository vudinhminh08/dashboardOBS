

export interface GetListCategoriesRequest{
  page: number,
  size: number,
  name?: string,
}

export interface ItemCategory{
  id: number,
  code: string,
  name: string,
  description: string,
  status: number,
}



export interface SaveCategoryRequest{
  id?: number,
  code: string,
  name: string,
  description: string,
  status: number,
}




export interface GetCategoryDetailRequest{
  page: number,
  size: number,
  globalListId: number,
}


export interface ItemCategoryDetailList{
  id: number,
  globalListId: number,
  name: string,
  code: string,
  value: number,
  orderGlobalListDetail: number,
  description: string,
  status: number,
}



export interface SaveCategoryDetailValueItemRequest{
  id?: number,
  code: string,
  name: string,
  description: string,
  status: number,
}


