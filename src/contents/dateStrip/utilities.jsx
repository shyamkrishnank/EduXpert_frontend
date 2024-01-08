export const StripDate =(data)=>{
    const formdt = new Date(data).toLocaleDateString()
    return formdt
 }

 export const StripTime = (date)=>{
    const dateObject = new Date(date)
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    const isPM = hours >= 12;

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zero for single-digit minutes
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    // Construct the formatted time string
    const formattedTime = `${hours}:${minutes} ${isPM ? 'PM' : 'AM'}`;
    console.log(formattedTime)
    return formattedTime; 
    
 }