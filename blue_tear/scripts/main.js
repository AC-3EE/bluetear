(function () {
	/** map 初始化 */
	function initMap() {
		var map = L.map('map').setView(CENTROL, 16);
		const option = { radius: 20, max: 600 };

		var tiles = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(map);
		var heat = L.heatLayer(LAT_LNG_DATA, option).addTo(map);
	}

	function getWeather() {
		fetch(
			'https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?' +
				new URLSearchParams({
					Authorization: 'CWB-5FE2E86D-812D-491A-8D83-808045C7BA2F',
					limit: 1,
					locationName: '馬祖',
					elementName: ['TEMP', 'Weather'],
				})
		)
			.then((response) => response.json())
			.then((jsonData) => {
				const wData = jsonData?.records?.location[0]?.weatherElement;
				const temp = wData?.find((i) => i.elementName == 'TEMP');
				const weather = wData?.find((i) => i.elementName == 'Weather');
				if (!temp || !weather) {
					throw new Error('沒有取得資料');
				}
				document.getElementById('weather').innerHTML = weather.elementValue;
				document.getElementById('temp').innerHTML = temp.elementValue;
				document.getElementById('wInfo').style.display = 'block';
				document.getElementById('wError').style.display = 'none';
			})
			.catch((err) => {
				console.log('錯誤:', err);
				document.getElementById('wError').style.display = 'block';
				document.getElementById('wInfo').style.display = 'none';
			});
		return getWeather
	}

	window.onload = function () {
		initMap();

		var timer;
		timer && clearInterval(timer);
		timer = setInterval(getWeather(), 600000); // 10 分鐘刷新一次
	};
})();
