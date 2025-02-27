const loadingAllPhones = async (showStatus, searchText) => {
    console.log('all phone');
    document.getElementById("spinner").style.display = "none";

    const response = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText ? searchText : "iphone"}`)
    const data = await response.json();
    const dataNotFound = document.getElementById("not-data-found")
    
    if(data.data.length === 0){
        document.getElementById("spinner").style.display = "none";
        dataNotFound.innerHTML = `<h1 class="text-center text-4xl my-6 text-red-400">No data Found</h1>`
        console.log(data.data);
    } else {
        dataNotFound.innerHTML = "";
    }

    if (showStatus) {
        displayAllPhone(data.data);
    } else {
        displayAllPhone(data.data.slice(0, 8));
    }

}

const displayAllPhone = (phones) => {
    document.getElementById("card-container").innerHTML = "";
    const phoneContainer = document.getElementById("card-container");
    phones.forEach(phone => {
        const { image, slug, phone_name, brand } = phone;
        const div = document.createElement("div");
        div.innerHTML = `
<div class="bg-gray-900">
  <div class="text-white rounded-xl shadow-lg p-4 overflow-hidden transition-transform transform hover:scale-105 h-96 flex flex-col">
    <figure class="overflow-hidden rounded-t-xl">
      <img src="${image}" alt="Shoes" class="w-full h-60 object-cover transition-opacity duration-300 hover:opacity-80" />
    </figure>
    <div class="p-4 flex-grow">
      <h2 class="text-xl font-semibold text-blue-400">${phone_name}</h2>
      <h2 class="text-lg text-gray-400">${slug}</h2>
      <p class="text-gray-300">${brand}</p>
    </div>
    <div class="mt-auto">
      <button onclick="phoneDetails('${slug}')" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg shadow-md transition-all duration-300">View Details</button>
    </div>
  </div>
</div>


           
    `
        phoneContainer.appendChild(div);
    })

}
// show all btn
const showAll = () => {
    loadingAllPhones(true)
    // console.log('show');
}

const handelSearch = () => {
    const searchText = document.getElementById("search-box").value;

    document.getElementById("spinner").style.display = "block"

    setTimeout(function () {
        loadingAllPhones(false, searchText);
    }, 3000)
}

const phoneDetails = async(slugs) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await response.json();
    console.log(data.data);
    const {brand,slug,image} = data.data;
    console.log(data.data);
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
<dialog id="my_modal_1" class="modal">
    <div class="modal-box rounded-lg shadow-lg p-6 bg-gray-900 text-white">
        <h3 class="text-xl font-semibold text-gray-200">${brand}</h3>
        <div class="flex justify-center my-4">
            <img src="${image}" alt="Brand Image" class="rounded-lg shadow-md max-h-60">
        </div>
        <p class="py-4 text-gray-400">${slug}</p>
        <div class="modal-action flex justify-end">
            <form method="dialog">
                <button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">Close</button>
            </form>
        </div>
    </div>
</dialog>

    `
    my_modal_1.showModal();

    
}
loadingAllPhones(false, "iphone");