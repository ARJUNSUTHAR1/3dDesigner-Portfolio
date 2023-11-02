import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Project from './component/Project';
import './Services.css';

const projects = [
  {
    title: "3d Modeling",
    src: "",
    color: "#000000"
  },
  {
    title: "Animations",
    src: "officestudio.png",
    color: "#8C8C8C"
  },
  {
    title: "Video Editing",
    src: "locomotive.png",
    color: "#EFE8D3"
  },
  {
    title: "Graphic Designing",
    src: "silencio.png",
    color: "#706D63"
  }
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] }
  }
};

const Home = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });
  }, []);

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main onMouseMove={(e) => { moveItems(e.clientX, e.clientY); }} className='projects'>
      <h2 class="section-title">servic<span class="stroke">es</span>
        <span class="section-title__square"></span>
      </h2>
      <div className="body">
        {
          projects.map((project, index) => (
            <Project key={index} index={index} title={project.title} manageModal={manageModal} />
          ))
        }
      </div>
      <>
        <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className="modalContainer">
          <div style={{ top: index * -100 + "%" }} className="modalSlider">
            {
              projects.map((project, index) => {
                const { src, color } = project;
                return (
                  <div className="modal" style={{ backgroundColor: color }} key={`modal_${index}`}>
                    <img src={`/images/${src}`} width={300} alt="image" />
                  </div>
                );
              })
            }
          </div>
        </motion.div>
      </>
    </main>
  );
};

export default Home;