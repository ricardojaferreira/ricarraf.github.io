var newUser = document.querySelector('p');

newUser.onclick = function(){
    var name = prompt('Enter your name please: ');
    newUser.textContent='Player 1: ' + name;
}