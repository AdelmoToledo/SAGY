import './style.css';

async function carregar() {
    //Deploy: Use the deployed backend URL
    const resposta = await fetch('https://sagy.onrender.com/api/hello/');
    // Local development
    // const resposta = await fetch('http://localhost:8001/api/hello/');

    
    const dados = await resposta.json();
    document.querySelector("#app").innerHTML = `<h1>${dados.message}</h1>`;
}

carregar();