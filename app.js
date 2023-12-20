//Variables start
let current_crop="";
let current_stage="";
let moisture_element=document.querySelector("#live-moisture");
let moisture_level_element=document.querySelector("#water_level");
let crop_element=document.querySelector("#crop");
let crop_stage_drop_down_element=document.querySelector("#crop_stage_drop_down");
let crops_icons_element=document.querySelectorAll("#crops_icons article");
let nim_moisture_level=0;
//Variables end
function changeMoistureLevel(moisture){
    // Modify the style of the ::before pseudo-element
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
      changeMoistureLevel(data["feeds"][0]["field1"]);
      console.log('API response:', data["feeds"][0]["field1"]);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }
  
  async function callApiEvery3Seconds() {
    while (true) {
      await fetchData();
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds
    }
  }
  
  // Start the API calls
  callApiEvery3Seconds();
  
  window.addEventListener("load", function() { // when the page has loaded
    document.getElementById("crop_stages_ul").addEventListener("click", function(e) {
      const tgt = e.target;
      crop_stage_drop_down_element.innerHTML="<i data-feather='trending-up' width='18' ></i> &nbsp;" + document.getElementById(tgt.id).textContent;
      current_stage=document.getElementById(tgt.id).textContent;
    });

    // Define the click event handler function
    function handleClick() {
        // Your code here
        crop_element.textContent=this.textContent;
        console.log(this.firstChild);
        this.firstChild.style="border: 1px solid #4E9F3D;";
      }
  
      // Attach the click event listener to each button using forEach
      crops_icons_element.forEach(button => {
        button.addEventListener('click', handleClick);
      });

  });
