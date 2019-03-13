var topics = [
  "The Office",
  "rick and morty",
  "Big Mouth",
  "Post Malone",
  "Bernie Sanders",
  "That's what she said"
];
function makeButtons() {
  for (i = 0; i < topics.length; i++) {
    var btn = $("<button>");
    // Adds a class of movie to our button
    btn.addClass("topic btn btn-outline-info");
    // Added a data-attribute
    btn.attr("data-topic", topics[i]);
    // Provided the initial button text
    btn.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(btn);
  }
}
makeButtons();

var queryURL='';
$(".topic").on("click", function() {
  var searchTerm = $(this).attr("data-topic").replace(" ","+")
  var queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    "&api_key=dc6zaTOxFJmzC";
  console.log(queryURL)
});
  
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  
  console.log(response)

});
/*
   var gif_list=[];
   console.log(response)
   for (i = 0; i<10;i++){
      var gif = $(
           `<img class="gif mt-5 ml-3" data-state= "still" src=${
             response.data[i].images.fixed_height_still.url
           }>`
         )
           gif_list.push(gif)
           $(".container-fluid").append(gif)
           

       }
*/