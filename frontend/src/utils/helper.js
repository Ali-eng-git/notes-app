export const validateEmail =(email)=>{
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const getInitials=(name)=>{
  if (!name) return "";

  let initials ="";
  let words = name.split(" ");
 

  for (let i = 0; i < Math.min(words.length, 2); i++) {
   initials += words[i][0];
  }
  return initials.toUpperCase();
}