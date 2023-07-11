import React, { useState } from "react";
import { Container, Screen, Prevoius, Current, Button } from "../styles/Main";
import { FiDelete } from 'react-icons/fi';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FaEquals } from 'react-icons/fa';
import { TbNumber0 } from 'react-icons/tb';

const Calculator = () => {
  const [current, setCurrent] = useState("");
  const [prevoius, setPrevoius] = useState("");
  const [operations, setOperations] = useState("");
  const [ac , setAc] = useState(true)

  const appendValueHandler = (a) => {
    setAc(false)
    const value = a.target.getAttribute("data");
    if (value === "." && current.includes(".")) return;
    setCurrent(current + value);
  };

  const deleteHandler = () => {
    setAc(false)
    setCurrent(String(current).slice(0, -1));
  };

  const allclearHandler = () => {
    setAc(true);
    setCurrent("");
    setPrevoius("");
    setOperations("");
  }

   const alloffHandler = () => {
    setCurrent("");
    setOperations("");
    setPrevoius("");
    setAc("");
   }

  const chooseOperationHandler = (e) => {    
    setAc(false)
    if (current === "") return;
    if (prevoius !== "") {
      let value = compute();
      setPrevoius(value);
    } else {
      setPrevoius(current);
    }
    setCurrent("");
    setOperations(e.target.getAttribute("data"));
  };

  const equalHandler = () => {
    let value = compute();
    if (value === undefined || value == null) return;
    setCurrent(value);
    setPrevoius("");
    setOperations("");
  };
  const compute = () => {
    let result;
    let previousNumber = parseFloat(prevoius);
    let currentNumber = parseFloat(current);

    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (operations) {
      case "÷":
        result = previousNumber / currentNumber;
        break;
      case "x":
        result = previousNumber * currentNumber;
        break;
      case "+":
        result = previousNumber + currentNumber;
        break;
      case "-":
        result = previousNumber - currentNumber;
        break;
      default:
        return;
    }
    return result;
  };

  return (
    <>
      <Container>
        <Screen>
          <Prevoius>
            {prevoius} {operations}
          </Prevoius>
          <Current>{ac ? 0 : current}</Current>
        </Screen>
        <Button onClick={alloffHandler} >
            <AiOutlinePoweroff />
        </Button>
        <Button onClick={allclearHandler}>
          AC
        </Button>
        <Button  onClick={deleteHandler}><FiDelete /></Button>
        <Button data={"÷"} onClick={chooseOperationHandler} operation>
          ÷
        </Button>
        <Button data={7} onClick={appendValueHandler}>
          7
        </Button>
        <Button data={8} onClick={appendValueHandler}>
          8
        </Button>
        <Button data={9} onClick={appendValueHandler}>
          {" "}
          9
        </Button>
        <Button data={"x"} operation onClick={chooseOperationHandler}>
          x
        </Button>
        <Button data={4} onClick={appendValueHandler}>
          4
        </Button>
        <Button data={5} onClick={appendValueHandler}>
          5
        </Button>
        <Button data={6} onClick={appendValueHandler}>
          6
        </Button>
        <Button data={"+"} operation onClick={chooseOperationHandler}>
          +
        </Button>
        <Button data={1} onClick={appendValueHandler}>
          1
        </Button>
        <Button data={2} onClick={appendValueHandler}>
          2
        </Button>
        <Button data={3} onClick={appendValueHandler}>
          3
        </Button>
        <Button data={"-"} operation onClick={chooseOperationHandler}>
          -
        </Button>
        <Button data={"."} onClick={appendValueHandler} decimal>
          .
        </Button>
        <Button data={0} onClick={appendValueHandler}>
          <TbNumber0 />
        </Button>
        <Button gridSpan={2} equals onClick={equalHandler}>
          <FaEquals />
        </Button>
      </Container>
    </>
  );
};

export default Calculator;