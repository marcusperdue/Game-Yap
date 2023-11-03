const signup = async (event) => {
  event.preventDefault();
  
  const formData = new FormData(document.querySelector("#createAccountForm"));

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      
      window.location.href = "/login"; 
    } else {
      
    }
  } catch (error) {

  }
};

document.querySelector("#createAccountForm").addEventListener("submit", signup);
