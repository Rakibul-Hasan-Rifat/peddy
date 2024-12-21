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
    showPets(pets);
  } catch (error) {}
};

const showActive = (e) => {
  const categoryContainer = document.getElementById("category_container");
  for (const elem of categoryContainer.children) {
    console.log(elem);
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
  console.log(categories);
  categories.forEach((category) => {
    const div = document.createElement("div");
    div.id = `category_${category.id}`;
    div.setAttribute(
      "class",
      "min-w-[200px] flex gap-3 justify-center items-center px-6 py-3 rounded-[16px] border hover:cursor-pointer"
    );
    div.innerHTML = `
      <img src=${category.category_icon}/>
      <h4 class="text-2xl font-semibold">${category.category}</h4>
    `;
    categoryContainer.append(div);
    console.log(div.id);
  });
};

// show pets
const showPets = (pets) => {
  console.log(pets);
};

loadCategories();
loadPets();

// setTimeout(() => {
//   showPets()
// }, 2000);
