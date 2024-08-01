// get inputs 

let id = document.getElementById('id');
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let pTotal = document.getElementById('pTotal');
let search = document.getElementById('search');
let submit = document.getElementById('submit');
let mood = 'create';
let tempfOrIndexUpdate = 0;

// get total price function 
function getTOtal() {
    if(price.value != '') {
        total.innerHTML = +price.value + +taxes.value + +ads.value - +discount.value;
    }
    else {
        total.innerHTML = '';
    }
}

// create new product
let products;

if(localStorage.products != null ) {
    products = JSON.parse(localStorage.products);
}
else {
    products = [];
}

function checkId(id) {
    let l = 0;
    let r = products.length - 1;
    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2);
        
        if (id === products[mid].id) {
            return true;
        } else if (id > products[mid].id) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }
    
    return false;
}

// check empty input

function emptyInput(){
        if (id.value == '') id.classList.add('error');
        else id.classList.remove('error');
        if (title.value == '') title.classList.add('error');
        else title.classList.remove('error');
        if (price.value == '') price.classList.add('error');
        else price.classList.remove('error');
        if (count.value == '') count.classList.add('error');
        else count.classList.remove('error')
        if (category.value == '') category.classList.add('error');
        else category.classList.remove('error');
        if (taxes.value == '') taxes.classList.add('error');
        else taxes.classList.remove('error');
        if (ads.value == '') ads.classList.add('error');
        else ads.classList.remove('error');
        if (discount.value == '') discount.classList.add('error');
        else discount.classList.remove('error');
}

// clear Input
function clearInput() {
    id.value = '';
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value= '';
    count.value= '';
}


// update product
function updateProduct(i) {
    id.value = products[i].id;
    title.value = products[i].title;
    price.value = products[i].price;
    taxes.value = products[i].taxes;
    ads.value = products[i].ads;
    discount.value = products[i].discount;
    count.value = products[i].count;
    category.value = products[i].category;
    total.innerHTML = products[i].total;
    id.disabled = true;
    submit.innerHTML = 'Update';
    mood = 'update';
    tempfOrIndexUpdate = i;
    getTOtal();
    scroll({
        top:0,
        behavior:"smooth"
    })
}

// search product 

let searchMood = 'title';
function getSearchMood(id) {
    if(id === 'searchTitle') {
        search.placeholder = 'Search By Title';
    }    
    else {
        search.placeholder = 'Search By Category';
    }

    if (search.value == '')
    {
        search.classList.add('error');
    }
    else {
        if(id === 'searchTitle') {
            searchMood = 'title';
            search.placeholder = 'Search By Title';
        }
        else {
            searchMood = 'category';
            search.placeholder = 'Search By Category';
        }
        search.classList.remove('error');
    }
    search.value = '';
    showProduct();
}

function searchProduct(value) {
    let table = '';
    value = value.toLowerCase();
    if(searchMood === 'title') {
        for(let i=0;i<products.length;i++) {
            if(products[i].title.toLowerCase().includes(value)){
                let rowStyle = (i % 2 !== 0) ? 'style="background-color: gray;"' : '';
                table += `
                <tr ${rowStyle}>
                    <td>${products[i].id}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].count}</td>
                    <td>${products[i].category}</td>
                    <td ><button id="update-btn" onclick="updateProduct(${i})">Update</button></td>
                    <td ><button id="delete-btn" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
                `;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
    else if(searchMood === 'category') {
        for(let i=0;i<products.length;i++) {
            if(products[i].category.toLowerCase().includes(value)){
                let rowStyle = (i % 2 !== 0) ? 'style="background-color: gray;"' : '';
                table += `
                <tr ${rowStyle}>
                    <td>${products[i].id}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].count}</td>
                    <td>${products[i].category}</td>
                    <td ><button id="update-btn" onclick="updateProduct(${i})">Update</button></td>
                    <td ><button id="delete-btn" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>
                `;
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
    
}



// create product

submit.addEventListener('click',(e)=> {
    e.preventDefault();
    if(id.value !='' && title.value !='' && price.value !='' && count.value !='' && category.value !=''&& taxes.value !=''&& discount.value !=''&& ads.value !='' ) {
        if(!checkId(id.value) || mood === 'update') {
            let product = {
            id: id.value,
            title: title.value,
            price: price.value,
            taxes:taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value
        };
        if(mood === 'create') {
            products.push(product);
        }
        else {
            products[tempfOrIndexUpdate] = product;
            id.disabled = false;
            mood = 'create';
            submit.innerHTML = 'Create';
        }
        

        products.sort((a, b) => a.id - b.id);
        localStorage.setItem("products",JSON.stringify(products));
        id.classList.remove('error');
        title.classList.remove('error');
        price.classList.remove('error');
        taxes.classList.remove('error');
        ads.classList.remove('error');
        discount.classList.remove('error');
        count.classList.remove('error');
        category.classList.remove('error');
        emptyInput();
        clearInput();
        id.classList.remove('error-id');
        showProduct()
        }
        else {
            id.classList.add('error-id');
            emptyInput();
        }
        
    }
    else{
        emptyInput();
    }
})

// delete product 

function deleteProduct(index) {
    products.splice(index,1);
    localStorage.products = JSON.stringify(products);
    showProduct();
}


// delete all 

function deleteAll() {
    document.getElementById('delete-all-btn').addEventListener('click', () => {
        products = [];
        localStorage.setItem('products', JSON.stringify(products));
        showProduct(); 
        
    });
}


// show  products 

function showProduct() {
    let table = '';
    for (let i = 0; i < products.length; i++) {
        let rowStyle = (i % 2 !== 0) ? 'style="background-color: gray;"' : '';
        table += `
        <tr ${rowStyle}>
            <td>${products[i].id}</td>
            <td>${products[i].title}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].count}</td>
            <td>${products[i].category}</td>
            <td ><button id="update-btn" onclick="updateProduct(${i})">Update</button></td>
            <td ><button id="delete-btn" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let deleteAllDiv = document.getElementById('del-all');
    if (products.length > 0) {
        deleteAllDiv.innerHTML = `
            <button id="delete-all-btn" class="delete-all-btn">Delete All (${products.length})</button>
        `;
        deleteAll();
    }
    else {
        deleteAllDiv.innerHTML = ``;
    }
}


showProduct()