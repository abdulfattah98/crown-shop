import React from 'react';
// import FontAwesomeIcon from '@fortawesome/react-fontawesome';
// import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
// import faPhone from '@fortawesome/fontawesome-free-solid/faPhone';
// import faClock from '@fortawesome/fontawesome-free-solid/faClock';
// import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

// SVGs
import { ReactComponent as InfoIcon } from './information.svg';
import { ReactComponent as EmailIcon } from './mail.svg';
import { ReactComponent as PhoneIcon } from './phone.svg';
import { ReactComponent as FacebookIcon } from './facebook.svg';
import { ReactComponent as InstagramIcon } from './instagram.svg';
import { ReactComponent as TwitterIcon } from './twitter.svg';
import { ReactComponent as LinkedinIcon } from './linkedin.svg';

// React Router
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__top">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-12 col-lg-4 footer__top-left">
                            <h3 className="title">we're always here to help</h3>
                            <span className="summary">
                                Reach out to us through any of these support
                                channels
                            </span>
                        </div>
                        <div className="contact-container col-12 col-lg-7">
                            <ul className="footer__top-list">
                                <div className="list-container">
                                    <li className="list-item">
                                        <span className="list-item__link">
                                            <div className="icon-container">
                                                <InfoIcon className="list-item__link-icon" />
                                            </div>
                                            <div>
                                                <span className="list-item__link-description">
                                                    help center
                                                </span>
                                                <p className="list-item__link-info">
                                                    crown.com/help
                                                </p>
                                            </div>
                                        </span>
                                    </li>
                                    <li className="list-item">
                                        <span className="list-item__link">
                                            <div className="icon-container">
                                                <EmailIcon className="list-item__link-icon" />
                                            </div>
                                            <div>
                                                <span className="list-item__link-description">
                                                    email support
                                                </span>
                                                <p className="list-item__link-info">
                                                    support@crown.com
                                                </p>
                                            </div>
                                        </span>
                                    </li>
                                    <li className="list-item">
                                        <div className="list-item__link">
                                            <div className="icon-container">
                                                <PhoneIcon className="list-item__link-icon" />
                                            </div>
                                            <div>
                                                <span className="list-item__link-description">
                                                    phone support
                                                </span>
                                                <p className="list-item__link-info">
                                                    xxx-xxxxx
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 text-center copyright">
                            &copy; 2020 CROWN. All Rights Reserved
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
