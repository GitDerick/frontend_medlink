import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import '../css/style.css';
import '../css/responsive.css';
import img from '../images/about-img.jpg'


const AboutPage = () => {
    useEffect(() => {
        // Dynamically load scripts
        const loadScripts = () => {
            const script1 = document.createElement('script');
            script1.src = 'js/jquery-3.4.1.min.js';
            script1.async = true;
            document.body.appendChild(script1);

            const script2 = document.createElement('script');
            script2.src = 'https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js';
            script2.async = true;
            document.body.appendChild(script2);

            const script3 = document.createElement('script');
            script3.src = 'js/bootstrap.js';
            script3.async = true;
            document.body.appendChild(script3);

            const script4 = document.createElement('script');
            script4.src = 'https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js';
            script4.async = true;
            document.body.appendChild(script4);

            const script5 = document.createElement('script');
            script5.src = 'js/custom.js';
            script5.async = true;
            document.body.appendChild(script5);

            const script6 = document.createElement('script');
            script6.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCh39n5U-4IoWpsVGUHWdqB6puEkhRLdmI&callback=myMap';
            script6.async = true;
            document.body.appendChild(script6);
        };

        loadScripts();
    }, []);

    return (
        <div className="sub_page">
            <section className="about_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-box">
                                <img src={img} alt="About" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>About <span>Us</span></h2>
                                </div>
                                <p>
                                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
                                    in some form, by injected humour, or randomised words which don't look even slightly believable. If you
                                    are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
                                    the middle of text. All
                                </p>
                                <a href="#">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer_section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-3 footer_col">
                            <div className="footer_contact">
                                <h4>Reach at..</h4>
                                <div className="contact_link_box">
                                    <a href="#">
                                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                                        <span>Location</span>
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                        <span>Call +01 1234567890</span>
                                    </a>
                                    <a href="#">
                                        <i className="fa fa-envelope" aria-hidden="true"></i>
                                        <span>demo@gmail.com</span>
                                    </a>
                                </div>
                            </div>
                            <div className="footer_social">
                                <a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-linkedin" aria-hidden="true"></i></a>
                                <a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 footer_col">
                            <div className="footer_detail">
                                <h4>About</h4>
                                <p>
                                    Beatae provident nobis mollitia magnam voluptatum, unde dicta facilis minima veniam corporis laudantium alias tenetur eveniet illum reprehenderit fugit a delectus officiis blanditiis ea.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 mx-auto footer_col">
                            <div className="footer_link_box">
                                <h4>Links</h4>
                                <div className="footer_links">
                                    <a className="" href="index.html">Home</a>
                                    <a className="active" href="about.html">About</a>
                                    <a className="" href="departments.html">Departments</a>
                                    <a className="" href="doctors.html">Doctors</a>
                                    <a className="" href="contact.html">Contact Us</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 footer_col">
                            <h4>Newsletter</h4>
                            <form action="#">
                                <input type="email" placeholder="Enter email" />
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                    <div className="footer-info">
                        <p>
                            &copy; <span id="displayYear"></span> All Rights Reserved By
                            <a href="https://html.design/">Free Html Templates<br /><br /></a>
                            &copy; <span id="displayYear"></span> Distributed By
                            <a href="https://themewagon.com/">ThemeWagon</a>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AboutPage;
