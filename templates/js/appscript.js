/*function myfunction()
   {
	  
   var msg=document.getElementById('myInput').value;
   var res=msg.split(" ");
   document.getElementById('outputtext').value+=res+"\n";
   var msg=document.getElementById('myInput').value=" ";
   }*/
  $(function(){
  			$('a#process_input').bind('click',function(){
  				$("#outputtext").append($('input[name="myCountry"]').val());
  				$("#outputtext").append("\n");
  				$.getJSON('/background_process',{
  					proglang:$('input[name="myCountry"]').val(),
  				},function(data){
  					$("#outputtext").append(data.result);
  					$("#outputtext").append("<br>");
  					document.getElementById('myInput').value="";
  				});
  				return false;
  			});
		}); 
 function show(){
	 
	 var b=document.getElementById('user').value;
    localStorage.setItem("firstname", b);
	 var name=localStorage.getItem("firstname");
	document.getElementById('outputtext').innerHTML = name;
	 
	 
 }

function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                document.getElementById('myimg').setAttribute('src',e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }


    document.getElementById('imgSel').onchange = function () { //set up a common class
        readURL(this);
    };   



function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
     closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
          a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
           this.parentNode.appendChild(a);
           for (i = 0; i < arr.length; i++) {
             if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
               b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                 b.addEventListener("click", function(e) {
                     inp.value = this.getElementsByTagName("input")[0].value;
                        closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
       
        currentFocus++;
       
        addActive(x);
      } else if (e.keyCode == 38) { //up
        
        currentFocus--;
       
        addActive(x);
      } else if (e.keyCode == 13) {
       
        e.preventDefault();
        if (currentFocus > -1) {
         
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    
    if (!x) return false;
    
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
 
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}


var countries = ["angina pectoris","palpitation","pain chest","pressure chest","shortness of breath","dizziness","sweating increased","sweat","vertigo","asthenia","fall","nausea","syncope","mental status changes","polyuria","orthopnea","unresponsiveness","polydypsia","rale","vomiting","labored breathing","worry","suicidal","weepiness","intoxication","irritable mood","verbal auditory hallucinations","tremor","feeling suicidal","hallucinations auditory","mood depressed","sleeplessness","difficulty","unable to concentrate","agitation","feeling hopeless","energy increased","blackout","hallucinations visual","homelessness","nightmare","motor retardation","hypokinesia","dyspnea on exertion","chest tightness","productive cough","distress respiratory","pleuritic pain","green sputum","rhonchus","decreased translucency","breath sounds decreased","chill","tachypnea","malaise","fever","cough","wheezing","non-productive cough","night sweat","haemoptysis","yellow sputum","jugular venous distention","dyspnea","numbness","seizure","speech slurred","dysarthria","hemiplegia","facial paresis","symptom aggravating factors","t wave inverted","st segment depression","st segment elevation","chest discomfort","bradycardia","presence of q wave","pain","nonsmoker","diarrhea","erythema","apyrexial","pruritus","swelling","abscess bacterial","hepatosplenomegaly","hyponatremia","renal angle tenderness","difficulty passing urine","hematuria","consciousness clear","hemodynamically stable","dysuria","lethargy","guaiac positive","haemorrhage","tumor cell invasion","arthralgia","orthostasis","heme positive","monoclonal","fatigue","pain back","pallor","ecchymosis","transaminitis","hypoxemia","sputum purulent","hypercapnia","patient non compliance","abdominal tenderness","unsteady gait","bedridden","unconscious state","ascites","urgency of micturition","hypotension","hyperkalemia","enuresis","muscle twitch","sleepy","headache","lightheadedness","asterixis","food intolerance","drowsiness","numbness of hand","general discomfort","stiffness","tired","mass of body structure","prostatism","weight gain","nervousness","has religious belief","hot flush","formication","emphysematous change","lesion","thicken","cushingoid habitus","cushingoid facies","decreased body weight","hoarseness","","hypotonic","spontaneous rupture of membranes","muscle hypotonia","sore to touch","redness","hyperacusis","scratch marks","hypesthesia","satiety early","sensory discomfort","throbbing sensation quality","constipation","pain abdominal","heartburn","burning sensation","cyanosis","breech presentation","cardiomegaly","clonus","pain in lower limb","history of - blackout","anorexia","unwell","anosmia","metastatic lesion","hemianopsia homonymous","neck stiffness","hematocrit decreased","cicatrisation","gurgle","aura","wheelchair bound","myoclonus","hypometabolism","left atrial hypertrophy","oliguria","catatonia","paresthesia","gravida 0","lung nodule","unhappy","distended abdomen","ache","heavy feeling","macerated skin","sinus rhythm","rest pain","behavior hyperactive","terrify","withdraw","photopsia","giddy mood","exhaustion","hyperhidrosis disorder","loose associations","hypersomnia","extrapyramidal sign","mydriasis","disturbed family","overweight","systolic murmur","r wave feature","snore","asymptomatic","bleeding of vagina","splenomegaly","photophobia","painful swallowing","macule","cachexia","hypothermia, natural","hypocalcemia result","general unsteadiness","atypia","hacking cough","snuffle","stridor","throat sore","stinging sensation","Stahli's line","fremitus","paralyse","abnormal sensation","aphagia","focal seizures","stupor","paresis","sniffle","bradykinesia","urge incontinence","out of breath","hirsutism","rambling speech","clumsiness","room spinning","vision blurred","scar tissue","decreased stool caliber","hematochezia","egophony","neologism","decompensation","stool color yellow","rigor - temperature-associated observation","paraparesis","fear of falling","spasm","moody","posturing","hyperventilation","gag","excruciating pain","pulse absent","dysesthesia","passed stones","ataxia","polymyalgia","qt interval prolonged","Heberden's node","hepatomegaly","sciatica","frothy sputum","estrogen use","retropulsion","mass in breast","hypersomnolence","underweight","colic abdominal","red blotches","dullness","hypokalemia","hunger","urinary hesitation","prostate tender","pain foot","disequilibrium","pustule","flushing","urinoma","indifferent mood","hypoalbuminemia","no status change","extreme exhaustion","slowing of urinary stream","breakthrough pain","systolic ejection murmur","pansystolic murmur","cystic lesion","barking cough","stuffy nose","frail","rapid shallow breathing","noisy respiration","nasal discharge present","projectile vomiting","heavy legs","dysdiadochokinesia","achalasia","side pain","titubation","posterior rhinorrhea","monocytosis","claudication","lameness","clammy skin","incoherent","mediastinal shift","awakening early","tenesmus","nausea and vomiting","fecaluria","pneumatouria","alcoholic withdrawal symptoms","todd paralysis","dyspareunia","floppy","poor dentition","myalgia","inappropriate affect","moan","poor feeding","welt","hydropneumothorax","tinnitus","superimposition","feeling strange","tonic seizures","debilitation","absences finding","uncoordination","impaired cognition","drool","tremor resting","groggy","pin-point pupils","adverse effect","adverse reaction","abdominal bloating","fatigability","proteinemia","abnormally hard consistency","intermenstrual heavy bleeding","abortion","primigravida","previous pregnancies 2","para 2","pain neck","shooting pain","hyperemesis","dizzy spells","regurgitates after swallowing","milky","phonophobia","rolling of eyes","ambidexterity","lip smacking","gravida 10","pulsus paradoxus","bruit","scleral icterus","retch","breath-holding spell","verbally abusive behavior","blanch","elation","transsexual","behavior showing increased motor activity","coordination abnormal","choke","bowel sounds decreased","no known drug allergies","low back pain","charleyhorse","sedentary","feels hot/feverish","nan","flare","pericardial friction rub","hoard","panic","cardiovascular finding","soft tissue swelling","cardiovascular event","rhd positive","para 1","sneeze","nasal flaring","hypertonicity","gasping for breath","flatulence","Murphy's sign","feces in rectum","prodrome","hypoproteinemia","alcohol binge episode","abdomen acute","catching breath","air fluid level","large-for-dates fetus","immobile","homicidal thoughts",];


autocomplete(document.getElementById("myInput"), countries);