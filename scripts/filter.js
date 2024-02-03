// Category Filter System
function filterItems(category) {
    const items = document.querySelectorAll('.product.item');
    
    items.forEach(item => {
  
        const categories = (item.dataset.categories || '').split(',');
  
        if (category === 'all' || categories.includes(category)) {
            item.style.display = 'inline-flex';
        } else {
            item.style.display = 'none';
        }
    }); 
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const category = this.dataset.category;
            filterItems(category);
        });
    });
  });


//Filter System for Sarch bar
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const product = document.querySelectorAll(".product");
  
    for (var i = 0; i < product.length; i++) {
      let match = product[i].querySelector(".product-card-name");
  
      if (match) {
        let textvalue = match.textContent || match.innerHTML;
  
        if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
          product[i].style.display = "";
        } else {
          product[i].style.display = "none";
        }
      }
    }
  };