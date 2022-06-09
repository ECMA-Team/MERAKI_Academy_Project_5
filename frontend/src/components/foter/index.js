import("./style.css")





const Footer = () => {



    return (
        <div>
            <footer class="footer-distributed">

                <div class="footer-left">

                    <h3>ECMA<span>logo</span></h3>

                    <p class="footer-links">
                        <a href="/" class="link-1">Home</a>

                        <a href="https://en.wikipedia.org/wiki/Electronics">Blog</a>

                        <a href="#">Pricing</a>

                        <a href="#">About</a>

                        <a href="#">Faq</a>

                        <a href="#">Contact</a>
                    </p>

                    <p class="footer-company-name">ECMA© 2022</p>
                </div>

                <div class="footer-center">

                    <div>
                        <i class="fa fa-map-marker"></i>
                        <p><span>ECMA</span> zarka, jordan</p>
                    </div>

                    <div>
                        <i class="fa fa-phone"></i>
                        <p>+9962788888888
                            <br></br>
                            053215478
                        </p>
                    </div>

                    <div>
                        <i class="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">ECMA@company.com</a></p>
                    </div>

                </div>

                <div class="footer-right">

                    <p class="footer-company-about">
                        <span>About the company</span>
                        An online store selling all kinds of electronic products in various shapes.. All high-quality products are specially designed to suit your needs at a competitive price that satisfies you. It is normal for high-quality products to have a different price than low-quality products - and we at ECMA.com provide you with high-quality products.
                    </p>

                    <div class="footer-icons">

                        <a href="/"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>

                    </div>

                </div>

            </footer>
        </div>
    )

}



export default Footer;