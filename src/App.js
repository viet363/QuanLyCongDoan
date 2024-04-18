import Context from "./Context";
import PageMain from "./PageMain";

function App() {
  return (
    <div>
       <Context Compoment={<PageMain></PageMain>}></Context>
    </div>
  );
}

export default App;