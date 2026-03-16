import './style.css';
import { getHome } from './api';

async function start() {

    try {
        const data = await getHome();

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
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
        document.querySelector("#app").innerHTML = `<h1>Erro ao conectar com o servidor</h1>`;
    }
}

start();