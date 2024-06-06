<template>
  <div class="personal-info">
    <img :src="profilePic" alt="Profile Picture" class="profile-pic">
    <div class="information">
      <div class="titles">
        <p class="title">Vorname: </p>
        <p class="title">Nachname: </p>
        <p class="title">Email: </p>
        <p class="title">Telefon: </p>
        <p class="title">Geburtstag: </p>
        <p class="title">Strasse: </p>
        <p class="title">Stadt: </p>
        <p class="title">PLZ: </p>
        <p class="title">Browser: </p>
        <p class="title">Betriebssystem: </p>
        <p class="title">IP: </p>
        <p class="title">Position: </p>
        <p class="title">Netzanbieter: </p>
        <p class="title"></p>
        <p class="title"></p>
      </div>
      <div class="values">
        <p class="value">{{ firstname }}</p>
        <p class="value">{{ lastname }}</p>
        <p class="value">{{ email }}</p>
        <p class="value">{{ phone }}</p>
        <p class="value">{{ birthday }}</p>
        <p class="value">{{street}}</p>
        <p class="value">{{city}}</p>
        <p class="value">{{zip}}</p>
        <p class="value">{{ browser }}</p>
        <p class="value">{{ device }}</p>
        <p class="value">{{ ip }}</p>
        <p class="value">{{ position }}</p>
        <p class="value">{{ provider }}</p>
        <p class="value">{{ location }}</p>
        <p class="value">{{ country }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import type { FormData } from '@/types/FormData';
import cryptojs from 'crypto-js';

const props = defineProps<{
  data: FormData
}>();

const firstname: Ref<string> = ref('');
const lastname: Ref<string> = ref('');
const email: Ref<string> = ref('');
const phone: Ref<string> = ref('');
const birthday: Ref<string> = ref('');
const street: Ref<string> = ref('');
const city: Ref<string> = ref('');
const zip: Ref<string> = ref('');
const browser: Ref<string> = ref('');
const device: Ref<string> = ref('');
const ip: Ref<string> = ref('');
const position: Ref<string> = ref('');
const location: Ref<string> = ref('');
const country: Ref<string> = ref('');
const provider: Ref<string> = ref('');
const profilePic: Ref<string> = ref('');

onMounted(() => {
  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        fetch(`http://ip-api.com/json/${data.ip}`)
            .then(response => response.json())
            .then(ipData => {
              typeText(ip, data.ip);
              typeText(position, `${ipData.lat}, ${ipData.lon}`);
              typeText(location, `${ipData.zip} ${ipData.city}, ${ipData.region}`);
              typeText(country, ipData.country);
              typeText(provider, ipData.as);
            });
      });

  setTimeout(() => {
    typeText(firstname, props.data.firstname);
    typeText(lastname, props.data.lastname);
    typeText(email, props.data.email);
    typeText(phone, props.data.phone);
    typeText(birthday, props.data.birthdate);
    typeText(street, props.data.street);
    typeText(city, props.data.city);
    typeText(zip, props.data.zip);
    getNavigatorInfo();
  }, 200);
});

const getNavigatorInfo = () => {
  const emailHash = cryptojs.MD5(props.data.email.trim().toLowerCase());
  profilePic.value = `https://www.gravatar.com/avatar/${emailHash}`;

  typeText(browser, `${navigator.appCodeName} ${navigator.appVersion}`);

  const oscpu = (navigator as any).oscpu || 'unknown OS';
  typeText(device, oscpu);
};

const typeText = async (ref: Ref<string>, text: string) => {
  return new Promise<void>(resolve => {
    const arr = new Uint8Array((text.length || 40) / 2);
    let round = 0;
    let preRound = 0;
    let letterIndex = 0;
    const interval = setInterval(() => {
      crypto.getRandomValues(arr);
      const random = Array.from(arr, (dec) => dec.toString(16).padStart(2, '0')).join('').split('');
      const textSplit = text.split('');
      let totalText = '';
      for (let i = 0; i < textSplit.length; i++) {
        if (i <= letterIndex && preRound === 12) {
          totalText += textSplit[i];
        } else {
          totalText += random[i] ?? random[i - 1];
        }
      }
      ref.value = totalText;
      round++;
      if (round === 2) {
        if (preRound === 12) {
          letterIndex++;
        } else {
          preRound++;
        }
        round = 0;
      }
      if (letterIndex === text.length) {
        clearInterval(interval);
        resolve();
      }
    }, 20);
  });
};
</script>

<style scoped lang="scss">
@import '../styles/confirmation/colors.scss';
@import '../styles/confirmation/caligraphy.scss';

.personal-info {
  min-height: 448px;
  width: 900px;
  max-width: 900px;
  overflow: hidden;
  z-index: 999;
  border-radius: 14px;
  background: rgba(0, 0, 0, .25);
  margin: 32px 32px 32px 0;
  border: 2px solid $c-color-green;
  padding: 32px;
}

@media screen and (max-width: 500px) {
  .personal-info {
    width: 200px;
    height: 400px;
    font-size: 10px;
  }

  .profile-pic {
    height: 50px;
  }
}

.titles {
  min-width: 128px;
}

.information {
  display: flex;
}

.value {
  color: $c-color-green;
}

.title {
  color: $c-color-gray;
}

.profile-pic {
  border-radius: 50%;
}
</style>
