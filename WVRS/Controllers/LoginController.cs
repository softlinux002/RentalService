using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WVRS.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult CheckLogin(string Username, string Password)
        {
            List<string> response = new List<string>();
            if(Username == "admin" && Password.ToLower() == "wvrs")
            {
                response.Add("success");
            }
            else
            {
                response.Add("error");
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CheckLoginUser()
        {
            List<string> response = new List<string>();
            if (Session["Login"] == null)
            {
                response.Add("false");
            }
            else
            {
                response.Add("true");
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}