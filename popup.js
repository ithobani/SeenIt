function save_options() {

  localStorage["recommended"] = document.getElementById("recommended").checked;
  localStorage["search"] = document.getElementById("search").checked;
  localStorage["similar"] = document.getElementById("similar").checked;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  //status.innerHTML = "Options Saved.";

  
  setTimeout(function() {
    status.innerHTML = "";
  }, 1000);
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  document.getElementById("recommended").checked = (localStorage["recommended"] === 'true');
  document.getElementById("search").checked = (localStorage["search"] === 'true');
  document.getElementById("similar").checked = (localStorage["similar"] === 'true');
  //var status = document.getElementById("status");
  //status.innerHTML = localStorage["dsearch"];
}
document.addEventListener('DOMContentLoaded', function()
{
	restore_options();
	document.getElementById("recommended").addEventListener("click", save_options);
	document.getElementById("search").addEventListener("click", save_options);
	document.getElementById("similar").addEventListener("click", save_options);
});

