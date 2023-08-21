import React, { useState } from "react";
import "./css/talk-with-an-expert.css";
import { useForm } from "react-hook-form";
import NavBar from "../components/Navbar.js";
import TalkWithExpertModal from "../components/Modal/talk-with-expert-modal";
import { ReactComponent as ErrorIcon } from "../assets/icons/error.svg";
import { useMutation } from "@apollo/client";
import { SEND_EXPERT_EMAIL } from "../components/GraphQL/Mutation";
import { toast } from "react-toastify";

const TalkWithAnExpert = () => {
  const [isModal, setIsModal] = useState(false);
  const [sendExpertEmail, { loading }] = useMutation(SEND_EXPERT_EMAIL);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  async function onSubmit(formData) {
    await sendExpertEmail({
      variables: {
        input: {
          email: formData.email,
          name: formData.name,
          phone: formData["phone-no"],
          projectBrief: formData.brief,
          advertType: formData["advert-type"],
        },
      },
      onCompleted: () => {
        setIsModal(true);
      },
      onError: () => {
        toast.error("Something went wrong");
      },
    });
  }

  return (
    <>
      <div
        id={isModal ? "hide-talk-to-expert" : "talk-with-expert"}
        style={{ position: "relative", zIndex: "20" }}
      >
        <NavBar
          bgClass="navbar-dark"
          navTextColor="#FFFFFE"
          navFavColor="#FC9732"
        />
        <main>
          <section>
            <div>
              <h1>Consult an Expert</h1>
              <div>
                <h2>AN EXPERT WILL GET IN TOUCH WITH YOU</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    label="Name:"
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    validation={{ required: true }}
                  />
                  <Input
                    label="Email Address:"
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    validation={{
                      required: true,
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Invalid email address",
                      },
                    }}
                  />
                  <Input
                    label="Phone Number:"
                    id="phone-no"
                    type="text"
                    placeholder="Enter your phone numbe"
                    validation={{ required: true }}
                  />
                  <Select
                    label="Advert Type:"
                    id="advert-type"
                    className="advert-type-select"
                    validation={{ required: true }}
                  />
                  <TextArea
                    label="Project Brief:"
                    id="brief"
                    placeholder="Describe your project"
                    className="error-icon"
                    validation={{ required: true }}
                  />
                  <button disabled={loading} type="submit">
                    {loading ? (
                      <i class="fa fa-circle-o-notch fa-spin"></i>
                    ) : (
                      "Submit"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      </div>
      {isModal && <TalkWithExpertModal />}
    </>
  );

  function Input({ label, id, placeholder, type = "text", validation }) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id, validation)}
        />
        {errors[id] && <Error message={errors[id].message} />}
      </div>
    );
  }

  function Select({ label, id, className, validation }) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <select className={className} {...register(id, validation)}>
          <option value="Jingle">Jingles</option>
          <option value="PaidAnnouncement">Paid Annoucement</option>
        </select>
        <span className="error-icon">
          <ErrorIcon />
        </span>
        <div></div>
      </div>
    );
  }

  function TextArea({ label, id, placeholder, className, validation }) {
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <textarea
          id={id}
          placeholder={placeholder}
          {...register(id, validation)}
        ></textarea>
        <span className={className}>
          <ErrorIcon />
        </span>
        <div></div>
      </div>
    );
  }

  function Error({ message }) {
    return (
      <>
        <span
          className="error-icon"
          style={{
            display: "block",
          }}
        >
          <ErrorIcon />
        </span>
        <div
          style={{
            display: "block",
          }}
        >
          {message}
        </div>
      </>
    );
  }
};

export default TalkWithAnExpert;
