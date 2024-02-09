<template>
  <BNavbar variant="primary" sticky="top" toggleable="lg" :container="true" v-b-color-mode="'dark'">
    <BToaster />
    <div class="d-flex gap-2 align-items-center nav">
      <BNavbarBrand :to="'/'" class="p-0 me-0 me-lg-2">
        FinnAcro
      </BNavbarBrand>
      <div class="border spacer border-secondary ms-3 me-0" />
      <BNavbarNav>
        <BNav>
          <BNavItem
            v-for="link in headerLinks"
            :to="link.route"
            :active="route.path === `${link.route}`"
            class="py-1"
            active-class="active fw-bold"
          >
            {{ link.label }}
          </BNavItem>
        </BNav>
      </BNavbarNav>
    </div>



    <div class="d-flex gap-2 flex-wrap socials">
      <BNav class="d-flex">
        <BNavItem
          v-for="link in headerExternalLinks"
          :href="link.url"
          :link-attrs="{'aria-label': link.label}"
          target="_blank"
          rel="noopener"
          link-classes="py-1 px-0"
        >
          <component :is="link.icon()" height="1.1rem" aria-hidden />
        </BNavItem>
        <div class="border spacer align-self-center border-secondary ms-2 me-3" />
        <ClientOnly>
          <BNavItemDropdown toggle-class="px-0">
            <template #button-content>
              <component :is="currentIcon" height="1.1rem" :aria-label="`Toggle theme (${dark})`" />
            </template>
            <BDropdownItem v-for="el in options" :key="el" :active="dark === el" @click="set(el)">
              <component :is="map[el]" /> {{ el }}
            </BDropdownItem>
          </BNavItemDropdown>
        </ClientOnly>
      </BNav>
    </div>
  </BNavbar>
  <ClientOnly v-if="hasSidebar">
    <div class="py-4 px-3 text-end" v-if="!isLargeScreen">
      <BNavbarToggle v-b-toggle.otp-menu class="otp-menu-toggle">
        {{ appInfo?.tocLinkTitle }}
        <ChevronRight aria-hidden />
      </BNavbarToggle>
    </div>
  </ClientOnly>
  <BContainer fluid class="container-lg mt-3 my-md-4 bd-layout">

    <main class="bd-main">
      <BRow>
        <div :class="hasSidebar && 'bd-content'">
          <RouterView />
          <aside class="otp-sidebar" v-if="hasSidebar">
            <ClientOnly>
              <BOffcanvas
                id="otp-menu"
                v-model="onThisPage"
                teleport-disabled="true"
                backdrop="false"
                placement="end"
                :title="appInfo?.tocLinkTitle"
                class="h-100 border-0"
                :body-scrolling="isLargeScreen"
                header-class="pb-0"
                body-class="py-2"
              >
              <nav class="table-of-contents">
                <ul>
                  <li v-for="item in appInfo?.toc"><RouterLink :to="'#'+item.id">{{ item.text }}</RouterLink></li>

                  </ul>
                </nav>

              </BOffcanvas>
            </ClientOnly>
          </aside>
        </div>
      </BRow>
    </main>
  </BContainer>
</template>

<script setup lang="ts">
import {
  BCol,
  BCollapse,
  BContainer,
  BNavItemDropdown,
  BDropdownItem,
  BNav,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
  BOffcanvas,
  BRow,
  useColorMode,
  vBToggle,
  vBColorMode,
  BToaster,
} from 'bootstrap-vue-next'
import {computed, inject, ref, watch} from 'vue'
import InstagramIcon from '~icons/bi/instagram'
import FacebookIcon from '~icons/simple-icons/facebook'
import MoonStarsFill from '~icons/bi/moon-stars-fill'
import SunFill from '~icons/bi/sun-fill'
import ChevronRight from '~icons/bi/chevron-right'
import CircleHalf from '~icons/bi/circle-half'
import {useRoute} from 'vue-router'
import {useMediaQuery} from '@vueuse/core'
import {appInfoKey} from '../keys'

const appInfo = inject(appInfoKey)

const hasSidebar = computed(() => appInfo?.value?.toc !== null)
// https://vitepress.dev/reference/runtime-api#usedata
const route = useRoute()

const isLargeScreen = useMediaQuery('(min-width: 992px)')
const sidebar = ref(isLargeScreen.value)
const onThisPage = ref(isLargeScreen.value)

const headerLinks = [
  {
    route: ('/fi'),
    label: 'Suomi',
  },
  {
    route: ('/en'),
    label: 'English',
  },
]

const headerExternalLinks = [
  {
    url: 'https://instagram.com/finn.acro',
    label: 'Open Our Instagram',
    icon: () => InstagramIcon,
  },
  {
    url: 'https://facebook.com/finnacro',
    label: 'Open Our Facebook page',
    icon: () => FacebookIcon,
  },
]

const dark = useColorMode({
  persist: true,
})

const map = {
  dark: MoonStarsFill,
  light: SunFill,
  auto: CircleHalf,
}

const options = Object.keys(map) as (keyof typeof map)[]

const currentIcon = computed(() => map[dark.value])

const set = (newValue: keyof typeof map) => {
  dark.value = newValue
}

watch(isLargeScreen, (newValue) => {
  if (newValue === true) {
    sidebar.value = true
    onThisPage.value = true
    return
  }
  sidebar.value = false
  onThisPage.value = false
})

watch(
  () => route.path,
  () => {
    if (isLargeScreen.value === false) {
      sidebar.value = false
    }
  }
)
</script>

<style lang="scss">
#app {
  --bvn-primary: hsla(237, 31%, 35%, 1);
  --black: #000000;
  --white: #ffffff;
  --pink: #e83e8c;
  --bvn-bg-primary: linear-gradient(
    45deg,
    var(--bvn-primary) 0%,
    hsla(230, 25%, 18%, 1) 72%,
    hsla(220, 19%, 13%, 1) 100%
  );

  .bg-primary {
    background: var(--bvn-bg-primary) !important;
    border-color: var(--bvn-bg-primary);
    color: var(--white);
  }
  .btn-primary {
    background: var(--bvn-bg-primary) !important;
    // border-color: var(--bvn-bg-primary);
    border-color: var(--bs-tertiary-color);
    color: var(--white);
  }
  .spacer {
    height: 1.1rem;
  }

  @mixin hover-focus-active() {
    &:hover,
    &:focus,
    &:active {
      @content;
    }
  }

  .doc-content > div > {
    h2,
    h3,
    h4,
    h5 {
      margin-bottom: 1rem;
    }

    h1 {
      margin-bottom: 1.5rem;
    }

    h2 {
      margin-top: 3rem;
    }

    h3 {
      margin-top: 2rem;
    }

    h4 {
      margin-top: 1.5rem;
    }

    hr {
      margin: 3rem 0;
    }
  }

  .alert {
    p:last-child {
      margin-bottom: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  .lead {
    margin-bottom: 1rem;
  }

  .breadcrumb {
    margin-bottom: 0;
  }

  [id^='input-group-'] {
    margin-bottom: 1rem;
  }

  .html {
    border-top: var(--bs-border-width) solid rgba(255, 255, 255, 0.2);
    padding: 1rem 1.25rem;
  }

  .tabs {
    margin: 1rem 0 3rem;

    .card {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      border-top: 0;

      .card-body {
        margin-bottom: 0;
      }
    }
  }


  .anchorjs-link {
    text-decoration: none;

    &::after {
      content: '#';
    }
  }

  .card {
    margin-bottom: 3rem;

    pre {
      margin-bottom: 0;
    }

    .card-header {
      h3 {
        margin-top: 0;
      }
    }

    .card-body {
      h4:first-child {
        margin-top: 0;
      }

      .card {
        margin-bottom: 0;
      }

      .list-group {
        max-width: 25rem;
      }
    }

    .icon-lg {
      font-size: 2.65rem;
    }
  }

  .card-link {
    text-decoration: none;
  }

  // Navbar.
  > .navbar {
    color: var(--white);
    box-shadow:
      0 0.5rem 1rem rgba(0, 0, 0, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);

    .nav-link,
    .navbar-brand,
    .btn {
      color: var(--white);
    }

    .socials {
      .nav-link {
        padding: 0 0.5rem;
      }
    }
  }

  .otp-menu-toggle {
    border: none;
    font-size: small;
  }

  // Sidebar.
  .offcanvas {
    box-shadow:
      0 0.5rem 1rem rgba(0, 0, 0, 0.15),
      inset 0 -1px 0 rgba(255, 255, 255, 0.15);
    .list-group {
      padding: 0 0 1.5rem 0;
      font-size: 0.875em;

      .bd-links-heading {
        svg {
          position: relative;
          top: -1px;
          margin-right: 0.3rem;
        }

        display: block;
        margin: 0 0 0.5rem;
        text-transform: uppercase;

        a {
          text-decoration: none;
        }
      }

      .list-group-item {
        border: none;
        padding: 0;

        a {
          color: var(--bs-body-color);
          display: block;
          padding: 0.13rem 0.7rem 0.13rem 0;
          margin: 0.125rem 0;
          text-decoration: none;
        }
      }
    }
  }
}

// Sidebar onscreen.
@media (min-width: 992px) {
  .bd-layout {
    gap: 1.5rem;
    .otp-sidebar {
      grid-area: sidebar;
      position: -webkit-sticky;
      position: sticky;
      top: 5rem;
      display: block !important;
      height: calc(100vh - 6rem);
      padding-left: 0.25rem;
      margin-left: -0.25rem;
      overflow-y: auto;

      .offcanvas {
        transition: none !important;
        transform: 0;
        position: relative !important;

        .offcanvas-header {
          .btn-close {
            display: none;
          }
        }
      }
    }

    .bd-main {
      .bd-content {
        display: grid;
        grid-area: main;
        grid-template-areas: 'intro toc' 'content toc';
        grid-template-rows: auto 1fr;
        grid-template-columns: 4fr 1fr;
        gap: inherit;

        .doc-content {
          grid-area: content;
          min-width: 1px;
        }

        .otp-sidebar {
          margin-left: 1.25rem;
          grid-area: toc;
        }
      }
    }
  }
}

// Sidebar width.
.bd-sidebar,
.otp-sidebar {
  @media (min-width: 992px) {
    min-width: 12.5rem;
  }

  .offcanvas.offcanvas-start,
  .offcanvas.offcanvas-end {
    @media (min-width: 992px) {
      width: 12.5rem !important;
    }

    @media (max-width: 991px) {
      .bd-links-nav {
        -moz-column-count: 2;
        column-count: 2;
        -moz-column-gap: 1.5rem;
        column-gap: 1.5rem;
      }
    }

    .table-of-contents {
      font-size: 0.875rem;

      ul {
        padding-left: 0;
        margin-bottom: 0;
        list-style: none;

        a {
          display: block;
          padding: 0.125rem 0 0.125rem 0.75rem;
          color: inherit;
          text-decoration: none;
          border-left: 0.125rem solid transparent;

          &.active {
            color: var(--bd-toc-color);
            border-left-color: var(--bd-toc-color);
          }

          &:hover {
            color: var(--bd-toc-color);
            border-left-color: var(--bd-toc-color);
          }
        }

        ul {
          padding-left: 1rem;
        }
      }
    }
  }

  .offcanvas.offcanvas-end {
    @media (max-width: 991px) {
      max-width: 15rem;
    }
  }
}

</style>
