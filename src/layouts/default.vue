<template>
  <BNavbar v-b-color-mode="'dark'" variant="primary" sticky="top" toggleable="lg" :container="true">
    <div class="d-flex gap-2 align-items-center nav">
      <BNavbarBrand to="/" class="p-0 me-0 me-lg-2">
        FinnAcro
      </BNavbarBrand>
      <div class="border spacer border-secondary ms-3 me-0" />
      <BNavbarNav>
        <BNav>
          <BNavItem
            v-for="link in headerLinks"
            :key="link.route"
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
          :key="link.url"
          :href="link.url"
          :link-attrs="{ 'aria-label': link.label }"
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
    <div v-if="!isLargeScreen" class="py-4 px-3 text-end">
      <BNavbarToggle v-b-toggle.otp-menu class="otp-menu-toggle">
        {{ appInfo?.tocLinkTitle }}
        <ChevronRight aria-hidden />
      </BNavbarToggle>
    </div>
  </ClientOnly>
  <BContainer fluid class="container-lg mt-3 my-md-4 bd-layout">
    <main class="bd-main">
      <BRow>
        <div ref="content" :class="hasSidebar && 'bd-content'">
          <RouterView />
          <aside v-if="hasSidebar" class="otp-sidebar">
            <ClientOnly>
              <BOffcanvas
                id="otp-menu"
                v-model="onThisPage"
                :teleport-disabled="true"
                :no-backdrop="true"
                placement="end"
                :title="appInfo?.tocLinkTitle"
                class="h-100 border-0"
                :body-scrolling="isLargeScreen"
                header-class="pb-0"
                body-class="py-2"
              >
                <nav id="navside" ref="navigation" class="table-of-contents">
                  <ul>
                    <li v-for="item in appInfo?.toc" :key="item.id" class="nav-item">
                      <RouterLink :to="`#${item.id}`">
                        {{ item.text }}
                      </RouterLink>
                    </li>
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
import { useMediaQuery } from '@vueuse/core'
import {
  BContainer,
  BDropdownItem,
  BNav,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavItem,
  BNavItemDropdown,
  BOffcanvas,
  BRow,
  useColorMode,
  useScrollspy,
  vBColorMode,
  vBToggle,
} from 'bootstrap-vue-next'
import { computed, inject, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import ChevronRight from '~icons/bi/chevron-right'
import CircleHalf from '~icons/bi/circle-half'
import InstagramIcon from '~icons/bi/instagram'
import MoonStarsFill from '~icons/bi/moon-stars-fill'
import SunFill from '~icons/bi/sun-fill'
import FacebookIcon from '~icons/simple-icons/facebook'
import { appInfoKey } from '../keys'

const appInfo = inject(appInfoKey)

const hasSidebar = computed(() => appInfo?.value?.toc !== null)
// https://vitepress.dev/reference/runtime-api#usedata
const route = useRoute()

const content = useTemplateRef<HTMLElement>('content')
const navigation = useTemplateRef<HTMLElement>('navigation')
useScrollspy(content, navigation, { contentQuery: 'h2[id]' })

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

function set(newValue: keyof typeof map) {
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
  },
)
</script>
