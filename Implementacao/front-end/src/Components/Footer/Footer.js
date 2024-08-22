import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Institucional</h4>
                    <ul>
                        <li>Sobre</li>
                        <li>Carreiras</li>
                        <li>Histórias de superação</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Ajuda</h4>
                    <ul>
                        <li>Suporte</li>
                        <li>Termos de Uso</li>
                        <li>Política de Privacidade</li>
                        <li>Procon-Mg</li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Siga a Centra Sports</h4>
                    <ul className="social-media">
                        <li>
                            <a href="https://www.facebook.com/?locale=pt_BR" className="text-decoration-none ml-2">
                                Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/elonmusk" className="text-decoration-none ml-2">
                                X
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/filipedeschamps/" className="text-decoration-none ml-2">
                                Instagram
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/watch?v=eskq53977sY" className="text-decoration-none ml-2">
                                Youtube
                            </a>
                        </li>
                        <li>
                            <a href="https://discord.com" className="text-decoration-none ml-2">
                                Discord
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">&copy; 1988 - 2024 Central Sports Ltda. Todos os direitos reservados.</div>
        </footer>
    );
};

export default Footer;
