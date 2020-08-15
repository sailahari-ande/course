$(function () {
/*collapsable button close automatically*/

	$(".navbar-toggle").blur(function (event) {
		var screenWidth = window.innerWidth; 
		if (screenWidth < 768){
			$("#collapsable-nav").collapse('hide');
		}
	});

	 $(".navbar-toggle").click(function (event) {
   		 $(event.target).focus();
 	 });
});

(function(global){

	var mh={};
	var homeHtml="snippets/home-snippet.html";
	var allCategoriesUrl="https://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml="snippets/categories-title-snippet.html";
	var categoryHtml="snippets/category-snippet.html";

	var insertHtml =function(selector,html){
		var targetElem=document.querySelector(selector);
		targetElem.innerHTML=html;
	};

	var showLoading =function(selector){
		var html="<div class='text-center'>";
		html+="<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector,html);
	};

	var insertProperty=function (string,propName,propValue){
		var propToReplace ="{{"+propName +"}}";
		string=string.replace(new RegExp(propToReplace,"g"),propValue);
		return string;
	}

	document.addEventListener("DOMContentLoaded",function(event){

		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml,
			function(responseText){
				document.querySelector("#main-content").innerHTML=responseText;
			},
			false);
	});

	//load the menu categories view
	mh.loadMenuCategories = function(){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			allCategoriesUrl,buildAndShowCategoriesHTML);
	}; 

	//build HTML for the categories page based on the data from the server
	function buildAndShowCategoriesHTML(categories){
		$ajaxUtils.sendGetRequest(
			categoriesTitleHtml,
			function(categoriesTitleHtml){
				//retrive single category snippet
				$ajaxUtils.sendGetRequest(
					categoryHtml,
					function(categoryHtml){
						var categoriesViewHtml=buildCategoriesViewHtml(categories,
							categoriesTitleHtml,
							categoryHtml);
						insertHtml("#main-content",categoriesViewHtml);
					},
					false);
				},
				false);
			}
			
	

	//using categories data and snippets html
	//build categories view HTML to be inserted into page
	function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

	global.$mh=mh;
})(window);