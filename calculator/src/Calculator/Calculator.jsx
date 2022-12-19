import React, { useState, useEffect } from "react";
import * as math from 'mathjs'
import "./Calculator.css"

const Calculator = () => {

    const [computeStr, setComputeStr] = useState("")
    const [answer, setAnswer] = useState("")


    const btns = [
        ["Deg", "x!", "(", ")", "%", "AC"],
        ["sin", "ln", "7", "8", "9", "÷"],
        ["cos", "log", "4", "5", "6", "x"],
        ["tan", "√", "1", "2", "3", "-"],
        ["EXP", "x^y", "0", ".", "=", "+"],
    ];

    const handleClick = async (value) => {
        if (value === "AC") {
            setComputeStr("")
            setAnswer("")
        }
        else if (value === "=") {
            try {
                const str = lnConverter();
                var result = math.evaluate(str);
                result = math.format(result, { precision: 14 })  //round off
                setAnswer(result)
                setComputeStr(result)
                setComputeStr("")

            } catch (error) {
                console.log(computeStr)
                setAnswer("ERROR")
                setComputeStr("")
            }
        }
        else {

            const tmp = assignValue(value)
            setComputeStr((prev) => { return (prev + tmp) })
        }
    }



    const isNumbtnClass = (value) => {
        //true if its a number, false if not
        if (!isNaN(+value)) {
            return "numbers btn";
        }
        if (value === "=")
            return "equal btn";
        if (value === "Deg")
            return "";
        else return "numbers btn"
    }




    //change ln(number) to log(number,e)
    function lnConverter() {
        const ln = 'ln(';
        const closure = ')';

        const words = computeStr;
        var start = words.indexOf(ln)
        // var end = words.indexOf(closure, start)
        // var number = words.substring(start + 3, end);

        //build new string:
        if (start !== -1) {
            // const newWords = words.substring(0, start) + "log(" + number + ",e)" + words.substring(end + 1, words.length)
            // setComputeStr(newWords)

            const newWords = words.split("ln").join("log");
            return newWords;
        }
        return words;
    }






    return (

        <div className="container">
            <div className="resultScreen">
                <input type="text" id="answer" disabled="disabled" value={computeStr} />
                <input type="text" id="screen" className="text-input" disabled="disabled" placeholder="0" value={answer} />
            </div>

            {btns.flat().map((value, index) => {
                return (
                    <button
                        onClick={() => { handleClick(value) }}
                        className={isNumbtnClass(value)}
                    >
                        {value}
                    </button>
                );
            })
            }

        </div>


    )
}


function assignValue(text) {
    switch (text) {
        case 'x':
            return '*'
        case '-':
            return '-'
        case '÷':
            return '/'
        case 'x^y':
            return '^'
        case 'sin':
            return 'sin(deg '
        case 'tan':
            return 'tan(deg '
        case 'cos':
            return 'cos(deg '
        case 'log':
            return 'log('
        case 'ln':
            return 'ln('
        case '√':
            return 'sqrt('
        case 'x!':
            return '!'
        case 'EXP':
            return '*10^'
        case '+':
            return '+'
        default:
            return text;
    }
}


export default Calculator;