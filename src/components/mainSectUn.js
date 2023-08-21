import React, { useEffect, useRef } from 'react';
import '../css/sect-un.css';

const SectUn = ({ sectUnClass, sectImgUn, sectTitleUn, paraTextUn })=> {
    const sectUnHead = useRef();
    useEffect(()=> {
        sectUnHead.current.innerHTML = sectTitleUn;
    }, [ sectTitleUn ])

    return (
        <section id="section-un" className={sectUnClass}>
            <div>
                <img src={sectImgUn} alt="" />
                <article>
                    <h2 ref={sectUnHead}>R</h2>
                    <p>{paraTextUn}</p>
                </article>
            </div>
        </section>
    )
}

export default SectUn;
