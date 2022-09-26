var mode = process.env.REACT_APP_MY_VAR
var API_SERVER = 'http://43.143.111.217:8080'
// var API_SERVER = 'http://localhost'

if (mode === 'development') {
  // API_SERVER = 'http://localhost:8080'
  API_SERVER = 'http://43.143.111.217:8080'
}

if (mode === 'production') {
  // API_SERVER = 'http://121.40.124.170'
  API_SERVER = 'http://43.143.111.217:8080'
  
}

export { API_SERVER }
