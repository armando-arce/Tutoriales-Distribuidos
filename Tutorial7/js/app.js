function getAll(entity) {
	fetch('https://faas-example.netlify.app/.netlify/functions/' + entity)
	  .then((response) => response.json())
		.then((data) => {
			fetch('/template/list/' + entity + '.html')
				.then((response) => response.text())
				.then((template) => {
					var rendered = Mustache.render(template, data);
					document.getElementById('content').innerHTML = rendered;
				});
		})
}

function getById(query, entity) {
	var params = new URLSearchParams(query);
	fetch('https://faas-example.netlify.app/.netlify/functions/' + entity + '/?id=' + params.get('id'))
	  .then((response) => response.json())
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

function init() {
	router = new Navigo('/', { hash: true });
	router.on({
		'/books': () => {
			getAll('books');
		},
		'/authors': () => {
			getAll('authors');
		},
		'/publishers': () => {
			getAll('publishers');
		},
		'/bookById': (_, query) => {
			getById(query, 'books');
		},
		'/authorById': (_, query) => {
			getById(query, 'authors');
		},
		'/publisherById': (_, query) => {
			getById(query, 'publishers');
		}
	});
	router.on(() => home());
	router.resolve();
}
