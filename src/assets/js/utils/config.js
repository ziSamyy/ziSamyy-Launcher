/**
 * @author Luuxis
 * @license CC-BY-NC 4.0 - https://creativecommons.org/licenses/by-nc/4.0/
 */

const pkg = require('../package.json')
const fetch = require('node-fetch')
let url = pkg.user ? `${pkg.url}/${pkg.user}` : pkg.url

let config = `${url}/launcher/config-launcher/config.json`
let news = `${url}/launcher/news-launcher/news.json`

class Config {
	GetConfig() {
		return new Promise((resolve, reject) => {
			fetch(config)
				.then((config) => {
					return resolve(config.json())
				})
				.catch((error) => {
					document.querySelector('.preload-title').innerHTML = 'Fallo de conexión'
					return reject(error)
				})
		})
	}

	async GetNews() {
		let rss = await fetch(news)
		if (rss.status === 200) {
			try {
				let news = await rss.json()
				return news
			} catch (error) {
				return false
			}
		} else {
			return false
		}
	}
}

export default new Config()
