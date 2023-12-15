export const StripDate =(data)=>{
    const formdt = new Date(data).toLocaleDateString()
    return formdt
 }