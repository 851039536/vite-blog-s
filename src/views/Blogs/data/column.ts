import { article } from '@/api'

export const fyData: any = reactive({
  resultData: [],
  page: 1,
  pagesize: 8,
  count: 0
})

export class method {
  static async GetCount() {
    await article.GetCountAsync(1, '转载', true).then((result: any) => {
      fyData.count = result.data
    })
  }

  static async GetFy() {
    await method.GetCount()
    await article.GetFyAsync(1, '转载', fyData.page, fyData.pagesize, 'id', true, true).then((res: any) => {
      fyData.resultData = res.data
    })
  }
}
