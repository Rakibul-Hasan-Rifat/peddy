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
      showPets(pets.pets)
    }, 2000);
  } catch (error) {
      console.error(error)
  }
};

// load categorised pets
const loadCategorisedPets = async(category) => {
  try {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${category}`
    );
    const pets = await response.json();
    showPets(pets)
  } catch (error) {
    
  }
}

// show categories
const showCategories = (categories) => {
  console.log(categories);
};

// show pets 
const showPets = (pets) => {
    console.log(pets);
}

loadCategories();
loadPets()

// setTimeout(() => {
//   showPets()
// }, 2000);
