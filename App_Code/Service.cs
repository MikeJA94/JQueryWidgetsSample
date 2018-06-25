using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "Service" in code, svc and config file together.
public class Service : IService
{
	public string JSONData(string id)
	{
        return "Id is ... " + id;
	}


    public string GetRandomAddress()
    {
        var rnd = new Random(DateTime.Now.Millisecond);
        int tick = rnd.Next(0, 9);

        string [] addresses = {"Baltimore,Maryland", "Boston,Ma","Portland,Ore","Dallas , Texas","Orlando,Florida","New York City","Pittsburg,PA","Denver,CO", "Charlotte,NC"};

        HttpContext.Current.Response.Cache.SetExpires(DateTime.UtcNow.AddMinutes(-1));
        HttpContext.Current.Response.Cache.SetCacheability(HttpCacheability.NoCache);
        HttpContext.Current.Response.Cache.SetNoStore();

        return addresses[tick];
    }
}
