var x = document.getElementById("signin");
var y = document.getElementById("register");
var z = document.getElementById("btn");

$(document).ready(() => {
  $('#searchForm').on('keyup', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
    $.getJSON("https://www.omdbapi.com/?", { apikey: "5e84373f", s: searchText }, function(response) {
    
      let movies = response.Search;
      console.log(response);
      let output = '';
      $.each(movies, (index, movie) => {
          let id = movie.imdbID;
          $.getJSON("https://www.omdbapi.com/?", { apikey: "5e84373f", i: movie.imdbID }, function(movieData) {
                  /*console.log(movieData);*/
                  let plot = movieData.Plot;
                  output += `
                    <div class="movie">
                       <img src="${movie.Poster}">
                       <h5 class="movieTitle">${movie.Title}</h5>
                       <ul class="details-list">
                          <li class="detail"><marked class="detail-fields" >Type:</marked> ${movie.Type}</li>
                          <li class="detail"><marked class="detail-fields" >Year:</marked> ${movie.Year}</li>
                          <li class="detail"><marked class="detail-fields" >imdbID:</marked> ${movie.imdbID}</li>
                          <br>
                          <li class="detail"><marked class="detail-fields" >Plot:</marked> ${plot}</li>
                       </ul>
                       <a onclick="movieSelected('${movie.imdbID}')" class="button" href="movie.html">View More</a>
                       <br>
                       <button class="button" id="add-bookmark-btn-search" onclick="addBookmark('${movie.imdbID}')"><marked id="add">+</marked> Add to Bookmarks</button>
                       <div id="messageBookmark"></div>
                    </div>
                  `;
                  $('#movies').html(output);
              })
              .catch((err) => {
                  console.log(err);
              });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  /*window.location.href = "movie";*/
  return false;
}


function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

    $.getJSON("https://www.omdbapi.com/?", { apikey: "5e84373f", i: movieId, plot: "full"}, function(response) {
      /*console.log(response);*/
      let movie = response;

      let output =`
        <div class="movie">
        
          <div class="detailsContainer">
            <div class="title-poster">
              <h2 class= "title">${movie.Title}</h2>
              <img src="${movie.Poster}" class="poster">
            </div>

            <div class="details"> 
              <h4>Details</h4>
              <ul> 
                <li><marked class="detail-fields">Year:</marked> ${movie.Year}</li>
                <li><marked class="detail-fields">Genre:</marked> ${movie.Genre}</li>
                <li><marked class="detail-fields">Type:</marked> ${movie.Type}</li>
                <li><marked class="detail-fields">Released:</marked> ${movie.Released}</li>
                <li><marked class="detail-fields">Language:</marked> ${movie.Language}</li>
                <li><marked class="detail-fields">IMDB Country:</marked> ${movie.Country}</li>
                <li><marked class="detail-fields">Runtime:</marked> ${movie.Runtime}</li>
                <li><marked class="detail-fields">imdbID:</marked> ${movie.imdbID}</li>
              </ul>
            </div>

            <div class="plot">
              <h4>Plot Summary</h4>
              ${movie.Plot}
              <hr>
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="button">View IMDB</a>
              <a onclick="location.href='/movies'" class="button">Go Back To Search</a>
              <br>
               <button class="button" id="add-bookmark-btn" onclick="addBookmark('${movie.imdbID}')"><marked id="add">+</marked> Add to Bookmarks</button>
                <div id="messageBookmark"></div>
            </div>

            <div class="ratings"> 
              <h4>Ratings</h4>
              <ul> 
                <li><marked class="detail-fields">Rated:</marked> ${movie.Rated}</li>
                <li><marked class="detail-fields">IMDB Rating:</marked> ${movie.imdbRating}</li>
                <li><marked class="detail-fields">Metascore:</marked> ${movie.Metascore}</li>
                <li><marked class="detail-fields">imdbVote:</marked> ${movie.imdbVote}</li>
              </ul>
            </div> 

            <div class="awards"> 
              <h4>Awards</h4>
              <ul> 
                <li class="detail"><marked class="detail-fields">Awards:</marked><br> ${movie.Awards}</li>
              </ul>
            </div>
                
            <div class="cast-creators">
              <h4>Cast & Creators</h4>
              <ul>
                <li><marked class="detail-fields">Director:</marked><br> ${movie.Director}</li>
                <li><marked class="detail-fields">Writer:</marked><br> ${movie.Writer}</li>
                <li><marked class="detail-fields">Actors:</marked><br> ${movie.Actors}</li>
                <li><marked class="detail-fields">Production:</marked><br> ${movie.Production}</li>
              </ul>  
            </div> 
          </div>
        </div>
        `;

      $('#movieDetails').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

jQuery(document).ready(function($) {
    $("#signin").submit(function(event) {

        // Prevent the form from submitting via the browser.
        event.preventDefault();
        checkUser();

    });
});


function checkUser(){
    var loginFields = {}
    loginFields["email"] = $("#loginEmail").val();
    loginFields["password"] = $("#loginPassword").val();

    var loginError = document.getElementById("signInError");

    if(isEmpty(loginFields["email"]) || isEmpty(loginFields["password"])) {
        loginError.innerHTML = "All fields must be filled!";
    }
    else {

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "signin",
            data : JSON.stringify(loginFields),
            dataType : 'text',
            timeout : 100000,
            success : function(response) {
                console.log("SUCCESS: ", response);
                if(response === "Authenticated User") {
                    loginError.innerHTML = "Account successfully authenticated";
                    setTimeout(()=>{sessionStorage.setItem('userEmail', loginFields["email"]);
                        window.location.href='/movies';},1500);
                } else {
                    loginError.innerHTML = "Invalid login credentials!";
                }
            },
            error : function(e) {
                console.log("ERROR: ", e);
            },
            done : function(e) {
                console.log("DONE");
                enableSearchButton(true);
            }
        });
    }
}

/*Ajax call for register User*/
jQuery(document).ready(function($) {
    $("#register").submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        searchViaAjax();

    });
});


function searchViaAjax() {

    var registrationFields = {}
    registrationFields["name"] = $("#inputName").val();
    registrationFields["email"] = $("#inputEmail").val();
    registrationFields["password"] = $("#inputPassword").val();
    registrationFields["confirmPassword"] = $("#confirmPassword").val();

    var registerError = document.getElementById("registerError");

    if(isEmpty(registrationFields["name"]) || isEmpty(registrationFields["email"]) || isEmpty(registrationFields["password"])|| isEmpty(registrationFields["confirmPassword"])) {
        registerError.innerHTML = "All fields must be filled!";
    }
    else {
        if(registrationFields["password"] !== registrationFields["confirmPassword"]){
            registerError.innerHTML = "Password and confirm password do not match!";
        } else {
            $.ajax({
                type : "POST",
                contentType : "application/json",
                url : "registration",
                data : JSON.stringify(registrationFields),
                dataType : 'text',
                timeout : 100000,
                success : function(response) {
                    console.log("SUCCESS: ", response);
                    if(response === "Successful") {
                        registerError.innerHTML = "Account successfully created";
                        setTimeout(()=>{sessionStorage.setItem('userEmail', registrationFields["email"]);
                        window.location.href='/movies';},1500);
                    } else {
                        registerError.innerHTML = "This email  is used by another account!";
                    }
                },
                error : function(e) {
                    console.log("ERROR: ", e);
                },
                done : function(e) {
                    console.log("DONE");
                    enableSearchButton(true);
                }
            });
        }
    }
}

function enableSearchButton(flag) {
    $("#btn-submit").prop("disabled", flag);
}

function isEmpty(str) {
    if (str == null || str.length === 0){
        return true;
    }
}

/*Sign In- Sign Out user*/
function signin_btn_Click() {
    var userEmail = sessionStorage.getItem('userEmail');
    var signInButton = document.getElementById("sign-in-btn");
    if (userEmail != null)
    {
        sessionStorage.removeItem('userEmail');
        signInButton.innerHTML = "Sign In|Register";
       /* window.location.replace("index.html");*/
        var form = document.getElementById("signin");
        form.reset();
        window.location.href='/movies';
    }
    else if (userEmail == null)
    {
        signInButton.innerHTML = "Sign In|Register";
        window.location.href='/login';
    }
}
/*Switching buttons from Sign In to Sign Out*/
window.onload = function() {

    var userEmail = sessionStorage.getItem('userEmail');
    var signInButton = document.getElementById("sign-in-btn");
    if (userEmail != null)
    {
        signInButton.innerHTML = "Sign Out";
    }
    else if(userEmail==null)
    {
        signInButton.innerHTML = "Sign In|Register";
    }
};

/*Bookmark Hover*/
function rollover(bookmark_icon)
{
    bookmark_icon.src = 'images/icons8-heart-32-3.png';
}

function mouseaway(bookmark_icon)
{
    bookmark_icon.src = 'images/icons8-heart-32-2.png';
}

/*Toggle Forms Register-Login*/
function register() {
    x.style.left = "-400px";
    y.style.left = "28px";
    z.style.left = "110px";
}

function signIn() {
    x.style.left = "28px";
    y.style.left = "450px";
    z.style.left = "0";
}

function addBookmark(imdbId) {

    var messageBookmarks = document.getElementById("messageBookmark");

    var userEmail = sessionStorage.getItem('userEmail');
    console.log("userEmail: "+userEmail);
    var userBookmarks = {}
    userBookmarks["email"] = userEmail;
    userBookmarks["imdbId"] = imdbId;
    console.log(userBookmarks);
    if (userEmail != null)
    {
        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "addBookmarks",
            data : JSON.stringify(userBookmarks),
            dataType : 'text',
            timeout : 100000,
            success : function(response) {
                console.log("SUCCESS: ", response);
                if(response === "Successful") {
                    messageBookmarks.innerHTML="Bookmark Added!";
                } else {
                    messageBookmarks.innerHTML = "Bookmark already saved!";
                }
            },
            error : function(e) {
                console.log("ERROR: ", e);
            },
            done : function(e) {
                console.log("DONE");
                enableSearchButton(true);
            }
        });
    }
    else if(userEmail==null)
    {
        window.location.href='/login';
    }
}

function myBookmarks() {
    var search = document.getElementById("search");
    var bookmark = document.getElementById("bookmarksHeader");
    var userEmail = sessionStorage.getItem('userEmail');
    console.log("user Email: "+userEmail);

    if (userEmail != null) {

        $.ajax({
            type : "POST",
            contentType : "application/json",
            url : "showBookmarks",
            data : JSON.stringify(userEmail),
            dataType : 'text',
            timeout : 100000,
            success : function(response) {
                console.log("SUCCESS: ", response);
                search.style.display = "none";
                bookmark.style.display="block";
                storeBookmarks(response);
                setTimeout(()=>{},2500);
            },
            error : function(e) {
                console.log("ERROR: ", e);
            },
            done : function(e) {
                console.log("DONE");
                enableSearchButton(true);
            }
        });
    }
    else if(userEmail==null)
    {
        window.location.href='/login';
    }
}

function storeBookmarks(response) {
    let ids = response.split(",");

    for (var i=0; i< ids.length-1; i++) {
        sessionStorage.setItem('imdbid', ids[i]);
        getBookmark(ids[i]);
    }
    console.log(response);
}
let bookmarkOutput = '';
function getBookmark(id) {
    var imdbID = sessionStorage.getItem('imdbid');
    console.log("imdbid :"+ imdbID);

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://www.omdbapi.com/?apikey=5e84373f&i=" + id,
        success: function(movie){
            let plot = movie.Plot;
            bookmarkOutput += `
                    <div class="movie">
                       <img src="${movie.Poster}">
                       <h5 class="movieTitle">${movie.Title}</h5>
                       <ul class="details-list">
                          <li class="detail"><marked class="detail-fields" >Type:</marked> ${movie.Type}</li>
                          <li class="detail"><marked class="detail-fields" >Year:</marked> ${movie.Year}</li>
                          <li class="detail"><marked class="detail-fields" >imdbID:</marked> ${movie.imdbID}</li>
                          <br>
                          <li class="detail"><marked class="detail-fields" >Plot:</marked> ${plot}</li>
                       </ul>
                        <a onclick="movieSelected('${movie.imdbID}')" class="button" href="movie.html">View More</a>
                    </div>
                  `;
            $( "#movies" ).html( bookmarkOutput );
        },
        error: function() {
            console.log("error");
            return "Image not found.";
        }
    });
}

