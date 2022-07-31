import { FullWidthContainer } from "./Containers"
import Title from "./Title"

export const TextContainer: React.FC = () => (
  <FullWidthContainer className="relative p-3">
    <Title>Tietokilta lyhyesti</Title>
    <p className="font-sans pb-3 text-sm">
      Tietokilta ry (TiK) on Aalto-yliopiston Perustieteiden korkeakoulun{" "}
      <a href="/">tietotekniikan koulutusohjelman</a> opiskelijoiden
      ainejärjestö eli kilta, joka on avoin muillekin killan toiminnasta
      kiinnostuneille.
    </p>
    <p className="font-sans pb-3 text-sm">
      Tietokilta järjestää opiskelijoilleen erilaista vapaa-ajan toimintaa niin
      Otaniemessä kuin sen ulkopuolellakin, valvoo heidän etujaan korkeakoulun
      toimielimissä, huolehtii yhteyksistä muihin opiskelijajärjestöihin ja
      pyrkii muuten huolehtimaan heidän hyvinvoinnistaan. Kaikki killan toiminta
      perustuu hyvien teekkariperinteiden mukaiseen vapaaehtoistyöhön ja
      yhteiseen talkoohenkeen.
    </p>
    <p className="font-sans pb-3 text-sm">
      Kampuksella tietokiltalaiset löytää parhaiten kiltahuoneelta eli
      kiltikseltä, joka sijaitsee Tietotekniikan Talolla osoitteessa{" "}
      <a href="/">Konemiehentie 2</a> rakennuksen koilliskulmassa.
    </p>
    <p className="font-sans pb-3 text-sm">
      TiK toimii kaikkien Aalto-yliopiston opiskelijoiden etuja ajavan{" "}
      <a href="/">Aalto-yliopiston ylioppilaskunnan</a> (AYY) piirissä.
    </p>
  </FullWidthContainer>
)
