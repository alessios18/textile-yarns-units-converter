const { Console } = require('console');
const {app, BrowserWindow} = require('electron');

// E' necessario mantenere un riferimento globale all'oggetto 
// della finestra principale dell'app
// altrimenti la finestra verrà chiusa automaticamente quando l'oggetto
// verrà eliminato dal garbage collector di Javascript
let mainWindow;

function createWindow () {
	
	// Crea la finestra
	mainWindow = new BrowserWindow({width: 780, height: 440});

	console.log('${__dirname}');
	
	if (process.env.ENV == 'DEV') {

		// Mi collego all'endpoint ogni retryInterval millisecondi
		// fino a che non ricevo correttamente la pagina
		const request = require('request');
		const devLoadUrl = function(url, retryInterval) {
	
			request(url, function (error, response, body) {
	
				if (!error && response.statusCode == 200) {
	
					// Carica la pagina in una finestra Electron
					mainWindow.loadURL(url);
					// Apri gli strumenti per sviluppatori
					mainWindow.webContents.openDevTools();
	
				} else {
	
					setTimeout(function() { devLoadUrl(url); }, retryInterval);
	
				}
	
			});
	
		};
	
		devLoadUrl('http://localhost:4200', 1000);
	
	} else {
	
		// Se la variabile d'ambiente ENV non è settata a DEV
		// procedo a caricare il file index.html
		// prodotto dalla build di Angular
		mainWindow.loadFile(`dist/textile-yarns-units-converter/index.html`);
	
	}

	// Callback da invocare quando la finestra viene chiusa
	mainWindow.on('closed', function () {

		// L'oggetto finestra non ci servè più, dereferenziamolo
		mainWindow = null;

	});

}

// Crea la finestra quando Electron è pronto
app.on('ready', createWindow);

// Callback da invocare quando tutte le finestre sono chiuse
app.on('window-all-closed', function () {

	// In macOS è comune che le app rimangano attive 
	// fino a che l'utente non le chiude esplicitamente con Cmd + Q
	if (process.platform !== 'darwin') {

		app.quit();

	}

});

app.on('activate', function () {

	// In macOS è comune che la finestra di un applicazione venga ricreata
	// quando viene cliccata l'icona nel Dock e non ci sono altre finestre aperte
	if (mainWindow === null) {

		createWindow();

	}

});