  <template>
  <form action="" class="help-page__form" @submit.prevent="sumbitForm">
    <h2>Contacting HugWord support service</h2>
    <span v-if="auth.identity === null || auth.identity.status === 0" class="input-group  ">
    <span class="input-group_block">
       <div class="input-group input-group_block">
        <span class="input-group__icon">
           <inline-svg src="/icons/Name.svg" alt=""/>
        </span>
       <input type="text" placeholder="Enter your name" v-model="name" required/>
     </div>
     <div class="input-group input-group_block">
        <span class="input-group__icon">
           <inline-svg src="/icons/main-letter.svg" alt=""/>
        </span>
       <input type="email" placeholder="Enter your email" v-model="email" required/>
     </div>
      <!--    <div class="input-group input-group_block">-->
      <!--        <span class="input-group__icon">-->
      <!--           <inline-svg src="/icons/main-text.svg" alt="" />-->
      <!--        </span>-->
      <!--      <input type="text" placeholder="Enter your phone" v-model="phone" />-->
      <!--    </div>-->
    </span>
   </span>
    <div class="input-group input-group_block">
        <span class="input-group__icon">
          <inline-svg src="/icons/main-check-red.svg"/>
        </span>
      <vue-select
        :options="options"
        v-model="selected"
        placeholder="Choose a topic"
      />
    </div>
    <div class="input-group input-group_block">
        <span class="input-group__icon">
           <inline-svg src="/icons/main-text.svg" alt=""/>
        </span>
      <input type="text" placeholder="Please describe in detail your problem with HugWord service" v-model="text" required/>
    </div>

    <div class="help-page__actions">
      <!--      <button-->
      <!--        class="btn btn_block btn-outline-primary"-->
      <!--        type="button"-->
      <!--      >-->
      <!--        Add skreenshot-->
      <!--      </button>-->

      <button class="btn btn_block" type="submit">
        Сreate a ticket
      </button>
    </div>
    <div v-if="success" class="help-page__success">
      Request has been sent
    </div>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import {IAmbassador} from "~/types/core";
import * as core from "~/types/core";

export interface IData {
  name: string,
  email: string,
  phone: number | null,
  selected: string,
  text: string,
  auth: Object
}

interface IOption {
  value: number
  label: string
}

export default Vue.extend({
  data() {
    return {
      name: '' as string,
      email: '' as string,
      phone: null as number | null,
      selected: '' as any,
      text: '' as string,
      success: false,
      topics: [] as any,
      auth: {} as any,
    }
  },
  computed: {
    options(): IOption[] {
      return this.topics.map((item: any) => ({value: item.id, label: item.title}));
    },
  },
  methods: {
    sumbitForm() {
      let formData = {};
      if (this.auth.id == null) {
        formData = {
          name: this.name,
          email: this.email,
          select: this.selected.label  ,
          text: this.text
        };
      } else {
        formData = {
          name: this.auth.identity.profile.name,
          email: this.auth.identity.email,
          select: this.selected.label  ,
          text: this.text
        };
      }

      console.log(formData)

      this.$store.dispatch('user/helpCenter', formData).then(()=> {
        this.success = true
      }, (error) => {

      })
      // this.name = '';
      // this.email = '';
      // this.selected = '';
      // this.text = '';

    }
  },
  async fetch() {
    this.auth = this.$store.state.user;
    this.topics = await this.$store.dispatch('topics') ;
    console.log(this.topics)
  },
  fetchOnServer: false
})
</script>

<style scoped lang="scss">
.v-select {
  width: 100%;

}
.vs__dropdown-toggle {
  border:none !important
}
</style>
