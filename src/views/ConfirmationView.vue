<template>
  <div class="confirmation-container">
    <img src="/src/assets/background.gif" alt="Background" class="background">
    <div class="content">
      <h1 class="title"><span class="code">print( </span>{{ title }} <span class="code">);</span></h1>
      <div class="split">
        <personal-info :data="data" v-if="data"/>
        <p class="subtitle"><span class="big">Hah, reingefallen!</span> Nun siehst du selbst, wie leicht persönliche Informationen online ohne dein Wissen gesammelt werden können. Mit dieser Seite wollten wir dir zeigen, wie wichtig Datenschutz und Online-Sicherheit sind. Mit deiner Anmeldung hast du unwissentlich deine Daten preisgegeben. Komm doch am 20. Juni um 18:00 Uhr zu unserem  <span class="green">Workshop zum Thema Datensicherheit</span> und erfahre, wie du deine Daten schützen und online sicher bleiben kannst.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, type Ref, ref} from "vue";
import type {FormData} from "@/types/FormData";
import PersonalInfo from "@/components/PersonalInfo.vue";
import {useDataStore} from "@/store/data";
import {useRouter} from "vue-router";

const data: Ref<FormData> = ref({} as FormData)

const title: Ref<string> = ref("")

onMounted(() => {
  const userData = useDataStore().userData

  if (!userData) {
    useRouter().push('/anmelden')
  }

  data.value = userData
  typeText(title, `Hallo, ${data.value.firstname}`)
})

const typeText = async (ref: Ref<string>, text: string) => {
  return new Promise<void>(resolve => {
    const arr = new Uint8Array((text.length || 40) / 2)
    let round = 0
    let preRound = 0
    let letterIndex = 0
    const interval = setInterval(() => {
      crypto.getRandomValues(arr)
      const random = Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('').split('')
      const textSplit = text.split('')
      let totalText = ''
      for (let i = 0; i < textSplit.length; i++) {
        if (i <= letterIndex && preRound === 12) {
          totalText += textSplit[i]
        } else {
          totalText += random[i] ?? random[i - 1]
        }
      }
      ref.value = totalText
      round++
      if (round === 2) {
        if (preRound === 12) {
          letterIndex++
        } else {
          preRound++;
        }
        round = 0
      }
      if (letterIndex === text.length) {
        clearInterval(interval)
        resolve()
      }
    }, 20)
  })
}

const showMouseMovement = ref(true);
const showTimer = ref(true);

const updateShowMouseMovement = (event: Event) => {
  showMouseMovement.value = (event.target as HTMLInputElement).checked;
};

const updateShowTimer = (event: Event) => {
  showTimer.value = (event.target as HTMLInputElement).checked;
};
</script>
<style scoped lang="scss">
@import '../styles/confirmation/colors.scss';
@import '../styles/confirmation/caligraphy.scss';


.confirmation-container {
  width: 100vw;
  height: 100vh;
  background: $c-color-black;
  overflow: hidden;
}

.title {
  color: $c-color-white;
  font-family: $c-font-title;
  margin: 0;
  font-size: 64px;
  z-index: 999;
}

.code {
  // opacity: .25;
  font-size: 36px;
  color: $c-color-green;
}

.big {
  font-size: 36px;
  color: $c-color-green;
}

.subtitle {
  color: $c-color-gray;
  font-family: $c-font-p;
  width: calc(100vw - 256px);
  word-wrap: break-word;
  white-space: pre-wrap;
  transform: translateY(100%);
  opacity: 0;
  animation: appear 500ms;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  font-size: 22px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  opacity: .1;
  filter: blur(22px);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.content {
  padding: 128px 128px 0 128px;
  z-index: 999;
}

.split {
  display: flex;
}

.green {
  color: $c-color-green;
}

@keyframes appear {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media screen and (max-width: 1030px) {
  .content {
    padding: 0;
  }

  .confirmation-container {
    overflow-y: scroll;
  }

  .personal-info {
    width: 100vw;
    border-right: none;
    border-left: none;
    border-radius: 0;
    margin-bottom: 0;
    margin-top: 0;
  }

  .split {
    flex-direction: column;
  }

  .subtitle {
    padding: 0 32px 32px 32px;
    width: calc(100vw - 64px);
  }
}

@media screen and (max-width: 500px) {
  .title {
    font-size: 20px;
    padding: 32px;
  }

  .code {
    font-size: 25px;
  }

  .big {
    font-size: 20px;
  }

  .subtitle {
    font-size: 15px;
  }
}
</style>
