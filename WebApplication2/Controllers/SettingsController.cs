using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApplication2.Models;


namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }

        [HttpGet("[action]")]
        public string Get()
        {           
            string result=string.Empty;
            HttpClient client = new HttpClient();           
            var response = client.GetAsync("https://localhost:44304/api/values").Result;
            if (response.IsSuccessStatusCode)
            {
                result = response.Content.ReadAsStringAsync().Result;                    
            }

            return result;
        }

        [HttpPut("[action]")]
        public FeedBackMessage Set([FromBody] Sequence settings)
        {
            return new FeedBackMessage
            {
                Sequences = settings.Sequences,
                Settings1 = new Message
                {
                    caliber = settings.Settings1.Caliber,
                    endPoint = settings.Settings1.EndPoint,
                    location = settings.Settings1.Location,
                    startPoint = settings.Settings1.StartPoint,
                },
                Settings2 = new Message
                {
                    caliber = settings.Settings2.Caliber,
                    endPoint = settings.Settings2.EndPoint,
                    location = settings.Settings2.Location,
                    startPoint = settings.Settings2.StartPoint,
                },
                Settings3 = new Message
                {
                    caliber = settings.Settings3.Caliber,
                    endPoint = settings.Settings3.EndPoint,
                    location = settings.Settings3.Location,
                    startPoint = settings.Settings3.StartPoint,
                }
            };            
        }

        [HttpPost("[action]")]
        public string Run([FromBody] FeedBackMessage feedBack)
        {
            List<ReturnMessage> lst = new List<ReturnMessage>();
            
            var obj = new ReturnMessage
            {
                Id = "1",
                TimesTested = feedBack.Sequences,
                Rotated = feedBack.Settings1.endPoint
            };
            lst.Add(obj);
            obj = new ReturnMessage
            {
                Id = "2",
                TimesTested = feedBack.Sequences,
                Rotated = feedBack.Settings2.endPoint
            };
            lst.Add(obj);
            obj = new ReturnMessage
            {
                Id = "3",
                TimesTested = feedBack.Sequences,
                Rotated = feedBack.Settings3.endPoint
            };
            lst.Add(obj);

            return JsonConvert.SerializeObject(lst);
        }
    }
}
