import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";
import "dagre-d3";
import { Digraph, digraph, Node, Subgraph, toDot } from "ts-graphviz";



const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const graph =  api.graphRouter.getAllData.useQuery().data

  console.log(graph)




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

    </>
  );
};

export default Home;