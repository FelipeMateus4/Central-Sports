import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendTokenEmail = async (email: string) => {
    const imageUrl = 'https://st.depositphotos.com/1952089/2650/i/450/depositphotos_26504777-stock-photo-welcome.jpg';
    const msg = {
        to: email,
        from: 'dropzin01@gmail.com',
        subject: 'Seja muito bem vindo a nossa plataforma',
        text: 'Obrigador por se inscrever seja bem vindo: ',
        html: `<p>Bem-vindo!<br><img src="${imageUrl}" alt="Imagem de boas-vindas"></p>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Email de boas vindas enviado');
    } catch (error) {
        console.error('Erro ao enviar email: ' + error);
    }
};

export const sendTokenLoginEmail = async (email: string, token: string) => {
    const msg = {
        to: email,
        from: 'dropzin01@gmail.com',
        subject: 'Seja muito bem vindo a nossa plataforma',
        text: 'Obrigador por se inscrever seja bem vindo: ',
        html: `<p>Bem-vindo!<br><img src="${token}" alt="Imagem de boas-vindas"></p>`,
    };
    try {
        await sgMail.send(msg);
        console.log('Email enviado com o token');
    } catch (error) {
        console.error('Erro ao enviar email: ' + error);
    }
};
