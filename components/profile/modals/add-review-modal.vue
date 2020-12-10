<template>
  <Modal v-if="model.show" @close="cancel">
    <template slot="body">
      <div class="modal-spret ">
        <h3 class="modal__title">
          How do you feel <br/>
          about chat with {{ user && user.profile.name }}
        </h3>
        <div class="modal-spret__row">
          <img
            :src="user.profile.avatar.path | media(144)"
            :alt="user.profile.name"
            class="modal-spret__img-amba"
          />
          <div class="review-rating">
            <Rating class="chat__profile-vote-overlay" :text="false" :rating="rating" @click="click" :edit="edit"/>
            <div v-if="errors.rating" style="color:red; padding-top: 5px;">{{ errors.rating }}</div>
          </div>
        </div>

        <div class="input-group">
        <span class="input-group__icon">
          <inline-svg src="/icons/main-text.svg"/>
        </span>
          <div class="input-group__block">
            <input name="text" type="text" placeholder="Review text..." v-model="comment"/>
            <div v-if="errors.message" style="color:red; padding-top: 5px;">{{ errors.message }}</div>
          </div>
        </div>
        <div class="modal__actions">
          <button class="btn" type="button" @click="submit">
            Done
          </button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue'
import Rating from "~/components/ui/user/rating.vue"
import modal from '~/components/ui/modal.vue'
import * as core from "~/types/core"

interface IModel {
  show: boolean
}

export default Vue.extend({
  components: {modal, Rating},
  props: {
    model: {
      required: true,
      type: Object as PropType<IModel>,
    },
    user: {
      type: Object as PropType<core.IAmbassador>,
    }
  },
  data() {
    return {
      edit: true,
      comment: '',
      rating: 0,
      errors: {
        message: '',
        rating: '',
      }
    }
  },
  methods: {
    done() {
      this.$emit('done');
      this.model.show = false;
    },

    cancel() {
      this.$emit('cancel');
      this.model.show = false;
    },

    click(value: number) {
      this.rating = value;
    },

    submit() {
      this.$store.dispatch('ambassador/leaveReview', {
        ambassador_profile_id: this.user.profile.id,
        message: this.comment,
        rating: this.rating
      }).then(() => {
        this.errors.message = '';
        this.model.show = false
        this.$emit('done');
      }, errors => {
        this.errors.message = errors.message
      });
    }
  },
  async fetch () {
    await this.$store.dispatch('user/init');
    this.rating = this.user.profile.rating ? this.user.profile.rating.rating : 0
  },

  fetchOnServer: true,
})
</script>
