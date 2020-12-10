<template>
  <Modal v-if="model.show" @close="model.show = false">
    <template slot="body">
      <div v-cloak @drop.prevent="add" @dragover.prevent>
        <label class="modal__upload-section" for="file-upload">
          <span class="modal__spinner-wrapper"></span>
          <inline-svg src="/icons/upload-icon.svg"/>
        </label>

        <span v-if="video" class="modal__text modal__text_type_large" style="margin-bottom: 14px">
          {{ name }}
        </span>

        <div style="margin-bottom: 34px;">
          <div class="error input-group__invalid" v-if="errors.fileType"
               style="justify-content: center; margin-bottom: 10px">{{ errors.fileType }}
          </div>
          <div class="error input-group__invalid" v-else-if="errors.fileSize"
               style="justify-content: center; margin-bottom: 10px">{{ errors.fileSize }}
          </div>
          <h2 class="modal__title-gross">DRAG &amp; DROP</h2>
          <span class="modal__description">your document, or</span>
          <label for="file-upload" class="custom-file-upload">Browse</label>
          <input ref="file" id="file-upload" type="file" accept="video/mp4, video/avi, video/mov, video/m4v"
                 @change="change">
        </div>

        <div v-if="!video">
          <span class="modal__text modal__text_type_bold">Upload your video</span> <br>
          <span class="modal__text modal__text_type_large">(not more than 100 Mb)</span>
        </div>

        <div v-else>
          <button class="btn" @click="model.show = false">Cancel</button>
          <button class="btn" :disabled="disabled" @click="upload">Done</button>
        </div>
      </div>

    </template>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import modal from '~/components/ui/modal.vue'
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export interface IModel {
  show: boolean,
}

export default Vue.extend({
  components: {modal, VueCropper},
  props: {
    model: {
      type: Object as PropType<IModel>,
      required: true,
    },
  },

  data() {
    return {
      video: null as any,
      name: '',
      errors: {
        fileType: '',
        fileSize: '',
      }
    }
  },

  computed: {
    disabled(): boolean {
      return Boolean(this.errors.fileSize) || Boolean(this.errors.fileType);
    }
  },

  watch: {
    'model.show'(v) {
      if (!v) {
        this.video = '';
        this.name = '';
      }
    }
  },

  methods: {
    add(event) {
      const droppedFiles = event.dataTransfer.files[0];
      this.video = droppedFiles
      this.name = droppedFiles.name;

    },
    change(event) {
      this.errors.fileType = '';
      this.errors.fileSize = '';
      this.video = this.$refs.file['files'][0];
      this.name = this.video.name;
    },
    upload() {
      const data = new FormData();
      data.append('file', this.video);
      this.$store.dispatch('media/uploadVideo', data).then(data => {
        this.$emit('done', {video: data});
        this.errors.fileType = '';
        this.errors.fileSize = '';
        this.model.show = false;
      }, (errors) => {
        this.errors.fileType = errors.mime || errors.ext;
        this.errors.fileSize = errors.size;
      });
    }
  }
})
</script>
