<template>
  <div v-if="!session.cookiesAccepted" class="cookie-bar">
    <i></i>
    <p>
      <span class="hide-on-mobile"
        >This site uses cookies to help improve the user experience.</span
      >
      By using Color Wallet, you accept our
      <router-link to="/terms" class="link">Terms of Service</router-link> and
      <router-link to="/privacy" class="link">Privacy Policy</router-link>.
    </p>
    <a class="close">
      <i class="material-icons" @click="accept">close</i>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
  name: `cookie-bar`,
  computed: {
    ...mapGetters([`session`])
  },
  methods: {
    accept() {
      this.$store.dispatch(`setAnalyticsCollection`, true)
      this.$store.dispatch(`setErrorCollection`, true)
      this.$store.dispatch(`storeLocalPreferences`)
    }
  }
}
</script>

<style scoped>
.cookie-bar {
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  padding: 1rem;
  font-family: var(--sans);
  background-color: var(--primary);
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  position: relative;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--bright);
}

.cookie-bar .link {
  text-decoration: underline;
  color: var(--bright) !important;
}

p {
  margin-bottom: 0 !important;
}

.cookie-bar .close {
  cursor: pointer;
  height: 1rem;
  width: 1rem;
  color: var(--bright) !important;
}

@media (max-width: 1024px) {
  .cookie-bar {
    bottom: 0;
    z-index: 99;
    padding: .5rem;
    justify-content: space-around;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
