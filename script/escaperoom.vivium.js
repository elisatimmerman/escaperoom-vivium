const achtergronden = [
    '#00257A',
    '#009B74'
]

function bloeddrukSymtomsClicked(btnId){
    var btn = document.getElementById(btnId);
    var btnConfirm = document.getElementById('btnConfirm');

    btn.value++
    btn.value = btn.value  < achtergronden.length ? btn.value : 0;
    btn.style.backgroundColor = achtergronden[btn.value]
    btn.style.color = '#ffffff'

    if(btn.getAttribute('clicked') == null)
    {
        btnConfirm.value++
        if(btnConfirm.value >= 9) btnConfirm.disabled = false;
        btn.setAttribute('clicked', true)
    }
}

function confirmationButtonClicked(btnId) 
{
    window.location.href='./bloeddrukToelichting.html'
}