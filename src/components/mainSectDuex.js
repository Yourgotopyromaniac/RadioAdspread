import React, { useEffect, useRef } from 'react';
import '../css/sect-duex.css';

const SectDuex = ({ sectDuexClass, title, card1, card2, card3 })=> {
    const card1Txt = useRef();
    const card2Txt = useRef();
    const card3Txt = useRef();

    useEffect(()=> {
        card1Txt.current.innerHTML = card1.para;
        card2Txt.current.innerHTML = card2.para;
        card3Txt.current.innerHTML = card3.para;
    }, [ card1.para, card2.para, card3.para ])

    return(
        <section id="section-duex" className={sectDuexClass}>
            <div>
                <h2>{title}</h2>
                <section>
                    <article>
                        <img src={card1.img} alt="" />
                        <h3>{card1.header}</h3>
                        <p ref={card1Txt}>p</p>
                    </article>
                    <article>
                        <img src={card2.img} alt="" />
                        <h3>{card2.header}</h3>
                        <p ref={card2Txt}>p</p>
                    </article>
                    <article>
                        <img src={card3.img} alt="" />
                        <h3>{card3.header}</h3>
                        <p ref={card3Txt}>p</p>
                    </article>
                </section>
            </div>
        </section>
    )
}

export default SectDuex;