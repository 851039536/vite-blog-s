<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { labels, article, sort, TOKEN } from '@/api'
import { formState, state } from './data'
import { routers, go } from '@/hooks/routers'
import { navName } from '../utils/data'

const route = useRoute()
const rid: any = ref(route.query.id)

const onSubmit = async () => {
  await article.UpdateAsync(formState).then(() => {
    message.info('更新完成')
    routers('/Admin-index/ArticleTable')
  })
}

async function GetApi() {
  state.resLabel = await labels.GetAllAsync(true)
  state.resSort = await sort.GetAllAsync(true)

  article.GetByIdAsync(rid.value, false).then((res) => {
    formState.id = res.data[0].id
    formState.commentId = res.data[0].commentId
    formState.give = res.data[0].give
    formState.labelId = res.data[0].labelId
    formState.read = res.data[0].read
    formState.sortId = res.data[0].sortId
    formState.text = res.data[0].text
    formState.title = res.data[0].title
    formState.sketch = res.data[0].sketch
    formState.img = res.data[0].img
    formState.userId = res.data[0].userId
  })
}
onMounted(async () => {
  await GetApi()
  await TOKEN()
  navName.name = '文章展示'
  navName.name2 = '文章编辑'
})
</script>

<template>
  <div class="form">
    <div class="form_content">
      <a-form :model="formState" :label-col="{ span: 2 }" :wrapper-col="{ span: 21 }">
        <div class="form_content_1">
          <a-form-item label="标题" :wrapper-col="{ span: 6, offset: 0 }">
            <a-input v-model:value="formState.title" />
          </a-form-item>
          <a-form-item label="内容简述">
            <a-input v-model:value="formState.sketch" />
          </a-form-item>

          <a-form-item label="标签" :wrapper-col="{ span: 6, offset: 0 }">
            <a-select v-model:value="formState.labelId" placeholder="请选择">
              <a-select-option v-for="item in state.resLabel.data" :key="item.id" :label="item.id" :value="item.id">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="类别" :wrapper-col="{ span: 6, offset: 0 }">
            <a-select v-model:value="formState.sortId" placeholder="请选择">
              <a-select-option v-for="item in state.resSort.data" :key="item.id" :label="item.id" :value="item.id">{{
                item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="内容">
            <v-md-editor v-model="formState.text"></v-md-editor>
          </a-form-item>
        </div>
      </a-form>
    </div>
    <div>
      <a-button type="primary" @click="onSubmit">更新</a-button>
      <a-button style="margin-left: 10px" @click="go(-1)">返回</a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form {
  @apply h-full w-full;

  .form_content {
    @apply bg-white h-[480px] overflow-auto;

    .form_content_1 {
      @apply mt-3;
    }
  }
}
</style>
