<script setup>
import { appInfoKey } from '../../keys'
import Map from './components/kartta.vue'

const appInfo = inject(appInfoKey)
const page = ref(null)
onMounted(() => {
  appInfo.value.toc = Array.from(page.value.querySelectorAll('h2[id]')).map(el => ({
    id: el.id,
    text: el.textContent,
  }))
  appInfo.value.tocLinkTitle = 'On this page'
})
</script>

<template>
  <div ref="page" class="">
    <h1>FinnAcro 2023 New Year's Information</h1>
    <div class="d-flex gap-3 align-items-center mb-3">
      <h5 class="opacity-75 mb-0">
        28th - 31st December
      </h5>
      <router-link class="btn btn-primary" to="/register">
        Registration
      </router-link>
    </div>
    <h2 id="general">
      General information
    </h2>

    <p>FinnAcro, or the Finnish Acrobatics Convention, New Year 2023! Once again in Jyväskylä, we'll have top-notch instructors and a great atmosphere.</p>
    <p>
      Don't miss out on the early bird discount (-40€) and register by Friday, October 20, 2023. This way, you'll get the convention for 185€ (regular price 225€).
    </p>
    <h5>
      Reservation Fee and Convention Payment
    </h5>
    <p>
      Upon registration, you'll pay a reservation fee of 35€. The remaining convention fee will be paid through a payment link that will be sent via email on November 1, 2023.
    </p>
    <h5>
      Cancellation of Registration
    </h5>
    <p>
      You can cancel your registration free of charge until November 1, 2023. Starting from November 2, 2023, cancellations will incur the reservation fee. Cancellations should be sent to jyvaskyla@parkourakatemia.fi.
    </p>
    <p>FinnAcro will take place during the days between Christmas and New Year, from Thursday to Sunday, December 28-31, 2023, at Jyväskylä Circus School. Expect lots of training, fun in a great group, and plenty of new skills to learn! The convention is intended for adults, but 16-17-year-olds can participate with parental consent, and 12-15-year-olds must be accompanied by an adult.</p>
    <p>During the convention, you will practice in workshops of various levels, offering suitable training for everyone, whether you're a beginner, a professional, or somewhere in between.</p>
    <p>Coming to teach is Kata and Jared! We will update the instructors on the website, Facebook event, and Instagram as the convention approaches. International and local instructors coming!</p>
    <p>THE CONVENTION INCLUDES:</p>
    <ul>
      <li>A total of 10 workshops on partner acrobatics, supplementary training, and more.</li>
      <li>Safe and purpose-built practice spaces with mats, as well as access to mattresses and crash pads.</li>
      <li>The opportunity for free training in the Jyväskylä Circus School facilities outside of the workshops, including trampolines, vertical fabrics, trapeze, juggling equipment, and more.</li>
      <li>The option for floor accommodations in the Jyväskylä Circus School facilities in the Tanner Hall (Ahjokatu 12, 40320 Jyväskylä).</li>
      <li>New Year's jam on Sunday for all who are interested.</li>
    </ul>
    <p>See you during the holidays!</p>
    <p>P.S. If you have an urgent question, please contact the event organizer: <a href="mailto:jukka.raimovaara@sirkuskoulu.fi">jukka.raimovaara@sirkuskoulu.fi</a></p>

    <router-link to="/timetable">
      <h2 id="timetable">
        Timetable
      </h2>
    </router-link>

    <h2 id="spaces" class="mt-3">
      Spaces
    </h2>

    <div class="d-flex flex-wrap flex-lg-nowrap gap-3 m-3">
      <div class="col-lg-6">
        <p>
          The event takes place at the Jyväskylä Parkour Academy, Circus School, and the Jaguars Spirit Athletes' cheerleading hall. These venues are located in Jyväskylä Seppälä, within walking distance of each other.
        </p>
        <p>
          Contact Information:<br>
          Jukka  <a href="tel:+358503285111">050 328 5111</a> <a href="mailto:jukka.raimovaara@sirkuskoulu.fi">jukka.raimovaara@sirkuskoulu.fi</a><br>
          Perttu <a href="tel:+358503021696">050 302 1696</a><br>
        </p>
      </div>
      <div class="col-lg-6">
        <Map />
      </div>
    </div>
    <div class="d-flex flex-wrap flex-lg-nowrap gap-3 m-3">
      <div class="col-lg-6 text-center">
        <img src="/kartta.png" class="img-fluid">
      </div>
      <div class="col-lg-6 text-left m-3">
        <ul class="list-disc">
          <li>Jyväskylä Circus School practice hall, Ahjokatu 12 - FinnAcro's official headquarters</li>
          <li>Cheerleading hall = JSA's cheerleading hall, Pääskyntie 4 - some workshops are held here (your instructor will guide you to the location)</li>
          <li>Kuntomaailma, Ahjokatu 1 - sauna and additional showers</li>
          <li>Cafe Vilhelm Ahjokatu 18 - here you can get breakfast and lunch</li>
          <li>Prisma, Ahjokatu 7 - the nearest grocery store</li>
          <li>Seppä, Ahjokatu 3-5 - a shopping center with restaurants, among other things</li>
        </ul>
      </div>
    </div>
    <h2 id="workshops">
      Workshops
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>There are multiple workshops running simultaneously, and you can choose the one that best matches your level and goals.</li>
        <li>Workshops are held at the Circus School and JSA's cheerleading hall, but they always start at the Circus School with introductions to the topics and prerequisites.</li>
        <li>To sign up for workshops: Each workshop has a limited number of participants. You can reserve your spot in the workshops by writing your name on the workshop's name list (located on the Circus School's wall). Some workshops have prerequisites, which can be found on the same lists. NOTE! If you change your mind after signing up, please cross out your name so that those on the waiting list can join.</li>
      </ul>
    </div>

    <h2 id="food">
      Dining
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Dining during the event is at your own expense.</li>
        <li>Participants have the opportunity to have lunch at the nearby Cafe Vilhelm.</li>
        <li>The Circus School has limited kitchen equipment, including a water and coffee maker and a microwave. Unfortunately, there are no cooking facilities on-site.</li>
        <li>Just across the street on Ahjokatu, you'll find Prisma, where you can buy groceries, and Seppä, a shopping center with restaurants.</li>
        <li>You can store purchased food in the Circus School's refrigerators (kitchen / loft). Please note that fridge space is very limited. Opt for non-perishable food items when shopping.</li>
        <li>Meal consumption is only allowed in the kitchen or loft areas of the Circus School. Do not bring any food onto the floors.</li>
        <li>You can borrow kitchen utensils from our kitchen, but please wash them after use. Let's keep the kitchen clean together!</li>
      </ul>
    </div>

    <h2 id="accommodation">
      Accommodation
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>If you are staying overnight at the Circus School, we recommend sleeping in the circus or family hall. Feel free to choose your spot, but please use a sleeping bag or your own sheets.</li>
        <li>During the day, travel and overnight items should be kept in the parkour hall.</li>
        <li>At night, the door is locked. Coordinate with other overnight guests for access if you leave during the evening.</li>
        <li>You can stay at the Circus School until Sunday morning.</li>
      </ul>
    </div>

    <h2 id="showers">
      Showers and Sauna
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>The Circus School provides two showers located in the toilet facilities at the back of the parkour hall.</li>
        <li>
          Our partner, Kuntomaailma, offers sauna access until 8:30 PM in the evenings. Here's how it works:
          <ol>
            <li>1) Assemble a sauna group and head to the sauna in a small group.</li>
            <li>2) Mark on the sauna list found at the information desk how many sauna-goers are with you using lumberjack-style tally marks.</li>
            <li>3) Collect a key card from the envelope located immediately nearby the sauna list.</li>
            <li>4) Remember to return the key card to the same envelope!</li>
          </ol>
        </li>
        <li>Showers and sauna facilities are available regardless of your accommodation location.</li>
      </ul>
    </div>

    <h2 id="trash">
      Trash and Recycling
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>You can find recycling bins for organic waste, plastic, glass, and metal on the edge of the circus hall. Behind these, in the open office area, you'll find a paper recycling station - please use these and help us protect the environment.</li>
        <li>Let's collectively ensure the cleanliness of the hall and shared areas!</li>
        <li>If you notice any mess or something missing, please report it to the staff.</li>
      </ul>
    </div>

    <h2 id="safety">
      First Aid and Safety
    </h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Instructors are responsible for the safety of the workshops. If you notice any safety risks, please inform your instructor!</li>
        <li>There are first aid supplies in each hall. If needed, request them from your instructor or the staff.</li>
        <li>We recommend practicing with care and caution, avoiding unnecessary risks. Take care of yourself and each other!</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
</style>
