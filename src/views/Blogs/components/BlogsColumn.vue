<script lang="ts" setup>
import { fyData, method } from '../data/column'
import { routerId } from '@/hooks/routers'
import { tool } from '@/utils/common/tool'

async function currentchange(val: number) {
  fyData.page = val
  await method.GetFy()
  tool.BackTop()
}
function getImageUrl(name: string) {
  return new URL(`/src/assets/img/${name}`, import.meta.url).href
}

onMounted(async () => {
  method.GetFy()
})
</script>

<template>
  <div class="blogs-content" v-for="res in fyData.resultData" :key="res.id">
    <div class="blogs-content_div">
      <div class="blogs-content_img">
        <img v-lazy="getImageUrl(res.img)" />
      </div>
      <div class="blogs-content__frame">
        <p class="blogs-content__frame-1">
          <a @click="routerId('/Blogs/BlogsContent', res.id)">{{ res.title }}</a>
        </p>
        <p class="blogs-content__frame-2">{{ res.sketch }}</p>
        <p class="blogs-content__frame-3">
          <span>文章</span>
          <span>{{ res.read }} ℃</span>
          <span>赞 {{ res.give }}</span>
          <span>{{ res.timeCreate.substring(0, 10) }}</span>
        </p>
      </div>
    </div>
  </div>
  <div class="blogs-page">
    <a-pagination
      size="small"
      @change="currentchange"
      :total="fyData.count"
      :pageSize="fyData.pagesize"
      show-quick-jumper
    ></a-pagination>
  </div>
  <!-- end 分页 -->
</template>

<style lang="scss" scoped>
.blogs-content {
  @apply m-2;

  .blogs-content_div {
    @apply flex h-155px mt-10px w-full;
    @apply rounded shadow hover:bg-gray-50;

    .blogs-content_img {
      @apply h-full p-2 w-[25%];
      img {
        @apply h-full w-full;
      }
    }

    .blogs-content__frame {
      @apply h-full w-[75%];
      .blogs-content__frame-1 {
        @apply cursor-pointer m-1  text-lg px-1;
        @include line-one;
      }

      .blogs-content__frame-2 {
        @apply h-[52%] m-1 p-1 px-2;
        @apply font-thin text-sm;
        @include line-numbers(4);
      }

      .blogs-content__frame-3 {
        @apply font-light m-1 px-1;
        span {
          @apply p-1;
        }
      }
    }
  }
}
.blogs-page {
  @apply bg-white rounded shadow w-full py-5;
}
</style>
