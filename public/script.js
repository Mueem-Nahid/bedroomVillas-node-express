//date picker

$(function () {
  $("#date_ex").datepicker({
    minDate: "0D",
    showAnim: "slide",
    dateFormat: "yy-mm-dd"
  });
});

//check out

$(function () {
  $("#check_out").datepicker({
    minDate: "2D",
    showAnim: "slide",
    dateFormat: "yy-mm-dd"
  });
});

//auto complete

function handleSearch() {
  if (document.getElementById("search_input").value != null) {
    let data = document.getElementById("search_input").value;
    if (data.length + 2 >= 3) {
      $(document).ready(function () {
        var autocomplete;
        autocomplete = new google.maps.places.Autocomplete((document.getElementById('search_input')), {
          types: ['geocode'],
        });
        if (data.length + 2 >= 3) {
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var near_place = autocomplete.getPlace();
          });
        }
      });
    }
  }
}

//guest counter

var total = document.getElementById('total');

document.getElementById('btn-increment-total').addEventListener('click', function () {
  total.innerText++;

  if (Number(total.innerText) > 0) {
    document.getElementById('btn-decrement-total').disabled = false;
  }

});

document.getElementById('btn-decrement-total').addEventListener('click', function () {
  total.innerText--;

  if (total.innerText == 0) {
    document.getElementById('btn-decrement-total').disabled = true;
  }
});

// range slider

$(function () {
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 120000,
    values: [0, 120000],
    slide: function (event, ui) {
      $("#amount").val("৳" + ui.values[0] + " - ৳" + ui.values[1]);
    }
  });
  $("#amount").val("৳" + $("#slider-range").slider("values", 0) +
    " - ৳" + $("#slider-range").slider("values", 1));
});

//modal guest value

function modalGuestvalue() {
  let value = document.getElementById('total').innerText;
  document.getElementById('guestValue').value = Number(value);
}

//modal price value

function modalPriceValue() {
  let price = document.getElementById('amount').value;
  document.getElementById('priceValue').value = price;
}

//form values

const form = document.getElementById("sampleForm");

form.addEventListener("submit", e => {
  e.preventDefault();
  let reqBody = {};
  Object.keys(form.elements).forEach(key => {
    let element = form.elements[key];
    if (element.type !== "submit") {
      reqBody[element.name] = element.value;
    }
  });
  const info = Object.values(reqBody);
  document.getElementById("search_name").innerHTML = reqBody.destination;
  document.getElementById("check_in_value").innerHTML = reqBody.date;
  document.getElementById("check_out_value").innerHTML = reqBody.checkOut;
  document.getElementById("guests_value").innerHTML = reqBody.guestValue;
  document.getElementById("show_price").innerHTML = reqBody.price;
});

// map

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(-33.91722, 151.23064),
    zoom: 16,
  });

  var icons = {
    hotel: {
      icon: 'https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-hotel-summer-kmg-design-flat-kmg-design.png'
    }
  };

  const features = [
    {
      position: new google.maps.LatLng(-33.91721, 151.2263),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 1500"
    },
    {
      position: new google.maps.LatLng(-33.91539, 151.2282),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 2000"
    },
    {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 3000"
    },
    {
      position: new google.maps.LatLng(-33.9191, 151.22907),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 1400"
    },
    {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 1700"
    },
    {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 4000"
    },
    {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 700"
    },
    {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 3200"
    },
    {
      position: new google.maps.LatLng(-33.9179, 151.23463),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 4200"
    },
    {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 1000"
    },
    {
      position: new google.maps.LatLng(-33.916988, 151.23364),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 950"
    },
    {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 800"
    },
    {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 4300"
    },
    {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 3200"
    },
    {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 6000"
    },
    {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 4800"
    },
    {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 3100"
    },
    {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 2100"
    },
    {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: "hotel",
      label: "৳",
      title: "Price ৳ 4320"
    },
  ];

  // Create markers

  for (let i = 0; i < features.length; i++) {
    const marker = new google.maps.Marker({
      position: features[i].position,
      label: {
        fontFamily: 'Fontawesome',
        fontSize: '16px',
        color: 'white',
        text: features[i].label,
      },
      title: features[i].title,
      icon: icons[features[i].type].icon,
      map: map,
    });
  }

  // features.forEach((position, title, i) => {
  //   marker.addListener("click", () => {
  //     infoWindow.close();
  //     infoWindow.setContent(marker.getTitle());
  //     infoWindow.open(marker.getMap(), marker);
  //   });
  // })

  // marker.addListener("click", () => {
  //   infowindow.open({
  //     anchor: marker,
  //     map,
  //     shouldFocus: false,
  //   });
  // });

}

/* toggle */

function myFunction() {
  var x = document.getElementById("map");
  if (x.style.display === "none") {
    x.style.display = "block";
    document.getElementById("main").style.display = "none";
    document.getElementById('show-list').style.display = 'block';
  } else {
    x.style.display = "none";
    document.getElementById("main").style.display = "block";
    document.getElementById('show-list').style.display = 'none';
  }
}

// toggle to convert
function convertUnit () {
  let toggleFer = document.getElementById("farenheit-sec");
  let toggleCel = document.getElementById("celsius-sec");
  if (toggleFer.style.display === "none") {
    toggleFer.style.display = "block";
    toggleCel.style.display = "none";
    document.getElementById("convert").innerText = 'Celsius';
  } else {
    toggleFer.style.display = "none";
    toggleCel.style.display = "block";
    document.getElementById("convert").innerText = 'Farenheit';
  }
}
