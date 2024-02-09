<script setup lang="ts">
const url = 'https://pilvikanava.fi/parkourakatemia/course.php?l=en&t=3680'
// if (typeof window !== 'undefined')
//   window.location.replace(url)
</script>

<template>
  <div class="container">
    <div class="mt-2 card p-2">
      <p>
        Don't miss out on the early bird discount (-40€) and register by Friday, October 20, 2023. This way, you'll get the convention for 185€ (regular price 225€).
      </p>
      <h3>
        Reservation Fee and Convention Payment
      </h3>
      <p>
        Upon registration, you'll pay a reservation fee of 35€. The remaining convention fee will be paid through a payment link that will be sent via email on November 1, 2023.
      </p>
      <h3>
        Cancellation of Registration
      </h3>
      <p>
        You can cancel your registration free of charge until November 1, 2023. Starting from November 2, 2023, cancellations will incur the reservation fee. Cancellations should be sent to jyvaskyla@parkourakatemia.fi.
      </p>
      <p>When registering there are few parts that are only in finnish, here are the most important parts</p>
    </div>
    <img src="/pilvikanava-help.png" alt="" class="rounded mb-3" style=" margin-left: -2em; margin-right: -2em;">
    <div>
      <a class="btn btn-primary me-2" :href="url">
        Go to registration
      </a>
      <router-link  class="btn btn-primary ms-2" to="/en">
        2023 new year info
      </router-link>
    </div>

  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
