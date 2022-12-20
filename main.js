//Const nimi votab kasutusele HTML koodis oleva Input sectioni
const nimi = document.querySelector("#nimi");
//Const Nimi_ekraanil votab kasutusele HTML koodis oleva h2 elemendi
const nimi_ekraanil = document.querySelector("#nime_valjastamine");
//Const raha votab kasutusele html koodis oleva raha inputi
const raha = document.querySelector("#raha");
//Const raha_ekraanil votab kasutusele html koodis oleva h2 ja valjastab sinna raha
const raha_ekraanil = document.querySelector("#raha_valjastamine");
let game_start = false;
let jackpot = false;
let jackpot_num = 15;
let silmade_Arv = 0;

//Kui Kasutaja on juba sisestanud nime eelmine kord ja see on meil
//Local storageis kirjas siis votame selle nuud uuesti kasutusele
nimi_ekraanil.innerHTML = localStorage.getItem("name");
raha_ekraanil.innerHTML = localStorage.getItem("money");

//Kui vajutama input elemendil olevat nuppu kaivitame display
//funktsiooni
nimi.addEventListener("keyup", display_nimi);
raha.addEventListener("keyup", display_raha);

//player object
let player = {
    nimi: localStorage.getItem('name'),
    raha_summa: localStorage.getItem('money')
}

let veeretused = [];

function alusta_mangu(){
    //Mängu alustamise eest võtame maha 100 raha
    silmade_Arv = 0;
    jackpot = false;
    reset();
    if (player.raha_summa > 0){
        player.raha_summa -= 100;
        //Saadame playerit andmed local storageisse
        raha_refresher();
        game_start = true;
    } else {
        document.getElementById("kautus_tekst").innerHTML = ("Kahjuks kaotasite. Palun laadige veebileht" +
            "uuesti, et taaskord oma õnne proovida");
    }
}

function raha_refresher(){
    localStorage.setItem("player_stats", JSON.stringify(player));
    raha.innerHTML = localStorage.getItem('money');
    raha_ekraanil.innerHTML = localStorage.getItem('money')
    document.getElementById("raha_valjastamine").innerHTML = (`${player.raha_summa}`);
}

function reset() {
    veeretused = [];
    document.getElementById('taringud').innerHTML = `${veeretused.join("\r\n")}`;
    document.getElementById('kautus_tekst').innerHTML = ("")
    document.getElementById('silmad').innerHTML = ``;
}

function veereta(){
    if (game_start === true & jackpot === false){
        random_taring = Math.floor(Math.random()*6) + 1;
        veeretused.push(random_taring);
        silmade_Arv += random_taring;
        veeretused.forEach(taringu_pilt);
        document.getElementById('taringud').innerHTML = `${veeretused.join("\r\n")}`;
        document.getElementById('silmad').innerHTML = `Silmade arv: ${silmade_Arv}`;
        if(silmade_Arv < jackpot_num){
            player.raha_summa += random_taring * 10;
            raha_refresher();
        } else if (silmade_Arv === jackpot_num){
            jackpot= true;
            player.raha_summa += 3000;
            document.getElementById('kautus_tekst').innerHTML = ("JACKPOT!")
            raha_refresher();
            silmade_Arv = 0;
        } else if (silmade_Arv > jackpot_num){
            document.getElementById('kautus_tekst').innerHTML = ("Kahjuks ületasite 15 silma.")
            game_start = false;
            player.raha_summa -= silmade_Arv*10;
            raha_refresher();
            silmade_Arv = 0;
        }

    }
}
function taringu_pilt(element){
    let index = veeretused.indexOf(element);
    switch (element){
        case 1:
            veeretused[index] = `<i class="fa-solid fa-dice-one fa-3x"></i>`
            break;
        case 2:
            veeretused[index] = `<i class="fa-solid fa-dice-two fa-3x"></i>`
            break;
        case 3:
            veeretused[index] = `<i class="fa-solid fa-dice-three fa-3x"></i>`
            break;
        case 4:
            veeretused[index] = `<i class="fa-solid fa-dice-four fa-3x"></i>`
            break;
        case 5:
            veeretused[index] = `<i class="fa-solid fa-dice-five fa-3x"></i>`
            break;
        case 6:
            veeretused[index] = `<i class="fa-solid fa-dice-six fa-3x"></i>`
            break;
    }

}

function display_nimi() {
    //Paneme localstorageisse eseme nimega name, mis on nimi constanti saadud value
    player.nimi = localStorage.getItem('name');
    localStorage.setItem("name", nimi.value);
    //DeBuggimine Konsoolis
    console.log(localStorage.getItem('name'));
    //Maarame h2 elemendile localStoragei name eseme
    nimi.innerHTML = localStorage.getItem('name');
    nimi_ekraanil.innerHTML = localStorage.getItem("name");
}
function display_raha() {
    player.raha_summa = localStorage.getItem('money');
    //Paneme localstorageisse eseme nimega raha, mis on nimi constanti saadud value
    localStorage.setItem("money", raha.value);
    //DeBuggimine Konsoolis
    console.log(localStorage.getItem("money"));
    //Maarame h2 elemendile localStoragei name eseme
    raha.innerHTML = localStorage.getItem('money');
    raha_ekraanil.innerHTML = localStorage.getItem('money')
}