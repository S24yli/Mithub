import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useScrollYPosition } from "react-use-scroll-position";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import "../styles/navbar.css";
import "../styles/login.css";
import { auth } from "../Page/Firebase";
import { useNavigate } from "react-router-dom";

// useNavigate
const Login = ({ links }) => {
    const re = useNavigate()
    const userEmail = localStorage.getItem("auth")
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollY = useScrollYPosition();
    const [email, setEmail] = useState()
    const [password, setpassword] = useState()
    const stickeyTrigger = window.innerHeight / 2.75;
    const Login = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential;
                console.log(user, "lokesh")
                localStorage.setItem('auth', user.user.email)
                // Reload the current page

                re('/')

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    const handleClick = async (e) => {
        e.preventDefault()
        console.log(email, password)
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential;

                // ...
                window.alert("Success")

                window.location.reload();

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
    }
    let a = 1
    const logout = () => {
        signOut(auth).then((r) => {
            console.log("logout", userEmail)
            localStorage.clear()
            // Reload the current page
            window.location.reload();

            // Sign-out successful.
            console.log("Done")
        }).catch((error) => {
            console.log(error)
            // An error happened.
        });
    }
    return (
        <>
            <Container>
                <div
                    className={`nav${scrollY > stickeyTrigger ? " nav-stickey" : ""}${menuOpen ? " nav-open" : ""
                        }`}
                >
                    <div className="nav-content">
                        <div className="nav-logo">MeetHub:)</div>

                        <nav className="nav-links__container">

                            <a className="nav-link" href={"/"} >
                                <div className="nav-link__text">Home</div>
                                <div className="nav-link__background" />
                            </a>
                            <a className="nav-link" href={"#Features"} >
                                <div className="nav-link__text">Features</div>
                                <div className="nav-link__background" />
                            </a>
                            {
                                !userEmail == 1 ? (<a className="nav-link" href={"/login"} >
                                    <div className="nav-link__text">Login</div>
                                    <div className="nav-link__background" />
                                </a>) : (<button class="Btn" onClick={logout}>

                                    <div class="sign"><svg viewBox="0 0 512 512"><path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path></svg></div>

                                    <div class="text">Logout</div>
                                </button>


                                )

                            }
                        </nav>

                        <div
                            className="nav-menu__icon"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div />
                            <div />
                        </div>
                    </div>
                </div>
            </Container>

            <div class="wrapper">
                <div class="card-switch">
                    <label class="switch">
                        <input class="toggle" type="checkbox" />
                        <span class="slider"></span>
                        <span class="card-side"></span>
                        <div class="flip-card__inner">
                            <div class="flip-card__front">
                                <div class="title">Log in</div>
                                <form action="" class="flip-card__form">
                                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email" class="flip-card__input" />
                                    <input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} name="password" class="flip-card__input" />
                                    <button class="flip-card__btn" onClick={(e) => Login(e)}>Let`s go!</button>
                                </form>
                            </div>
                            <div class="flip-card__back">
                                <div class="title">Sign up</div>
                                <form action="" class="flip-card__form">

                                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} name="email" class="flip-card__input" />
                                    <input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} name="password" class="flip-card__input" />
                                    <button class="flip-card__btn" onClick={(e) => handleClick(e)}>Confirm!</button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </>
    )
}
Login.defaultProps = {
    links: [
        { title: "Home", href: "#home" },
        { title: "Features", href: "#features" },

        { title: "Contact", href: "#contact" },
        { title: "Login", href: "login" }
    ]
};
export default Login
