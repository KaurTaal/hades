import {Component, OnInit, Output} from '@angular/core';
import {ManualService} from "../services/manual.service";


@Component({
  selector: 'app-manuals',
  templateUrl: './manuals.component.html',
  styleUrls: ['./manuals.component.scss']
})
export class ManualsComponent implements OnInit {
  @Output()
  allManualsList: any = [
    {
      name: "I KT arvest. juhend",
      text: "<h2 style='margin-top:18.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;line-height:115%;font-size:21px;font-family:\"Arial\",sans-serif;font-weight:normal;'>Juhend T&Uuml; kursuse &ldquo;Programmeerimine&rdquo; I kontrollt&ouml;&ouml; arvestusliku osa koostamiseks</h2>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">Arvestuslik osa koosneb kuuest k&uuml;simusest. Iga k&uuml;simus kontrollib &uuml;he suurema teema teadmisi:</span></p>\n" +
        "<ol start=\"1\" style=\"margin-bottom:0cm;margin-top:0cm;\" type=\"1\">\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style='font-family:\"Roboto Medium\";'>avaldised ja lihtlaused</span><span style=\"font-family:Roboto;\">&nbsp;(muutujad, avaldised, omistuslause, andmet&uuml;&uuml;bid, sisend ja v&auml;ljund)</span></li>\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style='font-family:\"Roboto Medium\";'>tingimuslaused</span><span style=\"font-family:Roboto;\">&nbsp;(if, if-else, if-elif-else, tingimuslaused &uuml;ksteise sees, t&otilde;ev&auml;&auml;rtustehted)</span></li>\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style='font-family:\"Roboto Medium\";'>funktsioonid</span><span style=\"font-family:Roboto;\">&nbsp;(funktsioonide defineerimine, rakendamine, lokaalsed ja globaalsed muutujad, parameetrid, v&auml;&auml;rtuse tagastamine)</span></li>\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style='font-family:\"Roboto Medium\";'>korduslaused</span><span style=\"font-family:Roboto;\">&nbsp;(while, for-ts&uuml;kkel)</span></li>\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style='font-family:\"Roboto Medium\";'>s&otilde;net&ouml;&ouml;tlus</span><span style=\"font-family:Roboto;\">&nbsp;(tehted s&otilde;nedega)</span></li>\n" +
        "    <li style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style='font-family:\"Roboto Medium\";'>lihtsam failit&ouml;&ouml;tlus</span><span style=\"font-family:Roboto;\">&nbsp;(faili kirjutamine, failist lugemine, ts&uuml;kliga, ilma j&auml;rjenditeta)</span></li>\n" +
        "</ol>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">K&uuml;simused valitakse juhuslikult konkreetse teema k&uuml;simuste hulgast Moodle&rsquo;i k&uuml;simuste- pangast. See, kui palju peab k&uuml;simusi iga teema kohta k&uuml;simustepangas olema ja kui palju erinevaid &uuml;he teema k&uuml;simusi l&auml;heb &uuml;hte t&ouml;&ouml;se, oleneb t&ouml;&ouml; tegijate arvust ja on kursuse &otilde;ppej&otilde;udude otsustada.</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">J&auml;relt&ouml;&ouml;s ei tohi olla samad k&uuml;simused, mis olid p&otilde;hit&ouml;&ouml;s.</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">Soovituslik on j&auml;rjestikustel aastatel kasutada erinevaid k&uuml;simusi ning iga aasta luua iga teema kohta v&auml;hemalt 1 uus k&uuml;simus.</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">T&ouml;&ouml;se k&uuml;simusi valides tuleb kontrollida, et k&otilde;ik k&uuml;simused oleks &uuml;heselt m&otilde;istetavad ning &uuml;he teema k&uuml;simused oleksid sarnase raskusastmega. Kui ei ole, tuleks neid siis muuta, need kustutada v&otilde;i nende asemel luua uued.</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">K&uuml;simused v&otilde;iksid arvestuslikus testis olla j&auml;rjestatud kursusel l&auml;bimise j&auml;rjekorras (nagu &uuml;leval teemad), siis saab p&auml;rast statistikat tehes hea &uuml;levaate ning tudengitel on ka loogiline vastata (st. ei kuluta alguses raskemale asjale liiga palju aega).</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">Iga k&uuml;simuse eest on v&otilde;imalik saada 0 (vale vastus), 0,5 (50% v&otilde;i rohkem ulatuses &otilde;ige vastus, oleneb t&auml;psemalt k&uuml;simusest) v&otilde;i 1 punkti (t&auml;iesti &otilde;ige vastus).&nbsp;</span></p>\n" +
        "<p style='margin:0cm;line-height:150%;font-size:15px;font-family:\"Arial\",sans-serif;margin-bottom:6.0pt;'><span style=\"font-family:Roboto;\">T&ouml;&ouml; saab arvestatud, kui saadakse 90% punktidest ehk 5,5 v&otilde;i 6 punkti.</span></p>\n" +
        "<p style='margin:0cm;line-height:115%;font-size:15px;font-family:\"Arial\",sans-serif;'><span style=\"font-family:Roboto;\">&nbsp;</span></p>"
    },
    {
      name: "I kontrolltöö juhendi koostamine",
      text: `<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-size:17px;line-height:115%;font-family:Roboto;">&ldquo;Programmeerimine&rdquo; I kontrollt&ouml;&ouml; juhendi koostamine</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">Kokkuv&otilde;te tulemuste anal&uuml;&uuml;sist:</span></p>
<ul style="list-style-type: undefined;margin-left:26px;">
    <li><span style='font-family:"Roboto Light";'>Arvestuslikus osas praktiliselt ainus k&uuml;simus, mis tekitas erinevust oli 5. (programmi ridade t&auml;itmise j&auml;rjekord).</span>
        <ul style="list-style-type: undefined;">
            <li><span style='line-height:115%;font-family:"Roboto Light";font-family:"Roboto Light";font-size:10.0pt;'>19, kes said I KT arvestusliku tehtud, ei saanud II KT arvestuslikku tehtud</span></li>
            <li><span style='line-height:115%;font-family:"Roboto Light";font-family:"Roboto Light";font-size:10.0pt;'>19 &uuml;li&otilde;pilast said I ja II KT arvestatud, kuid kursuse F; neist 5 ei p&auml;&auml;senud eksamile, sest polnud piisavalt punkte saanud kodut&ouml;&ouml;de eest; &uuml;lej&auml;&auml;nutest 9 ei ilmunud eksamile ning 5 said eksamilt liiga v&auml;he punkte. Neist 9-st kes ei ilmunud eksamile, oleks 3-el tegelikult E jaoks piisanud ainult eksami arvestusliku osa lahendamisest.</span></li>
        </ul>
    </li>
    <li><span style='font-family:"Roboto Light";'>Programmeerimise osas tundus I variant olevat k&otilde;ige lihtsam, II k&otilde;ige rohkem raskusi valmistav. Mina isiklikult arvan (ka muu tagasiside p&otilde;hjal), et II ja III olid siis parajad ja I &lsquo;liiga&rsquo; lihtne.</span></li>
</ul>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">Kokkuv&otilde;te sisulisest anal&uuml;&uuml;sist:</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'>
    <ul style="margin-bottom:0cm;list-style-type: undefined;margin-left:26px;">
        <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>1. &uuml;lesanne</span></li>
    </ul>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-left:36.0pt;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<table style="width: 4.2e+2pt;margin-left:41.0pt;border-collapse:collapse;border:none;">
    <tbody>
        <tr>
            <td style="width: 138.45pt;border: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">I variant</span></p>
            </td>
            <td style="width: 138.45pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">II variant</span></p>
            </td>
            <td style="width: 138.45pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">III variant</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>maiustuse liigi k&uuml;simine</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>kuu k&uuml;simine</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>failinime k&uuml;simine</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>2 rea kaupa lugemine</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>3 rea kaupa lugemine</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>2 rea kaupa lugemine</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>korduvad</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>korduvad</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>iga kuup&auml;ev ainult 1 kord</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>veatuvastus sisendis</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>pole vaja tuvastada viga sisendis</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>pole vaja tuvastada viga sisendis</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>k&otilde;ige lihtsamad arvutused (summaarne liitmine, v&otilde;rdlemine), k&otilde;ige v&auml;hem muutujaid</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>k&otilde;ige keerulisem &uuml;lesande tekst,</span></p>
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>rohkem arvutusi, k&otilde;ige rohkem muutujaid</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>veidi keerulisemad arvutused (jooksvalt k&otilde;rgeima leidmine nt)</span></p>
            </td>
        </tr>
    </tbody>
</table>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<div style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'>
    <ul style="margin-bottom:0cm;list-style-type: undefined;margin-left:26px;">
        <li style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>2. &uuml;lesanne</span></li>
    </ul>
</div>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;margin-left:36.0pt;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<table style="width: 4.2e+2pt;margin-left:41.0pt;border-collapse:collapse;border:none;">
    <tbody>
        <tr>
            <td style="width: 138.45pt;border: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>I variant</span></p>
            </td>
            <td style="width: 138.45pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>II variant</span></p>
            </td>
            <td style="width: 138.45pt;border-top: 1pt solid black;border-right: 1pt solid black;border-bottom: 1pt solid black;border-image: initial;border-left: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>III variant</span></p>
            </td>
        </tr>
        <tr>
            <td style="width: 138.45pt;border-right: 1pt solid black;border-bottom: 1pt solid black;border-left: 1pt solid black;border-image: initial;border-top: none;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>selgelt k&otilde;ige lihtsam</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>Esimesest tsipa keerulisem, sest on vaja eelarve ise kokku l&uuml;&uuml;a</span></p>
            </td>
            <td style="width: 138.45pt;border-top: none;border-left: none;border-bottom: 1pt solid black;border-right: 1pt solid black;padding: 5pt;vertical-align: top;">
                <p style='margin:0cm;line-height:normal;font-size:15px;font-family:"Arial",sans-serif;border:none;'><span style='font-family:"Roboto Light";'>Esimesest tsipa keerulisem, sest 2. fun puhul vaja rohkem korrutada ja arvud nii palju suuremad, et vb raskem hoomata (n&auml;idetes)</span></p>
            </td>
        </tr>
    </tbody>
</table>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">Kokkuv&otilde;te kontrollt&ouml;&ouml; j&auml;rgsest tagasiside k&uuml;sitlusest:</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<ul style="list-style-type: undefined;margin-left:26px;">
    <li><span style='font-family:"Roboto Light";'>Viidati &uuml;lesannete s&otilde;nastuse keerukusele (nii arvestuslikus osas kui ka programmeerimise osas (nt matemaatiliste asjade kohta))</span></li>
    <li><span style='font-family:"Roboto Light";'>Arvestuslik osa oli pigem lihtne, lihtne v&otilde;i v&auml;ga lihtne 85,4% vastanute arvates.</span></li>
    <li><span style='font-family:"Roboto Light";'>Programmeerimise osa oli pigem lihtne, lihtne v&otilde;i v&auml;ga lihtne 61,5% vastanute arvates. Ainult 1,5% arvasid, et oli v&auml;ga keeruline, 10,8% et keeruline ja 26,2% et pigem keeruline.</span></li>
    <li><span style='font-family:"Roboto Light";'>39,5% vastanutest tunnevad end ebakindlalt failide lugemisel ja kirjutamisel;</span></li>
</ul>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;text-indent:36.0pt;'><span style='font-family:"Roboto Light";'>27,9% tunnevad end ebakindlalt millegi muuga seoses (nt &uuml;lesande t&otilde;lgendamine, &uuml;ldiselt t&auml;psustamata) ;<br>&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;27,1% ei tunne end kuskil ebakindlalt;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;19,4% tekitab probleeme k&auml;skude kombineerimine;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;17,1% tunnevad, et liiga palju aega kulub korrektse s&uuml;ntaksi saavutamiseks.</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">Kokkuv&otilde;te eksami &nbsp;j&auml;rgsest tagasiside k&uuml;sitlusest:</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<ul style="list-style-type: undefined;margin-left:26px;">
    <li><span style='font-family:"Roboto Light";'>Arvestusliku osa l&auml;vendi kohta oli &uuml;li&otilde;pilastel segane info.</span></li>
    <li><span style='font-family:"Roboto Light";'>Enamik arvasid, et &uuml;lesanded olid t&auml;iesti paraja raskusastmega.</span>
        <ul style="list-style-type: undefined;">
            <li><span style='font-family:"Roboto Light";'>Oli nii neid, kes arvasid, et v&otilde;iks rohkem aega olla (aga samas oli mitmeid, kes arvasid, et ajapinge on hea), kui ka neid, kes arvasid, et v&otilde;iks veel raskem olla, sest maksimumi tundus statistika p&otilde;hjal lihtne saada.</span></li>
        </ul>
    </li>
    <li><span style='font-family:"Roboto Light";'>Kurdeti &uuml;lesannete s&otilde;nastuse &uuml;le</span></li>
</ul>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style="font-family:Roboto;">Teemad:</span></p>
<ul style="list-style-type: undefined;margin-left:26px;">
    <li><span style="font-family:Roboto;">Sissejuhatus. Avaldised ja lihtlaused.</span><span style='font-family:"Roboto Light";'>&nbsp;(muutujad, avaldised, omistuslause, andmet&uuml;&uuml;bid, sisend ja v&auml;ljund)</span></li>
    <li><span style="font-family:Roboto;">Tingimuslaused.</span><span style='font-family:"Roboto Light";'>&nbsp;(if, if-else, if-elif-else, tingimuslaused &uuml;ksteise sees, t&otilde;ev&auml;&auml;rtustehted)</span></li>
    <li><span style="font-family:Roboto;">Funktsioonid.</span><span style='font-family:"Roboto Light";'>&nbsp;(funktsioonide defineerimine, rakendamine, lokaalsed ja globaalsed muutujad, parameetrid, v&auml;&auml;rtuse tagastamine)</span></li>
    <li><span style="font-family:Roboto;">Korduslaused.</span><span style='font-family:"Roboto Light";'>&nbsp;(while, break, kahekordne ts&uuml;kkel, for ts&uuml;kkel)</span></li>
    <li><span style="font-family:Roboto;">S&otilde;net&ouml;&ouml;tlus.</span><span style='font-family:"Roboto Light";'>&nbsp;(tehted s&otilde;nedega)&nbsp;</span><span style="font-family:Roboto;">ja lihtsam failit&ouml;&ouml;tlus&nbsp;</span><span style='font-family:"Roboto Light";'>(faili kirjutamine, failist lugemine, ts&uuml;kliga, ilma j&auml;rjenditeta)</span></li>
</ul>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-size:13px;line-height:115%;font-family:"Roboto Light";'>(erinevus vs 21/22 S - suurem fookus tingimus- ja korduslausetele, algoritmide asemel spetsiifilisemalt s&otilde;ned ja lihtsam failit&ouml;&ouml;tlus)</span></p>
<p style='margin:0cm;line-height:115%;font-size:15px;font-family:"Arial",sans-serif;'><span style='font-family:"Roboto Light";'>&nbsp;</span></p>`
    },
    {
      name: "Hindamismaatriksite mustand",
      text: `Kokkuvõte sisulisest analüüsist:
· 1. ülesanne

\tI variant
\tII variant
\tIII variant

\tmaiustuse liigi küsimine
\tkuu küsimine
\tfailinime küsimine

\t2 rea kaupa lugemine
\t3 rea kaupa lugemine
\t2 rea kaupa lugemine

\tkorduvad
\tkorduvad
\tiga kuupäev ainult 1 kord

\tveatuvastus sisendis
\tpole vaja tuvastada viga sisendis
\tpole vaja tuvastada viga sisendis

\tkõige lihtsamad arvutused (summaarne liitmine, võrdlemine), kõige vähem muutujaid
\tkõige keerulisem ülesande tekst,
rohkem arvutusi, kõige rohkem muutujaid
\tveidi keerulisemad arvutused (jooksvalt kõrgeima leidmine nt)



· 2. ülesanne

\tI variant
\tII variant
\tIII variant

\tselgelt kõige lihtsam
\tEsimesest tsipa keerulisem, sest on vaja eelarve ise kokku lüüa
\tEsimesest tsipa keerulisem, sest 2. fun puhul vaja rohkem korrutada ja arvud nii palju suuremad, et vb raskem hoomata (näidetes)`
    }
  ];

  constructor(private manualService: ManualService) {
  }

  ngOnInit() {
    this.manualService.getManualsList().subscribe(res => {
      console.log(res)
    })
  }

  public getAllManualsList() {
    this.allManualsList = [];
  }
}
