function getAll(url,entity) {
	fetch(url+'/'+entity)
		.then((data) => {
			fetch('/template/list/' + entity + '.html')
				.then((response) => response.text())
				.then((template) => {
					var rendered = Mustache.render(template, data);
					document.getElementById('content').innerHTML = rendered;
				});
		})
}

function getById(query, url, entity) {
	var params = new URLSearchParams(query);
	fetch(url + '/' entity + '/' + params.get('id'))
		.then((data) => {
			fetch('/template/detail/' + entity + '.html')
				.then((response) => response.text())
				.then((template) => {
					var rendered = Mustache.render(template, data);
					document.getElementById('content').innerHTML = rendered;
				});
		})
}

function home() {
	fetch('/template/home.html')
		.then((response) => response.text())
		.then((template) => {
			var rendered = Mustache.render(template, {});
			document.getElementById('content').innerHTML = rendered;
		});
}

const booksApi = "https://faas-example.netlify.app";
const authorsApi = "https://faas-example.netlify.app";
const publishersApi = "https://faas-example.netlify.app";

function init() {
	router = new Navigo(null, false, '#!');
	router.on({
		'/books': function() {
			getAll(booksApi,'books');
		},
		'/authors': function() {
			getAll(authorsApi,'authors');
		},
		'/publishers': function() {
			getAll(publishersApi,'publishers');
		},
		'/bookById': function(_, query) {
			getById(query, booksApi, 'books');
		},
		'/authorById': function(_, query) {
			getById(query, authorsApi, 'authors');
		},
		'/publisherById': function(_, query) {
			getById(query, publishersApi, 'publishers');
		}
	});
	router.on(() => home());
	router.resolve();
}
