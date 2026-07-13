let currentValue=localStorage.getItem('currentvalue')||'';
let express=localStorage.getItem('express')||'';
let deleteValue="";
show();
key();
function show()
{
    document.querySelector(".disnum").innerText=express;

    localStorage.setItem('currentvalue' , currentValue);
    localStorage.setItem('express' , express);
}
function insert(ins)
{  
    if(ins =='/')
    {
        currentValue += '/';
        express += '÷';
        
    }
    else if(ins==='*')
    {
        currentValue += '*';
        express += '×';
        
    }
    else
    {
        currentValue += ins;
        express += ins;
        
    }
    show();
}
function calc()
{
    let result= eval(currentValue);
    
    currentValue=String(result);
    
    express=currentValue;
    if(currentValue === 'undefined')
    {
        currentValue='';
        express='';
    }
    show();
}
function deletex()
{
    
    express = express.slice(0 , -1);
    currentValue = currentValue.slice(0 , -1);
    show();
    
}
function press(value)
{
    console.log(value);
    insert(value);
    
}
function cls()
{
    express="";
    currentValue="";
    show();
}


function key()
{
    document.addEventListener('keydown' ,
        (event)=> {
            const key = event.key;
            if (key >= '0' && key <= '9') press(key);
            else if (key === '.') press('.');
            else if (key === '+') insert('+');
            else if (key === '-') insert('-');
            else if (key === '*') insert('×');
            else if (key === '/') { event.preventDefault(); insert('÷'); }
            else if (key === 'Enter' || key === '=') calc();
            else if (key === 'Backspace') deletex();
            else if (key === 'Escape') cls();
        }
    )
}

