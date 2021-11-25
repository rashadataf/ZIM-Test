import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Modal from "react-modal";
import Favourites from "./components/Favourites/Favourites";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    if (localStorage.getItem("email") == null) setIsOpen(true);
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function afterCloseModal() {
    if (localStorage.getItem("email") == null) setIsOpen(true);
  }

  function handleEmailChange(event: React.FormEvent<HTMLInputElement>) {
    const email = event.currentTarget.value;
    setEmail(email);
  }

  async function submitEmail() {
    if (email.length > 0) {
      localStorage.setItem("email", email);
      setIsOpen(false);
      setEmail("");
    }
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="favourites" element={<Favourites />} />
        </Routes>
      </main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        onAfterClose={afterCloseModal}
      >
        <h2 style={{ marginBottom: "2rem" }}>Hello There</h2>
        <div>Please Enter Your Email:</div>
        <input type="text" name="email" onChange={handleEmailChange} />
        <button onClick={submitEmail}>submit</button>
      </Modal>
    </div>
  );
}

export default App;
