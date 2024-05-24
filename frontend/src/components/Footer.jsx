
"use client";

import { Footer } from "flowbite-react";
import {Link} from "react-router-dom"

export default function FooterComponent() {
    const date = new Date();
    const year = date.getFullYear();
    return (
        <Footer container>
            <div className="w-full text-center">
                {/*<div className="w-full justify-between sm:flex sm:items-center sm:justify-between">*/}
                {/*    <Footer.Brand*/}
                {/*        href="#"*/}
                {/*        src="https://flowbite.com/docs/images/logo.svg"*/}
                {/*        alt="MyLocker Logo"*/}
                {/*        name="MyLocker"*/}
                {/*    />*/}
                {/*    <Footer.LinkGroup>*/}
                {/*        <Footer.Link> <Link to="/about">About</Link></Footer.Link>*/}
                {/*        <Footer.Link> <Link to="/contact">Contact</Link></Footer.Link>*/}
                {/*    </Footer.LinkGroup>*/}
                {/*</div>*/}
                {/*<Footer.Divider />*/}
                <Link to="/">
                    <Footer.Copyright by="MyLocker™" year={year} />
                </Link>
            </div>
        </Footer>
    );
}
