
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
        var link = "http://fishbase.org/identification/ClassList.php";
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
        var link = "http://fishbase.org/identification/OrderList.php?classnum=" + classId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("img").map(function () {
                var link = $(this).parent().attr("href");
                var ord = getParameterByName("ordnum", link);
                var cls = getParameterByName("classnum", link);
                var src = $(this).attr("src");
                var name = $(this).attr("alt");
                return { image: src, id: ord, class: cls, name: name };
            }).get();
        })
        .then(callback);
    };
    FishScraper.familiesByOrderId = function (orderId, callback)
    /*
        All Fish Family (Search By Order)
    */
    {
        var link = "http://fishbase.org/identification/FamiliesList.php?ordnum=" + orderId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("img").map(function () {
                var a = $(this).parent().next();
                var link = a.attr("href");
                var family = getParameterByName("famcode", link);
                var name = a.text().trim();
                var src = $(this).attr("src");
                return { image: src, id: family, name: name };
            }).get();
        })
        .then(callback);
    };
    FishScraper.speciesByFamilyId = function (familyId, callback)
    {
        var link = "http://fishbase.org/identification/SpeciesList.php?famcode=" + familyId;
        console.log(link);
        scraperjs.StaticScraper.create(link)
        .scrape(function ($) {
            return $("span img").map(function () {
                var src = $(this).attr("src");
                var name = $(this).parent().parent().parent().parent().next().find("i");
                return { image: src, name: name.html() };
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


