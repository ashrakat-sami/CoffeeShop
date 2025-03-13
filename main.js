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
                <div class="btn btn-lg btn-outline-dark float-end mt-2" onclick="addToCart()">
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
            
            let type = clickedButton.textContent;
            localStorage.setItem('type', type);

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

  //add to cart's function
    function addToCart() {
        let cart = localStorage.getItem('cart');
        if (cart) {
            cart = JSON.parse(cart);
        } else {
            cart = [];
        }
        let type = localStorage.getItem('type');
        let cardElement = event.target.closest('.card');
        let drinkId = cardElement.querySelector('.drinkImg').alt;
        let drinkPrice = parseFloat(cardElement.querySelector('.price').textContent.replace('$', ''));
        let drinkImage = cardElement.querySelector('.drinkImg').src;

        let existingDrink = cart.find(item => item.id === drinkId && item.type === type);

        if (existingDrink) {
            existingDrink.quantity += 1;
            existingDrink.totalPrice += drinkPrice;
        } else {
            let drink = {
                id: drinkId,
                type: type,
                image: drinkImage,
                quantity: 1,
                totalPrice: drinkPrice
            };
            cart.push(drink);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
    }
