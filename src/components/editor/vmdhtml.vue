<script setup lang="ts">
import { article } from '@/api/index'

const route = useRoute()
const state: any = reactive({
  blog: [],
  id: route.query.id,
  titles: []
})

const GetAll = async () => {
  await article.GetByIdAsync(state.id, true).then((res: any) => {
    const { title, text } = res.data[0]
    state.blog = { title, text }
  })
}

const { proxy }: any = getCurrentInstance()
const preview = ref()
function handleAnchorClick(anchor: any) {
  const { lineIndex } = anchor
  const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`)
  if (heading) {
    preview.value.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 60
    })
  }
}

onMounted(async () => {
  await GetAll()
  const anchors = proxy.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6')
  console.log('%c [ anchors ]-35', 'font-size:13px; background:pink; color:#bf2c9f;', anchors)
  const titles = Array.from(anchors).filter((title: any) => !!title.innerText.trim())
  if (!titles.length) {
    state.titles = []
    return
  }
  const hTags = Array.from(new Set(titles.map((title: any) => title.tagName))).sort()
  state.titles = titles.map((el: any) => ({
    title: el.innerText,
    lineIndex: el.getAttribute('data-v-md-line'),
    indent: hTags.indexOf(el.tagName)
  }))
})
</script>
<template>
  <div class="m-auto w-[80%]">
    <a-back-top />
    <div class="vmd">
      <a-page-header style="border: 1px solid rgb(235, 237, 240)" :title="state.blog.title" />
      <v-md-preview :text="state.blog.text" ref="preview" />
    </div>
    <div class="anchor">
      <div class="anchor_tag" v-for="anchor in state.titles" :key="anchor" @click="handleAnchorClick(anchor)">
        {{ anchor.title }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vmd {
  @apply bg-gray-50 mt-3 ml-[3%] w-[77%];
}
.anchor {
  @apply rounded top-[7%] right-[3%] w-[16%] z-10 fixed;
  .anchor_tag {
    @apply bg-white cursor-pointer  m-1 text-base p-2;
    &:hover {
      @apply rounded bg-blue-100;
    }
  }
}
</style>
