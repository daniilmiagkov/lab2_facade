changePower('smart', false)
addListeners();
let timer;

const numbers = document.getElementById('numbers')
for (let i = 0; i < 10; i++) {
  const button = document.createElement('button')
  button.innerText = i.toString()
  button.id = `numbers__button-${i}`
  button.className = `button numbers__button`
  button.addEventListener('click', () => {
    numberClick(i)
  })
  if (i === 9)
    button.className += ' number_9'
  numbers.append(button)
}

function addListeners() {
  document.getElementById('power-smart').addEventListener('click',
    () => changePower('smart'));
  document.getElementById('power-ordinary').addEventListener('click',
    () => changePower('ordinary'));
  document.getElementById('volume-smart__button-up').addEventListener('click',
    () => changeVolume('smart', 1));
  document.getElementById('volume-smart__button-down').addEventListener('click',
    () => changeVolume('smart', -1));
  document.getElementById('volume-ordinary__button-up').addEventListener('click',
    () => changeVolume('ordinary', 1));
  document.getElementById('volume-ordinary__button-down').addEventListener('click',
    () => changeVolume('ordinary', -1));
  document.getElementById('channel-smart__button-up').addEventListener('click',
    () => changeChannel('smart', 0.1));
  document.getElementById('channel-smart__button-down').addEventListener('click',
    () => changeChannel('smart', -0.1));
  document.getElementById('channel-ordinary__button-up').addEventListener('click',
    () => changeChannel('ordinary', 0.1));
  document.getElementById('channel-ordinary__button-down').addEventListener('click',
    () => changeChannel('ordinary', -0.1));
}

async function changePower(type, value = null ) {
  const canvas = document.getElementById('canvasVolume')
  const tv = document.getElementById('tv')
  console.log(canvas)
  const obj = (await request(`/api/${type}/power`, 'POST',
    {
      value: value,
      w: canvas.width,
      h: canvas.height
    }));
  console.log(obj)
  if (obj.power === true) {
    tv.style.backgroundColor = '#ffffff'
    for (let child of tv.children)
      child.style.display = 'block'
    drawVolume(canvas, obj.array)
    document.getElementById('logo-channel').innerText = obj.resource.title
  }
  else if(obj.power === false) {
    tv.style.backgroundColor = '#000000'
    for (let child of tv.children)
      child.style.display = 'none'
  }
}

async function changeVolume(type, value) {
  const canvas = document.getElementById('canvasVolume');
  const array = await request(`/api/${type}/volume`, 'POST', {
    value: value,
    h: canvas.offsetHeight,
    w: canvas.offsetWidth,
  })
  drawVolume(canvas, array)
}

function drawVolume(canvas, array) {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "rgb(255,255,255)"
  ctx.clearRect(0,0,200,200)
  
  for (let obj of array) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
  }
}


async function changeChannel(type, value) {
  document.getElementById('logo-channel').innerText = (await request(`/api/${type}/channel`, 'POST', {
    value: value.toString(),
  })).title;
  
}

function numberClick(number) {
  clearTimeout(timer);
  const input = document.getElementById('input-channel')
  input.value += number;
  console.log(input.value)
  timer = setTimeout(updateText, 2000);
}

async function updateText() {
  const channel = document.getElementById('input-channel').value
  document.getElementById('input-channel').value = ''
  await changeChannel('ordinary', channel)
}

async function request(url, method = 'GET', data = {}) {
  try {
    const headers = {}
    let body
    
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(data)
    
    const response = await fetch(url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.warn('Error:', e.message)
  }
}