// Fake http request function, 1 second to reject or resolve promise
const fakeReq = (url) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const pages = {
				'/users'        : [ { id: 1, username: 'Bilbo' }, { id: 5, username: 'Esmeralda' } ],
				'/users/1'      : {
					id        : 1,
					username  : 'Bilbo',
					upvotes   : 360,
					city      : 'Lisbon',
					topPostId : 454321
				},
				'/users/5'      : {
					id       : 5,
					username : 'Esmeralda',
					upvotes  : 571,
					city     : 'Honolulu'
				},
				'/posts/454321' : {
					id    : 454321,
					title : 'Ladies & Gentlemen, may I introduce my pet pig, Hamlet'
				},
				'/about'        : 'This is the about page!'
			};

			const data = pages[url];
			if (data) {
				resolve({ status: 200, data });
			} else {
				reject({ status: 404 });
			}
		}, 1000);
	});
};

// Easy way to chain promises - returning promises
// Only need one .catch
fakeReq('/users')
	.then((res) => {
		const id = res.data[0].id;
		// fakeReq('/users') -> fakeReq('/users/1')
		return fakeReq(`/users/${id}`);
	})
	.then((res) => {
		const postId = res.data.topPostId;
		// fakeReq('/users/1') -> fakeReq('/posts/454321')
		return fakeReq(`/posts/${postId}`);
	})
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log('Oh no!', err);
	});

// How not to do it, basically the promise version of 'callback hell'
// .then within .then and then having to add .catch to each .then

// fakeReq('/users')
// 	.then((res) => {
// 		const id = res.data[0].id;
// 		fakeReq(`/users/${id}`)
// 			.then((res) => {
// 				const postId = res.data.topPostId;
// 				fakeReq(`/posts/${postId}`)
// 					.then((res) => {
// 						console.log(res);
// 					})
// 					.catch((err) => {
// 						console.log('Could not find post', err);
// 					});
// 			})
// 			.catch((err) => {
// 				console.log('Could not find user', err);
// 			});
// 	})
// 	.catch((err) => {
// 		console.log('OH NO!', err);
// 	});
