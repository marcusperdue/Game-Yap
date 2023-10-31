
const login = async (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (email && password) {
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers:{'Content-Type': 'aplication/json'},

        });
        if(response.ok){
            document.location('/');
        }else{
            alert('please try again lol')
        }
        }
    };

    document
    .querySelector('.loginForm')
    .addEventListener('submit', login);