using System;

namespace AMApi.Models
{
    public class Order
    {
        public string IdOrder { get; set; }
        public string IdProduct { get; set; }
        public string NameProduct { get; set; }
        public string AmountProduct { get; set; }
        public string PriceOrder { get; set; }
        public string NameUser { get; set; }
        public string TelUser { get; set; }
        public string AddressUser { get; set; }
        public DateTime? DateOrder { get; set; }
        public DateTime? SendDate { get; set; }
        public string Status { get; set; }
        

    }
}