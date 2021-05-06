# Tietokantasovellus
TKT20011 Aineopintojen harjoitustyö: Tietokantasovellus

## Kehitysfilosofia
Sovellusta kehitetään rajapinta edelleä, ja edelleen domain-malli edellä. Toimintamalli perustuu Robert C. Martinin Clean Architecture kirjassa esittämään filosofiaan, missä isoja ja sitovia arkkitehtuurillisia päätöksiä tulee lykätä viime hetkeen asti. Tässä sovelluksessa se tarkoittaa esin domain mallin hahmottamista käyttäen mock dataa (MockRepositories). Kun sovellus toimii mock datalla, on oikea hetki miettiä miten se persistoidaan. Useimmiten tässä vaiheessa tietoa sovelluksen todellisista vaatimuksista on jo sen verran, että osataan tehdä parempi valita tiedon varastointiin; joskus ei edes tarvita tietokantaa vaan voidaan käyttää vaikka jotain AWS S3 tyyppistä ratkaisua.

Kurssin agenda olessa tietokantasovellus, päätös tietovarastosta on jo tehty ennen sovelluksen ideoimista. Kuitenkin päätin rakentaa sen niin, että se jättää mahdollisimman paljon tilaa erilaisille ajatuksille.

## Hostaus
Tässä vaiheessa hostausta ei ole vielä päätetty. Sovelluksen sisäinen routteri on rakennettu niin, se voidaan lopulta kytkeä lähes mihin vain.

## Testaus
Testit olisi hyvä totutetaa testaamalla api-rajapintoja. Oikea oppista testausta varten pitäisi luoda docker kontti, joka pitää sisällään posgressin. Edellä mainittu kanta seedataan mock datalla ja tätä dataa vasten ajetaan testit. Nyt kuitenkin toteutan saman idean käyttämällä mock dataa (MockRepositories), pääfokuksen ollessa niin sanottu smoke testaus.

Koska kyseessä on pitkäli triviaali web-sovellus, kattavat yksikkötestit lähinnä hidastavat ja vaikeuttavat kehitystä kokemusesta. Tilanne on toinen, mikäli sovelluksessa olisi jotain algoritmejä joita olisi mielekästä testata.
