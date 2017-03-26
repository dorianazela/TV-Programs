
var app = {}; // creating a empty object to hold the data

// searching by clicking the button
$("button").click(function(e){
	e.preventDefault();
	$('#tvMaze').empty();
	var word = $('input').val();
	app.getTVshow(word);
});

// getTVshow method will make the Ajax request to the API
app.getTVshow = function(inputWord){
	$.ajax({
		url: 'http://api.tvmaze.com/search/shows',  
		method: 'GET',
		dataType: 'json',
		data: {
			format: 'json',
			q: inputWord
		},
		success: function(result){
			console.log('Ajax is working.');
			app.displayTV(result);
		},
		error: function(error){
			console.log('Something went wrong.');
			console.log(error);
		}
	});
};

// creating a method to inject our data into the DOM
app.displayTV = function(tvInfoArray){ 

	var count; // declare a var to hold the shows number
	if (count == undefined) {
		$('.showResult').text('No show was found. Please do a new search.').css('color', 'red');
	};
	
	// using jQuery forEach to loop over our array of tv information
	tvInfoArray.forEach(function(tvInfo){ 
		
		// Creating elements for each piece of data
		var name = $('<h2>').text(tvInfo.show.name);
		var nameBox = $('<h3>').text(tvInfo.show.name);
		var language = $('<i>').text(tvInfo.show.language);
		var genres = $('<p>').text(tvInfo.show.genres[0]);
		var channel = $('<p>').text(tvInfo.show.network.name);
		var country = $('<p>').text('( ' + tvInfo.show.network.country.name + ' )');
		var image = $('<img>').attr('src', tvInfo.show.image.original);
		var imageBox = $('<img>').attr('src', tvInfo.show.image.original);
		var summary = tvInfo.show.summary;
		
		// make images clickable
		var clkImage = $('<a>').attr('href', tvInfo.show.image.original).append(image); 
		
		// appending in divs only name and image for the search
		var shows = $('<div>').addClass('shows').append(name, clkImage); 
		
		// appending all the divs to our webpage
		$('#tvMaze').append(shows);
		
		// counting every div and displey the result
		count = $('.shows').length;
		$('.showResult').text('You have ' + count + ' result.').css('color', 'green');
		
		// appending in divs all data for the lightBox
		var showsInfo = $('<div>').addClass('showsInfo').append(imageBox, nameBox, language, genres, channel, country, summary);
		
		// creating lightBox by clicking the shows
		$('.shows').click(function(e){
			e.preventDefault();	

			//check if lightBox exist and declare var to hold the lightBox
			if ($('#lightBox').length > 0) {          	// .lightbox exists
				$('#lightBox').show();
			} else { 									// .lightbox does not exist 
				var lightBox = 	'<div id="lightBox">' + 
									'<p title="close" id="lightBoxClose">X</p>' + 
									'<div class="showsBox">' + '</div>' + 
								'</div>';

				$('body').append(lightBox);	            //insert lightbox into page
				$('.showsBox').append(showsInfo);		//insert divs into lightBox
			};
		});	
			
		// remove lightBox when click "X"
		$('#lightBoxClose').live('click', function() { 
			$('#lightBox').remove();
		});
		
	});  // end forEach loop function
 }; //end app.displayTV function


