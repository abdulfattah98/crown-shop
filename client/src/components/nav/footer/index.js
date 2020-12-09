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
                                        <Link
                                            to="/"
                                            className="list-item__link"
                                        >
                                            <div className="icon-container">
                                                <InfoIcon className="list-item__link-icon" />
                                            </div>
                                            <div>
                                                <span className="list-item__link-description">
                                                    help center
                                                </span>
                                                <p className="list-item__link-info">
                                                    help.noon.com
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="list-item">
                                        <Link
                                            to="/"
                                            className="list-item__link"
                                        >
                                            <div className="icon-container">
                                                <EmailIcon className="list-item__link-icon" />
                                            </div>
                                            <div>
                                                <span className="list-item__link-description">
                                                    email support
                                                </span>
                                                <p className="list-item__link-info">
                                                    care@noon.com
                                                </p>
                                            </div>
                                        </Link>
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
                                                    800-38888
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
            <div className="footer__main">
                <div className="container">
                    <ul className="footer__links row">
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category a</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category b</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category c</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category d</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category e</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                        <li className="footer__links-item col-2">
                            <p className="footer-category">category f</p>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                            <div className="footer-category__links">
                                <Link to="/" className="link">
                                    link 1
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <div className="footer__social mt-0 mt-lg-5">
                        <p className="footer__social-title">connect with us</p>
                        <ul className="footer__social-list">
                            <li className="footer__social-list-item ">
                                <a href="/" className="link">
                                    <FacebookIcon className="icon" />
                                </a>
                            </li>
                            <li className="footer__social-list-item ">
                                <a href="/" className="link">
                                    <TwitterIcon className="icon" />
                                </a>
                            </li>
                            <li className="footer__social-list-item ">
                                <a href="/" className="link">
                                    <InstagramIcon className="icon" />
                                </a>
                            </li>
                            <li className="footer__social-list-item ">
                                <a href="/" className="link">
                                    <LinkedinIcon className="icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__bottom">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-5 order-1 order-md-0 copyright">
                            &copy; 2020 noon. All Rights Reserved
                        </div>
                        <div className="col-12 col-md-7 order-0 order-md-1 other-links">
                            <ul className="links-list mb-0">
                                <li>
                                    <Link to="/" className="link">
                                        terms
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">
                                        terms
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">
                                        terms
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="link">
                                        terms
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
