const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');

const query = document.getElementById('query');

const search = (e) =>
{
    // e is the event that gets passed into this function
    // we want to prevent whatever it would normally do
    e.preventDefault();

    const baseRoute = `https://pokeapi.co/api/v2/pokemon`;

    const term = query.value;
    const route = `${baseRoute}/${term}`;
    
    fetch(route)
    .then((response) =>
    {
        // check to see if the request worked correctly
        if (response.status === 200)
        {
            return response.json();
        }
        // if we get here, it did not work, so let's
        // handle that error somehow
        const warning = document.createElement('span');
        warning.classList = 'warning';
        warning.textContent = 'Pokemon not found.';
        searchResults.appendChild(warning);
    })
    .then((data) =>
    {
        // now you have your data response from the API
        // do whatever you want with it
        // populate other elements on your webpage
        const pic = document.createElement('div');
        pic.classList = 'pokemon';
        pic.style.backgroundImage = `url("${data.sprites.front_default}")`;
        searchResults.appendChild(pic);
        const pokemonName = document.getElementById('pokemonName');
        pokemonName.value = data.name;
    })
    .catch((err) =>
    {
        console.log('There was an error fething: ', err);
    });

}

searchForm.addEventListener('submit', search);