const getProduct=async()=>{
    const params=new URLSearchParams(window.location.search);
    const id=params.get('id');
   const {data} =  await axios.get(`https://dummyjson.com/products/${id}`);
   return data;
}

const displayProduct =async ()=>{
    const data= await getProduct();

    const images=data.images.map((img)=>{
        return`
        <img src='${img}' width:40px  height:40px />
        
        `; 
    }).join(' ');
   
    
    const result = `
    <h2> Title : ${data.title}</h2>
    <p> Description : ${data.description}</p>
    <p> Salary : ${data.price}</p>
    `;
    
    console.log(result);

    document.querySelector(".ProductDetails").innerHTML=result;

}



displayProduct();