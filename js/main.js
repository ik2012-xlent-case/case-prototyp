let rows = [];
let search_cols = [
    "FÖRETAG",
    "ORT",
    "LÄN",
    "BRANSCH",
    "KONTAKTPERSON",
    "SENASTE HISTORIK",
    "ORGNR"
];

let filter_cols = [
    "Karta",
    "Avtal",
    "Län",
    "Ort",
    "Bransch",
    "Senaste historik"
];

let filters = [];
let active_filters = [];

$(document).ready(function () {
    const input = document.getElementById("search-field");
    const tbody = document.getElementById("customers");
    const rs = tbody.getElementsByTagName("tr");
    const headers = document.getElementById("tbl_kundlista").getElementsByTagName("th");
    // Store all table-rows for faster searching
    for(let i = 0; i < rs.length; i++){
        const tds = rs[i].getElementsByTagName("td");
        const cols = [];
        for(let j = 0; j < tds.length; j++){
            cols.push({
                header: headers[j].innerText.toUpperCase(),
                val: tds[j].textContent.toUpperCase().replace(/\s/g, '') || tds[j].innerText.toUpperCase().replace(/\s/g, '') 
            });
        }

        rows.push({
            row: rs[i],
            cols: cols
        });
    }

    // Build up adv-filter-list
    for(let i = 0; i < headers.length; i++){
        const vals = [];
        for(let j = 0; j < rs.length; j++){
            const td = rs[j].getElementsByTagName("td")[i];
            if(headers[i].textContent === "Senaste historik"){
                let d =  td.textContent.split(/[0-9]/);
                if(d && d.length > 0){
                    vals.push(td.textContent.split(/[0-9]/)[0]);
                }else{
                    vals.push(td.textContent);
                }
            }else{
                vals.push(td.textContent);
            }
        }
        if(filter_cols.includes(headers[i].textContent)){
            filters.push({col: headers[i].textContent, vals});
        }
            
    }

    // Remove duplicate values from adv-filter-list
    for(let i = 0; i < filters.length; i++){
        let uniques = filters[i].vals.filter(function (value, index, self) { 
            return self.indexOf(value) === index;
        });

        filters[i].vals = uniques;
    }

    // Create filter-dropdowns
    let adv_filter = document.getElementById('adv-search');
    for(let i = 0; i < filters.length; i++){
        adv_filter.innerHTML += create_filter(filters[i].col, filters[i].vals);
    }

    $("#search-field").on("keyup", debounce(function (e) {
        search_func(input.value);
    }, 300));

    $(".filter-input").on("click", function(e){
        toggle_filter(this.dataset.header, this.dataset.value);
    });

    $("#openForm").on('click', function(){
        $("#adv-search").toggle();
    });

    $('.dropdown-toggle').on('click', function (e) {
        $(this).next().toggle();
    });
    
    $('.dropdown-menu.keep-open').on('click', function (e) {
        e.stopPropagation();
    });

    if(1) {
        $('body').attr('tabindex', '0');
    }
    else {
        alertify.confirm().set({'reverseButtons': true});
        alertify.prompt().set({'reverseButtons': true});
    }
});

function create_filter(name, vals){
    let short_name = name.replace(' ', '');
    let html = "<div class='btn_group' id='filter_" + short_name + "'>";
    html += '<button class="btn btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">';
    html += name;
    html += '</button>';
    html += '<div class="dropdown-menu keep-open"><li>';
    for(let i = 0; i < vals.length; i++){
        html += '<label class="dropdown-item"><input class="filter-input" type="checkbox" data-header="'+name+'" data-value="'+vals[i]+'"/>' + vals[i] + '</label>';
    }
    html += '</div>';
    html += '</div>';
    return html;
}

function toggle_filter(header, val){
    let found = false;
    for(let i = 0; i < active_filters.length; i++){
        if(active_filters[i].header === header){
            if(active_filters[i].vals.includes(val)){
                active_filters[i].vals.splice(active_filters[i].vals.indexOf(val), 1);
            }else{
                active_filters[i].vals.push(val);
            }
            found = true;
            break;
        }
    }
    if(!found){
        active_filters.push({header: header, vals: [val]});
    }
    console.dir(active_filters);
    search_func(document.getElementById("search-field").value);
}

function search_func(input){
    const filter = input.toUpperCase().trim().split(' ');
    if(filter.length <= 0)
        filter.push(input.toUpperCase().trim());

    for(let y = 0; y < rows.length; y++){
        const tr = rows[y].row;
        let found = false;
        let index = 0;

        if(filter.length > 0 || active_filters.length > 0){
            tr.style.display = "none";

            for(let x = 0; x < rows[y].cols.length; x++){
                const td = rows[y].cols[x].val;
                const header = rows[y].cols[x].header;

                if(td && search_cols.includes(header)){
                    for(let i = 0; i < filter.length; i++){
                        if(td.includes(filter[i])){
                            found = true;
                            index ++;
                            if(index === filter.length){
                                break;
                            }
                        }else{
                            found = false;
                        }
                    }
                    if(found){
                        break;
                    }
                }
            }
            if (found && index === filter.length || filter.length === 0)
                tr.style.display = "";

        }else{
            tr.style.display = "";
        }        
    }
    
    $("#customers tr:visible").each(function (index) {
        $(this).css("background-color", !!(index & 1)? "#E5F0FA" : "rgba(0,0,0,0)");
    });
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	}
}