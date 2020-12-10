<template>
  <Modal v-if="model.show" @close="model.show = false">
    <template slot="body">
      <div v-if="!image" v-cloak @drop.prevent="add" @dragover.prevent>
        <label class="modal__upload-section" for="file-upload">
          <span class="modal__spinner-wrapper"></span>
          <inline-svg src="/icons/upload-icon.svg"/>
        </label>
        <div style="margin-bottom: 34px;">
          <span v-if="errors.fileType" class="error input-group__invalid" style="justify-content: center;">{{errors.fileType}}</span>
          <h2 class="modal__title-gross">DRAG &amp; DROP</h2>
          <span class="modal__description">your document, or</span>
          <label for="file-upload" class="custom-file-upload">Browse</label>
          <input id="file-upload" type="file" accept="image/png, image/jpg, image/jpeg" @change="change">
        </div>
        <div>
          <span class="modal__text modal__text_type_bold">Upload your photo</span>
          <span class="modal__text modal__text_type_large">(jpg or png, not more than </span>
          <span class="modal__text modal__text_type_large">5 Mb)</span>
        </div>
      </div>
      <div v-else>
        <div v-if="model.mode === 'photos'">
          <img :src="image" alt="">
          <br>
          <span class="error input-group__invalid" v-if="errors.fileType" style="justify-content: center;">{{errors.fileType}}</span>
          <span class="error input-group__invalid" v-else-if="errors.fileSize" style="justify-content: center;">{{errors.fileSize}}</span>
        </div>
        <span v-else>
          <vue-cropper ref="cropper" :src="image" :aspectRatio="ratio"/>
        </span>

        <br><br>
        <button class="btn" @click="handleBack">Back</button>
        <button class="btn" :disabled="disabled" @click="upload">Done</button>
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
  mode: string
}

export interface IErrors {
  fileType: string,
  fileSize: string,
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
      image: '',
      cropImg: '',
      errors:{
        fileType:'',
        fileSize:'',
      }
    }
  },

  watch: {
    'model.show'(v) {
      if (!v) {
        this.model.mode = '';
        this.image = '';
      }
    }
  },

  computed: {
    ratio(): string | unknown {
      return this.model.mode === 'avatar' ? 1 : 6;
    },
    disabled(): boolean {
      return Boolean(this.errors.fileSize) || Boolean(this.errors.fileType);
    }
  },

  methods: {
    add(e) {
      const droppedFiles = e.dataTransfer.files[0];
      if (!droppedFiles) return;
      const reader = new FileReader();
      reader.readAsDataURL(droppedFiles);
      if (droppedFiles.type == 'video/mp4' ||
          droppedFiles.type == 'video/avi' ||
          droppedFiles.type == 'video/mov' ||
          droppedFiles.type == 'video/webm' ||
          droppedFiles.type == 'video/m4v') {
        this.image = '';
        this.errors.fileType = 'Wrong extension. Supported: jpg, jpeg, png';
      } else {
        this.errors.fileType = '';
        reader.onload = () => {
          this.image = reader.result as string
        };
      }
    },
    change(event) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      if (event.target.files[0].type == 'video/mp4' ||
          event.target.files[0].type == 'video/avi' ||
          event.target.files[0].type == 'video/mov' ||
          event.target.files[0].type == 'video/webm' ||
          event.target.files[0].type == 'video/webm' ||
          event.target.files[0].type == 'video/m4v') {
        this.image = '';
        this.errors.fileType = 'Wrong extension. Supported: jpg, jpeg, png';
      } else {
        this.errors.fileType = '';
        reader.onload = () => {
          this.image = reader.result as string
        };
      }

    },
    upload() {
      if (this.model.mode !== 'photos') {
        this.cropImg = this.$refs.cropper['getCroppedCanvas']().toDataURL();
      }
      let photoUpload = this.model.mode == 'photos' ? this.image : this.cropImg;
      this.$store.dispatch('media/uploadImage', photoUpload).then(data => {
        this.$emit('done', {mode: this.model.mode, image: data});
        this.model.show = false;
      }, (errors) => {
        this.errors.fileSize = errors.size;
        this.errors.fileType = errors.mime || errors.ext;
      });
    },

    handleBack(){
      this.image = '';
      this.errors.fileSize = ''
    }
  }
})
</script>


<style scoped>
.input-group__invalid {
  position: relative;
  top: 15px;
}
</style>
