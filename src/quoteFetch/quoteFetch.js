import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./quoteFetch.css";

export const QuoteFetch = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isVisible, setVisible] = useState(false);
  const [isVisibleLoader, setVisibleLoader] = useState(true);

  const min = 47144;
  const max = 48143;

  useEffect(() => {
    const interval = setInterval(() => {
      const randNumber = Math.floor(Math.random() * (max - min + 1) + min);
      fetch(`https://personal-mongo.herokuapp.com/quotes/${randNumber}`)
        .then((res) => res.json())
        .then((result) => {
          setItems(result);
          // let utterance = new SpeechSynthesisUtterance(result.quote);
          // speechSynthesis.speak(utterance);
          // let utterance2 = new SpeechSynthesisUtterance(result.author);
          // speechSynthesis.speak(utterance2);
          // setVisibleLoader(false);
          setIsLoaded(true);
          setVisibleLoader(false);
          setTimeout(() => {
            setVisible(true);
          }, 1000);
        });
      setVisible(false);
      setIsLoaded(false);
      // setTimeout(() => {
      //   setVisible(false);
      //   setIsLoaded(false);
      // }, 6000);
    }, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isLoaded ? (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className='container'
          key='1'
          initial={{
            opacity: 0,
            transition: { duration: 1 },
          }}
          animate={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1 },
          }}
        >
          <h3 className='quote'>{items.quote}</h3>

          <h2 className='author'> — {items.author}</h2>
        </motion.div>
      )}
    </AnimatePresence>
  ) : (
    <AnimatePresence>
      {isVisibleLoader && (
        <motion.div
          key='2'
          initial={{
            opacity: 0,
            transition: { duration: 1 },
          }}
          animate={{
            opacity: 1,
            transition: { duration: 1 },
          }}
          exit={{
            opacity: 0,
            transition: { duration: 1 },
          }}
        >
          <h1 className='loading'>Loading...</h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default QuoteFetch;
