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
    btn.addClass("topic btn btn-info mr-3 mb-5");
    btn.attr("data-topic", topics[i]);
    btn.text(topics[i]);
    $("#buttons-view").append(btn);
  }
}
makeButtons();

$(document).keyup(function(event) {
  if (event.key == "Enter") {
      submit()
  }
})
$("#submitBtn").on("click", submit())

function submit(){
  if ($("#topicInput").val() != ''){
    var newTopic = $("#topicInput").val().trim()
    topics.push(newTopic)
    $("#buttons-view").empty()
    makeButtons()
    $("#topicInput").val('')
  }
}

var queryURL='';
$(document.body).on("click", ".topic", function() {
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
   for (i = 0; i<10;i++){
     
      var rating = response.data[i].rating
      var domRating= `<span class="badge badge-pill badge-info">${rating}</span>`
      var gifStill = response.data[i].images.fixed_height_still.url
      var gifAnimate = response.data[i].images.fixed_height.url
      var gif = $(
        `<img class="gif mb-4 ml-4 mr-4" data-state= "still" src=${
          response.data[i].images.fixed_height_still.url
        }>`
        + domRating 
      )
      gif.attr("data-still",gifStill)
      gif.attr("data-animate",gifAnimate)
           gif_list.push(gif)
           $(".gifContainer").append(gif)
          $(".gifContainer").append(gif)
    } 

    $(".").on("click",function(){
    var state = $(this).attr("data-state");
      if(state === "still"){
        var animatedSrc = $(this).attr("data-animate")
        $(this).attr("src", animatedSrc)
        console.log(animatedSrc)
        console.log($(this).attr("data-animate"))
        $(this).attr("data-state","animate")
          }
      else{
        var stillSrc = $(this).attr("data-still")
        $(this).attr("src", stillSrc)
        $(this).attr("data-state","still")
       }
    })  

})}
