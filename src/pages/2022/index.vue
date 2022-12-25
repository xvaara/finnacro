<script setup>
import Kartta from './components/kartta.vue'
import Schedule from './components/schedule.vue'
import Aikataulu from './components/aikataulu.md'
</script>

<template>
  <div class="">
    <h1>FinnAcro 2022 uusivuosi infot</h1>

    <h2>Aikataulu</h2>
    <Aikataulu />

    <h2>Workshopit</h2>
    <Schedule />

    <h2>Tilat</h2>

    <div flex flex-wrap lg:flex-nowrap gap-3 m-3>
      <div class="lg:w-1/2">
        <p>
          Paikkana toimii Jyväskylän Parkourakatemia ja Sirkuskoulu, sekä Jaguars Spirit Athletes:in cheerleading sali.
          Salit sijaitsevat Jyväskylän Seppälässä, kävelyetäisyydellä toisistaan.
        </p>
        <p>
          Yhteystietoja:<br>
          Jukka  <a href="tel:+358503285111">050 328 5111</a> <a href="mailto:jukka.raimovaara@sirkuskoulu.fi">jukka.raimovaara@sirkuskoulu.fi</a><br>
          Perttu <a href="tel:+358503021696">050 302 1696</a><br>
        </p>
      </div>
      <div class="w-screen lg:w-1/2">
        <Kartta />
      </div>
    </div>
    <div flex flex-wrap lg:flex-nowrap gap-3 m-3>
      <div class="w-screen lg:w-1/2 text-center">
        <img src="/kartta.png">
      </div>
      <div class="w-screen lg:w-1/2 text-left m-3">
        <ul class="list-disc">
          <li>Jyväskylän Sirkuskoulun harjoittelusali, Ahjokatu 12 - FinnAcron virallinen päämaja</li>
          <li>Cheer sali = cheerleading-seura JSA:n sali, Pääskyntie 4 - täällä pidetään osa työpajoista (ohjaajasi johdattaa sinut paikalle)</li>
          <li>Kuntomaailma, Ahjokatu 1 - sauna ja lisää suihkuja!</li>
          <li>Cafe Vilhelm Ahjokatu 18 - täältä saa aamupalaa ja lounasta</li>
          <li>Prisma, Ahjokatu 7 - lähin ruokakauppa</li>
          <li>Seppä, Ahjokatu 3-5 - ostoskeskus jossa mm. ravintoloita</li>
        </ul>
      </div>
    </div>
    <h2>Työpajat</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Työpajoja on käynnissä aina useita samanaikaisesti ja voit valita niistä omalle tasollesi ja tavoitteillesi sopivimman.</li>
        <li>Työpajoja pidetään Sirkuskoululla sekä JSA:n cheerleading-salilla, mutta ne aloitetaan aina sirkuskoululla aiheiden ja ennakkovaatimusten esittelyllä. </li>
        <li>Työpajoihin ilmoittautuminen: Kullakin työpajalla on rajattu osallistujamääränsä. Voit varata paikkoja työpajoihin kirjoittamalla nimesi pajan nimilistaan (löytyvät sirkuskoulun seinältä). Osa työpajoista sisältää ennakkovaatimuksia, jotka selviävät samoista listoista. HUOM! Jos muutat mieltäsi ilmoittautumisen jälkeen, viivaa nimesi yli niin varasijalla odottava pääsee mukaan.</li>
      </ul>
    </div>

    <h2>Ruokailu</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Ruokailu leirin aikana on omakustanteista.</li>
        <li>Leiriläisillä on mahdollisuus lounastaa lähellä olevassa Cafe Vilhelmissä</li>
        <li>Sirkuskoululla ei ole muita keittiölaitteita kuin veden- ja kahvinkeitin sekä mikro. Ruuanlaittomahdollisuuksia tiloissamme ei valitettavasti ole.</li>
        <li>Ihan lähellä, Ahjokadun toisella puolella, sijaitsee myös Prisma, mistä voi ostaa syötävää ja ostoskeskus Seppä, mistä löytyy ravintoloita.</li>
        <li>Ostettuja ruokia voit säilyttää sirkuskoulun jääkaapeissa (keittiö / parvi). Huomioi että kylmätiloja on todella rajallisesti! Suosi ostoksilla ruokia jotka eivät vaadi kylmäsäilytystä.</li>
        <li>Ruokailu sirkuskoululla ainoastaan keittiössä tai parvella - älä tuo mitään ruokaa permannoille.</li>
        <li>Keittiöstämme löytyviä astioita saa lainata, mutta tiskaathan ne käytön jälkeen. Pidetään keittiö muutenkin siistinä yhteisvoimin!</li>
      </ul>
    </div>

    <h2>Majoittuminen</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Jos olet sirkuskoululla yötä, suosittelemme yöpymistä sirkus- tai perhesalissa - valtaa paikkasi vapaasti mutta käytäthän makuupussia tai omia lakanoita.</li>
        <li>Matka- ja yöpymistavarat tulee säilyttää päivisin parkour-salissa.</li>
        <li>Öisin ovi on lukossa - sovi kanssayöpyjien kanssa avauksesta jos poistut ilta-aikaan!</li>
        <li>Yöpyä voit sirkuskoululla sunnuntaiaamuun saakka.</li>
      </ul>
    </div>

    <h2>Suihkut ja sauna</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Sirkuskoululla on käytettävissä kaksi suihkua, jotka löytyvät parkour-salin perällä sijaitsevista wc-tiloista.</li>
        <li>
          Yhteistyökumppanimme Kuntomaailman tiloissa on mahdollista saunoa iltaisin. Toimi näin:
          <ol>
            <li>1) Kerää itsellesi saunaposse, eli siirtykää pienellä porukalla saunaan. </li>
            <li>2) Merkkaa infopisteeltä löytyvään saunalistaan tukkimiehen kirjanpidolla montako saunojaa mukanasi on.</li>
            <li>3) Ota avainkortti saunalistan välittömästä läheisyydestä löytyvästä kirjekuoresta.</li>
            <li>4) Muista palauttaa kortti samaan kirjekuoreen!</li>
          </ol>
        </li>
        <li>Suihkut ja sauna ovat käytettävissä majoittumispaikastasi riippumatta.</li>
      </ul>
    </div>

    <h2>Roskat ja kierrätys</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Sirkussalin reunalta löytyy kierrätysroskikset biojätteelle, muoville, lasille ja metallille, ja näiden takaa avotoimistosta löydät paperinkeräyksen - käytäthän näitä ja autat meitä säästämään luontoa.</li>
        <li>Huolehditaanhan yhdessä salin ja yhteisten tilojen siisteydestä!</li>
        <li>Jos huomaat sotkuja tai että jotain uupuu, ilmoitathan asiasta Oranssien Paitojen Klaanille!</li>
      </ul>
    </div>

    <h2>Ensiapu ja turvallisuus:</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Ohjaajat ovat vastuussa työpajojen turvallisuudesta - jos huomaat turvallisuusriskejä, ilmoitathan ohjaajallesi!</li>
        <li>Jokaisessa salissa on ensiaputarvikkeita. Tarvittaessa pyydä niitä ohjaajalta tai Oranssien Paitojen Klaanilta.</li>
        <li>Suosittelemme noudattamaan harjoittelussa huolellisuutta ja varovaisuutta, sekä välttämään turhaa riskinottoa. Pitäkää paitsi itsestänne, myös toisistanne, huolta!</li>
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
