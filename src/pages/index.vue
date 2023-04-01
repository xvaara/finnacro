<script setup lang="ts">

</script>

<template>
  <div>
    <div text-4xl>
      <span>Finnacro</span>
    </div>
    <p>
      <em text-sm opacity-75>Finnish Acrobatic Convention</em>
    </p>
    <!-- <div btn text-sm m="3 t8">
      <router-link to="/palaute">
        Palaute osallistujille
      </router-link>
    </div>
    -->
    <div btn text-sm m="3 t8">
      <router-link to="/2023">
        2023 kesä ilmoittautuminen
      </router-link>
    </div>
    <p>
      <em text-sm opacity-75>A partner acrobatics convention held twice a year in Jyväskylä, Central Finland. </em>
    </p>
    <div py-4 />
    <div>
      <a btn text-sm href="https://instagram.com/finn.acro" class="flex-inline">
        <div i-carbon-logo-instagram /> Instagram
      </a>
    </div>
    <div py-4 />
    <div>
      <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffinnacro%2F&tabs=events,timeline&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=346440482068920" width="340" height="331" style="border:none;overflow:hidden;display: block; margin: auto;" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" class="" />
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
