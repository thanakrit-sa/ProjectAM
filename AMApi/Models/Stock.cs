using System;

namespace AMApi.Models
{   
     public class DataStockPerMonth
    {

        public string IdStock { get; set; }
        public DataStockPerMonth[] DataProductPerMonth { get; set; }
        public DateTime StockPerMonth { get; set; }


    }
}