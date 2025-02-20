<script setup lang="ts">
const url = 'https://uusi.pilvikanava.fi/parkourakatemia/en/course/4852/'
// if (typeof window !== 'undefined')
//   window.location.replace(url)
</script>

<template>
  <div class="container">
    <div class="mt-2 card p-2">
      <!-- <p>
        Don't miss out on the early bird discount (-40€) and register by Friday, November 8, 2024. This way, you'll get the convention for 185€ (regular price 225€).
      </p> -->
      <h3>
        Reservation Fee and Convention Payment
      </h3>
      <p>
        Upon registration, you'll pay a reservation fee of 35€. The remaining convention fee will be paid through a payment link that will be sent via email on November 22, 2024.
      </p>
      <h3>
        Cancellation of Registration
      </h3>
      <p>
        You can cancel your registration free of charge until November 21, 2024. Starting from November 22, 2024, cancellations will incur the reservation fee. Cancellations should be sent to jyvaskyla@parkourakatemia.fi.
      </p>
      <p>When registering there are few parts that are only in finnish, here are the most important parts</p>
      <div class="d-flex justify-content-center my-2">
        <img src="/pilvikanava-help.png" alt="" class="rounded" style=" margin-left: -2em; margin-right: -2em;">
      </div>
      <div class="d-flex justify-content-center my-2">
        <a class="btn btn-primary m-1" :href="url">
          Go to registration
        </a>
        <router-link class="btn btn-primary m-1" to="/en">
          2024 new year info
        </router-link>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
