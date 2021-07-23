using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{

    public class FeedBackMessage
    {
        public string Sequences { get; set; }
        public Message Settings1 { get; set; }
        public Message Settings2 { get; set; }
        public Message Settings3 { get; set; }
    }
    public class Message
    {
       
        public string caliber { get; set; }
        public string location { get; set; }
        public string startPoint { get; set; }
        public string endPoint { get; set; }
    }

    public class ReturnMessage
    {
        public string Id { get; set; }
        public string TimesTested { get; set; }
        public string Rotated { get; set; }
    }
}
