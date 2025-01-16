import {useEffect} from "react"

function App() {
  useEffect(() => {
    document.title = "Rapid Bus Transport";
  },[]);
  
  return (
    <div>
      { <h1> Welcome To Rapid Bus Transport</h1>}
    </div>
  );
}
   

export default App;
