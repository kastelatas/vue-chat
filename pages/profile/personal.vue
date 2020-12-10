<template>
  <div>

    <h3 class="profile__title">Your photos</h3>
    <div class="gallery">
      <div class="photo photo_add">
        <button type="button" class="btn-icon btn-icon_type_add-ring" @click="addPhoto">
          <span class="btn-icon__content">
            <inline-svg src="/icons/plus-grey.svg"/>
          </span>
        </button>
      </div>
      <div>
        <div class="carousel carousel__profile" v-if="media.data.photos.length">
          <Photos
            :photos="media.data.photos"
            :per-page-custom="[[1920,8], [1440,5], [1360,4], [1024,6], [991,5], [768,4], [425, 2], [375,2], [320,1] ]"
            @click="showPhotosLightbox"
            @remove="removePhoto"
            edit
          />
        </div>
      </div>
    </div>

    <div v-if="isAmbassador">
      <h3 class="profile__title">Your videos</h3>
      <div class="video-gallery">
        <div class="video video_add">
          <button type="button" class="btn-icon btn-icon_type_add-ring" @click="addVideo">
          <span class="btn-icon__content">
            <inline-svg src="/icons/plus-grey.svg"/>
          </span>
          </button>
        </div>
        <Videos v-if="media.data.videos.length" :videos="media.data.videos" @click="showVideosLightbox"
          @remove="removeVideo" edit/>
      </div>
    </div>
    <h3 class="profile__title">What do you want to talk about now?</h3>
    <Topics edit :topics="personal.data.topics"/>
    <span v-show="personal.errors.topics" class="error input-group__invalid">
      {{ personal.errors.topics }}
    </span>
    <h3 class="profile__title">Personal data</h3>
    <form class="profile-personals" @submit.prevent="submit" autocomplete="off">
      <div class="profile-personals__row">
        <div class="profile-personals__col">
          <div class="profile-personals__line">
            <inline-svg src="/icons/Name.svg"/>
            <div class="profile-personals__input-wrapper">
              <span class="profile-personals__linetitle">Your name:</span>
              <div class="input-group">
                <div class="input-group__block">
                  <input type="text" name="name" placeholder="Enter the name" maxlength="20"
                    v-model="personal.data.name">
                  <span v-show="personal.errors.name" class="error input-group__invalid">
                    {{ personal.errors.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-personals__line">
            <inline-svg src="/icons/main-letter-rassilka.svg"/>
            <div class="profile-personals__input-wrapper" style="display: flex; flex-direction: column">
              <span class="profile-personals__linetitle">Your email:</span>
              <div class="input-group">
                <div class="input-group__block">
                  <input type="text" name="email" placeholder="Email address" v-model="security.data.email">
                  <span v-show="security.errors.email" class="error input-group__invalid">
                    {{ security.errors.email }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="profile-personals__line">
            <inline-svg src="/icons/Gender.svg"/>
            <div style="display: flex; flex-direction: column">
              <span class="profile-personals__linetitle">Your gender:</span>
              <div class="radio-form">
                <label class="radio"><input type="radio" name="gender" v-model="personal.data.gender" value="1"><span>Male</span></label>
                <label class="radio"><input type="radio" name="gender" v-model="personal.data.gender" value="2"><span>Female</span></label>
                <label class="radio"><input type="radio" name="gender" v-model="personal.data.gender" :value="null"
                  checked=""><span>Unset</span></label>
              </div>
              <span v-show="personal.errors.gender" class="error input-group__invalid">
                {{ personal.errors.gender }}
              </span>
            </div>
          </div>
        </div>
        <div class="profile-personals__col">
          <div class="profile-personals__line">
            <inline-svg src="/icons/main-pass.svg"/>
            <span class="profile-personals__linetitle">Change password</span>
          </div>
          <div class="profile-personals__form">
            <div class="input-group">
              <div class="input-group__block">
                <input type="password" autocomplete="new-password" placeholder="Enter the existing password"
                  v-model="security.data.old_password">
                <span v-show="security.errors.old_password" class="error input-group__invalid">
                  {{ security.errors.old_password }}
                </span>
              </div>
            </div>
            <div class="input-group">
              <div class="input-group__block">
                <input type="password" autocomplete="new-password" placeholder="Enter new password"
                  v-model="security.data.new_password">
                <span v-show="security.errors.new_password" class="error input-group__invalid">
                  {{ security.errors.new_password }}
                </span>
              </div>
            </div>
            <div class="input-group">
              <div class="input-group__block">
                <input type="password" autocomplete="new-password" placeholder="Confirm new password"
                  v-model="security.data.confirm_password">
                <span v-show="security.errors.confirm_password" class="error input-group__invalid">
                  {{ security.errors.confirm_password }}
                </span>
              </div>
            </div>
            <div class="profile-personals__action">
              <button class="btn btn_block btn-outline-primary" type="button" @mousedown="reset" :disabled="disabled">
                Cancel
              </button>
              <button type="submit" class="btn btn_block" :disabled="disabled">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <template v-if="photosLightboxData">
      <light-box ref="lightbox" :media="photosLightboxData"
        :show-footer-count="photosLightboxData.length > 1"
        :show-thumbs="photosLightboxData.length > 1"
        :show-light-box="false"/>
    </template>

    <SetEmailModal :model="modals.setEmail"/>
    <VerifyEmailModal :modal="modals.verifyEmail" sent/>
    <SetPasswordModal :model="modals.setPassword"/>
    <ImageUploadModal :model="modals.imageUpload" @done="photoAdded"/>
    <VideoUploadModal :model="modals.videoUpload" @done="videoAdded"/>
    <ConfirmModal :model="modals.confirm" @done="done" @cancel="cancel"/>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from "vue"
import {IMedia, IPersonal, ISecurity} from "../profile.vue"
import SetEmailModal from '~/components/profile/modals/set-email-modal.vue'
import VerifyEmailModal from "~/components/layout/modals/verify-email-modal.vue"
import SetPasswordModal from "~/components/profile/modals/set-password-modal.vue"
import ImageUploadModal from "~/components/profile/modals/image-upload-modal.vue"
import VideoUploadModal from "~/components/profile/modals/video-upload-modal.vue"
import ConfirmModal from "~/components/profile/modals/are-you-sure-modal.vue"
import Photos from "~/components/ui/user/photos.vue"
import Videos from "~/components/ui/user/videos.vue"
import Topics from "~/components/ui/user/topics.vue"
import extend from "lodash/extend"
import isEqual from "lodash/isEqual"
import cloneDeep from "lodash/cloneDeep"
import * as core from "~/types/core";
import {EUserType} from "~/types/core";
import set from "lodash/set";

interface IData {
  callback: { () } | null
  modals: { [key: string]: { show: boolean, mode?: string } }
  stored: {
    personal: IPersonal
    security: ISecurity
  }
}

export default Vue.extend({
  components: {
    Photos,
    Videos,
    Topics,

    ConfirmModal,
    SetEmailModal,
    VerifyEmailModal,
    SetPasswordModal,
    ImageUploadModal,
    VideoUploadModal,
  },
  data(): IData {
    return {
      callback: null,
      modals: {
        confirm: {show: false},
        setEmail: {show: false},
        verifyEmail: {show: false},
        setPassword: {show: false},
        imageUpload: {show: false, mode: ''},
        videoUpload: {show: false},
      },
      stored: {
        personal: {} as IPersonal,
        security: {} as ISecurity,
      }
    }
  },
  props: {
    personal: {type: Object as PropType<IPersonal>, required: true},
    security: {type: Object as PropType<ISecurity>, required: true},
    media: {type: Object as PropType<IMedia>, required: true},
  },
  computed: {
    isAmbassador(): boolean {
      return (this.$store.state.user.identity && this.$store.state.user.identity.type == EUserType.Ambassador);
    },
    disabled(): boolean {
      return isEqual(this.personal, this.stored.personal) &&
        isEqual(this.security, this.stored.security);
    },
    photosLightboxData(): core.ILightBoxImage[] | null {
      const media: core.ILightBoxImage[] = [];
      const filters = this.$options.filters!;
      for (const photo of this.media.data.photos) {
        media.push({
          src: filters.media(photo.image.path),
          thumb: filters.media(photo.image.path, 135, 118),
        });
      }
      return media.length ? media : null;
    },
  },
  methods: {
    reset() {
      extend(this.personal, cloneDeep(this.stored.personal));
      extend(this.security, cloneDeep(this.stored.security));
    },

    submit() {
      this.confirm(() => {
        if (!isEqual(this.personal, this.stored.personal)) {
          this.storeProfile();
        }
        if (!isEqual(this.security.data, this.stored.security.data)) {
          if (this.security.data.email != this.stored.security.data.email) {
            this.storeEmail();
          }
          if (this.security.data.old_password || this.security.data.new_password || this.security.data.confirm_password) {
            if (this.security.data.new_password != this.security.data.confirm_password) {
              this.security.errors.old_password = '';
              this.security.errors.new_password = '';
              this.security.errors.confirm_password = 'Passwords do not match.';
            } else {
              this.storePassword();
            }
          }
        }
      });
    },

    storeProfile() {
      this.$store.dispatch('profile/save', {
        name: this.personal.data.name,
        description: this.personal.data.description,
        gender: this.personal.data.gender,
        topics: this.personal.data.topics.map(item => ({topic_id: item.topic_id}))
      }).then((data) => {
          this.stored.personal.data = data;
          this.personal.data = cloneDeep(data);
          this.personal.errors = this.stored.personal.errors;
          this.$store.commit('user/set', {
            identity: {profile: {name: this.personal.data.name}}
          });
        }, errors => {
          this.personal.errors = errors;
        }
      );
    },

    storeEmail() {
      if (this.$store.state.user.identity!.status) {
        this.$store.dispatch('user/setEmail', {
          email: this.security.data.email
        }).then(() => {
            this.modals.setEmail.show = true;
            this.stored.security.data.email = this.security.data.email;
            this.security.errors.email = this.stored.security.errors.email;
          }, errors => {
            this.security.errors.email = errors.email;
          }
        );
      } else {
        this.$store.dispatch('user/verifyEmail', {
          email: this.security.data.email
        }).then(() => {
            this.modals.verifyEmail.show = true;
            this.security.errors.email = this.stored.security.errors.email;
          }, errors => {
            this.security.errors.email = errors.email;
          }
        );
      }
    },

    storePassword() {
      this.$store.dispatch('user/setPassword', {
        old_password: this.security.data.old_password,
        new_password: this.security.data.new_password,
      }).then(() => {
          this.modals.setPassword.show = true;
          this.stored.security.data.old_password = '';
          this.stored.security.data.new_password = '';
          this.stored.security.data.confirm_password = '';
          this.security.data.old_password = '';
          this.security.data.new_password = '';
          this.security.data.confirm_password = '';
          extend(this.security.errors, this.stored.security.errors);
        }, errors => {
          this.security.errors.confirm_password = '';
          extend(this.security.errors, errors);
        }
      );
    },

    storePhotos() {
      const data = this.media.data.photos.map(item => ({image_id: item.image_id})).reverse();
      this.$store.dispatch('profile/save', set({}, 'photos', data));
    },

    storeVideos() {
      const data = this.media.data.videos.map(item => ({video_id: item.video_id})).reverse();
      this.$store.dispatch('profile/save', set({}, 'videos', data));
    },

    confirm(callback: { () }) {
      this.modals.confirm.show = true;
      this.callback = callback;
    },

    done() {
      this.callback && this.callback();
      this.callback = null;
    },

    cancel() {
      this.callback = null;
    },

    addPhoto() {
      this.modals.imageUpload.mode = 'photos';
      this.modals.imageUpload.show = true;
    },

    photoAdded(payload: { mode: string, image: core.IImage }) {
      this.media.data.photos.unshift({image_id: payload.image.id, image: payload.image});
      this.storePhotos();
    },

    removePhoto(photo: core.IProfilePhoto) {
      this.confirm(() => {
        for (const i in this.media.data.photos) {
          if (this.media.data.photos[i].image_id == photo.image_id) {
            this.media.data.photos.splice(Number(i), 1);
          }
        }
        this.storePhotos();
      });
    },

    showPhotosLightbox(index: number) {
      this.$refs.lightbox['showImage'](index);
    },

    addVideo() {
      this.modals.imageUpload.mode = 'videos';
      this.modals.videoUpload.show = true;
    },

    videoAdded(payload: { mode: string, video: core.IVideo }) {
      this.media.data.videos.unshift({video_id: payload.video.id, video: payload.video});
      this.storeVideos();
    },

    removeVideo(video: core.IProfileVideo) {
      this.confirm(() => {
        for (const i in this.media.data.videos) {
          if (this.media.data.videos[i].video_id == video.video_id) {
            this.media.data.videos.splice(Number(i), 1);
          }
        }
        this.storeVideos();
      });
    },

    showVideosLightbox(index: number) {
      this.$refs.lightbox['showVideos'](index);
    },
  },

  async fetch() {
    this.stored.personal = cloneDeep(this.personal);
    this.stored.security = cloneDeep(this.security);
  },
  fetchOnServer: false
})
</script>
