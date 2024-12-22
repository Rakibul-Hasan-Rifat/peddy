// fetch categories
const loadCategories = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await response.json();
    showCategories(data.categories);
  } catch (error) {
    console.log(error.message);
  }
};

// fetch all pets
const loadPets = async () => {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const pets = await response.json();
    document.getElementById(
      "pet_container"
    ).innerHTML = `<div class="flex justify-center items-center col-span-full">
    <span class="loader"></span>
    </div>`;
    setTimeout(() => {
      showPets(pets.pets);
    }, 2000);
  } catch (error) {
    console.error(error);
  }
};

// load categorised pets
const loadCategorisedPets = async (category) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const pets = await response.json();
    document.getElementById(
      "pet_container"
    ).innerHTML = `<div class="flex justify-center items-center col-span-full">
    <span class="loader"></span>
    </div>`;
    setTimeout(() => {
      showPets(pets.data);
    }, 2000);
  } catch (error) {}
};

const showActive = (e) => {
  const categoryContainer = document.getElementById("category_container");
  for (const elem of categoryContainer.children) {
    elem.classList.remove(
      "rounded-[120px]",
      "bg-[#0e7a811a]",
      "border-[#0E7A81]"
    );
  }
  if (e.target.tagName === "IMG" || e.target.tagName === "H4") {
    e.target.parentElement.classList.add(
      "rounded-[120px]",
      "bg-[#0e7a811a]",
      "border-[#0E7A81]"
    );
  } else if (
    e.target.tagName === "DIV" &&
    !e.target.id.includes("category_container")
  ) {
    e.target.classList.add(
      "rounded-[120px]",
      "bg-[#0e7a811a]",
      "border-[#0E7A81]"
    );
  }
};

// show categories
const showCategories = (categories) => {
  const categoryContainer = document.getElementById("category_container");

  categories.forEach((category) => {
    const { id, category_icon, category: petType } = category;
    const div = document.createElement("div"); // create a new div element
    // adding click event to the div
    div.addEventListener("click", (e) => {
      console.log("clicked pet", e.currentTarget);
      loadCategorisedPets(petType);
    });
    div.id = `category_${id}`; // adding id to the div
    // adding class attribute to the div
    div.setAttribute(
      "class",
      "min-w-[200px] flex gap-3 justify-center items-center px-6 py-3 rounded-[16px] border hover:cursor-pointer"
    );
    div.innerHTML = `
      <img src=${category_icon}/>
      <h4 class="text-2xl font-semibold">${petType}</h4>
    `;
    categoryContainer.append(div);
  });
};

// click handler on like button
const petImages = [];
const likeBtnHandler = (a, b, c) => {
  petImages.push(b);
  showLikedPets(petImages);
  console.log(petImages, "like btn clicked", a, b, c);
};

// show pets
const showPets = (pets) => {
  console.log(pets);
  const petContainer = document.getElementById("pet_container");
  petContainer.innerHTML = "";
  if (pets.length < 1) {
    petContainer.innerHTML = `
    <div class="col-span-3 flex flex-col items-center justify-center px-10 py-5 rounded-lg bg-[#13131308]">
      <img src="assets/error.webp" />
      <h4 class="my-3 font-semibold text-3xl">No Information Available</h4>
      <p class="text-[#131313bb] text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
    return;
  }
  pets.forEach((pet) => {
    const {
      image,
      breed,
      gender,
      date_of_birth: birth,
      pet_name: name,
      price,
    } = pet;
    const div = document.createElement("div");
    div.classList.add("p-3", "rounded-lg", "border");
    div.innerHTML = `
    <img src=${image} class="rounded-lg h-[180px] object-cover"/>
    <h4 class='font-semibold text-2xl py-3'>${name}</h4>
    <p class="flex gap-2 items-center">
      <img width="15" height="15" src="https://img.icons8.com/material-rounded/15/windows-11.png" alt="windows-11"/>
      <small>Breed: ${breed ? breed : "Not mentioned"}</small>
    </p>
    <p class="flex gap-2 items-center">
      <img width="15" height="15" src="https://img.icons8.com/material-outlined/15/timeline-week.png" alt="windows-11"/>
      <small>Birth: ${birth ? birth : "Unknown"}</small>
    </p>
    <p class="flex gap-2 items-center">
      <img width="15" height="15" src="https://img.icons8.com/windows/15/transgender.png" alt="windows-11"/>
      <small>Gender: ${gender ? gender : "Not specified"}</small>
    </p>
    <p class="flex gap-2 items-center">
      <img width="15" height="15" src="https://img.icons8.com/small/16/us-dollar.png" alt="windows-11"/>
      <small>Price: ${price ? price : "Not available"}</small>
    </p>
    <hr class='my-2' />
    <div class="flex items-center justify-between">
      <button onclick="likeBtnHandler(event, '${image}')" class="px-3 py-2 rounded-lg border border-[#0e7a8126]">
        <img src="https://img.icons8.com/fluency-systems-regular/24/facebook-like--v1.png"/>
      </button>
      <button class="px-3 py-2 rounded-lg border border-[#0e7a8126] font-semibold text-[#0e7a81]">Adopt</button>
      <button class="px-3 py-2 rounded-lg border border-[#0e7a8126] font-semibold text-[#0e7a81]">Details</button>
    </div>
    `;
    petContainer.append(div);
  });
};

const showLikedPets = (likedPetImages) => {
  const likedPetContainer = document.getElementById("liked_pet_container");
  console.log("show liked pets func", likedPetImages);
  likedPetContainer.innerHTML = "";
  likedPetImages.forEach((petImage) => {
    const imgElement = document.createElement("img");
    imgElement.src = petImage;
    imgElement.classList.add('rounded', )
    likedPetContainer.append(imgElement);
  });
};

loadCategories();
loadPets();

// setTimeout(() => {
//   showPets()
// }, 2000);
