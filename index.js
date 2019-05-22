class Map {
    constructor(list) {
      this.list = list;
    }
  
    getExtremeCity(SelectedDirection) {
      switch (SelectedDirection) {
        case 'northernmost':
        let max_norther = this.list[0];
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].latitude > max_norther.latitude) {
                max_norther = this.list[i];
            }
        }
          document.getElementById("resultGetExtremeCity").value = max_norther.city;
          break;
        case 'easternmost':
          let max_easter = this.list[0];
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].longitude > max_easter.longitude) {
              max_easter = this.list[i];
            }
          }    
          document.getElementById("resultGetExtremeCity").value = max_easter.city;
          break;
        case 'southernmost':
          let min_souther = this.list[0];
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].latitude < min_souther.latitude) {
              min_souther = this.list[i];
            }
          }    
          document.getElementById("resultGetExtremeCity").value = min_souther.city;
          break;
        case 'westernmost':
          let min_wester = this.list[0];
          for (let i = 0; i < this.list.length; i++) {
            if (this.list[i].longitude < min_wester.longitude) {
              min_wester = this.list[i];
            }
          }    
          document.getElementById("resultGetExtremeCity").value = min_wester.city;
          break;
        default:
          alert( 'error' );     
      }
    }
  
    closestCity(latitude, longitude) {
        if(latitude && longitude){
      function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        function Deg2Rad(deg) {
          return deg * Math.PI / 180;
        }
        lat1 = Deg2Rad(lat1);
        lat2 = Deg2Rad(lat2);
        lon1 = Deg2Rad(lon1);
        lon2 = Deg2Rad(lon2);
        const R = 6371; // km
        const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        const y = (lat2 - lat1);
        const d = Math.sqrt(x * x + y * y) * R;
        return d;
      }
  
      let minDif = 99999;
      let closest;
  
      for (let index = 0; index < this.list.length; ++index) {
        const dif = PythagorasEquirectangular(latitude, longitude, this.list[index].latitude, this.list[index].longitude);
        if (dif < minDif) {
          closest = index;
          minDif = dif;
        }
      }
      document.getElementById("resultClosestCity").value = this.list[closest].city;
    }
    }
  
    listState() {
    function onlyUnique(value, index, self) { 
      return self.indexOf(value) === index;
    }
  
    let res = this.list.map(list => list.state).filter(onlyUnique).join(' ');
      document.getElementById("resultListState").value = res;
    }
  }
  
  const map = new Map([
    {
      city: 'Nashville', state: 'TN', latitude: 36.17, longitude: -86.78,
    },
    {
      city: 'New York', state: 'NY', latitude: 40.71, longitude: -74.00,
    },
    {
      city: 'Atlanta', state: 'GA', latitude: 33.75, longitude: -84.39,
    },
    {
      city: 'Denver', state: 'CO', latitude: 39.74, longitude: -104.98,
    },
    {
      city: 'Los Angeles', state: 'CA', latitude: 34.05, longitude: -118.24,
    },
    {
      city: 'Memphis', state: 'TN', latitude: 35.15, longitude: -90.05,
    }
  ]);
  
  
  document.getElementById("getExtremeCity").addEventListener("click", function(){
  let el = document.querySelector('input[name="direction"]:checked').value;
  map.getExtremeCity(el);
  });
  
  document.getElementById("getClosestCity").addEventListener("click", function(){
  let l1 = document.getElementById("latitude").value;
  let l2 = document.getElementById("longitude").value;
  map.closestCity(l1,l2);
  });
  
  document.getElementById("getListState").addEventListener("click", function(){
  map.listState();
  });