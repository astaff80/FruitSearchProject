const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
	const [...val] = str.toLowerCase();

	if(str===''){return([])}
	
	const results = fruit.filter(function(item, index, array){
		const [...check] = item.toLowerCase();

		//console.log(check);
		//console.log(val[0]);

		const finder = (j, i) => {
			//console.log([j,i,val.length,check.length-i]);
			if(val.length - j > check.length - i){return false}

			if(j){
				//console.log([val.join(),check.join(),j,i]);
				//console.log("true");
				if(!val[j]){return true}
				if(val[j] === check[i]){
					if(j === val.len){return true} else {return finder(j+1, i+1)}
				} else {return finder(0, i+1)}
			} else {return finder(+(check[i] === val[0]), i+1)}
		}

		return finder(0, 0);
	});

	return results;
}

function searchHandler(e) {
	const val = input.value;
	const results = search(val);

	console.log(results);

	showSuggestions(results, val);
}

function showSuggestions(results, inputVal) {
	const k = suggestions.childElementCount;
	for(i=0;i<=k;i++){
		for(n of suggestions.children) { suggestions.removeChild(n) }
	}

	for (r of results) {
		const newitem = document.createElement("li");
		newitem.append(r);
		suggestions.append(newitem);
	}
}

function useSuggestion(e) {
	const choice = e.target.innerText;

	input.value = choice;
	showSuggestions([choice]);
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);