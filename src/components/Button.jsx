import './button.css'

export function Button({name, id, classItem, setInput, calculate}){
    
    const displayValue = name;
    const className = `button ${classItem}`

    const calculateFormula = (formula)=>{
        const answer = eval(formula);
        if(answer && !isNaN(answer)){
            calculate(answer)
            return answer.toString()
        }else{
            calculate("0")
            return "0"
        }
    }

    const handleClick = (e)=>{
        const content = e.target.textContent;
        setInput((prevInput)=>{
            const lastChar = prevInput.charAt(prevInput.length - 1);
            let newState = "0";
            switch(content){
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                case "0":
                    if(!isNaN(Number(lastChar))){
                        newState = prevInput == "0" ? content : prevInput + content;
                    }else{
                        newState = prevInput + content
                    }
                break;
                case "*":
                case "+":
                case "/":
                    if((["*","+","-","/", "."]).find((el)=>lastChar==el)){
                        let lastNumberChar = lastChar
                        let j = 0;
                        while((["*","+","-","/", "."]).find((el)=>lastNumberChar==el)){
                            lastNumberChar = prevInput.charAt(prevInput.length - 2 -j);
                            j++
                        }
                        newState = prevInput.substring(0, prevInput.length - j) + content
                    }else{
                        newState = prevInput + content
                    }
                break;
                case "-":
                    if((["-","."]).find((el)=>lastChar==el)){
                        newState = prevInput
                    }else{
                        newState = prevInput + content
                    }
                break;
                case ".":
                    const operators = /[*/+-]/g;
                    const oppBlock = prevInput.split(operators);
                    const oppLastBlock = oppBlock[oppBlock.length - 1];
                    if(oppLastBlock.indexOf(".") != -1){
                        newState = prevInput
                    }else{
                        newState = prevInput + content
                    }
                break;
                case "=":
                    const answer = calculateFormula(prevInput);
                   
                    if(answer && !isNaN(answer)){
                        
                        newState = answer;
                    }else{
                        newState = "0";
                    }
                break;
                case "AC":
                    calculateFormula("0");
                    newState = "0"
                break;
            }
            return newState;
        })
    }
    return (<button className={className} id={id} onClick={handleClick}>{displayValue}</button>)
}