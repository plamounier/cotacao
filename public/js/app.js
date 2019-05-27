
const cotacoesForm = document.querySelector('form');
const mainMessage = document.querySelector('h3');
const price = document.querySelector('#price');
const price_open = document.querySelector('#price_open');
const day_high = document.querySelector('#day_high');
const day_low = document.querySelector('#day_low');



cotacoesForm.addEventListener('submit', (event) => {
    mainMessage.innerHTML = 'buscando...'
    // Evita que a pg seja recarregada
    event.preventDefault();
    const ativo = document.querySelector('input').value;

    if (!ativo) {
        mainMessage.innerText = 'O ativo deve ser informado.';
        return;
    }

    fetch(`http://localhost:3000/cotacao?ativo=${ativo}`).then((response) => {
    response.json().then((data) => {
       if (data.error) {
           mainMessage.innerText = 'Alguma coisa deu errado'
           price.innerText = `${data.error.message} | código ${data.error.code}`
       }else{
        mainMessage.innerText = `Ativo : ${data.symbol}`;
        price.innerText = `Preço fechamento : ${data.price}`;
        price_open.innerText = `Preço Abertura : ${data.price_open}`;
        day_high.innerText = `Maior alta do dia : ${data.day_high}`;
        day_low.innerText = `Menor baixa do dia : ${data.day_low}`;
       }
        
    })
});
})