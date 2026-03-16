import './style.css';
import { getHome } from './api';

async function start() {
    //Deploy: Use the deployed backend URL
    fetch('https://sagy.onrender.com/home/home/')
    // Local development
    // const data = await getHome();

    // Número de whatsapp
    const whatsappNumber = '556792325346';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;
    //document.querySelector("#whatsapp-link").href = whatsappLink;

    document.querySelector("#app").innerHTML = `
        <h1>SÂGI VEST</h1>
        <br>
        <span class="status-badge">${data.message}</span>

        <div style="margin-top: 20px;">
            <a href="${whatsappLink}" 
               target="_blank"
               class="button">
               Entre em contato via WhatsApp 
            </a>
        </div>
    `;
}

start();