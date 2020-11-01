// create a variable of the original you want to clone

const theRealOne = document.querySelector('#goalsSection article');

// since its an array create a loop "for of" meaning for every element of the array the loop will go through every element and do what you want, here we want to clone every element
// "products" its the name i want to call every element on the array
for (const product of goalsArray) {
    const cloneProduct = theRealOne.cloneNode(true);
    // created the clone and now i want it to appear on the document, "#goalsSection" its where i want it to append
    document.querySelector('#goalsSection').append(cloneProduct);
    // now select what i want to change and where to change the injected data
    cloneProduct.querySelector('.title').innerText = product.name;
    cloneProduct.querySelector('.current').innerText = usd(product.current);
    cloneProduct.querySelector('.target').innerText = usd(product.goal);
    //the next line its how i change the style with JS
    cloneProduct.style.backgroundImage = `url(${product.picture})`;

    // display the "riched" class, meaning if the product its "riched" add the class on the clone
    // after if always "()"
    if (product.riched) {
        cloneProduct.classList.add('riched');
    }
    // the bonus i didnt knew how to do it so i copied it from teacher exercise

    const progressBar = product.current / product.goal * 100;
    console.log(progressBar);
    cloneProduct.querySelector('.progress').style.width = progressBar + '%';
}

//remove the original after the loop only or after "{}"
theRealOne.remove();

//more bonus, the usd function, format USD
// source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Intl/NumberFormat

function usd(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', minimumFractionDigits: 0
    }).format(price)
}

// doing the filtering
document.querySelector('#totalGoals').addEventListener('click', function () {
    const allGoals = document.querySelectorAll('#goalsSection article');
    // since i used querySelectorAll means a new array so, loop for of
    for (const goal of allGoals) {
        // first show all "empty"
        goal.style.display = '';
    }
    //activating the blue button
    activateButton(this);
})
document.querySelector('#richedGoals').addEventListener('click', function () {
    //now i will hide all the products ( querySelectorAll)
    const allGoals = document.querySelectorAll('#goalsSection article');
    // since i used querySelectorAll means a new array so, loop for of
    for (const goal of allGoals) {
        goal.style.display = 'none';
    }

    // after hiding everything now im gonna show what i click in (riched)

    const newGoals = document.querySelectorAll('#goalsSection article.riched');
    // since i used querySelectorAll means a new array so, loop for of
    for (const goal of newGoals) {
        goal.style.display = '';
    }
    // again activate the blue button
    activateButton(this);
})

document.querySelector('#newGoals').addEventListener('click', function () {
    //showing all again so after select the ones i want
    const allGoals = document.querySelectorAll('#goalsSection article.riched');
    // again querySelectorAll, array = for of
    for (const goal of allGoals) {
        goal.style.display = '';
    }

    //  now im gonna hide the class (riched)

    const newGoals = document.querySelectorAll('#goalSection article.riched');
    // again querySelectorAll, array = for of
    for (const goal of newGoals) {
        goal.style.display = 'none';
    }
    // and the blue button again
    activateButton(this);
})

// [Bonus] : dynamic mofication of the buttons
const counts = {
    total: goalsArray.length,
    riched: goalsArray.filter(goal => goal.riched).length,
    new: goalsArray.filter(goal => !goal.riched).length
}
document.querySelector('#totalGoals span').innerText = counts.total;
document.querySelector('#richedGoals span').innerText = counts.riched;
document.querySelector('#newGoals span').innerText = counts.new;
// [bonus] the bouton clicked shows in blue
function activateButton(element) {
    // change the css class
    for (const button of document.querySelectorAll('button')) {
        button.classList.remove('active');
    }
    element.classList.add('active');
}
