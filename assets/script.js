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
  $(".gifContainer").empty()
  var searchTerm = $(this).attr("data-topic").replace(" ","+")
  queryURL =
    "http://api.giphy.com/v1/gifs/search?q=" +
    searchTerm +
    "&api_key=dc6zaTOxFJmzC";
    getResponse(queryURL)
});

 function getResponse(queryURL){ 
 $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    
   var gif_list=[];
   console.log(response)
   for (i = 0; i<10;i++){
      var gif = $(
           `<img class="gif mt-5 ml-3" data-state= "still" src=${
             response.data[i].images.fixed_height_still.url
           }>`
         )
      var gifStill = response.data[i].images.fixed_height_still.url
      var gifAnimate = response.data[i].images.fixed_height.url
      gif.attr("data-still",gifStill)
      gif.attr("data-animate",gifAnimate)
           gif_list.push(gif)
           $(".gifContainer").append(gif)
           
     
  
     
    }  
          $(".gif").on("click",function(){
            var state = $(this).attr("data-state");
            if(state === "still"){
              var animatedSrc = $(this).attr("data-animate")
            $(this).attr("src", animatedSrc)
            $(this).attr("data-state","animate")
          }
          else{
            var stillSrc = $(this).attr("data-still")
            $(this).attr("src", stillSrc)
            $(this).attr("data-state","still")
          }
          })  

})}
