<script setup>
import { defineEmits, onMounted, onBeforeUnmount, ref } from 'vue';
import { getCachedCurrentUser, signOut } from '../lib/githubClient.js';
import bus from '../lib/bus.js';

const currentUser = ref(getCachedCurrentUser());
const emit = defineEmits(['close']);

function close() {
  emit('close');
}

function updateCurrentUser() {
  currentUser.value = getCachedCurrentUser();
}

onMounted(() => {
  bus.on('auth-changed', updateCurrentUser);
});

onBeforeUnmount(() => {
  bus.off('auth-changed', updateCurrentUser);
});


</script>
<template>
  <div>
    <div class='row'>
      <h2>About</h2>
      <a href='#' @click.prevent='close' class='close-btn'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      </a>
    </div>
    <div class="container">
      <p>
        <img src="../../public/apple-touch-icon.png" alt="Map of Speech" class="map-image">
        Each dot is a GitHub repository. Only speech and audio ML projects are shown (ASR, TTS, diarization, VAD, enhancement, etc.). Proximity indicates shared stargazers, and dot size is proportional to stars.
      </p>
      <h2>Data</h2>
      <p>
        This UI consumes prebuilt vector tiles and group graphs that you host. Configure endpoints via <code>window.__APP_CONFIG__</code>.
      </p>
    </div>

    <div v-if="currentUser" class="user-info">
      You are logged in as <b>{{currentUser.login}}</b> (<a href='#' @click.prevent="signOut" class="normal">log out</a>)
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row h2 {
  margin: 8px 8px 0 8px;
  flex: 1;
}
.map-image {
  width: 64px;
  float: left;
}

.close-btn {
  align-self: stretch;
  align-items: center;
  display: flex;
  padding: 0 8px;
}

.container {
  padding: 8px;
  flex: 1;
  overflow-y: auto;
}
h4 {
  margin: 0;
  font-weight: normal;
  text-align: right;
}
.byline {
  margin: 0 8px 8px;
  font-size: 12px;
}

.user-info {
  margin: 8px;
}
p {
  margin: 0 0 8px 0;
  line-height: 1.5em;
}
b {
  font-weight: bold;
}
</style>