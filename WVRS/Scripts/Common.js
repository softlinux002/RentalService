var VehcicleInfo = [
    {
        "Name": "Bike",
        "RegistrationNumber": "BD51 SMR",
        "EngineSize": "100cc",
        "Mileage": "36 miles",
        "Doors": "0",
        "ServiceDate": "2020-05-2",
        "Dimention": "600*400*800",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "50",
        "Manual": "50"
    },
    {
        "Name": "Car",
        "RegistrationNumber": "BD34 SMR",
        "EngineSize": "800cc",
        "Mileage": "14 miles",
        "Doors": "4",
        "ServiceDate": "2020-04-25",
        "Dimention": "1480*1680*3670",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "75",
        "Manual": "50"
    },
    {
        "Name": "Mini Bus 9/10 seats",
        "RegistrationNumber": "BD55 SMR",
        "EngineSize": "1200cc",
        "Mileage": "18 miles",
        "Doors": "2",
        "ServiceDate": "2020-02-16",
        "Dimention": "2050*2160*2760",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "100",
        "Manual": "75"
    },
    {
        "Name": "Mini Bus 15 seats",
        "RegistrationNumber": "BD50 SMR",
        "EngineSize": "1400cc",
        "Mileage": "12 miles",
        "Doors": "2",
        "ServiceDate": "2020-01-19",
        "Dimention": "2250*2360*2960",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "175",
        "Manual": "125"
    },
    {
        "Name": "Mini Bus 20 seats",
        "RegistrationNumber": "BD01 ETG",
        "EngineSize": "1600cc",
        "Mileage": "10 miles",
        "Doors": "2",
        "ServiceDate": "2020-02-12",
        "Dimention": "2550*2660*3360",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "250",
        "Manual": "200"
    },
    {
        "Name": "Van Small",
        "RegistrationNumber": "BD21 TEF",
        "EngineSize": "1000cc",
        "Mileage": "17 miles",
        "Doors": "2",
        "ServiceDate": "2020-01-20",
        "Dimention": "1950*1760*2360",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "100",
        "Manual": "95"
    },
    {
        "Name": "Van Big",
        "RegistrationNumber": "BD18 TWR",
        "EngineSize": "1400cc",
        "Mileage": "12 miles",
        "Doors": "2",
        "ServiceDate": "2020-01-12",
        "Dimention": "2350*2160*2660",
        "SafetyInfo": "Check with your insurance provider and your credit card travel protection to understand your current coverage for rental cars.",
        "Automatic": "175",
        "Manual": "125"
    }
]
var bikeModal = ["Lexmoto Echo", "Honda CB125F", "Honda PCX125", "Royal Enfield Interceptor", "Yamaha MT-07"];
var carModal = ["Ford Fiesta", "Ford Focus", "Vauxhall Corsa", "Nissan Qashqai", "Volkswagen Polo"];
var busModal = ["Ford Transit", "Fiat Ducato", "Mercedes-Benz Vario", "Mercedes-Benz Vito", "Volkswagen Caravelle"];
var vanModal = ["Vauxhall Combo", "Ford Transit Courier", "Volkswagen Caddy", "Citroen Berlingo", "Peugeot Partner"];
var bikeMake = ["Lexmoto", "Honda", "Royal Enfield", "Yamaha"];
var carMake = ["Ford","Vauxhall", "Nissan", "Volkswagen"];
var busMake = ["Ford", "Fiat", "Mercedes-Benz", "Volkswagen"];
var vanMake = ["Ford", "Volkswagen", "Peugeot"];
var reload = true;
var obj = {};


/*Init function*/
$(document).ready(function () {
    $(".pricom").hide();
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $(".mindate").attr("min", today);
    $("#userid").val(0);
    CheckLoginUser();
});

function CheckLoginUser() {
    $("#showerror").html("");
    $.ajax({
        type: "POST",
        url: "/Login/CheckLoginUser",
        data: {},
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            GetCustomerList();
        },
        error: function () {
            alert("Error occured!!")
        }
    });
}

/*Login function Start */
function Login() {
    $("#showerror").html("");
    var username = $("#username").val();
    var password = $("#password").val();
    if (!username || !password) {
        $("#showerror").html("Please enter username and password");
        return false;
    }
    var UserDetail = {
        Username: username,
        Password: password
    };
    $.ajax({
        type: "POST",
        url: "/Login/CheckLogin",
        data: JSON.stringify(UserDetail),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            Login = true;
            if (data == "success") {
                window.location.href = "/Home/Index";
                GetCustomerList();
            } else {
                $("#showerror").html("Invalid username and password.");
            }
        },
        error: function () {
            alert("Error occured!!")
        }
    });
}
/*Login function End */


/*Get Customer list */
function GetCustomerList() {
    $.ajax({
        type: "GET",
        url: "/Home/GetCustomerInfo",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var response = JSON.parse(data);
            var row = "";
            for (var i = 0; i < response.length; i++) {
                var record = JSON.parse(response[i]);
                row += "<tr><td>" + record["UserType"] + "</td>";
                row += "<td>" + record["FullName"] + "</td>";
                row += "<td>" + record["DrivingLicense"] + "</td>";
                row += "<td>" + record["DOB"] + "</td>";
                row += "<td>" + record["ContactDetail"] + "</td>";
                row += "<td>" + record["ContactAddress"] + "</td>";
                row += "<td><i class='fa fa-edit distance' onclick='editUserInfo(" + JSON.stringify(record) + ")' title='Edit'></i><i class='fa fa-trash distance' onclick='showdeletepopup(" + record["userid"] + ")' title='Delete'></i><i class='fa fa-file-pdf-o distance' onclick='showReceipt(" + JSON.stringify(record)+")' title='Receipt'></i></td></tr>";
            }
            $("#tablebody").html(row);
        },
        error: function () {
            alert("Error occured!!")
        }
    });
}
/*Get Customer list */

/*Save userinfo save code */
function SaveData() {
    clearError();
    var userType = $("#type").val();
    obj.UserType = userType
    var valid = true;
    if (userType === "Tourist" || userType === "Individual") {
        valid = validateIndividualTourist()
    } else {
        valid = validateTravelCompany();
    }
    valid = validateCommonfields();
    obj.regnum = $("#regnum").val();
    obj.ensize = $("#ensize").val();
    obj.mileage = $("#mileage").val();
    obj.doors = $("#doors").val();
    obj.lastService = $("#lastService").val();
    obj.dimention = $("#dimention").val();
    obj.safetyInfo = $("#safetyInfo").val();
    var UserDetail = {
        data: JSON.stringify(obj)
    };
    if (valid) {
        $.ajax({
            type: "POST",
            url: "/Home/SubmitData",
            data: JSON.stringify(UserDetail),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('#Notification').modal('show');
                $("#message").html(data);
                reload = true;
            },
            error: function () {
                alert("Error occured!!")
            }
        });
    }
}
/*Save userinfo save code */

/*Edit Userinfo code*/
function editUserInfo(data) {
    $("#submit").html("Update");
    $("#cancel").removeClass("hide");
    var userinfo = data;
    obj.userid = userinfo.userid;
    $("#type").val(userinfo.UserType)
    if (userinfo.UserType === "Tourist" || userinfo.UserType === "Individual") {
        $(".turind").show();
        $(".pricom").hide();
    } else {
        $(".turind").hide();
        $(".pricom").show();
    }
    $("#Name").val(userinfo.FullName);
    $("#CName").val(userinfo.FullName);
    $("#CAddress").val(userinfo.CompanyAddress);
    $("#Dlicense").val(userinfo.DrivingLicense);
    $("#Dob").val(userinfo.DOB);
    $("#CDetail").val(userinfo.ContactDetail);
    $("#CPerson").val(userinfo.ContactDetail);
    $("#cntAddress").val(userinfo.ContactAddress);
    $("#startDate").val(userinfo.StartDate);
    $("#endDate").val(userinfo.EndDate);
    $("#Vehicle").val(userinfo.Vehicle);
    if (userinfo.Vehicle.toLowerCase().indexOf("car") > -1) {
        setModelValue(carModal);
        setMakeValue(carMake);
    }
    else if (userinfo.Vehicle.indexOf("bus") > -1) {
        setModelValue(busModal);
        setMakeValue(busMake);
    } else if (userinfo.Vehicle.indexOf("van") > -1) {
        setModelValue(vanModal);
        setMakeValue(VanMake);
    } else {
        setModelValue(bikeModal);
        setMakeValue(bikeMake);
    }


    $("#Gearbox").val(userinfo.GearBox);
    $("#FuelType").val(userinfo.FuelType);
    $("#color").val(userinfo.Color);
    $("#Model").val(userinfo.Model);
    $("#Make").val(userinfo.Make);
    $("#regnum").val(userinfo.RegNo);
    $("#ensize").val(userinfo.EngineSize);
    $("#mileage").val(userinfo.Mileage);
    $("#doors").val(userinfo.Doors);
    $("#lastService").val(userinfo.ServiceDate);
    $("#dimention").val(userinfo.Dimention);
    $("#safetyInfo").val(userinfo.SafetyInfo);
}

function CancelData() {
    obj.userid = "";
    $("#submit").html("Submit");
    $("#cancel").addClass("hide");
    $("#type").val("Tourist");
    $(".turind").show();
    $(".pricom").hide();
    $("#Name").val("");
    $("#CName").val("");
    $("#CAddress").val("");
    $("#Dlicense").val("");
    $("#Dob").val("");
    $("#CDetail").val("");
    $("#CPerson").val("");
    $("#cntAddress").val("");
    $("#startDate").val("");
    $("#endDate").val("");
    $("#Vehicle").val("Select Vehicle");
    setModelValue(bikeModal);
    $("#Gearbox").val("Select Gearbox");
    $("#FuelType").val("Select Fuel Type");
    $("#color").val("Select Color");
    $("#Model").val("Select Model");
    $("#Make").val("Select Make");
    $("#regnum").val("");
    $("#ensize").val("");
    $("#mileage").val("");
    $("#doors").val("");
    $("#lastService").val("");
    $("#dimention").val("");
    $("#safetyInfo").val("");
}
/*Edit Userinfo code*/

/*Validate fields */
function validateIndividualTourist() {
    var valid = true;
    obj.name = $("#Name").val();
    obj.Dlicense = $("#Dlicense").val();
    obj.Dob = $("#Dob").val();
    obj.CDetail = $("#CDetail").val();
    if (!obj.name) {
        $("#NameError").html("Please enter name.");
        valid = false;
    }
    if (!obj.Dlicense) {
        $("#DlicenseError").html("Please driving license.");
        valid = false;
    }
    if (!obj.Dob) {
        $("#DobError").html("Please enter date of birth.");
        valid = false;
    }
    if (!obj.CDetail) {
        $("#CDetailError").html("Please emergency contact detail.");
        valid = false;
    }
    
    return valid;
}

function validateTravelCompany() {
    var valid = true;
    obj.name = $("#CName").val();
    obj.companyAddress = $("#CAddress").val();
    obj.CDetail = $("#CPerson").val();
    if (!obj.name) {
        $("#CNameError").html("Please enter company name.");
        valid = false;
    }
    if (!obj.companyAddress) {
        $("#CAddressError").html("Please enter company address.");
        valid = false;
    }
    if (!obj.CDetail) {
        $("#CPersonError").html("Please enter contact person.");
        valid = false;
    }
    return valid;
}

function validateCommonfields() {
    var valid = true;
    obj.cntAddress = $("#cntAddress").val();
    obj.startDate = $("#startDate").val();
    obj.endDate = $("#endDate").val();
    obj.vehicle = $("#Vehicle").val();
    obj.gearbox = $("#Gearbox").val();
    obj.fueltype = $("#FuelType").val();
    obj.color = $("#color").val();
    obj.model = $("#Model").val();
    obj.make = $("#Make").val();
    if (!obj.cntAddress) {
        $("#cntAddressError").html("Please contact address");
        valid = false;
    }
    if (!obj.startDate) {
        $("#startDateError").html("Please select start date.");
        valid = false;
    } else {
        var userType = $("#type").val();
        if (userType === "Tourist" || userType === "Individual") {
            if (obj.startDate > getCurrentDate()) {
                $('#Notification').modal('show');
                $("#message").html("You can not reserve the vehicle for future date.");
                $("#delete").addClass("hide");
                reload = false;
            }
        }
    }
    if (!obj.endDate) {
        $("#endDateError").html("Please select end date.");
        valid = false;
    }
    if (obj.vehicle.indexOf("Select") > -1) {
        $("#VehicleError").html("Please select vehicle.");
        valid = false;
    }
    if (obj.gearbox.indexOf("Select") > -1) {
        $("#GearboxError").html("Please select gearbox.");
        valid = false;
    }
    if (obj.fueltype.indexOf("Select") > -1) {
        $("#FuelTypeError").html("Please select fueltype.");
        valid = false;
    }
    if (obj.color.indexOf("Select") > -1) {
        $("#colorError").html("Please select color.");
        valid = false;
    }
    if (obj.model.indexOf("Select") > -1) {
        $("#ModelError").html("Please select model.");
        valid = false;
    }
    if (obj.make.indexOf("Select") > -1) {
        $("#MakeError").html("Please select make.");
        valid = false;
    }
    return valid;
}
/*Validate fields */

function clearError() {
    $("#NameError").html("");
    $("#DlicenseError").html("");
    $("#DobError").html("");
    $("#CDetailError").html("");
    $("#cntAddressError").html("");
    $("#CNameError").html("");
    $("#CAddressError").html("");
    $("#CPersonError").html("");
    $("#startDateError").html("");
    $("#endDateError").html("");
    $("#VehicleError").html("");
    $("#GearboxError").html("");
    $("#FuelTypeError").html("");
    $("#colorError").html("");
    $("#ModelError").html("");
    $("#MakeError").html("");
}

/*Common Menthod*/
function GetVechicleDetail(type) {

    for (var i = 0; VehcicleInfo.length; i++) {
        if (type == VehcicleInfo[i].Name) {
            return VehcicleInfo[i];
            break;
        }
    }
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function setModelValue(data) {
    if (data) {
        var option = "<option>Select Model</option>";
        for (var i = 0; i < data.length; i++) {
            option += "<option>" + data[i] + "</option>";
        }
        $("#Model").html(option);
        $("#Model").removeAttr("disabled");
    } else {
        $("#Model").html("");
        $("#Model").attr("disabled", "disabled");
    }
}

function setMakeValue(data) {
    if (data) {
        var option = "<option>Select Model</option>";
        for (var i = 0; i < data.length; i++) {
            option += "<option>" + data[i] + "</option>";
        }
        $("#Make").html(option);
        $("#Make").removeAttr("disabled");
    } else {
        $("#Make").html("");
        $("#Make").attr("disabled", "disabled");
    }
}

function showdeletepopup(userid) {
    $('#Notification').modal('show');
    $("#message").html("Do you really want to delete userinfo.");
    $("#delete").removeClass("hide");
    $("#userid").val(userid);
    reload = false;
}

function deleteUserInfo() {
    var UserDetail = {
        UserId: $("#userid").val(),
    };
    $.ajax({
        type: "POST",
        url: "/Home/DeleteInfo",
        data: JSON.stringify(UserDetail),
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            $("#message").html("User Information deleted successfully.");
            $("#delete").addClass("hide");
            reload = true;
            $("#userid").val("");
        },
        error: function () {
            alert("Error occured!!")
        }
    });
}

function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function closepopup() {
    if (reload) {
        location.reload();
    } else {
        $('#Notification').modal('hide');
    }
}

function checkvalue() {
    clearError();
    var value = $("#type").val();
    if (value === "Tourist" || value === "Individual") {
        $(".turind").show();
        $(".pricom").hide();
    } else {
        $(".turind").hide();
        $(".pricom").show();
    }
}

function startDate() {
    var startdate = $("#startDate").val();
    var startdateinfo = startdate.split("-");
    var endDate = parseInt(startdateinfo[2]) + 7;
    $("#endDate").val(startdate);
    $(".maxdate").attr("max", startdateinfo[0] + "-" + startdateinfo[1] + "-" + endDate).attr("min", startdate);
}

function logout() {
    $.ajax({
        type: "GET",
        url: "/Home/Logout",
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            window.location.href = "/";
        },
        error: function () {
            alert("Error occured!!")
        }
    });
}
/*Common Menthod*/

/*Show Receipt */
function showReceipt(record) {
    $("#showReceipt").modal('show');
    var userinfo = record;
    var vehicleInfo = GetVechicleDetail(userinfo.Vehicle);
    if (userinfo.UserType === "Tourist" || userinfo.UserType === "Individual") {
        $("#userTypeValue").val(userinfo.UserType);
        $("#individualDetail").removeClass("hide");
        $("#CompanyDetail").addClass("hide");
        $("#RName").html(userinfo.FullName);
        $("#RAddress").html(userinfo.ContactDetail);
        $("#RType").html(userinfo.UserType);
        var noOfdays = datediff(parseDate(userinfo.StartDate), parseDate(userinfo.EndDate))
        if (noOfdays == 0) {
            noOfdays = 1;
        }
        $("#RDays").html(noOfdays);
        var amount = 0;
        if (userinfo.GearBox == "Automatic/Semi-automatic") {
            $("#RRate").html(vehicleInfo.Automatic + " £");
            amount = parseInt(noOfdays) * parseInt(vehicleInfo.Automatic)
        } else {
            $("#RRate").html(vehicleInfo.Manual + " £");
            amount = parseInt(noOfdays) * parseInt(vehicleInfo.Manual)
        }
        $("#RAmount").html(amount + " £");
        var vatAmount = (amount * 15) / 100;
        $("#RVat").html(vatAmount + " £");
        var damageRepairCost = (amount * 10) / 100;
        $("#Rdrc").html(damageRepairCost + " £");
        var totalAmount = amount + vatAmount + damageRepairCost;
        $("#RDueAmount").html(totalAmount + " £");
        $("#RPMethod").html("Cash");
    } else {
        $("#userTypeValue").val(userinfo.UserType);
        $("#individualDetail").addClass("hide");
        $("#CompanyDetail").removeClass("hide");
        $("#RNumber1").html(vehicleInfo.RegistrationNumber);
        $("#RType1").html(userinfo.UserType);
        var noOfdays = datediff(parseDate(userinfo.StartDate), parseDate(userinfo.EndDate))
        if (noOfdays == 0) {
            noOfdays = 1;
        }
        $("#RDays1").html(noOfdays);
        var amount = 0;
        if (userinfo.GearBox == "Automatic/Semi-automatic") {
            $("#RRate1").html(vehicleInfo.Automatic + " £");
            amount = parseInt(noOfdays) * parseInt(vehicleInfo.Automatic)
        } else {
            $("#RRate1").html(vehicleInfo.Manual + " £");
            amount = parseInt(noOfdays) * parseInt(vehicleInfo.Manual)
        }
        $("#RAmount1").html(amount + " £");
        var vatAmount = (amount * 15) / 100;
        $("#RVat1").html(vatAmount + " £");
        var totalAmount = amount + vatAmount;
        $("#RDueAmount1").html(totalAmount + " £");
        $("#RPMethod1").html("Cash");
    }
}
/*Show Receipt */

/*Print menthod*/
function PrintDetail() {
    var userType = $("#userTypeValue").val();
    if (userType === "Tourist" || userType === "Individual") {
        printElement(document.getElementById("individualDetail"));
    } else {
        printElement(document.getElementById("CompanyDetail"));
    }
    window.print();
}

function printElement(elem, append, delimiter) {
    var domClone = elem.cloneNode(true);

    var $printSection = document.getElementById("printSection");

    if (!$printSection) {
        var $printSection = document.createElement("div");
        $printSection.id = "printSection";
        document.body.appendChild($printSection);
    }

    if (append !== true) {
        $printSection.innerHTML = "";
    }

    else if (append === true) {
        if (typeof (delimiter) === "string") {
            $printSection.innerHTML += delimiter;
        }
        else if (typeof (delimiter) === "object") {
            $printSection.appendChlid(delimiter);
        }
    }

    $printSection.appendChild(domClone);
}

function getVehicleInfo() {
    if ($("#Vehicle").val().indexOf("Select") == -1 && $("#Gearbox").val().indexOf("Select") == -1
        && $("#FuelType").val().indexOf("Select") == -1 && $("#color").val().indexOf("Select") == -1
        && $("#Model").val().indexOf("Select") == -1 && $("#Make").val().indexOf("Select") == -1) {
        var vechileName = $("#Vehicle").val();
        var vehicleInfo = GetVechicleDetail(vechileName);
        $("#regnum").val(vehicleInfo.RegistrationNumber);
        $("#ensize").val(vehicleInfo.EngineSize);
        $("#mileage").val(vehicleInfo.Mileage);
        $("#doors").val(vehicleInfo.Doors);
        $("#lastService").val(vehicleInfo.ServiceDate);
        $("#dimention").val(vehicleInfo.Dimention);
        $("#safetyInfo").val(vehicleInfo.SafetyInfo);
    }
}

function getVehicleInfoChange() {
    if ($("#Vehicle").val().toLowerCase().indexOf("car") > -1) {
        setModelValue(carModal);
        setMakeValue(carMake);
    }
    else if ($("#Vehicle").val().indexOf("bus") > -1) {
        setModelValue(busModal);
        setMakeValue(busMake);
    } else if ($("#Vehicle").val().indexOf("van") > -1) {
        setModelValue(vanModal);
        setMakeValue(VanMake);
    } else {
        setModelValue(bikeModal);
        setMakeValue(bikeMake);
    }
}
/*Print Method*/