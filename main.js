
const btn = document.getElementById('btn');
const root = document.getElementById('root');

btn.addEventListener('click', renderResponse);


function getIP() {
  return $.get('https://api.ipify.org/?format=json');
}
async function renderResponse() {
  const response = await getIP();
  const ip = response.ip;

  const ipHolder = document.createElement('p')
  ipHolder.textContent = `Ваш IP: ${ip}`;
  root.appendChild(ipHolder);

  const res = await getInfoFromIP(ip);
  renderInfo(res, root);
  btn.removeEventListener('click', renderResponse);
  root.removeChild(btn);
}
function getInfoFromIP(ip) {
  return $.get(`http://ip-api.com/json/${ip}?fields=continent,country,regionName,city,district&lang=ru`);
}

function renderInfo(data, rootDiv) {
  const continentHolder = document.createElement('p')
  continentHolder.textContent = `Континент: ${data.continent}`;
  const countryHolder = document.createElement('p');
  countryHolder.textContent = `Страна: ${data.country}`;
  const cityHolder = document.createElement('p');
  cityHolder.textContent = `Город: ${data.city}`;
  rootDiv.appendChild(continentHolder);
  rootDiv.appendChild(countryHolder);
  rootDiv.appendChild(cityHolder);
  if (data.district !== '') {
    const districtHolder = document.createElement('p');
    districtHolder.textContent = `Район: ${data.district}`;
    rootDiv.appendChild(districtHolder);
  }
}