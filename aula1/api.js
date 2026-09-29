const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxM2UwN2FlZmVmOWUxYWM1MzMyNmMxMDM1NWI4OTZlMCIsIm5iZiI6MTc5MDM1OTMzNC4xNjMsInN1YiI6IjZhYjZiNzI2N2FkZDc3NGUxNDMyNjgxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.F9GSz8ehFkLcHKGgbq9UnCuM_V_b3cSHRwrk3ZNvAio'
  }
};

fetch('https://api.themoviedb.org/3/collection/collection_id/images', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));