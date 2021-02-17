let all=true;
let vocabulary;
let wordInput;
let findWord;
// ! funksiyalarni sahifa to'liq yuklangandan keyin amalga oshiradi
$(document).ready(function () { 
    
    // todo: Exchange icon bosilganda all ni qiymatini va qaraqalpaqsha inglisshe s6zlarini joyini o'zgartiradi
    $('.fa-exchange-alt').on('click',function () { 
        $(`#leftHand`).html('');
        $(`#rightHand`).html('');
        $('#wordInput').html('');
        
        $('#qar-lang-text').text(`${(all)? 'Inglisshe': 'Qaraqalpaqsha'}`);
        $('#eng-lang-text').text(`${(!all)? 'Inglisshe': 'Qaraqalpaqsha'}`);
        $('#eng-lang-flag-text').html(`${(all)? '<img class="flag-image" src="./images/flag of Karakalpakstan.png" alt="Karakalpakstan"> Qaraqalpaqsha': '<img class="flag-image" src="./images/flag of Great Britain.png" alt="Great Britain"> Inglisshe'}`);
        $('#qar-lang-flag-text').html(`${(!all)? '<img class="flag-image" src="./images/flag of Karakalpakstan.png" alt="Karakalpakstan"> Qaraqalpaqsha': '<img class="flag-image" src="./images/flag of Great Britain.png" alt="Great Britain"> Inglisshe'}`);
        (all)? all=false: all=true;
     });

    //  ! serching button ya'ni lupa click bo'lganda ishlaydi
     $('#serching-btn').click(function () { 
        //  todo: Agar serching inputga hechnarsa yozilmasa matn qaytaradi
         if($('#searching').val()===''){

             $(`#leftHand`).html('');
             $(`#rightHand`).html('');
             $('#wordInput').html('');
             $('#error-word').html(`<small id="emailHelp" class="form-text text-danger">Iltimos so'z kiriting</small>`);

         }
        //  todo: Agar input ichida nimadir bo'lsa uni borib tekshirib keladi
         else{
            $('#error-word').html('');
            wordInput=$('#searching').val();

              //   ! Ajax  vocabulary.json da massivni tortib beradi
            $.ajax({
                url: '../vocabulary.json',
                type: 'get',
                success: function(data){
                    vocabulary = data;
                },
                error: function (err) {
                    console.log(err);
                },
                async:false
            })
            draw();
                
            }
      });
 });

// ! Bu funksiya so'zlarni topib yozib beradi
 draw=()=>{
    findWord=false;
    $('#wordInput').html(`Siz <span  class="text-info ">${wordInput}</span> so'zin izledin'iz.`);
    // todo: so'zni vocabulary massivi ichidan qidiradi
    vocabulary.forEach(items=>{
         
        //   todo: all ni qiymatiga qarab yo inglizcha so'zlarni tenglab topadi yoki o'zbekcha
        if((all)? items.wordEn === wordInput.toLowerCase() : items.wordUz === wordInput.toLowerCase()){
            findWord=true;
            $('#searching').val('');
            $('#error-word').html('');

            // todo: Borib ingliz so'zini yozib keladi
            $(`#${(all)? 'leftHand': 'rightHand'}`).html(`
            
            <div class="card-body pt-0 pl-0 ">
            <h5 class="font-italic mb-1 text-capitalize"><span id="taken-word">${items.wordEn}</span></h5>
            
            <div class="text-info">noun</div>
            <div id="nouns">  </div>
            
            <div class="text-info">Synonyms</div>
            
            <div id="synonyms"> </div>
            </div>
            
            `);
            // ? ingliz so'zini definition ini borib chizadi
            items.defEn.forEach(definitions=>{
                $('#nouns').append(`<p class="m-0">- ${definitions}</p>`);
            });
            // ? ingliz so'zini synonym ini borib chizadi
            items.synEn.forEach(synonyms=>{
                $('#synonyms').append(`<p class="m-0">- ${synonyms}</p>`);
            });
            
            
            // todo: Borib uzbek so'zini yozib keladi
            $(`#${(all)? 'rightHand': 'leftHand'}`).html(`
            
                <div class="card-body pt-0 pl-0 ">
                    <h5 class="font-italic mb-1 text-capitalize"><span id="taken-word">${items.wordUz}</span></h5>    
                    <div class="text-info">Atliq</div>
                    <div id="nounsUz"> </div>
                    
                    <div class="text-info">Sinonimler</div>
                    <div id="synonymsUz"> </div>
                </div>

            `);
            // ? uzbek so'zini definition ini borib chizadi
            items.defUz.forEach(definitionsUz=>{
                $('#nounsUz').append(`<p class="m-0">- ${definitionsUz}</p>`);
            });
            // ? uzbek so'zini sinonimlarini borib chizadi
            items.synUz.forEach(synonymsUz=>{
            $('#synonymsUz').append(`<p class="m-0">- ${synonymsUz}</p>`);
            });
        } 
    });

    // todo: Agar so'z topilmasa yozadi
    if(!findWord){
        $(`#leftHand`).html('');
        $(`#rightHand`).html('');
        $(`#leftHand`).html(`<h3 class="text-danger font-weight-bold">Bunday so'z mavjud emas!</h3>`);
    }
 }