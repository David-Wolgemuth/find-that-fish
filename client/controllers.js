
fishModule.controller("questionsController", function ($scope) {
    this.question = {
        text: "Find Order"
    };
    this.hello = "BALAH"
    this.options = [{
        text: "Myliobatiformes",
        image: "http://fishbase.org/identification/pics/O_4_65.jpg"
    }, {
        text: "Rajiformes",
        image: "http://fishbase.org/identification/pics/O_4_14.jpg"
    }, {
        text: "Torpediniformes",
        image: "http://fishbase.org/identification/pics/O_4_13.jpg"
    }];
});
