
var scraperjs = require('scraperjs');

module.exports = new fishConstructor();

function fishConstructor ()
{
    var FishScraper = this;
    FishScraper.classes = function (callback)
    /*
        All Fish Classes
    */
    {
        var link = "http://fishbase.ca/identification/ClassList.php";
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("img").map(function () {
                var img = $(this).attr("src");
                var name = $(this).attr("alt");
                var form = $(this).parent().next();  // All Children Of Form
                var cls = form.find(":input[name='classnum']").val();
                return { image: img, name: name, id: cls };
            }).get();
        })
        .then(callback);
    };
    FishScraper.ordersByClassId = function (classId, callback)
    /*
        All Fish Orders (Search By Class)  
    */
    {
        var link = "http://fishbase.ca/identification/OrderList.php?classnum=" + classId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("img").map(function () {
                var src = $(this).attr("src");
                var name = $(this).attr("alt");

                var data = src.split("_");
                var id = data[data.length - 1].split(".")[0];
                return { image: src, id: id, name: name };
            }).get();
        })
        .then(callback);
    };
    FishScraper.familiesByOrderId = function (orderId, callback)
    /*
        All Fish Family (Search By Order)
    */
    {
        var link = "http://www.fishbase.ca/identification/familieslist.php?ordnum=" + orderId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("img").map(function () {
                var src = $(this).attr("src");
                var a = $(this).parent().next();
                var link = a.attr("href");
                var family = getParameterByName("famcode", link);
                var name = a.text().trim();
                return { image: src, id: family, name: name };
            }).get();
        })
        .then(callback);
    };
    FishScraper.speciesByFamilyId = function (familyId, callback)
    {
        var link = "http://fishbase.ca/identification/SpeciesList.php?famcode=" + familyId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("span img").map(function () {
                var image = $(this).attr("src");
                var name = $(this).parent().parent().parent().parent().next().find("i");
                var thumbnail = $(this).parent().prev().attr("src");
                var obj = { image: image, thumbnail: thumbnail, name: name.html() };
                console.log("OBJECT:", obj)
                return obj;
            }).get();
        })
        .then(callback);
    };
}

function getParameterByName(name, url) 
{
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


