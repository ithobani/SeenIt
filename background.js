chrome.extension.onMessage.addListener(
    function (request, sender) {
		if(request.url)
		{
	        chrome.history.getVisits({"url": request.url},
	        function (visits) {
	            if (visits.length > 0) {
	                chrome.tabs.sendMessage(sender.tab.id, {
	                    "url": request.url
	                });
	            };
	        });
		}
		else if(request.options)
		{
			chrome.tabs.sendMessage(sender.tab.id, {"recommended":localStorage["recommended"], "search": localStorage["search"], "similar":localStorage["similar"]});
		}
    });