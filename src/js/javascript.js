var worstLandlords = {
	init: function(){
		worstLandlords.onClick();
		//worstLandlords.share();
	},
	share: function(){
		$(".icon-twitter").on("click", function(){
			var tweet = ""; //Tweet text
			var url = ""; //Interactive URL
			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
		});
		$(".icon-facebook").on("click", function(){
			var picture = ""; //Picture URL
			var title = ""; //Post title
			var description = ""; //Post description
			var url = ""; //Interactive URL
	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;
		});
	},
	onClick: function(){
		$('.buttonIcon--splash').on('click', function() {
			$('.splashWrapper').css('top','-100%');
		});
		$('.list--landlords li').on('click', function() {
			$('.active').removeClass('active');
			$(this).addClass('active');
			var landlord = $(this).data('landlord');
			$('.list--landlords').toggleClass('left');
			$('.list--properties--' + landlord).toggleClass('center');
		});
		$('.list--properties').on('click', function() {
			var landlord = $(this).data('landlord');
			$('.list--landlords').toggleClass('left');
			$('.list--properties--' + landlord).toggleClass('center');
		});
	},
	working: function(){

	}
}
$(document).ready(function(){
	worstLandlords.init();
	console.log("connected");
});
