<template>
  <Personal v-bind="$props"/>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import {IPersonal, IMedia, ISecurity} from '../profile.vue'
import Personal from './personal.vue'

export default Vue.extend({
  components: {Personal},
  props: {
    personal: {type: Object as PropType<IPersonal>, required: true},
    security: {type: Object as PropType<ISecurity>, required: true},
    media: {type: Object as PropType<IMedia>, required: true},
  },
})
</script>
