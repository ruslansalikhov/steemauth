var steemAuth = require('./lib/steemauth');
var steem = require('steem');
var username = process.env.STEEM_USERNAME;
var password = process.env.STEEM_PASSWORD;
var pubWif = process.env.STEEM_POSTING_PUBLIC_WIF;
var privWif = process.env.STEEM_POSTING_PRIVATE_WIF;
var memoKey = process.env.STEEM_MEMO_KEY;

var isValid = steemAuth.verify(username, password, { posting: [[pubWif, 1]] });
console.log(isValid);

var isWif = steemAuth.isWif(privWif);
console.log(isWif);

var ownerWif = steemAuth.toWif(username, password, 'owner');
console.log(ownerWif);

var wifIsValid = steemAuth.wifIsValid(privWif, pubWif);
console.log(wifIsValid);

var owner, active, posting,
	jsonMetadata = { 'profile': { 'name': 'Mr Stark', updateOn: new Date().toString() } };

steem.broadcast.accountUpdate(ownerWif, username, owner, active, posting, memoKey, jsonMetadata, function (err, result) {
	console.log(err, result);
});