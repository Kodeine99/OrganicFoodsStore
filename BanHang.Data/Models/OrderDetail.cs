﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class OrderDetail : IEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public double TotalAmount { get; set; }

        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}