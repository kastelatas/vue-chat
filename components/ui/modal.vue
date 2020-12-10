<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper" @mousedown="outside">
        <div class="modal-container">
          <div class="modal" :class="modalClass">
            <button class="modal__close btn-icon btn-icon_type_close" @click="$emit('close')">
              <span class="btn-icon__content">
                <inline-svg src="/icons/close.svg"/>
              </span>
            </button>
            <div class="modal-header">
              <h3 class="modal__title">
                <slot name="header"></slot>
              </h3>
            </div>
            <div class="modal-body" >
              <slot name="body"></slot>
            </div>
            <div class="modal-footer modal__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

interface IData {
}

export default Vue.extend({
  data: (): IData => {
    return {}
  },
  props: {
    modalClass: {
      type: String
    }
  },
  methods: {
    outside(ev) {
      if (ev.target.className == 'modal-wrapper') {
        this.$emit('close');
      }
    }
  },
})
</script>

<style>
.category-card a {
  color: inherit;
}
</style>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: auto;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal__title {
  margin-bottom: 0;
}

.modal-body {
  margin-top: 33px;



}
.modal-body img {
  width: 100%;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
