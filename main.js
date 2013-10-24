var recList = undefined;
var searchList = undefined;
var relList = undefined;
var removeRecommended = false;
var removeSearch = false;
var removeSimilar = false;

function tagOrRemoveItem(messUrl, item, alink, removeThis)
{
	var thisUrl = alink.href;

	if(messUrl === thisUrl)
	{
		if(removeThis)
			item.parentNode.removeChild(item);
		else
		{
			alink.className = alink.className + " watched";
			var watchedTag = document.createElement('div');
			watchedTag.setAttribute('class', 'watched-badge');
			watchedTag.innerHTML = 'WATCHED';
			alink.appendChild(watchedTag);
		}
	}
}

function remove()
{
	try
	  {
		  chrome.extension.sendMessage({"options":"yes"});
		  chrome.extension.onMessage.addListener(function (message) {
			  
			  if(message.recommended)
			  {
				  //obtain information about options
				  removeRecommended = (message.recommended === 'true');
				  removeSearch = (message.search === 'true');
				  removeSimilar = (message.similar === 'true');
				  
				  //create list of recommended videos
				  recList = document.getElementsByClassName('channels-content-item yt-shelf-grid-item yt-uix-shelfslider-item ');
	  			  
				  //request info on whether each recommended video has been watched
				  for (var i = 0; i < recList.length; ++i) {
				    var item = recList[i];
					var thisUrl = item.firstElementChild.firstElementChild.firstElementChild.href;
					//console.log(thisUrl);
					chrome.extension.sendMessage({"url": thisUrl});
		
				  }

				  

				  searchList = document.getElementsByClassName('yt-lockup clearfix yt-uix-tile result-item-padding yt-lockup-video yt-lockup-tile vve-check context-data-item');
	  		
				  for (var i = 0; i < searchList.length; ++i) {
				    var item = searchList[i];
					var thisUrl = item.firstElementChild.firstElementChild.href;
					//console.log(thisUrl);
					chrome.extension.sendMessage({"url": thisUrl});
				  }


				  relList = document.getElementsByClassName('video-list-item related-list-item');
	  			  
				  for (var i = 0; i < relList.length; ++i) {
				    var item = relList[i];
					//console.log(item);
		
					var thisUrl = item.firstElementChild.href;
					//console.log(thisUrl);
					chrome.extension.sendMessage({"url": thisUrl});
				  }

		  	  }
		      if(message.url)
			  {
				  
				  //either tag or remove recommended items
				  for (var i = 0; i < recList.length; ++i) {
				    var item = recList[i];
					
					if(!item || item.innerHTML === '')
					{
						continue;
						//console.log('entered CONTINUE');
					}
					var alink = item.firstElementChild.firstElementChild.firstElementChild;
					tagOrRemoveItem(message.url, item, alink, removeRecommended);					  
				  }

				  
				  for (var i = 0; i < searchList.length; ++i) {
				    var item = searchList[i];
					if(!item || item.innerHTML === '')
					{
						continue;
						//console.log('entered CONTINUE');
					}
					var alink = item.firstElementChild.firstElementChild;
					tagOrRemoveItem(message.url, item, alink, removeSearch);

				  }
		      
			  
				  for (var i = 0; i < relList.length; ++i) {
				    var item = relList[i];
					if(!item || item.innerHTML === '')
					{
						continue;
						//console.log('entered CONTINUE');
					}
					var alink = item.firstElementChild;
					tagOrRemoveItem(message.url, item, alink, removeSimilar);	
				  }
				  
		      }
		  });
	  }
	catch(err)
	  {
		console.log('ERROR: Failed to remove YouTube thumbnails.');
		console.log(err);
	  }
	  console.log('Removed YouTube thumbnails.');
	  //setTimeout(function(){remove();},1000);
}
remove();
