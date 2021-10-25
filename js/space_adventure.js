window.addEventListener('keydown', keyIsDown); // wenn die taste gedrückt wird, wird funktion "keyIsDown" aufgerufen
            var leben_anzahl = new Array(); // gleiche elemente in einem array
            var strn_population = new Array();
            var mtr_population = new Array();
            var star_bonus_population = new Array();
            punkt = 0; // am anfang 0 punkte 
            ie = false;// Browsererkennung 
            if(!!document.documentMode){ 
                ie = true; // versteht IE-Syntax
            }
            id_strn = 0;
            id_mtr = 0;
            x_neu = '';
            y_neu='';
            z_leben = 3; // am anfang hat man 3 lebens 
            mtr_breite = 0; // bildbreite von zufälligem meteor
            mtr_hoehe = 0; // bildhoehe von zufälligem meteor
            // elemente mit gewümschten parameter erzeugen:
            function divfabrik(meineId, meineFarbe, meinLeft, meinTop, meineWidth, meineHeight, hgbild, elternelementId){ // divs erzeugen
                var el = document.createElement('div');
                el.id = meineId;
                el.style.backgroundColor = meineFarbe;
                el.style.position = 'absolute';
                el.style.left = meinLeft + 'px';
                el.style.top = meinTop + 'px';
                el.style.width = meineWidth + 'px';
                el.style.height = meineHeight + 'px';
                el.posX = meinLeft;
                el.posY = meinTop;
                el.breite = meineWidth;
                el.hoehe = meineHeight;
                el.style.backgroundImage = hgbild;
                document.getElementsByTagName('body')[0].appendChild(el);
                if(elternelementId == null){
                    document.getElementsByTagName('body')[0].appendChild(el);
                }
                else if(document.getElementById(elternelementId)){
                    document.getElementById(elternelementId).appendChild(el);
                }
                else{
                    return false;
                }
                return el;
            }
            function zufall(min, max) { // Funktion gibt eine zufällige ganze Zahl zwischen min und max zurück
                var zuf_zahl = min + Math.random() * (max + 1 - min);
                zuf_zahl = Math.floor(zuf_zahl); // gibt die ganze Zahl zurück
                return zuf_zahl;  //speichern
              }
            function sterne(){ // Funktion erzeugt 15 Sternen im Hintergrund
                z_strn = 0;
                while(z_strn < 16){
                   var x_sterne = Math.random()*(rahmen.breite - 10); //sterne liegen innerhalb der breite von play area
                   var y_sterne = zufall(-160, rahmen.posY); // sterne werden außerhalb der höhe von play area erzeugt
                   strn_population[z_strn] = divfabrik('stern'+z_strn, '', x_sterne, y_sterne, 10, 10, 'url("img/stern0.png")', 'rahmen');
                   z_strn++;
                }
            }
            function meteore(){ // Funktion erzeugt 3 meteore, analog zur funktion sterne()
                z_mtr = 0; // zählt meteore
                while(z_mtr < 4){
                   mtr_bild = Math.round(Math.random()*3); // so wird index vom bild ausgewählt. zufällige ganze zahl von 0 bis 2
                   if(mtr_bild == 0){ //angaben vom bild0
                       mtr_breite = 40; 
                       mtr_hoehe = 40;
                   }
                   if(mtr_bild == 1){ //angaben vom bild1
                       mtr_breite = 45;
                       mtr_hoehe = 61;
                   }
                   if(mtr_bild == 2){ //angaben vom bild2
                       mtr_breite = 80;
                       mtr_hoehe = 70;
                   }
                   var x_meteor = Math.random()*(rahmen.breite - mtr_breite);
                   var y_meteor = zufall(-160, rahmen.posY); 
                   mtr_population[z_mtr] = divfabrik('meteor'+z_mtr, '', x_meteor, y_meteor, mtr_breite, mtr_hoehe, 'url("img/meteor'+mtr_bild+'.png")', 'rahmen');
                   z_mtr++;
                }
            }
            function star_bonus(){ // Funktion erzeugt 2 Bonus Sternen im Hintergrund
                z_strs = 0;
                while(z_strs < 3){
                   var x_stars = Math.random()*(rahmen.breite - 10); //sterne liegen innerhalb der breite von play area
                   var y_stars = zufall(-160, rahmen.posY); // sterne werden außerhalb der höhe von play area erzeugt
                   star_bonus_population[z_strs] = divfabrik('star_bonus_'+z_strs, '', x_stars, y_stars, 50, 50, 'url("img/star.png")', 'rahmen');
                   z_strs++;
                }
            }
            function playArea(){ // play area generieren
                rahmen = divfabrik('rahmen', '#000000', 100, 100, 600, 600, '', null); //hintergrund erzeugen
                start_bttn = document.createElement('button'); // start knopf
                start_bttn.innerHTML = 'START'; // value von start knopf
                rahmen.appendChild(start_bttn); // knopf an rahmen anhängen
                start_bttn.id = 'start_bttn'; // id vergeben
                start_bttn.addEventListener('click', init); //eventHandler, beim klicken werden funktionen "init" und "start_loeschen" ausgeführt
                start_bttn.addEventListener('click', start_loeschen);
            }
            function start_loeschen(){ // nachdem start knopf gecklickt wird, löscht er sich vom play area selbst
                document.getElementById('start_bttn').remove();
            }
            function init(){ // spielelemente generieren
                sterne(); //sterne im hintergrund erzeugen
                strn_bwgn (); // sterne bewegen
                rakete = divfabrik('rakete', '', 280, 530, 40, 60, 'url("img/rakete2.png")', 'rahmen'); //rakete erzeugen
                meteore(); //meteore erzeugen
                mtr_bwgn (); // meteore bewegen
                star_bonus();
                strs_bwgn();
                leben_anzahl[0] = divfabrik('leben1', '', 10, 10, 20, 25, 'url("img/leben.png")', 'rahmen'); // wie viele lebens geblieben sind
                leben_anzahl[1] = divfabrik('leben2', '', 35, 10, 20, 25, 'url("img/leben.png")', 'rahmen');
                leben_anzahl[2] = divfabrik('leben3', '', 60, 10, 20, 25, 'url("img/leben.png")', 'rahmen');
                punktestand = divfabrik('punktestand', '', 400, 10, 200, 35, '', 'rahmen'); //div für punktestand
                punktestand_text = document.createTextNode('PUNKTE: '); // text im div mit punktestand
                punktestand.appendChild(punktestand_text); // text als kind vom div mit punktestand
                punktestand_punkte = document.createTextNode(punkt); // punktestand
                punktestand.appendChild(punktestand_punkte); // text als kind vom div mit punktestand
            }
            function loeschen(){ // play area sauber machen um neu anzufangen
                while(rahmen.hasChildNodes('div')){ // loeschen alle generierte kindelemente vom div 'rahmen'
                    rahmen.removeChild(rahmen.lastChild);
                }
                z_leben = 3; // leben wieder voll
                punkt = 0; // punktestand wieder bei 0
                setTimeout(init, 300); // neue spielelemente werden in 300 milisekunden generiert, damit while-schleife zeit hat, alte objekte zu löschen, ohne diese pause werden neue elemente auch gelöscht
            }
            function bewegeUm(element, x,y){ // elemente horizontal und vertikal schrittweise bewegen
                element.posX = element.posX + x;
                element.posY = element.posY + y;
                element.style.left = element.posX + 'px';
                element.style.top = element.posY + 'px';
            }
            function bewegeNach(element, x, y){ // elemente nach beliebiger position  bewegen
                element.posX = x;
                element.posY = y;
                element.style.left = x + 'px';
                element.style.top = y + 'px';
            }
            function bewegeNach_neu(element, x, y){ // elemente horizontal und vertikal bewegen
                x_neu = Math.random()*(rahmen.breite - element.breite); //position der elemente, die von unten kommen, wird wieder zufällig generiert
                y_neu = -Math.random()*600; // elemente außerhalb von play area erzeugen
                element.posX = x_neu;
                element.posY = y_neu;
                element.style.left = x_neu + 'px';
                element.style.top = y_neu + 'px';
            }
            function keyIsDown(event){ // rakete nur im play area um 10 px bewegen
                if(87 == event.keyCode && rakete.posY >0){ // "w"
                    bewegeUm(rakete, 0, -10); //nach oben
                }
                if(83 == event.keyCode && rakete.posY <= rahmen.hoehe - rakete.hoehe){ // "s"
                    bewegeUm(rakete, 0, 10);   // nach unten
                }
                if(65 == event.keyCode && rakete.posX > 0){ // "a"
                    bewegeUm(rakete, -10, 0);  // nach links
                }
                if(68 == event.keyCode && rakete.posX < rahmen.breite - rakete.breite){ // "d"
                    bewegeUm(rakete, 10, 0);   // nach rechts
                }
            }
            function strn_bwgn (){ // sterne nach unten bewegen
                strn_population.forEach(function(stern){ // array mit sterne iterieren
                    if(stern.posY < 590){ // stern um 2px bewegen, wenn stern noch im play area liegt
                       bewegeUm(stern, 0,2);
                    }
                    else if(stern.posY >= 590){ // stern nach oben bewegen, wenn untere kante erreicht ist
                        bewegeNach_neu(stern,x_neu,y_neu);
                    }
                    if(stern.posY < 0){ // sterne außerhalb von  play area ausblenden
                        stern.style.display = 'none';
                    }
                    else if(stern.posY > 0){ // sterne innerhalb von play area einblenden
                        stern.style.display = 'block';
                    }
                });
                id_strn = setTimeout (strn_bwgn, 10); // funktion ruft sich selbs auf (jede 10 milisekunden)
            }
            function mtr_bwgn (){ // meteore nach unten bewegen, analog zur funktion strn_bwgn
                loser(); // mit der funktion "mtr_bwgn" wird funktion "loser" sofort aufgerufen, um punkte für berührung der meteore abzuziehen
                if(z_leben > 0){ // wenn man noch im spiel ist, bewegen sich die meteore
                    mtr_population.forEach(function(meteor){
                        if(meteor.posY < rahmen.hoehe - meteor.hoehe){ 
                           bewegeUm(meteor, 0,5);
                        }
                        else if(meteor.posY >= rahmen.hoehe - meteor.hoehe){ 
                            bewegeNach_neu(meteor,x_neu,y_neu);
                            punkt++;
                            punktestand_punkte.nodeValue = punkt;
                        }
                        if(meteor.posY < 0){ 
                            meteor.style.visibility = 'hidden';
                        }
                        else if(meteor.posY  > 0){ 
                            meteor.style.visibility = 'visible';
                        }
                    });
                    id_mtr = setTimeout (mtr_bwgn, 30);
                }
                else{ // wenn man 0 leben hat
                    mtr_population.forEach(function(meteor){
                        meteor.style.visibility = 'hidden'; // meteore verstecken
                    });
                    clearTimeout(id_mtr); // meteore nicht mehr bewegen, damit punktestand sich nicht ändert
                }
            }
            function strs_bwgn (){ // bonus sterne nach unten bewegen
                bonus_treff(rakete);
                if(punkt<9999){ // spieler gewinnt, wenn er 10000 punkte gesammelt hat
                star_bonus_population.forEach(function(star){ // array mit bonus sterne iterieren
                    if(star.posY < rahmen.hoehe-star.hoehe){ // bonus stern um 2px bewegen, wenn stern noch im play area liegt
                       bewegeUm(star, 0,2);
                    }
                    else if(star.posY >= rahmen.hoehe-star.hoehe){ // bonus stern nach oben bewegen, wenn untere kante erreicht ist
                        bewegeNach_neu(star,x_neu,y_neu);
                    }
                    if(star.posY < 0){ // bonus sterne außerhalb von  play area ausblenden
                        star.style.display = 'none';
                    }
                    else if(star.posY > 0){ // bonus sterne innerhalb von play area einblenden
                        star.style.display = 'block';
                    }
                });
                id_strs = setTimeout (strs_bwgn, 10); // funktion ruft sich selbs auf (jede 10 milisekunden)
                }
                else{
                    clearTimeout(id_mtr); // meteore, sterne und bonus sterne stoppen
                    clearTimeout(id_strn);
                    clearTimeout(id_strs);
                    mtr_population.forEach(function(meteor){ //meteore verstecken
                        meteor.style.visibility = 'hidden';
                    });
                    star_bonus_population.forEach(function(star){ //bonus sterne verstecken
                        star.style.visibility = 'hidden';
                    });
                    gewinner_text = divfabrik('ende_text', '#0f0', 80, 230, 400, 111, '', 'rahmen'); //gewinner text ausgeben
                            gewinn = document.createTextNode('Sie haben gewonnen!'); // da textNode "\n" ignoriert, wird jede zeile als auch jeder zeilenumbruch (br) als neues kindelement vom div "loser_text" angehängt
                            gewinner_text.appendChild(gewinn);
                            umbruch0 = document.createElement('br');
                            gewinner_text.appendChild(umbruch0);
                            pnktsnd0 = document.createTextNode('IHR PUNKTESTAND: ' + punkt); // globale variable "punkt" zeigt, wie viele meteore der spieler nicht berührt hat
                            gewinner_text.appendChild(pnktsnd0);
                            umbruch02 = document.createElement('br');
                            gewinner_text.appendChild(umbruch02);
                            nchml0 = document.createTextNode('noch mal versuchen?');
                            gewinner_text.appendChild(nchml0);
                            umbruch03 = document.createElement('br');
                            gewinner_text.appendChild(umbruch03);
                            start02 = document.createElement('button');
                            start02.innerHTML = 'START';
                            gewinner_text.appendChild(start02);
                            start02.id = 'start2';
                        start02.addEventListener('click', loeschen);
                        rakete.style.visibility = 'hidden'; // rakete verstecken
                        
                }
            }
            function hit(objA, objB){   // prüfen, ob sich zwei objekte berühren
                var obj1 = objA.getBoundingClientRect();
                var obj2 = objB.getBoundingClientRect();
                return !(obj1.left > obj2.right ||
                        obj1.right < obj2.left ||
                        obj1.top > obj2.bottom ||
                        obj1.bottom < obj2.top);
            }
            function treff(ebene){ //überwache kollision, beim anstossen marschieren meteore sofort nach oben 
                if(hit(ebene, mtr_population[0])){ 
                    bewegeNach_neu(mtr_population[0], x_neu,y_neu);
                    return true;
                }
                if(hit(ebene, mtr_population[1])){
                    bewegeNach_neu(mtr_population[1], x_neu,y_neu);
                    return true;
                }
                if(hit(ebene, mtr_population[2])){
                    bewegeNach_neu(mtr_population[2], x_neu,y_neu);
                    return true;
                }
                return false;
            }
            function bonus_treff(ebene){ //überwache kollision, beim anstossen marschieren meteore sofort nach oben 
                
                if(hit(ebene, star_bonus_population[0])){ 
                    bewegeNach_neu(star_bonus_population[0], x_neu,y_neu);
                    punkt=punkt+100;
                    return true;
                }
                if(hit(ebene, star_bonus_population[1])){
                    bewegeNach_neu(star_bonus_population[1], x_neu,y_neu);
                    punkt=punkt+100;
                    return true;
                }
                if(hit(ebene, star_bonus_population[2])){
                    bewegeNach_neu(star_bonus_population[2], x_neu,y_neu);
                    punkt=punkt+100;
                    return true;
                }
                return false;
            }
            function nach_dem_treff(){
                rakete.style.backgroundImage = 'url("img/rakete2.png")'; // statt feuer wieder rakete anzeigen
            }
            function loser(){ 
                if(treff(rakete)){ // wenn kollision passiert ist
                    rakete.style.backgroundImage = 'url("img/explosion.png")'; // rakete "explodiert"
                    if(z_leben > 0){ // lebensanzahl muss positiv sein
                        setTimeout(nach_dem_treff, 800); // explosion wird 800 milisekunden angezeigt
                        leben_anzahl[z_leben-1].style.backgroundImage = 'url("img/leben_0.png")'; // das leben visuell abziehen
                        z_leben = z_leben -1; // das leben wird abgezogen
                    }
                    if(z_leben == 0){ // wenn man 0 leben hat, bzw. verloren hat
                        leben_anzahl[z_leben].style.backgroundImage = 'url("img/leben_0.png")'; // das leben visuell abziehen
                        loser_text = divfabrik('ende_text', '#f00', 80, 230, 400, 111, '', 'rahmen');
                            verloren = document.createTextNode('Sie haben verloren!'); // da textNode "\n" ignoriert, wird jede zeile als auch jeder zeilenumbruch (br) als neues kindelement vom div "loser_text" angehängt
                            loser_text.appendChild(verloren);
                            umbruch1 = document.createElement('br');
                            loser_text.appendChild(umbruch1);
                            pnktsnd = document.createTextNode('IHR PUNKTESTAND: ' + punkt); // globale variable "punkt" zeigt, wie viele meteore der spieler nicht berührt hat
                            loser_text.appendChild(pnktsnd);
                            umbruch2 = document.createElement('br');
                            loser_text.appendChild(umbruch2);
                            nchml = document.createTextNode('noch mal versuchen?');
                            loser_text.appendChild(nchml);
                            umbruch3 = document.createElement('br');
                            loser_text.appendChild(umbruch3);
                            start2 = document.createElement('button');
                            start2.innerHTML = 'START';
                            loser_text.appendChild(start2);
                            start2.id = 'start2';
                        start2.addEventListener('click', loeschen);
                        rakete.style.visibility = 'hidden'; // rakete verstecken
                        clearTimeout(id_strn); // sterne nicht mehr bewegen
                        clearTimeout(id_strs); // bonus sterne nicht mehr bewegen
                    }
                }
            }
            window.onload=playArea;