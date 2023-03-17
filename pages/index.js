import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


function showImage(event){
  console.log(event.target.files[0]);
  var f = event.target.files[0];
  var fileReader = new FileReader();
  fileReader.readAsDataURL(f);
  fileReader.onload = function loader(){
    document.getElementById('show-img').setAttribute('src', fileReader.result);
  };
};

function sendImage(event){
  let image_source = document.getElementById('image-file').files[0];
  var form_data = new FormData()
  form_data.append('image', image_source)
  console.log(form_data)
  const options = {
    body: form_data,
  }
  axios({
    url:'http://localhost:8081/api/image/contours', 
    method: 'POST',
    data: form_data,
    responseType: 'blob'
  }).then(function (response){
    console.log(response.status)
    var blobURL = URL.createObjectURL(response.data);
    console.log(blobURL);
    document.getElementById('after-process-img').setAttribute('src', blobURL);
  }).catch(function (error){
    alert(error);
  })
}

const App = () => {
  
  return (
    
    <div className="container" style={{display: 'grid'}}>
      <input
        type="file"
        id="image-file" 
        className="form-control-file"
        onChange={
          (e) => {
            showImage(e);
          }
        }
      />
      <img className="img-fluid" id="show-img"/>
      <button 
        onClick={(e) => {sendImage(e)}}
      >
        Process image!
      </button>
      <img className='img-fluid' id="after-process-img"/>
    </div>
  );
};


export default App;
