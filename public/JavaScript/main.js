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




let accountDetails = [
    {
        bankName: 'Bank of America',
        number: '0531741030',
        name: 'Charlotte Moore'
    },
    {
        bankName: 'Bank of North Carolina',
        number: '0531120390',
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
             else if(num.value.length != 10){
                submit1.innerHTML= "Network Error unable to retrive account name"
             }
             else{
                
             }
            }
        else{
            submit1.innerText = "invalid PIN";
    }
    }
    else{
        if(check.value=="4455"){
            submit1.innerHTML= "Network Error unable to retrive account name";
        }
        else{
            submit1.innerHTML= "invalid PIN";
        }
    }
            
   
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
    conver.style.display= "none";
    submit1.innerText ="";
    check.value = ''
    num.value="";
    money.value= "";
    accountInfo.replaceChildren()
}