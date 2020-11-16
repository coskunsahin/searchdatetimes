using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using seachinhdate.Models;
using searchdatetimes.Models;

namespace seachinhdate.Controllers
{
    [RoutePrefix("Api/Searchdata")]
    public class SearchdataController : ApiController


    {
        NorthwindEntities DB = new NorthwindEntities();
        public SearchdataController()
        {

            DB.Configuration.LazyLoadingEnabled = true;
            DB.Configuration.ProxyCreationEnabled = false;
        }


        [Route("showdata")]
        [HttpGet]


        public object showdata()
        {
            IList<Order> orders = DB.Orders.ToList();


            var a = DB.Order_Details.Select(K => new {
                orderid = K.OrderID,
                employeeID = K.Order.EmployeeID,
                employeername = K.Order.Employee.FirstName,
                orderDate = K.Order.OrderDate,
                shipAddress = K.Order.ShipAddress,
                price = K.UnitPrice,
                quantity = K.Quantity


            }).ToList();
            return a;
        }

        [Route("search")]

        [HttpPost]
        public object search(searchdata sd)
        {
            var a = DB.Order_Details.Where(x => x.Order.OrderDate >= sd.startdate && x.Order.OrderDate <= sd.enddate).Select(K => new {
                orderid = K.OrderID,
                employeeID = K.Order.EmployeeID,
                employeername = K.Order.Employee.FirstName,
                orderDate = K.Order.OrderDate,
                shipAddress = K.Order.ShipAddress,
                price = K.UnitPrice,
                quantity = K.Quantity


            }).ToList();

            return a;
        }





    }
}
