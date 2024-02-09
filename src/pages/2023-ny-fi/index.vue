<script setup>
import Kartta from './components/kartta.vue'
import Schedule from './components/schedule.vue'
import Aikataulu from './components/aikataulu.md'
import {appInfoKey} from '../../keys'


const appInfo = inject(appInfoKey)
const page = ref(null)
onMounted(() => {
  appInfo.value.toc = Array.from(page.value.querySelectorAll('h2[id]')).map(el => ({
    id: el.id,
    text: el.textContent
  }))
  appInfo.value.tocLinkTitle = 'Tällä sivulla'
})

</script>

<template>
  <div ref="page" class="">
    <h1>FinnAcro 2023 uusivuosi infot</h1>
    <div class="d-flex gap-3 align-items-center mb-3">
      <h5 class="opacity-75 mb-0">28. - 31.12.</h5>
      <router-link  class="btn btn-primary" to="/ilmoittaudu">
        Ilmoittautuminen
      </router-link>
    </div>
    <h2 id="general">Yleiset infot</h2>


      <p>FinnAcro eli Finnish Acrobatics Convention uusivuosi 2023! Jyväskylässä jälleen luvassa huippu ohjaajia ja huippua meininkiä.</p>
      <p>Älä menetä ennakkovaraajan etuasi (-40€) ja ilmoittaudu viimeistään pe 20.10.2023. Näin saat leirin hintaan 185€ (norm. 225€).</p>
      <h5>Varausmaksu ja leirimaksun maksaminen</h5>
      <p>Ilmoittautumisen yhteydessä maksat vain varausmaksun 35€. Leirimaksun loppusumma maksetaan maksulinkillä, joka saapuu sähköpostilla 1.11.2023.</p>
      <h5>Ilmoittautumisen peruminen</h5>
      <p>Ilmoittautumisen voi perua 1.11.2023 mennessä veloituksetta. 2.11.2023 alkaen perutuista ilmoittautumisista pidätämme varausmaksun. Perumiset tulee ilmoittaa osoitteeseen jyvaskyla@parkourakatemia.fi.</p>
      <p>FinnAcroa vietetään joulun välipäivinä to-su 28.-31.12.2023 Jyväskylän Sirkuskoululla. Luvassa paljon treeniä, hauskanpitoa hyvässä porukassa ja hurjasti uutta opittavaa! Leiri on suunnattu aikuisille, mutta 16-17-vuotiaat voivat osallistua huoltajan luvalla ja 12-15-vuotiaat aikuisen seurassa.</p>
      <p>Leirillä harjoitellaan eritasoisissa, rinnakkain järjestettävissä työpajoissa, joista löytyy jokaiselle sopivan tasoista treenattavaa, olit sitten vasta-alkaja, ammattilainen tai jotain siltä väliltä.</p>
      <p>Tulossa ohjaamaan ainakin Kata ja Jared!. Päivitämme ohjaajat nettisivuille, facebook eventtiin ja instagramiin leirin lähestyessä. Luvassa kansainvälisiä huippuohjaajia!</p>
      <p>LEIRI SISÄLTÄÄ:</p>
      <ul>
        <li>Yhteensä 10 työpajaa pariakrobatiasta, oheisharjoittelusta, ym.</li>
        <li>Turvalliset ja tarkoituksenmukaiset permantomatoilla varustetut harjoitustilat, lisäksi käytettävissä patjoja ja lonsseja.</li>
        <li>Mahdollisuus vapaaseen harjoitteluun Jyväskylän Sirkuskoulun tiloissa työpajojen ulkopuolella - käytössä mm. trampoliini, vertikaalikankaita, trapetsi, jongleerausvälineitä ym.</li>
        <li>Mahdollisuus lattiamajoitukseen Jyväskylän Sirkuskoulun tiloissa Tanner-salilla (Ahjokatu 12, 40320 Jyväskylä).</li>
        <li>Uudenvuoden jamit sunnuntaina kaikille halukkaille.</li>
      </ul>
      <p>Nähdään välipäivinä!</p>
      <p>Ps. Jos mieltäsi askarruttaa kysymys, joka vaatii pikaista vastausta, ota yhteyttä tapahtumajärjestäjään: <a href="mailto:jukka.raimovaara@sirkuskoulu.fi">jukka.raimovaara@sirkuskoulu.fi</a></p>



    <router-link to="/timetable"><h2 id="timetable">Aikataulu</h2></router-link>

    <h2 id="spaces" class="mt-3">Tilat</h2>

    <div class="d-flex flex-wrap flex-lg-nowrap gap-3 m-3">
      <div class="col-lg-6">
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
      <div class="col-lg-6">
        <Kartta />
      </div>
    </div>
    <div class="d-flex flex-wrap flex-lg-nowrap gap-3 m-3">
      <div class="col-lg-6 text-center">
        <img src="/kartta.png" class="img-fluid">
      </div>
      <div class="col-lg-6 text-left m-3">
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
    <h2 id="workshops">Työpajat</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Työpajoja on käynnissä aina useita samanaikaisesti ja voit valita niistä omalle tasollesi ja tavoitteillesi sopivimman.</li>
        <li>Työpajoja pidetään Sirkuskoululla sekä JSA:n cheerleading-salilla, mutta ne aloitetaan aina sirkuskoululla aiheiden ja ennakkovaatimusten esittelyllä. </li>
        <li>Työpajoihin ilmoittautuminen: Kullakin työpajalla on rajattu osallistujamääränsä. Voit varata paikkoja työpajoihin kirjoittamalla nimesi pajan nimilistaan (löytyvät sirkuskoulun seinältä). Osa työpajoista sisältää ennakkovaatimuksia, jotka selviävät samoista listoista. HUOM! Jos muutat mieltäsi ilmoittautumisen jälkeen, viivaa nimesi yli niin varasijalla odottava pääsee mukaan.</li>
      </ul>
    </div>

    <h2 id="food">Ruokailu</h2>
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

    <h2 id="accommodation">Majoittuminen</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Jos olet sirkuskoululla yötä, suosittelemme yöpymistä sirkus- tai perhesalissa - valtaa paikkasi vapaasti mutta käytäthän makuupussia tai omia lakanoita.</li>
        <li>Matka- ja yöpymistavarat tulee säilyttää päivisin parkour-salissa.</li>
        <li>Öisin ovi on lukossa - sovi kanssayöpyjien kanssa avauksesta jos poistut ilta-aikaan!</li>
        <li>Yöpyä voit sirkuskoululla sunnuntaiaamuun saakka.</li>
      </ul>
    </div>

    <h2 id="showers">Suihkut ja sauna</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Sirkuskoululla on käytettävissä kaksi suihkua, jotka löytyvät parkour-salin perällä sijaitsevista wc-tiloista.</li>
        <li>
          Yhteistyökumppanimme Kuntomaailman tiloissa on mahdollista saunoa iltaisin 20:30 asti. Toimi näin:
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

    <h2 id="trash">Roskat ja kierrätys</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Sirkussalin reunalta löytyy kierrätysroskikset biojätteelle, muoville, lasille ja metallille, ja näiden takaa avotoimistosta löydät paperinkeräyksen - käytäthän näitä ja autat meitä säästämään luontoa.</li>
        <li>Huolehditaanhan yhdessä salin ja yhteisten tilojen siisteydestä!</li>
        <li>Jos huomaat sotkuja tai että jotain uupuu, ilmoitathan asiasta henkilökunnalle.</li>
      </ul>
    </div>

    <h2 id="safety">Ensiapu ja turvallisuus</h2>
    <div class="text-left m-3">
      <ul class="list-disc">
        <li>Ohjaajat ovat vastuussa työpajojen turvallisuudesta - jos huomaat turvallisuusriskejä, ilmoitathan ohjaajallesi!</li>
        <li>Jokaisessa salissa on ensiaputarvikkeita. Tarvittaessa pyydä niitä ohjaajalta tai henkilökunnalta.</li>
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
