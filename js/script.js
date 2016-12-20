$(function(){
	var searchField = $('#query');

	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})
function search(){
	// Clear Results
	$('#results').html('');
	$('#buttons').html('');

	// Get Form Input
	q = $('#query').val();

	// Run GET Request on API
	$.get(
		"https://www.googleapis.com/youtube/v3/search",{
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyDjt9iez6HTzkKgk9aQ7z8BUA10nmNNgRg'},
			function(data){
				var nextPageToken = data.nextPageToken;
				var prevPageToken = data.prevPageToken;

				// Log data
				console.log(data);
				$.each(data.items, function(i, item){
					// GetOutput
					var output = getOutput(item);

					// Display Results
					$('#results').append(output);
				});
			}
	);
}

// Build Output
function getOutput(item){
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url;
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// Build Output String
	var output = '<li>' + 
	'<div class="list-left">' + 
	'<img src="' + thumb +'">' + 
	'</div>' +
	'<div class="list-right">' +
	'<h3>' + title + '</h3>' + 
	'<small>By <span class="cTitle">' + channelTitle + '</span> on ' + videoDate + '</small>' +
	'<p>' + description + '</p>' + 
	'</div>' + 
	'</li>' +
	'<div class="clearfix"></div>' +
	'';

	return output;
}