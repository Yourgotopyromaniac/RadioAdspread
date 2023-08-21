import React, { useEffect } from "react";
import "../css/newsletter.css";

const Newsletter = () => {
  useEffect(() => {
    const js = `
    (function (w, d, e, u, f, l, n) {
      (w[f] =
        w[f] ||
        function () {
          (w[f].q = w[f].q || []).push(arguments);
        }),
        (l = d.createElement(e)),
        (l.async = 1),
        (l.src = u),
        (n = d.getElementsByTagName(e)[0]),
        n.parentNode.insertBefore(l, n);
    })(
      window,
      document,
      "script",
      "https://assets.mailerlite.com/js/universal.js",
      "ml"
    );
    ml("account", "329133");
  `;
    const script = document.createElement("script");
    const scriptText = document.createTextNode(js);
    script.appendChild(scriptText);
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <section
        id="newsletter"
        class="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-3522555"
      >
        <div>
          <div>
            <h2>New to Radioadspread?</h2>
            <p>
              Subscribe to our Newsletter to get update on our latest offers!
            </p>
          </div>
          {/* <div
            class="ml-block-form"
            action="https://assets.mailerlite.com/jsonp/329133/forms/80133036814894485/subscribe"
            data-code=""
            method="post"
            target="_blank"
          >
            <input
              type="email"
              class="form-control"
              data-inputmask=""
              name="fields[email]"
              placeholder="Enter Your Email Address"
              autocomplete="email"
              wi
            />
            <button>Subscribe</button>
          </div> */}
          <div class="ml-embedded" data-form="8BvfLe"></div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
