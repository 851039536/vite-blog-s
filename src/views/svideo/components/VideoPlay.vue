<script lang="ts" setup>
import { video } from '@/api'

const route = useRoute()

interface ResData {
  URL: string
  typeName: string
  resultData: any
}
const resData: ResData = reactive({
  URL: '',
  typeName: 'LOL',
  resultData: []
})

const resId = reactive({
  id: route.query.id
})

const GetApi = async () => {
  await video.GetTypeAsync(1, resData.typeName, true).then((res: any) => {
    resData.resultData = res.data
  })
  await video.GetByIdAsync(resId.id, true).then((res: any) => {
    resData.URL = res.data.url
  })
}

const videos = async (vid: number) => {
  await video.GetByIdAsync(vid, true).then((res: any) => {
    resData.URL = res.data.url
  })
}
GetApi()
</script>

<template>
  <section>
    <s-header></s-header>
    <div class="video-play">
      <div class="video-play_main">
        <div class="video-play-2">
          <div class="video-play-2-1" v-for="res in resData.resultData" :key="res.id">
            <div class="video-play-2-1-1">
              <img src="@/assets/img/sp.png" />
            </div>
            <div class="video-play-2-1-2">
              <a @click="videos(res.id)">{{ res.title }}</a>
            </div>
            <div class="video-play-2-1-3">
              {{ res.timeModified.substring(0, 10) }}
            </div>
          </div>
        </div>

        <div class="video-play-1">
          <iframe
            id="if"
            :src="resData.URL"
            scrolling="no"
            border="0"
            frameborder="no"
            framespacing="0"
            allowfullscreen="true"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.video-play {
  @apply h-[90%] top-[8.5%] left-[3%] w-[94%] fixed;
  .video-play_main {
    @apply flex;
    @include initialize(100%, 100%, null, null, null, null, #ffffff);
    .video-play-1 {
      @include w-h(80%, 100%);
      @apply m-2 p-1;
      #if {
        margin: 0 auto;

        @include w-h(100%, 100%);
      }
    }

    .video-play-2 {
      width: 19%;

      @apply cursor-pointer overflow-auto;

      .video-play-2-1 {
        @include w-h(100%, 185px);
        @apply shadow mb-1;
        .video-play-2-1-1 {
          height: 65%;
          img {
            @include w-h(100%, 115px);
          }
        }

        .video-play-2-1-2 {
          height: 18%;
          @include line-numbers(2);
          @apply text-base p-1;
        }

        .video-play-2-1-3 {
          height: 17%;
          @apply text-base  p-1;
        }
      }
    }
  }
}

// @screen xp {
//   .video-play-2 {
//     @apply hidden;
//   }

//   .video-play .video-play_main .video-play-1 {
//     width: 100%;
//     height: 90%;
//   }
// }
</style>
