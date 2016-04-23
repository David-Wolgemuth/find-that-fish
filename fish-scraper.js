
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
        scraperjs.StaticScraper.create("http://fishbase.org/identification/ClassList.php")
        .scrape(function($) {
            return $("img").map(function () {
                var img = $(this).attr("src");
                var name = $(this).attr("alt");
                var form = $(this).parent().next();  // All Children Of Form
                var cls = form.find(":input[name='classnum']").val();
                return { img: img, name: name, class: cls };
            }).get();
        })
        .then(callback);
    };
    FishScraper.orders = function (classnum, callback)
    /*
        All Fish Orders (Search By Class)  
    */
    {
        scraperjs.StaticScraper.create("http://fishbase.org/identification/OrderList.php?classnum=" + classnum)
        .scrape(function($) {
            return $("img").map(function() {
                var link = $(this).parent().attr("href");
                var ord = getParameterByName("ordnum", link);
                var cls = getParameterByName("classnum", link);
                var src = $(this).attr("src");
                var name = $(this).attr("alt");
                return { src: src, link: link, ord: ord, class: cls, name: name };
            }).get();
        })
        .then(function(images) {
            console.log(images);
        });
    };
    FishScraper.family = function (ordernum, callback)
    /*
        All Fish Family (Search By Order)
    */
    {
        scraperjs.StaticScraper.create("http://fishbase.org/identification/OrderList.php?ordnum=" + ordernum)
        .scrape(function($) {
            return $("img").map(function() {
                var link = $(this).parent().attr("href");
                var ord = getParameterByName("ordnum", link);
                var cls = getParameterByName("classnum", link);
                var src = $(this).attr("src");
                var name = $(this).attr("alt");
                return { src: src, link: link, ord: ord, class: cls, name: name };
            }).get();
        })
        .then(function(images) {
            console.log(images);
        });
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


