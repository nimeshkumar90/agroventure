//Variables start
let current_crop="";
let current_stage="";
let moisture_required=0;
let volume_of_field=0;
let volume_req=0;
let hours_req=0;
let land_size=1;
let data_sheet_wheat=[0.05, 0.25, 0.45, 0.65, 0.9];
let data_sheet_jowar=[0.15, 0.4, 0.6, 1.0];
let moisture_element=document.querySelector("#live-moisture");
let moisture_level_element=document.querySelector("#water_level");
let crop_element=document.querySelector("#crop");
let crop_stage_drop_down_element=document.querySelector("#crop_stage_drop_down");
let crops_icons_element=document.querySelectorAll("#crops_icons article");
let nim_moisture_level=0;
let field_moisture=0;
let wheat_stage_eng=["germination", "crown root initiation", "active tillering", "flowering", "grain filling"];
let wheat_stage_hin=["germination_h", "crown root initiation_h", "active tillering_h", "flowering_h", "grain filling_h"];
let jowar_stage_eng=["germination", "vegetative growth","flowering","maturity"];
let jowar_stage_hin=["germination_h", "vegetative growth_h","flowering_h","maturity_h"];
//Variables end
function calc_water_need(){
          //for every acre
          if (current_crop == "Wheat"){
                    if (field_moisture < 45){
                    console.log("in wheat calc_water_need");
              //moisture_required
              moisture_required=(45 - field_moisture) / 100; 
                    
              let index_of_stage=wheat_stage_eng.indexOf(current_stage);
                    
              volume_of_field= 4000 * data_sheet_wheat[index_of_stage];  // is land size
              console.log("volume_of_field",volume_of_field);
              volume_req=moisture_required * volume_of_field * 1000;
                    console.log("volume_req",volume_req);
              hours_req=(volume_req/4500);
              console.log("hours_req",hours_req);
              return hours_req;
                    }
                    else
                    {
                              console.log("No need to irrigate more right now");
                              return "No need to irrigate more right now"
                    }
          }
          //for every acre
          if (current_crop == "Jowar"){
                    if (field_moisture < 45){
                    console.log("in Jowar calc_water_need");
              //moisture_required
              moisture_required=(45 - field_moisture) / 100; 
                    
              let index_of_stage=jowar_stage_eng.indexOf(current_stage);
                    
              volume_of_field= 4000 * data_sheet_jowar[index_of_stage];  //2.47105 is land size
              console.log("volume_of_field",volume_of_field);
              volume_req=moisture_required * volume_of_field;
                    console.log("volume_req",volume_req);
              hours_req=(volume_req*1000/4500)-4;
              console.log("hours_req",hours_req);
              return hours_req;
                    }
                    else
                    {
                              console.log("No need to irrigate more right now");
                              
                              return "No need to irrigate more right now";
                    }
          }
          
      }
function changeMoistureLevel(moisture){
    // Modify the style of the :: before pseudo-element
    moisture_element.textContent=moisture;
    if (moisture >=90)
    {
        document.documentElement.style.setProperty('--level', "-80%");
    }
    else if (moisture >=80)
    {
        document.documentElement.style.setProperty('--level', "-60%");
    }
    else if (moisture >=70)
    {
        document.documentElement.style.setProperty('--level', "-40%");
    }
    else if (moisture >=60)
    {
        document.documentElement.style.setProperty('--level', "-30%");
    }
    else if (moisture >=50)
    {
        document.documentElement.style.setProperty('--level', "-20%");
    }
    else if (moisture >=40)
    {
        document.documentElement.style.setProperty('--level', "-10%");
    }
    else if (moisture >=30)
    {
        document.documentElement.style.setProperty('--level', "0%");
    }
    else if (moisture >=20)
    {
        document.documentElement.style.setProperty('--level', "10%");
    }
    else if (moisture >=10)
    {
        document.documentElement.style.setProperty('--level', "20%");
    }
    else if (moisture >=10)
    {
        document.documentElement.style.setProperty('--level', "30%");
    }
}
async function fetchData() {
    try {
      // Replace 'your_api_url' with the actual URL of the API you want to call
      const response = await fetch('https://api.thingspeak.com/channels/2374156/fields/1.json?api_key=01N8X3STOIL6XRZJ&results=1');
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();
      field_moisture=data["feeds"][0]["field1"];
      calc_water_need();  
      changeMoistureLevel(data["feeds"][0]["field1"]);
      console.log('API response:', data["feeds"][0]["field1"]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  async function callApiEvery3Seconds() {
    while (true) {
      await fetchData();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 3 seconds
    }
  }
  
  // Start the API calls
  callApiEvery3Seconds();
  
  window.addEventListener("load", function() { // when the page has loaded
    document.getElementById("crop_stages_ul").addEventListener("click", function(e) {
      const tgt = e.target;
      //crop_stage_drop_down_element.innerHTML="<i data-feather='trending-up' width='18' ></i> &nbsp;" + document.getElementById(tgt.id).textContent;
      //current_stage=document.getElementById(tgt.id).textContent;
    });
    function getCurrentPage(){
        // Get the full path of the current URL
        let fullPath = window.location.pathname;
        // Extract the page name from the full path
        let pageName = fullPath.split('/').pop();
        console.log(pageName);
              return pageName;
    }
    function setCropStage()
    {
        current_stage=this.textContent;
        console.log(current_stage);
        let crop_stage_drop_down=document.querySelector("#crop_stage_drop_down");
        console.log(crop_stage_drop_down);
        crop_stage_drop_down.textContent=current_stage;
    }
      
    // Define the click event handler function
    function handleClick() {
        // Your code here
        crop_element.textContent=this.textContent;
        console.log(this.firstChild);
        this.firstChild.style="border: 1px solid #4E9F3D;";
        current_crop=this.textContent.trim();
        console.log(current_crop);
          let current_page=getCurrentPage();
              console.log("Current Page",current_page);
        if (current_crop==="Wheat"){
            let crop_stages_ul=document.querySelector("#crop_stages_ul");
            crop_stages_ul.innerHTML="";
                  console.log("I am Wheat");
                wheat_stage_eng.forEach(function(element) {
                  crop_stages_ul.innerHTML=crop_stages_ul.innerHTML+"<li><a class='dropdown-item crop_stage_li' href='#' id='crop_stage_li'>"+element+"</a></li>"
                });
            
              let crop_stage_li=document.querySelectorAll(".crop_stage_li");
              console.log("Nimesh Kumar");
              crop_stage_li.forEach(crop_stage=>{
                  crop_stage.addEventListener('click', setCropStage);
                  console.log(crop_stage);
              });
        }
        else if (current_crop==="Jowar"){
            let crop_stages_ul=document.querySelector("#crop_stages_ul");
            crop_stages_ul.innerHTML="";
                  let current_page=getCurrentPage();
                jowar_stage_eng.forEach(function(element) {
                  crop_stages_ul.innerHTML=crop_stages_ul.innerHTML+"<li><a class='dropdown-item crop_stage_li' href='#' id='crop_stage_li'>"+element+"</a></li>"
                });
            let crop_stage_li=document.querySelectorAll(".crop_stage_li");
              console.log("Nimesh Kumar");
              crop_stage_li.forEach(crop_stage=>{
                  crop_stage.addEventListener('click', setCropStage);
                  console.log(crop_stage);
              });
        }
      }
  
      // Attach the click event listener to each button using forEach
      crops_icons_element.forEach(button => {
        button.addEventListener('click', handleClick);
      });
      
  });
