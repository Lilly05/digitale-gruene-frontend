<template>
  <header-component/>
  <div class="sign-up" @mousemove="handleMouseMove">
    <div class="header">
      <img class="header-image" src="../assets/sing-up-image.jpg" alt="Social Media Image">
    </div>
    <div class="content">
      <h1>Workshop - Datensicherheit</h1>
      <p class="subtitle">
        Weil der Schutz persönlicher Daten in unserer digitalen Welt immer wichtiger wird, laden wir dich herzlich zu unserem Datenschutz-Workshop ein.
      </p>
      <p class="info">
        An diesem Datenschutz Workshop erwartet dich ein Vortrag und anschliessend hast du die Möglichkeit, an verschiedenen thematischen Workshops teilzunehmen. Hier kannst du dein Wissen vertiefen, dich austauschen und praktische Tipps für den Alltag mitnehmen. Die Workshops bieten eine Plattform, um individuelle Fragen zu klären und sich mit anderen Teilnehmenden zu vernetzen.
      </p>
      <p class="info">Die Themen der Workshops und des Vortrags umfassen:</p>
      <ul>
        <li class="info">Datenschutz im Web</li>
        <li class="info">Datenschutzauszüge von Firmen aus der Schweiz und Amerika</li>
        <li class="info">Plattformeinstellungen bezüglich Datensicherheit</li>
        <li class="info">Browseraddons für Datenschutz</li>
        <li class="info">Passwort Manager</li>
      </ul>
      <h3 class="info">Sei dabei! Gemeinsam können wir den Schutz unserer Daten verbessern und uns für eine sichere digitale Zukunft einsetzen. Nimm gerne deinen persönlichen Laptop mit!</h3>
      <p class="info">Wir freuen uns auf deine Teilnahme und auf einen interessanten Abend und spannenden Diskussionen.</p>
      <p class="info">Mit lieben Grüssen, AG Freundliche Maschinen</p>
      <h4>Eventinformationen</h4>
      <div class="eventinfo">
        <div class="eventinfo-row">
          <span><span class="bold">Datum: </span> 20. Juni 2024</span>
        </div>
        <div class="eventinfo-row">
          <span><span class="bold">Zeit: </span> 19:00 Uhr - 20:00 Uhr</span>
        </div>
        <div class="eventinfo-row">
          <span><span class="bold">Ort: </span>Forwardspace, Hirschengraben 43, 6003 Luzern</span>
        </div>
      </div>
      <sign-up-form />
    </div>
  </div>
</template>
<script setup lang="ts">
import SignUpForm from "@/components/SignUpForm.vue";
import { useMouseStore } from '@/store/mousemovement';
import {onMounted, onUnmounted} from "vue";
import {useTimerStore} from "@/store/timer";
import HeaderComponent from "@/components/HeaderComponent.vue";

const mouseStore = useMouseStore();
const timerStore = useTimerStore();


onMounted(() => {
  timerStore.setStartTime(new Date());
})

onUnmounted(() => {
  timerStore.setEndTime(new Date());
  timerStore.calculateRecordedTime();
})

const handleMouseMove = (event: MouseEvent) => {
  const movement = { x: event.clientX, y: event.clientY };
  mouseStore.addMovement(movement);
};
</script>
<style scoped lang="scss">
@import "../styles/colors.scss";
@import "../styles/caligraphy.scss";

.sign-up {
  width: 100vw;
  min-height: calc(100vh - 90px);
  padding: 90px 0 128px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    height: calc(100vh - 400px);
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .header-image {
    width: 100vw;
    transform: scale(1.2);
    filter: blur(6px);
    animation: bloop 500ms;
    animation-delay: 500ms;
    animation-fill-mode: forwards;
  }

  .content {
    width: calc(100% - 400px);
    max-width: 800px;
    min-height: 600px;
  }

  .subtitle {
    font-weight: 700;
  }

  .bold {
    font-weight: bold;
    color: $color-pink;
    margin-right: 8px;
  }

  .info {
    margin-top: 32px;
  }

  .eventinfo {
    color: $color-gray;
  }

  .eventinfo-row {
    margin: 4px 0;

    span {
      &::selection {
        background: $color-green;
        color: white;
      }
    }


  }

  .sign-up-title {
    margin-top: 32px;
  }
}

@keyframes bloop {
  0% {
    transform: scale(1.1);
    filter: blur(6px);
  }

  100% {
    transform: scale(1);
    filter: blur(0);
  }
}

@media screen and (max-width: 1030px) {
  .header-image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .content {
    width: calc(100vw - 10%) !important;

    h1 {
      font-size: 36px;
    }
  }
}
</style>
