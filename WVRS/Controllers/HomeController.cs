using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using WVRS.App_Start;

namespace WVRS.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SubmitData(string data)
        {
            JObject json = JObject.Parse(data);
            List<string> response = new List<string>();
            int result = InsertRecord(json);
            if(json["userid"] == null)
            {
                response.Add("User information added successfully.");
            }
            else
            {
                response.Add("User information Updated successfully.");
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteInfo(String UserId)
        {
            List<string> response = new List<string>();
            dbConnector objConn = new dbConnector();
            SqlConnection Conn = objConn.GetConnection;
            Conn.Open();
            int result = 0;
            try
            {
                if (Conn.State != System.Data.ConnectionState.Open) Conn.Open();
                SqlCommand objCommand = new SqlCommand("SP_DeleteCustomerInfo", Conn);
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.Parameters.AddWithValue("@UserId", UserId);
                result = Convert.ToInt32(objCommand.ExecuteScalar());
                if (result > 0)
                {
                    response.Add("Success");
                }
                else
                {
                    response.Add("fail");
                }
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (Conn != null)
                {
                    if (Conn.State == ConnectionState.Open)
                    {
                        Conn.Close();
                        Conn.Dispose();
                    }
                }
            }
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetCustomerInfo()
        {
            Session["Login"] = true;
            dbConnector objConn = new dbConnector();
            SqlConnection Conn = objConn.GetConnection;
            try
            {               
                Conn.Open();
                DataSet ds = new DataSet();
                if (Conn.State != System.Data.ConnectionState.Open) Conn.Open();
                SqlCommand sqlComm = new SqlCommand("SP_GetCustomerInfo", Conn);
                sqlComm.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = sqlComm;
                da.Fill(ds);
                return Json(DataSetToJSON(ds), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                throw;
            }
            finally
            {
                if (Conn != null)
                {
                    if (Conn.State == ConnectionState.Open)
                    {
                        Conn.Close();
                        Conn.Dispose();
                    }
                }
            }
        }

        [HttpGet]
        public JsonResult Logout()
        {
            Session["Login"] = null;
            Session.Abandon();
            List<string> response = new List<string>();
            return Json(response, JsonRequestBehavior.AllowGet);
        }

        private string DataSetToJSON(DataSet ds)
        {
            JArray list = new JArray();
            JavaScriptSerializer json = new JavaScriptSerializer();
            foreach (DataTable dt in ds.Tables)
            {
                foreach (DataRow dr in dt.Rows)
                {
                    Dictionary<string, string> vals = new Dictionary<string, string>();
                    for (int i = 0; i < dt.Columns.Count; i++)
                    {
                        vals.Add(dt.Columns[i].ColumnName, dr[dt.Columns[i].ColumnName].ToString());
                    }
                    string jsondata = json.Serialize(vals);
                    list.Add(jsondata);
                }
            }
            return list.ToString();
        }

        private int InsertRecord(JObject userInfo)
        {
            dbConnector objConn = new dbConnector();
            SqlConnection Conn = objConn.GetConnection;
            Conn.Open();
            int result = 0;
            try
            {
                if (Conn.State != System.Data.ConnectionState.Open) Conn.Open();
                SqlCommand objCommand = new SqlCommand("SP_ADDCUSTOMER_INFO", Conn);
                objCommand.CommandType = CommandType.StoredProcedure;
                objCommand.Parameters.AddWithValue("@UserId", Convert.ToInt32(userInfo["userid"]));
                objCommand.Parameters.AddWithValue("@UserType", Convert.ToString(userInfo["UserType"]));
                objCommand.Parameters.AddWithValue("@FullName", Convert.ToString(userInfo["name"]));
                objCommand.Parameters.AddWithValue("@DrivingLicense", Convert.ToString(userInfo["Dlicense"]));
                objCommand.Parameters.AddWithValue("@DOB", Convert.ToString(userInfo["Dob"]));
                objCommand.Parameters.AddWithValue("@CompanyAddress", Convert.ToString(userInfo["companyAddress"]));
                objCommand.Parameters.AddWithValue("@ContactDetail", Convert.ToString(userInfo["CDetail"]));
                objCommand.Parameters.AddWithValue("@ContactAddress", Convert.ToString(userInfo["cntAddress"]));
                objCommand.Parameters.AddWithValue("@StartDate", Convert.ToString(userInfo["startDate"]));
                objCommand.Parameters.AddWithValue("@EndDate", Convert.ToString(userInfo["endDate"]));
                objCommand.Parameters.AddWithValue("@Vehicle", Convert.ToString(userInfo["vehicle"]));
                objCommand.Parameters.AddWithValue("@GearBox", Convert.ToString(userInfo["gearbox"]));
                objCommand.Parameters.AddWithValue("@FuelType", Convert.ToString(userInfo["fueltype"]));
                objCommand.Parameters.AddWithValue("@Color", Convert.ToString(userInfo["color"]));
                objCommand.Parameters.AddWithValue("@Model", Convert.ToString(userInfo["model"]));
                objCommand.Parameters.AddWithValue("@Make", Convert.ToString(userInfo["make"]));
                objCommand.Parameters.AddWithValue("@RegNo", Convert.ToString(userInfo["regnum"]));
                objCommand.Parameters.AddWithValue("@EngineSize", Convert.ToString(userInfo["ensize"]));
                objCommand.Parameters.AddWithValue("@Mileage", Convert.ToString(userInfo["mileage"]));
                objCommand.Parameters.AddWithValue("@Doors", Convert.ToString(userInfo["doors"]));
                objCommand.Parameters.AddWithValue("@ServiceDate", Convert.ToString(userInfo["lastService"]));
                objCommand.Parameters.AddWithValue("@Dimention", Convert.ToString(userInfo["dimention"]));
                objCommand.Parameters.AddWithValue("@SafetyInfo", Convert.ToString(userInfo["safetyInfo"]));
                result = Convert.ToInt32(objCommand.ExecuteScalar());
                if (result > 0)
                {
                    return result;
                }
                else
                {
                    return 0;
                }
            }
            catch(Exception ex)
            {
                throw;
            }
            finally
            {
                if (Conn != null)
                {
                    if (Conn.State == ConnectionState.Open)
                    {
                        Conn.Close();
                        Conn.Dispose();
                    }
                }
            }
        }
    }
}