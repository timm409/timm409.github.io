/*js for the weather widget*/

   window.weatherWidgetConfig =  window.weatherWidgetConfig || [];
   window.weatherWidgetConfig.push({
       selector:".weatherWidget",
       apiKey:"ALEDSZNEC4ZTKXY5DBTEKF7F4",
       location:"33.366667, 126.533333",
       unitGroup:"metric",
       forecastDays:7,
       title:"Hallasan National Park, Korea", 
       showTitle:true, 
       showConditions:true
   });
  
   (function() {
   var d = document, s = d.createElement('script');
   s.src = 'https://www.visualcrossing.com/widgets/forecast-simple/weather-forecast-widget-simple.js';
   s.setAttribute('data-timestamp', +new Date());
   (d.head || d.body).appendChild(s);
   })();