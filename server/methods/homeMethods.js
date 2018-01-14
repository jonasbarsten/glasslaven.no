import FB from 'fb';

FB.api('oauth/access_token', {
    client_id: Meteor.settings.private.facebook.appId,
    client_secret: Meteor.settings.private.facebook.appSecret,
    grant_type: 'client_credentials'
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    var accessToken = res.access_token;
    FB.setAccessToken(accessToken);
});

Meteor.methods({
	'home.getFacebookBanner': function () {
		const url = `/${Meteor.settings.private.facebook.pageId}?fields=cover`;

		const response = FB.api(url);

		return response;
	}
});