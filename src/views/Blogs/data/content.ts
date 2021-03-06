import { article } from '@/api/index'
import { throttle } from '@/utils/common/dethrottle'

interface State {
  resultData: any
  labelName: string
  sortName: string
  time: any
  spinning: boolean
}
export const state: State = reactive({
  resultData: [],
  labelName: '',
  sortName: '',
  time: '',
  spinning: true
})
export class method {
  static async UpRead(res: any) {
    if (res !== null) {
      res.read += 1
      await article.UpdatePortionAsync(res, 'Read')
    }
  }

  static UpGive = throttle(() => {
    state.resultData.give += 1
    article.UpdatePortionAsync(state.resultData, 'Give')
  }, 1000)
}
