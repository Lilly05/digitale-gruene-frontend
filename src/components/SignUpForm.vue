<template>
  <div class="sign-up-form">
    <h4>Los - Melde dich an!</h4>
    <div class="form">
      <div class="input-group">
        <text-input class="small-input" :error="!isValid.firstname" label="Vorname" required v-model="formData.firstname"/>
        <text-input class="small-input" :error="!isValid.lastname" label="Nachname" required v-model="formData.lastname"/>
      </div>
      <text-input :error="!isValid.email" label="Email" required v-model="formData.email" />
      <text-input :error="!isValid.phone" label="Telefonnummer" required v-model="formData.phone"/>
      <date-input :error="!isValid.birthdate" label="Geburtsdatum" required v-model="formData.birthdate"/>
      <div class="input-group">
        <text-input class="small-input" :error="!isValid.street" label="Strasse & Nr." required v-model="formData.street"/>
        <text-input class="small-input" :error="!isValid.city" label="Ort" required v-model="formData.city"/>
        <text-input class="small-input" :error="!isValid.zip" label="PLZ" required v-model="formData.zip"/>
      </div>
    </div>
    <div class="terms">
      <div class="checkbox-wrapper">
        <checkbox-component class="checkbox" @clicked="handleClickEvent" />
      </div>
      <div class="terms-wrapper">
        <p class="terms-text">Ich bin einverstanden, dass die GRÜNEN und ihre Sektionen mittels der obenstehenden Kontaktdaten mit mir in Verbindung treten. Ich nehme die <link-component>Datenschutzerklärung</link-component> zur Kenntnis. Meine Zustimmung kann ich jederzeit anpassen oder zurückziehen. </p>
      </div>
    </div>
    <button-component :disabled="!canSignUp" class="sign-up-button" type="normal" @click="onSignUp">Anmelden</button-component>
  </div>
</template>

<script setup lang="ts">
import TextInput from "@/components/input/TextInput.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import CheckboxComponent from "@/components/input/CheckboxComponent.vue";
import LinkComponent from "@/components/LinkComponent.vue";
import DateInput from "@/components/input/DateInput.vue";
import type { FormData } from "@/types/FormData";
import type { Ref } from "vue";
import { ref, computed } from "vue";
import { useMouseStore } from '@/store/mousemovement';
import router from "@/router";
import { useDataStore } from "@/store/data";
import axios from 'axios';

const store = useMouseStore();
const showMovements = ref(false);
const checked = ref(false);

const formData: Ref<FormData> = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  birthdate: '',
  street: '',
  city: '',
  zip: ''
});

const isPhoneValid = (phone: string): boolean => {
  const phoneRegex = /^[0-9]+$/;
  return phoneRegex.test(phone.trim());
};

const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

const isBirthdateValid = (birthdate: string): boolean => {
  const date = new Date(birthdate);
  const today = new Date();
  return date <= today;
};

const isZipValid = (zip: string): boolean => {
  const zipRegex = /^[0-9]+$/;
  return zipRegex.test(zip.trim());
};

const isValid = computed(() => ({
  firstname: !!formData.value.firstname,
  lastname: !!formData.value.lastname,
  email: isEmailValid(formData.value.email),
  phone: isPhoneValid(formData.value.phone),
  birthdate: isBirthdateValid(formData.value.birthdate),
  street: !!formData.value.street,
  city: !!formData.value.city,
  zip: isZipValid(formData.value.zip)
}));

const isInvalid = computed(() => {
  return Object.values(isValid.value).some(valid => !valid);
});

const canSignUp = computed(() => {
  return checked.value && !isInvalid.value;
});

const onSignUp = () => {
  store.setSaveMovements(false);
  showMovements.value = true;
  useDataStore().saveData(formData.value);
  submitForm();
  router.replace('/confirmation');
};

const submitForm = async () => {
  try {
    await axios.post('/api/signup', {
      firstName: formData.value.firstname,
      lastName: formData.value.lastname,
      email: formData.value.email,
      phoneNumber: formData.value.phone,
      birthdate: formData.value.birthdate,
      address: formData.value.street,
      place: formData.value.city,
      zip: formData.value.zip
    });
    console.log('Angemeldet');
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleClickEvent = (click: boolean) => {
  checked.value = click;
};
</script>



<style scoped lang="scss">
@import "../styles/colors.scss";
@import "../styles/caligraphy.scss";

.sign-up-form {
  padding-top: 32px;

  .input-group {
    display: flex;
    gap: 48px;

    .small-input {
      width: 100%;
    }
  }

  .sign-up-button {
    margin-top: 16px;
  }

  .terms {
    display: flex;
    align-items: baseline;
    margin: 8px 0 16px 0;

    .checkbox-wrapper {
      margin-right: 8px;
    }

    .terms-text {
      font-size: 14px;
      line-height: 16px;
      margin: 0;
      font-family: 'Open Sans', sans-serif;
      letter-spacing: normal;
    }
  }
}

@media screen and (max-width: 1030px) {
  .input-group {
    flex-direction: column;
    gap: 0 !important;
  }
}

.success {
  border-bottom: 2px solid $color-green !important;
}

.error {
  border-bottom: 2px solid $color-error !important;
}
</style>
