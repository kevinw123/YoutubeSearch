$(function() {
    var searchField = $('#query');

    $('#search-form').submit(function(e) {
        e.preventDefault();
    });
})

function search() {
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyDjt9iez6HTzkKgk9aQ7z8BUA10nmNNgRg'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            $.each(data.items, function(i, item) {
                // GetOutput
                var output = getOutput(item);

                // Display Results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

// Next Page Function
function nextPage() {
	var token = $('#next-button').data('token');
	var q = $('#next-button').data('query');
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDjt9iez6HTzkKgk9aQ7z8BUA10nmNNgRg'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            $.each(data.items, function(i, item) {
                // GetOutput
                var output = getOutput(item);

                // Display Results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

// Previous Page Function
function prevPage() {
	var token = $('#prev-button').data('token');
	var q = $('#prev-button').data('query');
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');

    // Get Form Input
    q = $('#query').val();

    // Run GET Request on API
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            pageToken: token,
            type: 'video',
            key: 'AIzaSyDjt9iez6HTzkKgk9aQ7z8BUA10nmNNgRg'
        },
        function(data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            $.each(data.items, function(i, item) {
                // GetOutput
                var output = getOutput(item);

                // Display Results
                $('#results').append(output);
            });

            var buttons = getButtons(prevPageToken, nextPageToken);

            // Display Buttons
            $('#buttons').append(buttons);
        }
    );
}

// Build Output
function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    // Build Output String
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
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

// Build the buttons
function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick="nextPage();">Next Page</button></div>';
    } else {
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            'onclick="prevPage();">Previous Page</button>' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick="nextPage();">Next Page</button></div>';
    }

    return btnoutput;
}
