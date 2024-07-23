const getProducts = async () => {
    const { data } = await axios.get('https://dummyjson.com/products');
    return data;
}

const displayProducts = async () => {
    try{

    const data=await getProducts();
    const products = data.products;

    const result = products.map( (product) => {
        return `
            <div class='product'>
                <h2>${product.title}</h2>
                <img src='${product.thumbnail}' />
                <a href='details.html?id=${product.id}'>details</a>
                <button onclick='deleteProduct(${product.id})'>delete</button>
            </div>
        `;
    }).join('');

    document.querySelector(".products").innerHTML = result;
    document.querySelector(".overlay").classList.add('d-none');
    const modal =document.querySelector(".my-modal");
    const closeBtn=document.querySelector(".closeBtn");
    const leftBtn = document.querySelector(".leftBtn");
    const rightBtn = document.querySelector(".rightBtn");
    const allImages = Array.from(document.querySelectorAll("img"));
   
    let currentIndex =0;
    rightBtn.addEventListener("click",()=>{
        currentIndex++;
        if(currentIndex >= allImages.length)
            currentIndex = 0;
        const nextImgesSrc=allImages[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",nextImgesSrc);
       });

       leftBtn.addEventListener("click",()=>{
        currentIndex--;
        const nextImgesSrc=allImages[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",nextImgesSrc);
       });

    

    for(let i=0;i<allImages.length;i++){
        allImages[i].addEventListener("click",(e)=>{
           console.log(e.target .src);
           modal.classList.remove('d-none');
           modal.querySelector("img").setAttribute("src",e.target.src);
           const currentImg =e.target;
           const currentIndex=allImages.indexOf(currentImg);

        });
    }
    closeBtn.addEventListener("click",(e)=>{
        modal.classList.add('d-none');
    });

    document.addEventListener("keydown",(e)=>{
    if(e.code == 'ArrowRight'){
        currentIndex++;
        if(currentIndex >= allImages.length)
            currentIndex = 0;
        const nextImgesSrc=allImages[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",nextImgesSrc);

    }else if(e.code == 'ArrowLeft'){
        currentIndex--;
        const nextImgesSrc=allImages[currentIndex].getAttribute("src");
        modal.querySelector("img").setAttribute("src",nextImgesSrc);
    }else if(e.code == 'Escape'){
        modal.classList.add('d-none');
    }
    });

}catch(error){
     const result=`
     <h2> No data exit </h2>`;
     document.querySelector(".products").innerHTML = result;
     document.querySelector(".overlay").classList.add('d-none');
}
}

const deleteProduct = async(id)=>{
    try{
    const {data}=await axios.delete(`https://dummyjson.com/products/${id}`);
    alert("delete this product sussufly");
}catch(error){
    alert("can't delete this product");
}
}

displayProducts();




