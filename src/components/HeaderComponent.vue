<template>
  <header class="header">
    <div class="logo">
      <img alt="Logo" src="https://gruene.ch/wp-content/uploads/2021/03/gruene-les-vert-e-s_vector-green.svg">
    </div>
    <nav class="nav">
      <ul class="nav-list">
        <li>
          <a href="" class="nav-item">Aktuell</a>
        </li>
        <li>
          <a href="" class="nav-item">Themen</a>
        </li>
        <li>
          <a href="" class="nav-item selected">GRÜNE Schweiz</a>
        </li>
        <li>
          <a href="" class="nav-item">Publikationen</a>
        </li>
        <li>
          <img src="../assets/search-icon.svg" class="search-icon" alt="Search Icon">
        </li>
      </ul>
    </nav>
    <div class="join">
      <button-component type="inverted">mitmachen</button-component>
    </div>
    <div class="language">
      <div class="languages">
        <div class="lang">DE</div>
        <div class="lang">FR</div>
        <div class="lang">IT</div>
      </div>
    </div>
    <div class="nav-button">
      <img src="../assets/hamburger.svg" alt="Menu" class="burger-menu">
    </div>
  </header>
</template>
<script lang="ts" setup>

import ButtonComponent from "@/components/ButtonComponent.vue";
</script>
<style scoped lang="scss">
@import "../styles/colors.scss";

.header {
  position: fixed;
  background: white;
  z-index: 10;
  width: 100vw;
  height: 90px;
  border-bottom: .125rem solid #f4f4f4;
  display: flex;

  .logo {
    width: 10%;
    display: flex;
    align-items: center;
    margin: 0 16px;
    cursor: pointer;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .nav {
    width: 60%;
    display: flex;
    justify-content: center;
    margin: 0 128px;
    align-items: center;

    .nav-list {
      justify-content: space-between;
      width: 100%;
      display: flex;
      gap: .4rem;
      flex-direction: row;
      list-style-type: none;

      .nav-item {
        color: $color-gray;
        text-decoration: none;
        font-weight: 800;
        font-size: 15px;
      }

      .selected {
        color: $color-pink;
      }
    }

  }

  .join {
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .language {
    height: 100%;
    width: 15%;
    display: flex;
    justify-content: center;

    .languages {
      display: flex;
      align-items: center;

      .lang {
        font-size: 14px;
        font-weight: 700;

        &:hover {
          color: $color-pink;
          cursor: pointer;
          transition: 200ms all;
        }

        &:not(:last-child) {
          &::after {
            content: '|';
            margin: 0 4px;
            color: black;
            font-weight: normal;
            height: 80%;
            display: inline-block;
          }
        }

      }
    }
  }

  .search-icon {
    height: 20px;
  }
}

.burger-menu {
  display: none;
}

@media screen and (max-width: 1030px) {
  .nav, .join, .languages {
    display: none !important;
  }
  .logo {
    width: 86px !important;
  }

  .burger-menu {
    display: initial;
    position: absolute;
    right: 27px;
    top: 27px;
    width: 36px;
    cursor: pointer;

    &:hover {
      filter: invert(69%) sepia(19%) saturate(4351%) hue-rotate(35deg) brightness(95%) contrast(84%);
    }
  }
}
</style>
