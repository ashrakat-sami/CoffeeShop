document.addEventListener('DOMContentLoaded', function() {
    fetch('products.json')
      .then(response => response.json())
      .then(data => {
        const drinks = data.drinks;
        const productSection = document.getElementById('productSection');
  
        drinks.forEach(drink => {
          const card = document.createElement('div');
          card.classList.add('card', 'col-4', 'mb-2', 'mx-lg-1');
          card.style.width = '24rem';
  
          let typeButtonsHTML = drink.Type.map(type => `<button class="type">${type}</button>`).join('');
  
          card.innerHTML = `
            <img class="drinkImg card-img-top" src="${drink.Image}" alt="${drink.Name}">
            <div class="card-body">
              <p class="card-text">
                <span class="coffeeName">${drink.Name}</span>
                <span class="price mx-lg-2">${drink.Price}$</span>
                <div class="hotOrCold">
                  ${typeButtonsHTML}
                </div>
                <div class="btn btn-lg btn-outline-dark float-end">
                  <i class="bi bi-plus-lg"></i>
                </div>
              </p>
            </div>
          `;
  
          productSection.querySelector('.row').appendChild(card);
        });


  
        // Event delegation for button clicks
        productSection.addEventListener('click', function(event) {
          if (event.target.classList.contains('type')) {
            const clickedButton = event.target;
  
            // Reset background color for all buttons in the same group
            const buttonGroup = clickedButton.parentNode; // Get the parent div (.hotOrCold)
            const buttonsInGroup = buttonGroup.querySelectorAll('.type'); // Select all buttons within that group
            buttonsInGroup.forEach(button => {
              button.style.backgroundColor = 'white'; // Or any default color you want
              button.style.color = 'black';
            });
  
            // Set background color for the clicked button
            clickedButton.style.backgroundColor = '#322118';
            clickedButton.style.color = 'white';
          }
        });
      })
      .catch(error => console.error('Error fetching drinks:', error));
  });