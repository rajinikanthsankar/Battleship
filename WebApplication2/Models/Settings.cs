using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication2.Models
{
    public class Sequence
    {
        public string Sequences { get; set; }
        public Settings Settings1 { get; set; }
        public Settings Settings2 { get; set; }
        public Settings Settings3 { get; set; }
    }
    public class Settings
    {
       
        public string Caliber { get; set; }
        public string Location{get;set;}
        public string StartPoint{get;set;}
        public string EndPoint{get;set;}
    }
}
