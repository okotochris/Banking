
let account = document.getElementById("num");
let loading = document.querySelector('.waiting')
account.onblur = async ()=>{
    let accNumber = account.value;
    loading.style.display= 'block'
    try{
        let result = await fetch(`/accountDetails?number=${accNumber}`)
        accountDetails = await result.json()
        console.log(accountDetails)
        loading.style.display= 'none'
    }
    catch(err){
        console.log(err)
    }

}