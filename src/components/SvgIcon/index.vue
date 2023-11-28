<template>
  <div>
    <!-- 展示外部图标 -->
    <div
      v-if="isExternal"
      :style="styleExternalIcon"
      class="svg-external-icon svg-icon"
      :class="className"
    ></div>
    <!-- 展示内部图标 -->
    <!-- 把 aria-hidden="true" 加到元素上会把该元素和它的所有子元素从无障碍树上移除。这样做可以通过隐藏下列内容来提升使用辅助技术的用户体验：
        1. 纯装饰性的内容，如图标、图片
        2. 重复的内容，如重复的文本
        3. 屏幕外或被折叠的内容，如菜单 -->
    <svg v-else class="svg-icon" :class="className" aria-hidden="true">
      <!-- 使用XLink属性来引用一个名为"iconName"的图标 -->
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { isExternal as external } from '@/utils/validate'

const props = defineProps({
  // icon图标
  icon: {
    type: String,
    required: true
  },
  // 图标类名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判断当前图标是否是外部图标
 */
// 通过url或路径判断一个资源是否是外部资源
const isExternal = computed(() => external(props.icon))
/**
 * 外部图标样式
 */
// 这是对于外部图标的固定写法
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 内部图标
 */
// 对于内部图标，我们不需要做什么处理，我们只需要给所有传递过来的图标添加上一个前缀就可以
const iconName = computed(() => `#icon-${props.icon}`)
</script>

<style scoped>
/*
· width: 1em; 和 height: 1em; 设置了SVG图标的宽度和高度为当前元素的字体大小（em单位表示相对于当前元素的字体大小）的1倍。这使得SVG图标的大小与周围的文本内容保持一致。

· vertical-align: -0.15em; 设置了SVG图标相对于其父元素的垂直对齐方式。具体地，将图标向上偏移0.15倍的当前元素的字体大小。这可以用来微调图标与相邻文本的垂直对齐。

· fill: currentColor; 设置了SVG图标的填充颜色为当前元素的文本颜色。currentColor是一个CSS关键字，表示使用当前元素的文本颜色作为填充颜色。

· overflow: hidden; 设置了溢出部分的隐藏。如果SVG图标的尺寸超过了其父元素的尺寸，那么超出部分将被隐藏起来。

· mask-size: cover !important; 设置了SVG图标的遮罩大小为覆盖整个元素。mask-size属性控制遮罩的大小，cover关键字表示遮罩将被拉伸以覆盖整个元素。!important是一个CSS规则，它指示这个属性值具有最高的优先级，将覆盖任何其他可能存在的相同属性的值。
*/
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
