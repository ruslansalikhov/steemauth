var steemAuth = require('./lib/steemauth');
var steem = require('steem');

var username = process.env.STEEM_USERNAME;
var password = process.env.STEEM_PASSWORD;
var pubWif = process.env.STEEM_POSTING_PUBLIC_WIF;
var privWif = process.env.STEEM_POSTING_PRIVATE_WIF;

var isValid = steemAuth.verify(username, password, {posting: [[pubWif, 1]]});
console.log(isValid);

var isWif = steemAuth.isWif(privWif);
console.log(isWif);

var toWif = steemAuth.toWif(username, password, 'posting');
console.log(toWif);

var wifIsValid = steemAuth.wifIsValid(privWif, pubWif);
console.log(wifIsValid);

steem.broadcast.comment(toWif, '', 'steemjs', username, 'this-is-a-test-2', 'Test Title', 'Hello World!', {tags: ['steemjs', 'steem']}, function(err, result) {
	console.log(err, result);
});

steem.broadcast.vote(toWif, username, 'metrox', 'why-does-my-post-lose-25-after-the-payout', 10000, function(err, result) {
	console.log(err, result);
});

var account = 'guest123',
	owner = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [['STM5j6x515jjYcjqtSVr7c6FRaXMkUGUDdduxvQJ3M1abDYxiT7Lx', 1]]
	},
	active = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [['STM7KVz2JzGVUHuuguoAK9BPosAbXWaCEp3Bgr5TUmMyvPjSJRt6m', 1]]
	},
	posting = {
		'weight_threshold': 1,
		'account_auths': [],
		'key_auths': [['STM6aGPtxMUGnTPfKLSxdwCHbximSJxzrRjeQmwRW9BRCdrFotKLs', 1]]
	},
	memoKey = 'STM8WpDC53NtLKcCUCyuS6e11TjigkCxnLCdVPEuL1CFH3hZoqK48',
	jsonMetadata = {'profile': {'name': 'Mr Stark'}};
//jsonMetadata = JSON.stringify(jsonMetadata);


steem.broadcast.accountUpdate(toWif, account, owner, active, posting, memoKey, jsonMetadata, function (err, result) {
	console.log(err, result);
});