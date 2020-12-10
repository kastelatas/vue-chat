<template>
  <div class="oops-page">
    <inline-svg src="/icons/ERROR_ILLUSTRATION.svg"/>
    <p class="oops-page__text">
      Something went wrong. <br />
      Check your Internet connection or try again later.
    </p>
    <router-link class="btn" to="/help">
      Сontact support
    </router-link>
    <br />
    <router-link class="btn" to="/">
      Go back to the main page
    </router-link>
  </div>
</template>
