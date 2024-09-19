let details= document.querySelector(".transfer");
let submit= document.getElementById('submit');
let transfer= document.getElementById('transfer')
let submit1= document.getElementById('submit-block');
let conver= document.querySelector(".conver");
let check = document.getElementById("check");
let money = document.getElementById("money");
let num = document.getElementById("num");
let history = document.getElementById('history');
let history_display = document.querySelector('.history');
let accountInfo = document.querySelector('.accountDetails')
let value = document.getElementById('balance')




let accountDetails = [
    {
        bankName: 'Bank of America',
        number: '053174103',
        name: 'Charlotte Moore'
    },
    {
        bankName: 'Aozara Bank',
        number: '0503728',
        name: 'Hayamoto Kurihara'
    },
    {
        bankName: 'Bank of North Carolina',
        number: '053112039',
        name: 'Lopez Taylor'
    },
    {
        bankName: 'Bank of North Carolina',
        number: '0531122000',
        name: 'Martin Harris'
    },
    {
        bankName: 'Sumitomo Mitsui',
        number: '4253256',
        name : 'Tomoko Kawahara Smbc',
        Store: '582'
    },
    {
        bankName: 'Paypay bank account',
        number: '6671579',
        name : 'Tomoko Kawahara Smbc',
        Store: '002'
    },
    {
    bankName: 'CITIZENS BANK NA',
    number: '001304518',
    name : 'Mr. Giovanna Harrison',
    Store: '02916'
    },
]


transfer.onclick= function(){
    details.style.display= "flex";
    conver.style.display= "block";

}

num.onblur = function(){
    accountInfo.replaceChildren()
    let accountN = num.value;
    let validNumber = accountDetails.find(account => account.number == accountN)

    if(accountDetails){
        let h = document.createElement('h3');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
            h.innerHTML = 'Account Details'
            p1.innerText = `Bank Name: ${validNumber.bankName}`
            p2.innerText = `Account Name ${validNumber.name}`
        accountInfo.appendChild(h)
        accountInfo.appendChild(p1)
        accountInfo.appendChild(p2)
    
    }
    else if(accountInfo.children.length === 0){
        let p1 = document.createElement('p');
        if(num.value== ''){
            p1.innerText = 'account number can not be empty'
            accountInfo.appendChild(p1)   
        }
       else{
        p1.innerText = 'unable to retrive account details'
        accountInfo.appendChild(p1)
       }
    }
   
}

submit.onclick= function(){
    let accountN = num.value;
    let validNumber = accountDetails.find(account => account.number == accountN)
    submit1.innerHTML = ''
   
  
    if(validNumber){

        if(check.value=="4455"){
            if(money.value.length < 3){
                submit1.innerHTML= "Amount too small"
        
            }
            else if(checkBalance()){
                 submit1.innerText = 'Insuficient Funds'
            }
             else{
                
                successful(validNumber)
                updateHistory()
             }
            }
        else{
            submit1.innerText = "invalid PIN";
    }
    }
    else{
        if(check.value=="4455"){
            submit1.innerHTML= "unable to retrive account name";
        }
        else{
            submit1.innerHTML= "invalid PIN";
        }
    }
            
  
}

function successful(validNumber){
    conver.style.display= "none";
    let div = document.createElement('div')
    let p1 = document.createElement('p')
    let p2 = document.createElement('p')
    let p3 = document.createElement('p')
    let p4 = document.createElement('p')
    let p6 = document.createElement('p')
    let h2 = document.createElement('h2')
    let h3 = document.createElement('h3')
    let button = document.createElement('button')
    let dashBoard = document.createElement('button')
    let img = document.createElement('img')

    p1.innerText = `Account Name: ${validNumber.bankName}`
    p2.innerText = `Beneficiary Name: ${validNumber.name}`
    p3.innerText = `Beneficiary Account Number: ${validNumber.name}`
    p6.innerText = `Amount: $${money.value}`
    if(validNumber.Store){
         p4.innerText = `Store: ${validNumber.Store}`
    }
    img.src = 'carolina.png'
    img.style.height = '100px'
    img.style.width = '300px'
    h2.innerText = 'FIRST CAROLINA BANK'
    h3.innerText = 'Transaction successful'
    button.innerText = 'Download and Share'

    div.appendChild(img)
    div.appendChild(h2)
    div.appendChild(h3)
    div.appendChild(p1)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(p4)
    div.appendChild(p6)
    div.appendChild(button)
    div.setAttribute('class', 'receipt')
    document.querySelector('.container').style.display = 'none'
    document.body.appendChild(div);

    dashBoard.innerText = 'DASHBOARD'
    div.appendChild(dashBoard)


    dashBoard.onclick = ()=>{
        document.querySelector('.container').style.display = 'block'
        div.style.display = 'none'
        cancel()
    }


    button.onclick = function(){
       download(div, dashBoard, button)
    }
    debit()
}

function notAvailable(){
    alert("Not avialble download the app")
}

history.onclick = function(){
        conver.style.display= "block";
        history_display.style.display = "block"
}

let cancel = function(){
    details.style.display= "none";
    history_display.style.display = "none";
    conver.style.display = 'none'
    submit1.innerText ="";
    check.value = ''
    num.value="";
    money.value= "";
    accountInfo.replaceChildren()
}

function debit(){
    let value = document.getElementById('balance')
    let balance = value.innerText;
    result = balance.replace(/,/g, '')
    moneyValue = money.value.replace(/,/g, '')
   let = newAmount = result - moneyValue
   value.innerHTML = newAmount
 
}
function updateHistory(){
    let today = new Date();
    let dateOnly = today.toLocaleDateString();
    let timeOnly = today.toLocaleTimeString(); 
    let update = document.querySelector('.div')

    let div = document.createElement('div')
    let h3 = document.createElement('h3')
    let h5 = document.createElement('h5')
    let p = document.createElement('p')
    let span = document.createElement('span')
    let accountN = num.value;
    let validNumber = accountDetails.find(account => account.number == accountN)

    h3.innerText = `${validNumber.name} ${validNumber.number}`
    p.innerText = `Trnasfer: $${money.value}`
    h5.innerText = 'Transaction Status: Successful'
    span.innerText = ` ${timeOnly}`
    h5.appendChild(span)
    div.appendChild(h3)
    div.appendChild(p)
    div.appendChild(h5)

    update.insertBefore(div, update.firstChild)    
}

function checkBalance(){
    let value = document.getElementById('balance')
    let balance = value.innerText;
   
    result = balance.replace(/,/g, '')
    if(Number(result) < money.value){
        return true
        
    }
    else{
        return false
    }
}

async function download(resultContainer, dashBoard, button) {
   
    dashBoard.style.display = 'none'
    button.style.display = 'none'
    // Create a temporary container to hold the result content
    var tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.backgroundColor = '#fff';
    tempContainer.innerHTML = resultContainer.outerHTML;

    // Append the temporary container to the body
    document.body.appendChild(tempContainer);

    try {
        // Ensure the container is fully visible in the viewport
        window.scrollTo(0, 0);

        // Capture the content of the container as a blob using dom-to-image
        var blob = await domtoimage.toBlob(tempContainer, { quality: 1 }); // Set highest quality (1)
        var url = URL.createObjectURL(blob);

        // Create a link element to trigger the download
        var link = document.createElement('a');
        link.href = url;
        link.download = 'receipt.jpg'; // Define the file name
        document.body.appendChild(link);
        link.click(); // Programmatically click the link to start download
        document.body.removeChild(link); // Remove the link element after download

        // Release the object URL after the download is triggered
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error generating image:', error);
    } finally {
        // Remove the temporary container from the body
        document.body.removeChild(tempContainer);
    }
    dashBoard.style.display = 'block'
    button.style.display = 'block'
}
