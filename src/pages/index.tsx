import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

let nodeName: any

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const graph =  api.graphRouter.getAllData.useQuery().data





  const nodeTable = () => (
  <table>
    <caption>Nodes</caption>
    <tbody>
        <tr>
          <th>Name</th>
          <th>Id</th>
          <th>Identity</th>
        </tr>
        {graph?.nodeList.map((node) =>
        <tr>
          <td>{node.properties.name}</td>
          <td>{node.elementId}</td>
          <td>{JSON.stringify(node.identity)}</td>
          </tr>
        )}
      </tbody>
  </table>
  )

  const relationshiptable = () => (
    <table>
      <caption>Relationships</caption>
      <tbody>
          <tr>
            <th>Type</th>
            <th>Starts</th>
            <th>Ends</th>
          </tr>
          {graph?.relationships.map((relationship) =>
          <tr>
            <td>{relationship.type}</td>
            <td>{relationship.start}</td>
            <td>{relationship.end}</td>
            </tr>
          )}
        </tbody>
    </table>
    )
    


  return (
    <>
     
<div>
  {nodeTable()}
</div>

<div>
  {relationshiptable()}
</div>
<div>____________________________________________________________________________________
  </div>





<input 
placeholder = "Type your node's name"
value ={nodeName}/>


<button onClick = {PopUp(nodeName)}> Add Node</button>
    </>
  );
};





function PopUp(input:String): any{
  //TODO: GET THIS TO WORK. CLONE THEOS REPO AND DO A SIDE BY SIDE TO HELP: https://github.com/t3dotgg/chirp/blob/main/src/pages/index.tsx
  console.log('On Click')
  console.log(input)
}

export default Home;